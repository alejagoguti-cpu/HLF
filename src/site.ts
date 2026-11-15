import * as Cesium from 'cesium';
import { GEO, ASSETS } from './config';
import { facadeShader, treeShader, cityShader } from './shaders';

/** Marco ENU en el origen de la georreferencia de Unreal. */
export function siteMatrix(): Cesium.Matrix4 {
  return Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(GEO.longitude, GEO.latitude, GEO.height),
  );
}

/** Metros ENU -> posición en el mundo. */
export function enuToWorld(e: number, n: number, u: number, m = siteMatrix()): Cesium.Cartesian3 {
  return Cesium.Matrix4.multiplyByPoint(m, new Cesium.Cartesian3(e, n, u), new Cesium.Cartesian3());
}

export interface Building {
  id: number;
  /** sección */
  s: string;
  /** pisos */
  p: number;
  /** cota de base y altura (m) */
  b: number;
  h: number;
  bb: [number, number, number, number];
  r: [number, number][];
}

interface SectionInfo {
  key: string;
  file: string;
  kind: 'edificios' | 'arboles' | 'cubierta';
  atlas?: string;
  marco?: number;
  marcoSup?: number;
  label: string;
  dist: number;
}

export interface Site {
  matrix: Cesium.Matrix4;
  inverse: Cesium.Matrix4;
  tileset: Cesium.Cesium3DTileset | null;
  buildings: Building[];
  treeCount: number;
  sections: { total: number; loaded: number; failed: string[] };
  /** resuelve cuando termina la carga de todas las secciones */
  done: Promise<void>;
  setNight(night: number): void;
  setTreesVisible(v: boolean): void;
  buildingAt(world: Cesium.Cartesian3): Building | null;
}

const TREE_LABEL: Record<string, string> = {
  island_tree_01: 'Arbolado · copa media',
  island_tree_02: 'Arbolado · copa ancha',
  island_tree_03: 'Arbolado · copa baja',
  jacaranda_tree: 'Arbolado · gran porte',
  tree_small_02: 'Arbolado · joven',
  fir_sapling_medium: 'Coníferas',
  shrub_02: 'Arbustos',
};

function pointInRing(x: number, y: number, r: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i];
    const [xj, yj] = r[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function distToRing(x: number, y: number, r: [number, number][]): number {
  let best = Infinity;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [ax, ay] = r[j];
    const [bx, by] = r[i];
    const dx = bx - ax;
    const dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return best;
}

export async function loadSite(
  viewer: Cesium.Viewer,
  onProgress: (label: string, ratio: number) => void,
  onSection?: (loaded: number, total: number, label: string) => void,
): Promise<Site> {
  const scene = viewer.scene;
  const matrix = siteMatrix();
  const inverse = Cesium.Matrix4.inverseTransformation(matrix, new Cesium.Matrix4());
  const base = ASSETS.secciones;

  onProgress('Contexto urbano', 0.08);

  const [recorte, edif, arb] = await Promise.all([
    fetch(base + 'recorte.json').then((r) => r.json()) as Promise<{ clips: [number, number][][] }>,
    fetch(base + 'edificios.json').then((r) => r.json()) as Promise<{
      secciones: { key: string; file: string; c: [number, number] }[];
      edificios: Building[];
    }>,
    fetch(base + 'arboles.json').then((r) => r.json()) as Promise<{
      total: number;
      secciones: { key: string; file: string; n: number; atlas: string; marco: number; marcoSup: number }[];
    }>,
  ]);

  /* ---------------- ciudad real (Google) recortada donde va el modelo ---------------- */
  const cShader = cityShader();
  let tileset: Cesium.Cesium3DTileset | null = null;
  try {
    tileset = await Cesium.Cesium3DTileset.fromUrl(ASSETS.googleTiles, {
      maximumScreenSpaceError: 10,
      shadows: Cesium.ShadowMode.DISABLED,
      dynamicScreenSpaceError: true,
      dynamicScreenSpaceErrorDensity: 0.0022,
      dynamicScreenSpaceErrorFactor: 4,
      showCreditsOnScreen: true,
      cullWithChildrenBounds: true,
      cacheBytes: 384 * 1024 * 1024,
      maximumCacheOverflowBytes: 256 * 1024 * 1024,
    });
    // Se recorta la ciudad de Google solo donde va el modelo de Unreal. La zona del hotel,
    // la plazoleta y Unicentro queda sin recortar: ahí se ve la captura 3D real.
    const polygons = recorte.clips.map((ring) => {
      const polygon = new Cesium.ClippingPolygon({ positions: Cesium.Cartesian3.fromDegreesArray(ring.flat()) });
      // computeRectangle se llama por tile y por cuadro: se calcula una vez
      const rect = polygon.computeRectangle();
      polygon.computeRectangle = (result?: Cesium.Rectangle) => Cesium.Rectangle.clone(rect, result);
      return polygon;
    });
    tileset.clippingPolygons = new Cesium.ClippingPolygonCollection({ polygons });
    tileset.customShader = cShader;
    scene.primitives.add(tileset);
  } catch (err) {
    console.warn('Tiles de Google no disponibles', err);
  }

  /* ---------------- secciones del modelo, de la más cercana al hotel hacia afuera ---------------- */
  const HOTEL: [number, number] = [-236, 330];
  const list: SectionInfo[] = [];
  for (const s of edif.secciones) {
    list.push({
      key: s.key,
      file: s.file,
      kind: 'edificios',
      label: s.key === 'Hotel' ? 'Hotel La Fontana' : `Edificaciones · sector ${s.key}`,
      dist: s.key === 'Hotel' ? -2 : Math.hypot(s.c[0] - HOTEL[0], s.c[1] - HOTEL[1]),
    });
  }
  list.sort((a, b) => a.dist - b.dist);
  // la vegetación entra intercalada después de las primeras edificaciones
  const trees: SectionInfo[] = arb.secciones.map((s) => ({
    key: s.key,
    file: s.file,
    kind: 'arboles',
    atlas: s.atlas,
    marco: s.marco,
    marcoSup: s.marcoSup,
    label: TREE_LABEL[s.key] ?? 'Vegetación',
    dist: 0,
  }));
  const queue: SectionInfo[] = [...list.slice(0, 4), ...trees.slice(0, 3), ...list.slice(4, 9), ...trees.slice(3), ...list.slice(9)];

  const fShader = facadeShader();
  const tShaders: Cesium.CustomShader[] = [];
  const treeModels: Cesium.Model[] = [];
  let night = 0;
  const state = { total: queue.length, loaded: 0, failed: [] as string[] };

  const loadOne = async (s: SectionInfo): Promise<void> => {
    try {
      const model = await Cesium.Model.fromGltfAsync({
        url: base + s.file,
        modelMatrix: matrix,
        upAxis: Cesium.Axis.Y,
        forwardAxis: Cesium.Axis.X,
        shadows: s.kind === 'arboles' ? Cesium.ShadowMode.CAST_ONLY : Cesium.ShadowMode.ENABLED,
        backFaceCulling: false,
        incrementallyLoadTextures: false,
        cull: s.kind !== 'arboles',
      });
      if (s.kind === 'arboles') {
        const sh = treeShader(base + s.atlas!, s.marco!, s.marcoSup!);
        sh.setUniform('uNight', night);
        tShaders.push(sh);
        model.customShader = sh;
      } else model.customShader = fShader;
      // luz de cielo neutra: sin dominante azul en muros y cubiertas
      model.imageBasedLighting.imageBasedLightingFactor = new Cesium.Cartesian2(0.45, 0.25);
      scene.primitives.add(model);
      if (s.kind === 'arboles') treeModels.push(model);
      await new Promise<void>((resolve) => {
        if (model.ready) return resolve();
        const off = model.readyEvent.addEventListener(() => { off(); resolve(); });
        setTimeout(resolve, 20000);
      });
    } catch (err) {
      console.error('Sección no cargada', s.file, err);
      state.failed.push(s.file);
    }
    state.loaded++;
    onSection?.(state.loaded, state.total, s.label);
  };

  // primer plano: hotel + manzanas vecinas + primera vegetación; el resto sigue en segundo plano
  const FIRST = 7;
  for (let i = 0; i < Math.min(FIRST, queue.length); i++) {
    onProgress(queue[i].label, 0.2 + (0.75 * i) / FIRST);
    await loadOne(queue[i]);
  }
  const done = (async () => {
    for (let i = FIRST; i < queue.length; i++) {
      await loadOne(queue[i]);
      await new Promise((r) => setTimeout(r, 60));
    }
  })();

  return {
    matrix,
    inverse,
    tileset,
    buildings: edif.edificios,
    treeCount: arb.total,
    sections: state,
    done,
    setNight(v: number) {
      cShader.setUniform('uNight', v);
      fShader.setUniform('uNight', v);
      night = v;
      for (const sh of tShaders) sh.setUniform('uNight', v);
    },
    setTreesVisible(v: boolean) {
      for (const m of treeModels) m.show = v;
    },
    buildingAt(world: Cesium.Cartesian3): Building | null {
      const p = Cesium.Matrix4.multiplyByPoint(inverse, world, new Cesium.Cartesian3());
      let best: Building | null = null;
      let bestD = 1.2;
      for (const b of edif.edificios) {
        if (p.x < b.bb[0] - 1.5 || p.x > b.bb[2] + 1.5 || p.y < b.bb[1] - 1.5 || p.y > b.bb[3] + 1.5) continue;
        if (p.z > b.b + b.h + 2.5) continue;
        if (pointInRing(p.x, p.y, b.r)) return b;
        const d = distToRing(p.x, p.y, b.r);
        if (d < bestD) { bestD = d; best = b; }
      }
      return best;
    },
  };
}

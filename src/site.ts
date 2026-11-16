import * as Cesium from 'cesium';
import { GEO, ASSETS } from './config';
import { facadeShader, treeShader, cityShader, groundShader, hotelPbrShader } from './shaders';

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
  kind: 'edificios' | 'arboles' | 'arbol3d' | 'cubierta' | 'cubierta_pbr' | 'suelo';
  capa?: number;
  atlas?: string;
  marco?: number;
  marcoSup?: number;
  label: string;
  dist: number;
}

export interface Site {
  /** suelta la carga del resto de la ciudad (se llama al terminar la transición de entrada) */
  startBackground(): void;
  matrix: Cesium.Matrix4;
  inverse: Cesium.Matrix4;
  tileset: Cesium.Cesium3DTileset | null;
  buildings: Building[];
  treeCount: number;
  sections: { total: number; loaded: number; failed: string[] };
  /** resuelve cuando termina la carga de todas las secciones */
  done: Promise<void>;
  setNight(night: number): void;
  setTarde(tarde: number): void;
  setTime(t: number): void;
  setLook(opts: { skyFill?: number; groundFill?: number; hazeAmount?: number; hazeStart?: number }): void;
  setTreesVisible(v: boolean): void;
  /** pisos del hotel visibles (99 = completo) */
  setHotelFloors(n: number): void;
  /** zona ENU donde el hotel lo dibuja el modelo de Revit (null = ninguna) */
  setRevitZone(box: [number, number, number, number] | null): void;
  /** oculta solo los bloques (ids de edificios) que reemplaza el modelo de Revit; [] = ninguno */
  setRevitBlocks(ids: number[], extra?: [number, number][][]): void;
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

  const [recorte, edif, arb, suelo] = await Promise.all([
    fetch(base + 'recorte.json').then((r) => r.json()) as Promise<{ clips: [number, number][][] }>,
    fetch(base + 'edificios.json').then((r) => r.json()) as Promise<{
      secciones: { key: string; file: string; c: [number, number] }[];
      edificios: Building[];
    }>,
    fetch(base + 'arboles.json').then((r) => r.json()) as Promise<{
      total: number;
      secciones: { key: string; file: string; n: number; atlas: string; marco: number; marcoSup: number }[];
    }>,
    fetch(base + 'suelo.json').then((r) => r.json()) as Promise<{ secciones: { key: string; file: string }[] }>,
  ]);

  const clipPolygons = () =>
    recorte.clips.map((ring) => {
      const polygon = new Cesium.ClippingPolygon({ positions: Cesium.Cartesian3.fromDegreesArray(ring.flat()) });
      // computeRectangle se llama por tile y por cuadro: se calcula una vez
      const rect = polygon.computeRectangle();
      polygon.computeRectangle = (result?: Cesium.Rectangle) => Cesium.Rectangle.clone(rect, result);
      return polygon;
    });
  // dentro del ámbito del proyecto el suelo es el modelado (terreno, vías, andenes): se retira el globo
  scene.globe.clippingPolygons = new Cesium.ClippingPolygonCollection({ polygons: clipPolygons() });

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
    // la ciudad de Google se recorta donde va el modelo del proyecto
    tileset.clippingPolygons = new Cesium.ClippingPolygonCollection({ polygons: clipPolygons() });
    tileset.customShader = cShader;
    scene.primitives.add(tileset);
  } catch (err) {
    console.warn('Tiles de Google no disponibles', err);
  }

  /* ---------------- secciones del modelo, de la más cercana al hotel hacia afuera ---------------- */
  const HOTEL: [number, number] = [-236, 330];
  const list: SectionInfo[] = [];
  for (const s of edif.secciones) {
    const isHotel = s.key === 'Hotel';
    list.push({
      key: s.key,
      file: isHotel ? 'hotel_fachadas.glb' : s.file,
      kind: isHotel ? 'cubierta_pbr' : 'edificios',
      label: isHotel ? 'Hotel La Fontana 3D' : `Edificaciones · sector ${s.key}`,
      dist: isHotel ? -2 : Math.hypot(s.c[0] - HOTEL[0], s.c[1] - HOTEL[1]),
    });
  }
  list.push({ key: 'hotel_cubiertas', file: 'hotel_cubiertas.glb', kind: 'cubierta', label: 'Cubiertas del hotel', dist: -1 });
  list.push({ key: 'hotel_plazoleta', file: 'hotel_plazoleta.glb', kind: 'cubierta_pbr', label: 'Plazoleta y acceso · Hotel', dist: -0.8 });
  list.push({ key: 'torres_vecinas', file: 'torres_vecinas.glb', kind: 'cubierta_pbr', label: 'Torres vecinas PBR', dist: -0.6 });
  list.push({ key: 'esquina_ak15', file: 'esquina_ak15.glb', kind: 'cubierta_pbr', label: 'Esquina Ak 15 PBR', dist: -0.55 });
  list.push({ key: 'metro127', file: 'metro127.glb', kind: 'cubierta_pbr', label: 'Metro 127 · Sonesta PBR', dist: -0.52 });
  list.push({ key: 'clinica127', file: 'clinica127.glb', kind: 'cubierta_pbr', label: 'Clínica 127 Colsubsidio PBR', dist: -0.51 });
  list.push({ key: 'unicentro_cubierta', file: 'unicentro_cubierta.glb', kind: 'cubierta_pbr', label: 'Cubierta · Unicentro', dist: -0.5 });
  list.sort((a, b) => a.dist - b.dist);
  const CAPA: Record<string, [number, string]> = {
    Terreno: [0, 'Terreno'], Vias: [1, 'Vías'], Andenes: [2, 'Andenes'], Separadores: [3, 'Separadores'], Ciclorrutas: [4, 'Ciclorrutas'],
    Agua: [5, 'Canal · agua'], Canal_Fondo: [6, 'Canal'], Canal_Muros: [6, 'Canal · muros'], Puentes: [7, 'Puentes'],
  };
  const ground: SectionInfo[] = suelo.secciones.map((s) => ({
    key: s.key, file: s.file, kind: 'suelo', capa: CAPA[s.key]?.[0] ?? 0, label: CAPA[s.key]?.[1] ?? s.key, dist: -3,
  }));
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
  // árboles 3D escaneados (como en planosfinales) alrededor del hotel
  let arb3d: { key: string; file: string }[] = [];
  try { arb3d = ((await fetch(base + 'arboles3d.json').then((r) => r.json())) as { secciones: { key: string; file: string }[] }).secciones; } catch { /* sin árboles 3D */ }
  const trees3d: SectionInfo[] = arb3d.map((t) => ({ key: '3d_' + t.key, file: t.file, kind: 'arbol3d', label: 'Arbolado del hotel', dist: 0 }));
  const queue: SectionInfo[] = [...ground, ...list.slice(0, 4), ...trees3d, ...trees.slice(0, 3), ...list.slice(4, 9), ...trees.slice(3), ...list.slice(9)];

  const fShader = facadeShader();
  // árboles 3D escaneados con la luz de planosfinales: cielo claro arriba, rebote cálido abajo,
  // sol directo y luz que atraviesa la hoja (sin quedarse negros en la sombra)
  const arbol3dShader = new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    uniforms: { uNight: { type: Cesium.UniformType.FLOAT, value: 0 } },
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.baseColor.rgb;
        if (dot(c, vec3(0.3333)) < 0.02) c = vec3(0.20, 0.30, 0.12);
        vec3 n = normalize(fsInput.attributes.normalEC);
        if (dot(n, -fsInput.attributes.positionEC) < 0.0) n = -n;
        vec3 pW = (czm_inverseView * vec4(fsInput.attributes.positionEC, 1.0)).xyz;
        vec3 up = normalize(czm_viewRotation * normalize(pW));
        vec3 sunDir = normalize(czm_lightDirectionEC);
        float hemi = dot(n, up) * 0.5 + 0.5;
        vec3 amb = mix(vec3(0.60, 0.57, 0.50), vec3(0.89, 0.93, 0.96), hemi) * 0.95;
        float nl = max(dot(n, sunDir), 0.0);
        float trans = max(dot(-n, sunDir), 0.0) * 0.35;
        vec3 sol = vec3(1.0, 0.94, 0.86) * (nl * 0.85 + trans);
        vec3 col = c * (amb + sol) * 1.08;
        if (any(isnan(col))) col = c;
        material.diffuse = mix(col, c * vec3(0.18, 0.22, 0.32), uNight);
      }
    `,
  });
  const hShader = hotelPbrShader();
  const gShader = groundShader(base);

  /* ---------------- foto aérea real del sector (para el terreno y las cubiertas) ---------------- */
  const aerial = (async () => {
    try {
      const provider = await Cesium.IonImageryProvider.fromAssetId(ASSETS.imageryAssetId);
      const LEVEL = 18;
      const ts = provider.tilingScheme;
      const carto = (e: number, n: number) => Cesium.Cartographic.fromCartesian(enuToWorld(e, n, 0, matrix));
      const a = ts.positionToTileXY(carto(-1010, 930), LEVEL); // noroeste
      const b = ts.positionToTileXY(carto(1010, -940), LEVEL); // sureste
      const nx = b.x - a.x + 1;
      const ny = b.y - a.y + 1;
      const size = provider.tileWidth;
      const canvas = document.createElement('canvas');
      canvas.width = nx * size;
      canvas.height = ny * size;
      const ctx = canvas.getContext('2d')!;
      const jobs: [number, number][] = [];
      for (let y = a.y; y <= b.y; y++) for (let x = a.x; x <= b.x; x++) jobs.push([x, y]);
      const one = async ([x, y]: [number, number]) => {
        for (let k = 0; k < 40; k++) {
          const req = provider.requestImage(x, y, LEVEL);
          if (req) {
            try {
              const img = (await req) as CanvasImageSource;
              // Cesium entrega las teselas como ImageBitmap invertido en vertical (listo para textura): se endereza al dibujar
              const px = (x - a.x) * size;
              const py = (y - a.y) * size;
              if (typeof ImageBitmap !== 'undefined' && img instanceof ImageBitmap) {
                ctx.save();
                ctx.translate(px, py + size);
                ctx.scale(1, -1);
                ctx.drawImage(img, 0, 0, size, size);
                ctx.restore();
              } else ctx.drawImage(img, px, py, size, size);
            } catch { /* tile sin imagen: queda el gris de fondo */ }
            return;
          }
          await new Promise((r) => setTimeout(r, 120));
        }
      };
      ctx.fillStyle = '#6a6f62';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const workers = Array.from({ length: 6 }, async () => { while (jobs.length) await one(jobs.shift()!); });
      await Promise.all(workers);
      // textura potencia de dos
      const out = document.createElement('canvas');
      out.width = out.height = 4096;
      out.getContext('2d')!.drawImage(canvas, 0, 0, 4096, 4096);
      const blob = await new Promise<Blob | null>((r) => out.toBlob(r, 'image/jpeg', 0.92));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      (window as unknown as { __AERIAL_URL__?: string }).__AERIAL_URL__ = url;
      const rw = ts.tileXYToRectangle(a.x, a.y, LEVEL);
      const re = ts.tileXYToRectangle(b.x, b.y, LEVEL);
      const toEnu = (lon: number, lat: number) =>
        Cesium.Matrix4.multiplyByPoint(inverse, Cesium.Cartesian3.fromRadians(lon, lat, GEO.height), new Cesium.Cartesian3());
      const sw = toEnu(rw.west, re.south);
      const ne = toEnu(re.east, rw.north);
      const rect = new Cesium.Cartesian4(sw.x, sw.y, ne.x, ne.y);
      for (const sh of [fShader, gShader]) {
        sh.setUniform('uAerial', new Cesium.TextureUniform({
          url,
          repeat: false,
          minificationFilter: Cesium.TextureMinificationFilter.LINEAR_MIPMAP_LINEAR,
          magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
        }));
        sh.setUniform('uAerialRect', rect);
        sh.setUniform('uAerialOn', 1);
      }
    } catch (err) {
      console.warn('Foto aérea no disponible', err);
    }
  })();
  void aerial;
  const tShaders: Cesium.CustomShader[] = [];
  const treeModels: Cesium.Model[] = [];
  /** volumen completo del hotel (fachadas + cubiertas): se recorta donde va Revit y crece desde el piso en la animación */
  const hotelModels: Cesium.Model[] = [];
  let hotelZone: Cesium.Cartesian3[] | null = null;
  const growPlane = new Cesium.ClippingPlane(new Cesium.Cartesian3(0, -1, 0), 1000) /* glTF Y-up: corta por altura */;
  let night = 0;
  let tarde = 0;
  let skyFill = 0.22;
  let hazeAmount = 0.08;
  let hazeStart = 1200;

  const state = { total: queue.length, loaded: 0, failed: [] as string[] };

  const loadOne = async (s: SectionInfo): Promise<void> => {
    try {
      const model = await Cesium.Model.fromGltfAsync({
        url: base + s.file,
        modelMatrix: matrix,
        upAxis: Cesium.Axis.Y,
        forwardAxis: Cesium.Axis.X,
        shadows: s.kind === 'arbol3d' ? Cesium.ShadowMode.ENABLED : s.kind === 'arboles' ? Cesium.ShadowMode.CAST_ONLY : s.kind === 'suelo' ? Cesium.ShadowMode.RECEIVE_ONLY : Cesium.ShadowMode.ENABLED,
        backFaceCulling: false,
        incrementallyLoadTextures: false,
        cull: s.kind !== 'arboles',
      });
      if (s.kind === 'arbol3d') model.customShader = arbol3dShader; else if (s.kind === 'suelo') model.customShader = gShader; else if (s.kind === 'arboles') {
        const sh = treeShader(base + s.atlas!, s.marco!, s.marcoSup!);
        sh.setUniform('uNight', night);
        sh.setUniform('uTarde', tarde);
        sh.setUniform('uSkyFill', skyFill);
        sh.setUniform('uHazeAmount', hazeAmount);
        sh.setUniform('uHazeStart', hazeStart);
        tShaders.push(sh);
        model.customShader = sh;
      } else if (s.key === 'Hotel' || s.key === 'hotel_plazoleta' || s.key === 'hotel_cubiertas') model.customShader = hShader;
      else if (s.kind !== 'cubierta_pbr') model.customShader = fShader;
      // iluminación IBL para reflejos en vidrios y cubiertas (protagonismo del Hotel)
      const isHotelHero = s.key === 'Hotel' || s.key === 'hotel_plazoleta' || s.key === 'hotel_cubiertas';
      model.imageBasedLighting.imageBasedLightingFactor = isHotelHero
        ? new Cesium.Cartesian2(1.0, 0.75)
        : s.kind === 'cubierta_pbr'
          ? new Cesium.Cartesian2(0.85, 0.55)
          : new Cesium.Cartesian2(0.68, 0.38);
      scene.primitives.add(model);
      if (s.kind === 'arboles') treeModels.push(model);
      if (s.key === 'Hotel' || s.key === 'hotel_cubiertas') hotelModels.push(model);
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
  // carga en paralelo (de a 5): el primer plano (suelo + hotel + vecinos) abre la página,
  // el resto sigue por detrás en el mismo orden de prioridad
  const FIRST = ground.length + 7;
  const pool = async (items: SectionInfo[], n: number, onEach?: (k: number) => void) => {
    let next = 0, hechos = 0;
    await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) { const it = items[next++]; await loadOne(it); onEach?.(++hechos); }
    }));
  };
  const first = queue.slice(0, FIRST);
  await pool(first, 5, (k) => onProgress(first[Math.min(k, first.length - 1)].label, 0.2 + (0.75 * k) / first.length));
  // el resto de la ciudad espera a que termine la transición de entrada (así la cámara vuela fluida)
  let abrirFondo: () => void = () => {};
  const fondo = new Promise<void>((r) => { abrirFondo = r; setTimeout(r, 16000); });
  const done = (async () => {
    await fondo;
    await pool(queue.slice(FIRST), 3);
    await aerial;
  })();

  return {
    startBackground: () => abrirFondo(),
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
      hShader.setUniform('uNight', v);
      night = v;
      gShader.setUniform('uNight', v);
      for (const sh of tShaders) sh.setUniform('uNight', v);
    },
    setTarde(v: number) {
      cShader.setUniform('uTarde', v);
      fShader.setUniform('uTarde', v);
      hShader.setUniform('uTarde', v);
      tarde = v;
      gShader.setUniform('uTarde', v);
      for (const sh of tShaders) sh.setUniform('uTarde', v);
    },
    setTime(t: number) {
      for (const sh of tShaders) sh.setUniform('uTime', t);
    },
    setLook(opts) {
      if (opts.skyFill !== undefined) {
        skyFill = opts.skyFill;
        fShader.setUniform('uSkyFill', skyFill);
        hShader.setUniform('uSkyFill', skyFill);
        for (const sh of tShaders) sh.setUniform('uSkyFill', skyFill);
      }
      if (opts.groundFill !== undefined) {
        gShader.setUniform('uGroundFill', opts.groundFill);
      }
      if (opts.hazeAmount !== undefined) {
        hazeAmount = opts.hazeAmount;
        fShader.setUniform('uHazeAmount', hazeAmount);
        hShader.setUniform('uHazeAmount', hazeAmount);
        gShader.setUniform('uHazeAmount', hazeAmount);
        cShader.setUniform('uHazeAmount', hazeAmount);
        for (const sh of tShaders) sh.setUniform('uHazeAmount', hazeAmount);
      }
      if (opts.hazeStart !== undefined) {
        hazeStart = opts.hazeStart;
        fShader.setUniform('uHazeStart', hazeStart);
        hShader.setUniform('uHazeStart', hazeStart);
        gShader.setUniform('uHazeStart', hazeStart);
        cShader.setUniform('uHazeStart', hazeStart);
        for (const sh of tShaders) sh.setUniform('uHazeStart', hazeStart);
      }
    },
    setRevitBlocks(ids: number[], extra: [number, number][][] = []) {
      const polys = edif.edificios
        .filter((b) => ids.includes(b.id))
        .map((b) => {
          // la huella se agranda 1 m (alero incluido) para que no queden restos del volumen genérico en el borde
          const cx = b.r.reduce((s, p) => s + p[0], 0) / b.r.length;
          const cy = b.r.reduce((s, p) => s + p[1], 0) / b.r.length;
          return new Cesium.ClippingPolygon({
            positions: b.r.map(([e, n]) => {
              const dx = e - cx, dy = n - cy, l = Math.hypot(dx, dy) || 1;
              return enuToWorld(e + (dx / l) * 1.0, n + (dy / l) * 1.0, 0, matrix);
            }),
          });
        });
      for (const ring of extra) polys.push(new Cesium.ClippingPolygon({ positions: ring.map(([e, n]) => enuToWorld(e, n, 0, matrix)) }));
      for (const m of hotelModels) {
        m.clippingPolygons = polys.length
          ? new Cesium.ClippingPolygonCollection({ polygons: polys })
          : (undefined as unknown as Cesium.ClippingPolygonCollection);
      }
    },
    setRevitZone(box: [number, number, number, number] | null) {
      if (box) return; // ya no se usa la zona rectangular: se ocultan solo los bloques reemplazados (setRevitBlocks)
      hotelZone = box
        ? [[box[0], box[1]], [box[2], box[1]], [box[2], box[3]], [box[0], box[3]]].map(([e, n]) => enuToWorld(e, n, 0, matrix))
        : null;
      for (const m of hotelModels) {
        m.clippingPolygons = hotelZone
          ? new Cesium.ClippingPolygonCollection({ polygons: [new Cesium.ClippingPolygon({ positions: hotelZone })] })
          : (undefined as unknown as Cesium.ClippingPolygonCollection);
      }
      fShader.setUniform('uRevitBox', box ? new Cesium.Cartesian4(box[0] - 1, box[1] - 1, box[2] + 1, box[3] + 1) : new Cesium.Cartesian4(0, 0, 0, 0));
    },
    setHotelFloors(n: number) {
      // el resto del hotel crece desde el piso: plano de corte horizontal que sube con los pisos
      const on = n < 98;
      growPlane.distance = 3.2 + n * 3.05;
      for (const m of hotelModels) {
        if (on && !m.clippingPlanes) {
          m.clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: [growPlane],
            edgeWidth: 2.0,
            edgeColor: Cesium.Color.fromCssColorString('#d7ebff'),
          });
        }
        if (m.clippingPlanes) m.clippingPlanes.enabled = on;
      }
      fShader.setUniform('uHotelPisos', n);
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

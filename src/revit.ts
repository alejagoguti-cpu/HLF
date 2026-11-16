import * as Cesium from 'cesium';
import { ASSETS } from './config';

/**
 * Hotel La Fontana · modelo de Revit (HLF_P2-P6.rvt), una sección por nivel.
 *
 * - play(): los niveles caen uno a uno y se apilan (PISO 1 → CUBIERTA).
 * - openAt(i): abre el edificio en un nivel; los de arriba se levantan y desaparecen,
 *   y queda a la vista la planta de ese piso.
 * - full(): edificio completo.
 * Por ahora solo arquitectura exterior e interior en obra gris (sin mobiliario).
 */

interface NivelInfo { i: number; nombre: string; file: string; elev: number; z0: number; z1: number; tris: number }
interface Manifest { niveles: NivelInfo[]; caja: [number, number, number, number] }

interface Nivel extends NivelInfo {
  model: Cesium.Model;
  /** desplazamiento vertical actual / objetivo (m) y opacidad lógica */
  off: number;
  target: number;
  delay: number;
  shown: boolean;
}

export interface RevitHotel {
  niveles: { i: number; nombre: string }[];
  caja: [number, number, number, number];
  ready: boolean;
  visible: boolean;
  /** nivel abierto (-1 = edificio completo) */
  abierto: number;
  play(): void;
  openAt(i: number): void;
  full(): void;
  hide(): void;
  setNight(n: number): void;
  update(dt: number, now: number): void;
}

function revitShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    varyings: { vRP: Cesium.VaryingType.VEC3, vRN: Cesium.VaryingType.VEC3 },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vRP = vsInput.attributes.positionMC;
        vRN = vsInput.attributes.normalMC;
      }
    `,
    fragmentShaderText: `
      float rh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 c = fsInput.attributes.color_0;
        float cat = floor(c.a * 255.0 + 0.5);
        vec3 col = czm_srgbToLinear(c.rgb);
        float rough = 0.85;
        vec3 spec = vec3(0.04);
        float dist = length(fsInput.attributes.positionEC);
        float near = 1.0 - smoothstep(40.0, 160.0, dist);
        vec3 n = normalize(vRN);
        float vertical = 1.0 - smoothstep(0.3, 0.7, abs(n.y));

        if (cat < 20.0) {
          // muros: ladrillo a la vista del hotel (hiladas de 7 cm, trabado), solo en paramentos
          float along = abs(n.x) > abs(n.z) ? vRP.z : vRP.x;
          float hil = fract(vRP.y / 0.075);
          float trab = fract(along / 0.25 + step(1.0, mod(floor(vRP.y / 0.075), 2.0)) * 0.5);
          float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
          float pieza = rh(floor(vec2(along / 0.25, vRP.y / 0.075)));
          col *= mix(1.0, 0.86 + 0.26 * pieza, near * vertical);
          col = mix(col, col * vec3(0.80, 0.79, 0.78), junta * near * vertical * 0.8);
          // coronación del muro cortado: se lee la planta
          col = mix(col, vec3(0.82, 0.80, 0.76), (1.0 - vertical) * 0.85);
        } else if (cat < 40.0) {
          col *= 0.94 + 0.10 * rh(floor(vRP.xz * 1.6));          // losas: concreto
        } else if (cat < 60.0) {
          float canal = abs(fract(dot(vRP.xz, vec2(0.7, 0.7)) * 3.0) - 0.5) * 2.0;
          col *= 0.78 + 0.26 * (1.0 - canal * canal * near);      // cubiertas: teja
        } else if (cat < 80.0 || (cat > 100.0 && cat < 120.0)) {
          // ventanas y paneles de muro cortina: vidrio
          vec3 v = normalize(-fsInput.attributes.positionEC);
          float fres = pow(1.0 - clamp(abs(dot(normalize(material.normalEC), v)), 0.0, 1.0), 4.0);
          col = mix(col * 0.55, vec3(0.62, 0.70, 0.78), 0.25 + 0.6 * fres);
          rough = 0.1;
          spec = vec3(0.06);
        } else if (cat > 120.0 && cat < 160.0) {
          rough = 0.45;                                           // montantes y barandas: metal oscuro
        }
        material.diffuse = col * mix(1.0, 0.4, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.emissive = col * 0.16 * (1.0 - uNight);
      }
    `,
  });
}


export async function loadRevitHotel(viewer: Cesium.Viewer, matrix: Cesium.Matrix4): Promise<RevitHotel | null> {
  const base = ASSETS.secciones;
  let man: Manifest;
  try {
    man = (await fetch(base + 'revit.json').then((r) => r.json())) as Manifest;
  } catch {
    return null;
  }
  const shader = revitShader();
  const niveles: Nivel[] = [];
  for (const info of man.niveles) {
    try {
      const model = await Cesium.Model.fromGltfAsync({
        url: base + info.file,
        modelMatrix: matrix,
        upAxis: Cesium.Axis.Y,
        forwardAxis: Cesium.Axis.X,
        shadows: Cesium.ShadowMode.ENABLED,
        backFaceCulling: false,
        show: false,
      });
      model.customShader = shader;
      model.imageBasedLighting.imageBasedLightingFactor = new Cesium.Cartesian2(0.45, 0.25);
      viewer.scene.primitives.add(model);
      niveles.push({ ...info, model, off: 0, target: 0, delay: 0, shown: false });
    } catch (err) {
      console.warn('Nivel de Revit no cargado', info.file, err);
    }
  }
  if (!niveles.length) return null;

  const LIFT = 46; // altura desde la que cae / a la que se retira un nivel
  const scratch = new Cesium.Matrix4();
  const place = (n: Nivel): void => {
    const t = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, n.off), scratch);
    n.model.modelMatrix = Cesium.Matrix4.multiply(matrix, t, new Cesium.Matrix4());
  };

  const api: RevitHotel = {
    niveles: niveles.map((n) => ({ i: n.i, nombre: n.nombre })),
    caja: man.caja,
    ready: true,
    visible: false,
    abierto: -1,
    play() {
      api.visible = true;
      api.abierto = -1;
      const t0 = performance.now();
      niveles.forEach((n, k) => {
        n.off = LIFT;
        n.target = 0;
        n.delay = t0 + k * 620;
        n.shown = false;
        n.model.show = false;
        place(n);
      });
    },
    openAt(i: number) {
      api.visible = true;
      api.abierto = i;
      const now = performance.now();
      let k = 0;
      // los niveles de arriba se retiran de arriba hacia abajo; los de abajo vuelven a su sitio
      for (const n of [...niveles].reverse()) {
        if (n.i > i) { n.target = LIFT; n.delay = now + k++ * 110; }
      }
      for (const n of niveles) {
        if (n.i <= i) { n.target = 0; n.delay = now; if (!n.shown) { n.off = LIFT; } }
      }
    },
    full() {
      api.visible = true;
      api.abierto = -1;
      const now = performance.now();
      niveles.forEach((n, k) => {
        if (n.target !== 0 || !n.shown) { n.target = 0; n.delay = now + k * 110; if (!n.shown) n.off = LIFT; }
      });
    },
    hide() {
      api.visible = false;
      api.abierto = -1;
      for (const n of niveles) { n.model.show = false; n.shown = false; n.off = 0; n.target = 0; }
    },
    setNight(v: number) {
      shader.setUniform('uNight', v);
    },
    update(dt: number, now: number) {
      if (!api.visible) return;
      for (const n of niveles) {
        if (now < n.delay) continue;
        if (n.target === 0 && !n.shown) { n.shown = true; n.model.show = true; }
        const d = n.target - n.off;
        if (Math.abs(d) < 0.01) {
          if (n.off !== n.target) { n.off = n.target; place(n); }
          if (n.target !== 0 && n.shown) { n.shown = false; n.model.show = false; }
          continue;
        }
        // caída con desaceleración (asienta suave sobre el piso de abajo)
        const k = n.target === 0 ? 1 - Math.exp(-5.2 * dt) : 1 - Math.exp(-4.0 * dt);
        n.off += d * k;
        place(n);
      }
    },
  };
  return api;
}

/* ------------------------------------------------------------ panel de pisos */

/** Lista de niveles (como un directorio de pisos): al elegir uno, el edificio se abre ahí. */
export function createPisosPanel(hotel: RevitHotel, onPick: (i: number) => void): { show(v: boolean): void; mark(i: number): void } {
  const style = document.createElement('style');
  style.textContent = `
    .pisos { position: fixed; left: 20px; top: 318px; z-index: 6; width: 244px; padding: 12px 10px 10px; border-radius: 14px;
      background: rgba(12,16,22,.72); border: 1px solid rgba(255,255,255,.13); backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%); color: #eef2f7; font-family: ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif;
      display: grid; gap: 3px; }
    .pisos[hidden] { display: none; }
    .pisos small { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: #9dc4ea; padding: 0 6px 6px; }
    .pisos button { all: unset; box-sizing: border-box; width: 100%; padding: 8px 10px; border-radius: 9px; font-size: 12.5px; cursor: pointer;
      display: flex; justify-content: space-between; color: rgba(238,242,247,.72); }
    .pisos button:hover { background: rgba(255,255,255,.08); color: #eef2f7; }
    .pisos button.on { background: #e8eef6; color: #0a0e14; font-weight: 600; }
    .pisos button span { opacity: .6; font-variant-numeric: tabular-nums; }
    @media (max-width: 720px) { .pisos { top: auto; bottom: 250px; left: 12px; right: 12px; width: auto; grid-template-columns: repeat(4, 1fr); }
      .pisos small { grid-column: 1 / -1; } .pisos button span { display: none; } }
  `;
  document.head.appendChild(style);
  const el = document.createElement('aside');
  el.className = 'pisos';
  el.hidden = true;
  el.innerHTML = '<small>Pisos · modelo Revit</small>';
  const buttons = new Map<number, HTMLButtonElement>();
  const add = (i: number, label: string, right: string) => {
    const b = document.createElement('button');
    b.innerHTML = `${label}<span>${right}</span>`;
    b.addEventListener('click', () => onPick(i));
    buttons.set(i, b);
    el.appendChild(b);
  };
  add(-1, 'Edificio completo', '');
  for (const n of [...hotel.niveles].reverse()) add(n.i, n.nombre.charAt(0) + n.nombre.slice(1).toLowerCase(), `N${n.i + 1}`);
  document.body.appendChild(el);
  const mark = (i: number) => buttons.forEach((b, k) => b.classList.toggle('on', k === i));
  mark(-1);
  return { show: (v: boolean) => { el.hidden = !v; }, mark };
}

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
interface Manifest { niveles: NivelInfo[]; caja: [number, number, number, number]; bloques?: number[] }

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
  /** bloques del modelo de contexto que este Revit reemplaza */
  bloques: number[];
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

/** Decodifica una imagen a píxeles; si no llega (red o memoria), devuelve un color plano: el visor nunca se detiene por una textura. */
async function pixels(url: string, fallback: [number, number, number]): Promise<Cesium.TextureUniform> {
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height);
    return new Cesium.TextureUniform({
      typedArray: new Uint8Array(d.data.buffer),
      width: c.width,
      height: c.height,
      repeat: true,
      minificationFilter: Cesium.TextureMinificationFilter.LINEAR_MIPMAP_LINEAR,
      magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
    });
  } catch {
    return new Cesium.TextureUniform({ typedArray: new Uint8Array([...fallback, 255]), width: 1, height: 1 });
  }
}

function revitShader(ladrillo: Cesium.TextureUniform, teja: Cesium.TextureUniform): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
      uLadrillo: { type: Cesium.UniformType.SAMPLER_2D, value: ladrillo },
      uTeja: { type: Cesium.UniformType.SAMPLER_2D, value: teja },
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
      float rn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(rh(i), rh(i + vec2(1.0, 0.0)), f.x), mix(rh(i + vec2(0.0, 1.0)), rh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      // foto del material: se conserva su dibujo y parte de su color, llevada al tono real del hotel
      vec3 foto(sampler2D t, vec2 uv, vec3 tono, float croma) {
        vec3 c = czm_srgbToLinear(texture(t, uv).rgb);
        vec3 m = czm_srgbToLinear(textureLod(t, uv, 9.0).rgb);
        float lum = dot(c, vec3(0.3333)) / max(dot(m, vec3(0.3333)), 0.01);
        vec3 tinte = c / max(m, vec3(0.01));
        return tono * mix(vec3(lum), tinte, croma);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 c = fsInput.attributes.color_0;
        float cat = floor(c.a * 255.0 + 0.5);
        vec3 col = czm_srgbToLinear(c.rgb);
        float rough = 0.85;
        vec3 spec = vec3(0.04);
        vec3 n = normalize(vRN);
        float vertical = 1.0 - smoothstep(0.3, 0.7, abs(n.y));
        float big = rn(vRP.xz * 0.12 + vRP.y * 0.2);

        if (cat < 20.0) {
          // fachada: ladrillo a la vista real (foto), con variación de tono por paños
          float along = abs(n.x) > abs(n.z) ? vRP.z : vRP.x;
          vec3 ladr = foto(uLadrillo, vec2(along, vRP.y) / 1.5, vec3(0.34, 0.135, 0.075), 0.75);
          ladr *= 0.88 + 0.24 * big;
          // coronación del muro cortado (planta): pañete claro
          col = mix(vec3(0.62, 0.60, 0.55), ladr, vertical);
          rough = 0.9;
        } else if (cat < 40.0) {
          col = vec3(0.50, 0.49, 0.46) * (0.92 + 0.14 * rn(vRP.xz * 1.2));     // losas: concreto pulido
          rough = 0.7;
        } else if (cat < 60.0) {
          // cubierta: teja de barro real (foto), con las hiladas siguiendo la pendiente
          vec2 baja = length(n.xz) > 0.05 ? normalize(n.xz) : vec2(0.0, 1.0);
          vec2 uv = vec2(dot(vRP.xz, vec2(-baja.y, baja.x)), dot(vRP.xz, baja) / max(abs(n.y), 0.35));
          col = foto(uTeja, uv / 1.3, vec3(0.36, 0.125, 0.06), 0.8) * (0.86 + 0.28 * big);
          rough = 0.88;
        } else if (cat < 80.0 || (cat > 100.0 && cat < 120.0)) {
          // vidrio: reflejo del cielo, de las fachadas de enfrente y del interior, con Fresnel real
          vec3 v = normalize(-fsInput.attributes.positionEC);
          vec3 nE = normalize(material.normalEC);
          float cosT = clamp(abs(dot(nE, v)), 0.0, 1.0);
          float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
          // dirección reflejada en coordenadas del mundo (y = arriba en el modelo)
          vec3 rEC = reflect(-v, nE);
          vec3 rW = normalize((czm_inverseViewRotation * rEC));
          vec3 up = normalize(czm_inverseViewRotation * (czm_view * vec4(0.0, 0.0, 1.0, 0.0)).xyz);
          float alt = dot(rW, normalize(czm_viewerPositionWC));
          // cielo: horizonte claro, cenit azul, nubes suaves
          vec3 cielo = mix(vec3(0.78, 0.83, 0.88), vec3(0.36, 0.52, 0.74), smoothstep(0.0, 0.6, alt));
          float nube = smoothstep(0.55, 0.85, rn(rW.xz / max(alt, 0.08) * 1.6));
          cielo = mix(cielo, vec3(0.92), nube * 0.45 * smoothstep(0.02, 0.3, alt));
          // bajo el horizonte se refleja la ciudad: bandas oscuras de fachadas con ventanas
          float banda = step(0.5, rn(vec2(floor(atan(rW.z, rW.x) * 24.0), 3.0)));
          vec3 ciudad = mix(vec3(0.16, 0.15, 0.15), vec3(0.34, 0.30, 0.27), banda) * (0.8 + 0.4 * rn(floor(vRP.xy * 3.0)));
          vec3 refl = alt > 0.0 ? cielo : mix(ciudad, vec3(0.22, 0.24, 0.24), smoothstep(-0.05, -0.4, alt));
          refl = mix(refl, vec3(0.03, 0.04, 0.07), uNight);
          // interior: penumbra con cortinas claras al fondo
          vec3 interior = mix(vec3(0.035, 0.04, 0.045), vec3(0.20, 0.18, 0.15), rn(floor(vRP.xz * 0.9) + floor(vRP.y / 3.0)) * 0.6);
          interior += vec3(1.0, 0.72, 0.42) * uNight * step(0.45, rn(floor(vRP.xz * 0.7) + floor(vRP.y / 3.0) * 7.0)) * 0.9;
          // leve ondulación del vidrio flotado (los reflejos no son perfectamente planos)
          float onda = (rn(vec2(vRP.y * 2.0, vRP.x + vRP.z)) - 0.5) * 0.06;
          col = mix(interior, refl * (1.0 + onda), clamp(fres + 0.22, 0.0, 1.0));
          rough = 0.02;
          spec = vec3(0.9);
          material.emissive = vec3(0.0);
          material.diffuse = col * 0.35;
          material.roughness = rough;
          material.specular = spec;
          material.emissive = col * 0.65;
          return;
        } else if (cat < 100.0) {
          col = vec3(0.20, 0.11, 0.06) * (0.85 + 0.3 * rn(vec2(vRP.y * 14.0, vRP.x + vRP.z)));  // puertas: madera
          rough = 0.6;
        } else if (cat < 140.0) {
          col = vec3(0.045, 0.047, 0.05);                         // montantes: aluminio anodizado oscuro
          rough = 0.35; spec = vec3(0.35);
        } else if (cat < 160.0) {
          col = vec3(0.028, 0.028, 0.03);                         // barandas: hierro forjado negro, satinado
          rough = 0.3; spec = vec3(0.45);
        } else if (cat > 235.0 && cat < 245.0) {
          // matera de barro cocido, con manchas de humedad
          col = vec3(0.30, 0.12, 0.06) * (0.82 + 0.3 * rn(vRP.xz * 6.0 + vRP.y * 4.0)) * (0.85 + 0.15 * smoothstep(0.0, 0.25, fract(vRP.y)));
          rough = 0.92;
        } else if (cat > 245.0) {
          // hojas: tres tonos de verde con variación por hoja y algo de luz que las atraviesa
          col = czm_srgbToLinear(c.rgb) * (0.75 + 0.5 * rn(floor(vRP.xz * 18.0) + vRP.y * 11.0));
          rough = 0.6;
          spec = vec3(0.06);
          material.diffuse = col * mix(1.0, 0.35, uNight);
          material.roughness = rough;
          material.specular = spec;
          material.emissive = col * 0.28 * (1.0 - uNight);
          return;
        } else {
          col = vec3(0.52, 0.50, 0.47) * (0.92 + 0.14 * rn(vRP.xz * 1.5 + vRP.y)); // columnas, escaleras y vigas: concreto
        }
        material.diffuse = col * mix(1.0, 0.4, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.emissive = col * 0.14 * (1.0 - uNight);
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
  const [ladrillo, teja] = await Promise.all([pixels(base + 'tex_ladrillo.webp', [107, 84, 76]), pixels(base + 'tex_teja.webp', [90, 52, 28])]);
  const shader = revitShader(ladrillo, teja);
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
    bloques: man.bloques ?? [],
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

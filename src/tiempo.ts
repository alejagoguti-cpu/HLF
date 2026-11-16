import * as Cesium from 'cesium';
import type { LookParams } from './look-studio';

/**
 * Reloj de 24 horas y clima (como el simulador de Kennedy).
 *
 * El sol sale de su posición real sobre Bogotá (latitud 4,70° N, declinación de la fecha):
 * todo se gradúa por su elevación con fotogramas clave — noche, hora azul, salida/puesta,
 * hora dorada y día — mezclando los ajustes de luz Día / Tarde / Noche del panel "Ajustar luz".
 * El clima (Soleado, Nublado, Lluvia) atenúa el sol, ablanda las sombras, cierra el cielo y,
 * con lluvia, agrega cortinas de agua en pantalla.
 */

export type Clima = 'sol' | 'nublado' | 'lluvia';

/** Filtros de imagen (como en una cámara): se aplican encima de la luz de la hora y el clima. */
export type Filtro = 'planos' | 'natural' | 'calido' | 'claro' | 'cine' | 'dramatico' | 'panel';
export const FILTROS: Record<Exclude<Filtro, 'panel'>, { nombre: string; o: Partial<LookParams>; sol?: number }> = {
  planos:    { nombre: 'Planos finales', o: { exposure: 1.06, contrast: 0.18, saturation: 1.08, tintColor: '#fff8f0', vignette: 0.1, shadowDarkness: 0.36, bloomBrightness: -0.65, skyFill: 0.34, groundFill: 0.18, skyZenith: '#5f86b3', skyHorizon: '#d9dee0', hazeAmount: 0.06, hazeStart: 600 }, sol: 1.0 },
  natural:   { nombre: 'Natural',        o: { exposure: 1.04, contrast: 0.2, saturation: 1.05, tintColor: '#ffffff', vignette: 0.18, shadowDarkness: 0.45, bloomBrightness: -0.6 } },
  calido:    { nombre: 'Cálido',         o: { exposure: 1.06, contrast: 0.24, saturation: 1.14, tintColor: '#fff0dc', vignette: 0.25, shadowDarkness: 0.42, bloomBrightness: -0.5 }, sol: 1.05 },
  claro:     { nombre: 'Render claro',   o: { exposure: 1.16, contrast: 0.1, saturation: 0.96, tintColor: '#fbfcff', vignette: 0.08, shadowDarkness: 0.28, bloomBrightness: -0.7 } },
  cine:      { nombre: 'Cinematográfico', o: { exposure: 0.98, contrast: 0.42, saturation: 0.86, tintColor: '#f3ece3', vignette: 0.55, shadowDarkness: 0.5, bloomBrightness: -0.45 } },
  dramatico: { nombre: 'Dramático',      o: { exposure: 0.94, contrast: 0.55, saturation: 1.1, tintColor: '#fff6ec', vignette: 0.62, shadowDarkness: 0.62, bloomBrightness: -0.4 }, sol: 1.12 },
};
export function aplicarFiltro(look: LookParams, f: Filtro, night: number): LookParams {
  if (f === 'panel') return look;
  const F = FILTROS[f];
  const o = { ...look, ...F.o } as LookParams;
  // de noche se conserva la oscuridad de la escena: la exposición del filtro pesa menos
  o.exposure = look.exposure + ((F.o.exposure ?? look.exposure) - look.exposure) * (1 - night);
  o.sunIntensity = look.sunIntensity * (F.sol ?? 1);
  return o;
}

const LAT = (4.70 * Math.PI) / 180;
const FECHA = '2026-11-16';
// declinación del 16 de noviembre ≈ −18,6°; mediodía solar en Bogotá ≈ 11:41
const DEC = (-18.6 * Math.PI) / 180;
const NOON = 11.68;

export function elevacionSol(h: number): number {
  const H = ((h - NOON) * 15 * Math.PI) / 180;
  const s = Math.sin(LAT) * Math.sin(DEC) + Math.cos(LAT) * Math.cos(DEC) * Math.cos(H);
  return (Math.asin(s) * 180) / Math.PI;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c: number[]) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const mixHex = (a: string, b: string, t: number) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
function mixLook(a: LookParams, b: LookParams, t: number): LookParams {
  const o = { ...a } as Record<string, number | string>;
  for (const k of Object.keys(a) as (keyof LookParams)[]) {
    const x = a[k], y = b[k];
    o[k] = typeof x === 'number' && typeof y === 'number' ? x + (y - x) * t : typeof x === 'string' && typeof y === 'string' && x.startsWith('#') ? mixHex(x, y, t) : t < 0.5 ? x : y;
  }
  return o as unknown as LookParams;
}

export interface EstadoLuz {
  look: LookParams;
  night: number;
  tarde: number;
  fecha: Cesium.JulianDate;
  lluvia: number;
  etiqueta: string;
}

/** Calcula la luz de una hora (h, 0–24) y un clima a partir de los tres ajustes del panel. */
export function luzDeHora(h: number, clima: Clima, dia: LookParams, tarde: LookParams, noche: LookParams): EstadoLuz {
  const e = elevacionSol(h);
  const wNoche = smooth(2, -7, e);           // de la puesta a noche cerrada
  const wDorada = smooth(26, 6, e) * (1 - wNoche); // hora dorada: sol bajo
  let look = mixLook(dia, tarde, wDorada);
  look = mixLook(look, noche, wNoche);
  // la mañana un poco más fresca que la tarde (como en Bogotá)
  if (h < NOON) look = { ...look, sunColor: mixHex(look.sunColor, '#fff1e2', 0.35 * (1 - wNoche)) };

  // clima
  const nub = clima === 'nublado' ? 1 : clima === 'lluvia' ? 1.35 : 0;
  if (nub) {
    const k = Math.min(1, nub);
    look = {
      ...look,
      sunIntensity: look.sunIntensity * (1 - 0.68 * k - (clima === 'lluvia' ? 0.12 : 0)),
      shadowDarkness: look.shadowDarkness * (1 - 0.6 * k),
      cloudDensity: Math.max(look.cloudDensity, clima === 'lluvia' ? 1 : 0.96),
      saturation: look.saturation * (1 - 0.22 * k),
      exposure: look.exposure * (1 - (clima === 'lluvia' ? 0.14 : 0.06)),
      contrast: look.contrast * (1 - 0.35 * k),
      skyZenith: mixHex(look.skyZenith, clima === 'lluvia' ? '#5d636a' : '#8a9097', 0.85 * (1 - wNoche)),
      skyHorizon: mixHex(look.skyHorizon, clima === 'lluvia' ? '#868c93' : '#b3b7bd', 0.85 * (1 - wNoche)),
      sunColor: mixHex(look.sunColor, '#dfe4ea', 0.6 * k),
      hazeAmount: look.hazeAmount + (clima === 'lluvia' ? 0.22 : 0.1),
      hazeStart: look.hazeStart * (clima === 'lluvia' ? 0.45 : 0.7),
      bloomBrightness: look.bloomBrightness - 0.2,
    };
  }
  const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
  const fecha = Cesium.JulianDate.fromIso8601(`${FECHA}T${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00-05:00`);
  return {
    look,
    night: wNoche,
    tarde: wDorada,
    fecha,
    lluvia: clima === 'lluvia' ? 1 : 0,
    etiqueta: `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`,
  };
}

/** Cortinas de lluvia en pantalla (post-proceso): vetas finas inclinadas que caen y oscurecen un poco. */
export function lluviaStage(): Cesium.PostProcessStage {
  return new Cesium.PostProcessStage({
    name: 'hlf_lluvia',
    uniforms: { uRain: 0, uTime: 0 },
    fragmentShader: `
      uniform sampler2D colorTexture;
      uniform float uRain;
      uniform float uTime;
      in vec2 v_textureCoordinates;
      float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
      float capa(vec2 uv, float esc, float vel, float sem) {
        vec2 p = uv * vec2(esc, esc * 0.18);
        p.x += p.y * 0.12;                      // viento
        p.y += uTime * vel;
        float col = floor(p.x);
        float r = h11(col + sem);
        float y = fract(p.y + r * 7.0);
        float gota = smoothstep(0.0, 0.05, y) * (1.0 - smoothstep(0.05, 0.42, y));
        float ancho = 1.0 - smoothstep(0.0, 0.07, abs(fract(p.x) - 0.5));
        return gota * ancho * step(0.55, r);
      }
      void main() {
        vec4 c = texture(colorTexture, v_textureCoordinates);
        if (uRain <= 0.0) { out_FragColor = c; return; }
        vec2 uv = v_textureCoordinates;
        float v = capa(uv, 220.0, 1.6, 1.0) * 0.55 + capa(uv, 140.0, 1.2, 9.0) * 0.4 + capa(uv, 90.0, 0.9, 17.0) * 0.3;
        vec3 col = c.rgb * mix(1.0, 0.86, uRain);
        col = mix(col, vec3(0.80, 0.84, 0.88), clamp(v * 0.45 * uRain, 0.0, 0.45));
        out_FragColor = vec4(col, c.a);
      }
    `,
  });
}

/** Barra de hora (con reproducción) y clima. */
export function crearPanelTiempo(opts: {
  hora: number;
  onHora: (h: number) => void;
  onClima: (c: Clima) => void;
  onPlay: (on: boolean) => void;
  onFiltro: (f: Filtro) => void;
}): { setHora(h: number, etiqueta: string): void; setPlay(on: boolean): void } {
  const st = document.createElement('style');
  st.textContent = `
    .tiempo { position: fixed; left: 50%; transform: translateX(-50%); bottom: 82px; z-index: 6; display: flex; align-items: center; gap: 10px;
      padding: 8px 12px; border-radius: 14px; background: rgba(12,16,22,.62); border: 1px solid rgba(255,255,255,.13);
      backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); color: #eef2f7;
      font: 500 12px ui-sans-serif,-apple-system,"Segoe UI",Inter,system-ui,sans-serif; width: auto; }
    .tiempo .lbl { color: rgba(238,242,247,.6); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; padding-left: 4px; }
    .tiempo button { all: unset; cursor: pointer; padding: 6px 10px; border-radius: 9px; color: rgba(238,242,247,.75); white-space: nowrap; }
    .tiempo button:hover { background: rgba(255,255,255,.08); color: #fff; }
    .tiempo button.on { background: #e8eef6; color: #0a0e14; font-weight: 600; }
    .tiempo .play { width: 26px; text-align: center; font-size: 13px; }
    .tiempo input[type=range] { flex: 1; min-width: 80px; accent-color: #f2c48a; }
    .tiempo .h { font-variant-numeric: tabular-nums; min-width: 40px; text-align: right; font-weight: 600; }
    .tiempo select { background: rgba(255,255,255,.08); color: #eef2f7; border: 1px solid rgba(255,255,255,.16); border-radius: 9px; padding: 5px 8px; font: inherit; }
    .tiempo select option { color: #111; }
    .tiempo .sep { width: 1px; height: 18px; background: rgba(255,255,255,.14); }
    @media (max-width: 720px) { .tiempo { bottom: 74px; flex-wrap: wrap; } }
  `;
  document.head.appendChild(st);
  const el = document.createElement('div');
  el.className = 'tiempo';
  // solo el selector de filtros (la hora queda fija y el clima soleado)
  el.innerHTML = `
    <span class="lbl">Filtro</span>
    <select aria-label="Filtro de imagen" title="Filtro de imagen">
      <option value="planos" selected>Planos finales</option>
      <option value="natural">Natural</option>
      <option value="calido">Cálido</option>
      <option value="claro">Render claro</option>
      <option value="cine">Cinematográfico</option>
      <option value="dramatico">Dramático</option>
      <option value="panel">Ajuste manual</option>
    </select>`;
  document.body.appendChild(el);
  const range = (el.querySelector('input') ?? document.createElement('input')) as HTMLInputElement;
  const lab = (el.querySelector('.h') ?? document.createElement('span')) as HTMLSpanElement;
  const play = (el.querySelector('.play') ?? document.createElement('button')) as HTMLButtonElement;
  const sel = el.querySelector('select') as HTMLSelectElement;
  sel.addEventListener('change', () => opts.onFiltro(sel.value as Filtro));
  range.value = String(opts.hora);
  range.addEventListener('input', () => opts.onHora(Number(range.value)));
  let playing = true;
  play.addEventListener('click', () => { playing = !playing; play.textContent = playing ? '❚❚' : '▶'; opts.onPlay(playing); });
  el.querySelectorAll<HTMLButtonElement>('[data-clima]').forEach((b) => b.addEventListener('click', () => {
    el.querySelectorAll('[data-clima]').forEach((x) => x.classList.toggle('on', x === b));
    opts.onClima(b.dataset.clima as Clima);
  }));
  return {
    setHora(h: number, etiqueta: string) { if (document.activeElement !== range) range.value = String(h); lab.textContent = etiqueta; },
    setPlay(on: boolean) { playing = on; play.textContent = on ? '❚❚' : '▶'; },
  };
}

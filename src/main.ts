import './cesium-base';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium';
import { ASSETS, PLACES, VIEWS } from './config';
import { ArchCamera } from './arch-camera';
import { loadSite, enuToWorld, siteMatrix, type Site, type Building } from './site';
import { createTrafico, type Trafico } from './vehiculos';
import { gradeStage, skyStage } from './shaders';
import { createLookStudio, hexToRgbNorm, type LookParams, type PresetId } from './look-studio';

/* ============================================================
   UNICENTRO · Hotel La Fontana · visor arquitectónico
   CesiumJS + 3D Tiles reales + edificaciones y vegetación del proyecto Unreal
   ============================================================ */

Cesium.Ion.defaultAccessToken = ASSETS.ionToken;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
const container = $('cesiumContainer')!;
const loadingEl = $('loading')!;
const loadBar = $('loadBar')!;
const loadLabel = $('loadLabel')!;
const loadPct = $('loadPct')!;

function progress(label: string, ratio: number): void {
  loadLabel.textContent = label;
  const p = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
  loadBar.style.width = p + '%';
  loadPct.textContent = p + '%';
}

/* ------------------------------------------------------------ espectador */

const viewer = new Cesium.Viewer(container, {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY,
  terrain: Cesium.Terrain.fromWorldTerrain({ requestWaterMask: false, requestVertexNormals: true }),
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(ASSETS.imageryAssetId), {}),
  contextOptions: {
    webgl: { alpha: false, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: false },
  },
  requestRenderMode: false,
  useBrowserRecommendedResolution: false,
});

const scene = viewer.scene;
scene.globe.enableLighting = true;
scene.globe.showGroundAtmosphere = true;
scene.globe.depthTestAgainstTerrain = true;
scene.globe.maximumScreenSpaceError = 2;
scene.fog.enabled = false;
scene.fog.density = 0.00018;
scene.fog.minimumBrightness = 0.04;
scene.highDynamicRange = true;
scene.msaaSamples = 4;
scene.postProcessStages.fxaa.enabled = true;
scene.screenSpaceCameraController.enableCollisionDetection = false;
scene.light = new Cesium.SunLight({ intensity: 3.0, color: Cesium.Color.fromCssColorString('#fff4e3') });

// sombras suaves de alta resolución estilo Unreal
const sm = viewer.shadowMap;
sm.softShadows = true;
sm.size = 4096;
sm.maximumDistance = 1200;
sm.darkness = 0.24;
sm.normalOffset = true;
// sesgo de profundidad ajustado: contacto firme en bases y sin rayado en muros/cubiertas
{
  const bias = sm as unknown as { _primitiveBias: { depthBias: number; normalOffsetScale: number; normalShadingSmooth: number }; _terrainBias: { depthBias: number } };
  bias._primitiveBias.depthBias = 0.0008;
  bias._primitiveBias.normalOffsetScale = 1.6;
  bias._primitiveBias.normalShadingSmooth = 0.35;
}

// oclusión ambiental: contacto en aleros, nichos y bases de edificios
const ao = scene.postProcessStages.ambientOcclusion;
ao.enabled = true;
ao.uniforms.intensity = 2.1;
ao.uniforms.bias = 0.08;
ao.uniforms.lengthCap = 0.35;
ao.uniforms.stepSize = 1.4;
ao.uniforms.blurStepSize = 1.0;

// bloom sutil en reflejos solares y ventanas nocturnas
const bloom = scene.postProcessStages.bloom;
bloom.enabled = true;
bloom.uniforms.glowOnly = false;
bloom.uniforms.contrast = 128;
bloom.uniforms.brightness = -0.36;
bloom.uniforms.delta = 1.0;
bloom.uniforms.sigma = 2.6;
bloom.uniforms.stepSize = 1.5;

// cielo andino con nubes animadas + etalonaje fílmico estilo Unreal
const smat = siteMatrix();
const axis = (col: number) => {
  const c = Cesium.Matrix4.getColumn(smat, col, new Cesium.Cartesian4());
  return new Cesium.Cartesian3(c.x, c.y, c.z);
};
const sky = skyStage(axis(0), axis(1), axis(2));
scene.postProcessStages.add(sky);
const grade = gradeStage();
scene.postProcessStages.add(grade);

(viewer.camera.frustum as Cesium.PerspectiveFrustum).fov = Cesium.Math.toRadians(48);

/* ------------------------------------------------------------ calidad adaptable */

// gráficas integradas: arranca en calidad media para que orbitar sea fluido
const glInfo = (() => { try { const gl = (scene as unknown as { context: { _gl: WebGL2RenderingContext } }).context._gl; const e = gl.getExtension("WEBGL_debug_renderer_info"); return e ? String(gl.getParameter(e.UNMASKED_RENDERER_WEBGL)) : ""; } catch { return ""; } })();
const integrated = /Intel|UHD|Iris|Mali|Adreno|Apple GPU|SwiftShader/i.test(glInfo) && !/Arc/i.test(glInfo);
let site: Site | null = null;
let quality = integrated || matchMedia("(pointer: coarse)").matches ? 0.5 : 1;
function applyQuality(): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  viewer.resolutionScale = dpr * (quality >= 1 ? 1 : quality >= 0.5 ? 0.8 : 0.62);
  sm.size = quality >= 1 ? 4096 : quality >= 0.5 ? 2048 : 1024;
  sm.softShadows = quality >= 0.5;
  ao.enabled = quality >= 1;
  bloom.enabled = quality >= 0.5;
  scene.msaaSamples = quality >= 1 ? 4 : 1;
  viewer.shadows = quality >= 0.5;
  if (site?.tileset) site.tileset.maximumScreenSpaceError = quality >= 1 ? 8 : quality >= 0.5 ? 12 : 20;
}
applyQuality();

viewer.clock.shouldAnimate = false;
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2026-06-21T10:10:00-05:00');

const cam = new ArchCamera(viewer);
const placeWorld = (key: keyof typeof PLACES) => enuToWorld(PLACES[key].e, PLACES[key].n, PLACES[key].u);
const homePivot = placeWorld('hotel');
cam.flyTo({ pivot: homePivot, heading: VIEWS.general.heading, pitch: VIEWS.general.pitch, range: VIEWS.general.range * 1.8 }, 0);
cam.groundHeight = (c) => scene.globe.getHeight(c);

/* ------------------------------------------------------------ luz / hora */

interface LightingPreset { id: string; iso: string; night: number; tarde: number; fog: number; label: string; sun: number; color: string }
const PRESETS: LightingPreset[] = [
  { id: 'dia', iso: '2026-06-21T10:10:00-05:00', night: 0, tarde: 0, fog: 0.00018, label: '10:10', sun: 5.85, color: '#dad1c3' },
  { id: 'tarde', iso: '2026-06-21T16:50:00-05:00', night: 0.04, tarde: 1, fog: 0.00022, label: '16:50', sun: 2.8, color: '#ffe3c4' },
  { id: 'noche', iso: '2026-06-21T19:35:00-05:00', night: 1, tarde: 0, fog: 0.00022, label: '19:35', sun: 0.65, color: '#6b8fd4' },
];

let currentNight = 0;
let currentTarde = 0;
let clockTween: { from: number; to: number; start: number; dur: number } | null = null;
const clockMs = (iso: string) => Cesium.JulianDate.toDate(Cesium.JulianDate.fromIso8601(iso)).getTime();

function applyLook(p: LookParams): void {
  (scene.light as Cesium.SunLight).intensity = p.sunIntensity;
  (scene.light as Cesium.SunLight).color = Cesium.Color.fromCssColorString(p.sunColor);
  sm.darkness = p.shadowDarkness;
  ao.uniforms.intensity = p.aoIntensity;
  bloom.uniforms.brightness = p.bloomBrightness;
  grade.uniforms.uExposure = p.exposure;
  grade.uniforms.uContrast = p.contrast;
  grade.uniforms.uSaturation = p.saturation;
  const [tr, tg, tb] = hexToRgbNorm(p.tintColor);
  grade.uniforms.uTint = new Cesium.Cartesian3(tr, tg, tb);
  grade.uniforms.uVignette = p.vignette;
  const [zr, zg, zb] = hexToRgbNorm(p.skyZenith);
  sky.uniforms.uSkyZenith = new Cesium.Cartesian3(zr, zg, zb);
  const [hr, hg, hb] = hexToRgbNorm(p.skyHorizon);
  sky.uniforms.uSkyHorizon = new Cesium.Cartesian3(hr, hg, hb);
  sky.uniforms.uCloudDensity = p.cloudDensity;
  sky.uniforms.uCloudSpeed = p.cloudSpeed;
  site?.setLook({ skyFill: p.skyFill, groundFill: p.groundFill, hazeAmount: p.hazeAmount, hazeStart: p.hazeStart });
}

const lookStudio = createLookStudio((_id, params) => applyLook(params));
applyLook(lookStudio.getPreset('dia'));

function applyPreset(p: LightingPreset): void {
  const from = Cesium.JulianDate.toDate(viewer.clock.currentTime).getTime();
  clockTween = { from, to: clockMs(p.iso), start: performance.now(), dur: 1600 };
  scene.fog.density = p.fog;
  lookStudio.setActivePreset(p.id as PresetId);
  applyLook(lookStudio.getPreset(p.id as PresetId));
  // el cielo acompaña la hora: tarde limpia de montaña en Bogotá, profundo de noche
  if (scene.skyAtmosphere) {
    scene.skyAtmosphere.hueShift = 0;
    scene.skyAtmosphere.saturationShift = p.id === 'tarde' ? 0.08 : p.id === 'noche' ? -0.25 : 0.06;
    scene.skyAtmosphere.brightnessShift = p.id === 'noche' ? -0.55 : p.id === 'tarde' ? -0.04 : 0;
  }
  const fromN = currentNight;
  const fromT = currentTarde;
  const start = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - start) / 1400);
    const e = t * t * (3 - 2 * t);
    currentNight = fromN + (p.night - fromN) * e;
    currentTarde = fromT + (p.tarde - fromT) * e;
    site?.setNight(currentNight);
    site?.setTarde(currentTarde);
    sky.uniforms.uNight = currentNight;
    sky.uniforms.uTarde = currentTarde;
    grade.uniforms.uNight = currentNight;
    grade.uniforms.uTarde = currentTarde;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach((b) => b.classList.toggle('on', b.dataset.light === p.id));
  const clockEl = $('clockLabel');
  if (clockEl) clockEl.textContent = p.label;
}
document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = PRESETS.find((x) => x.id === btn.dataset.light);
    if (p) applyPreset(p);
  });
});

/* ------------------------------------------------------------ vistas */

let autoOrbit = false;
const btnOrbit = $<HTMLButtonElement>('btnOrbit');
const btnPed = $<HTMLButtonElement>('btnPedestrian');
function stopOrbit(): void {
  autoOrbit = false;
  btnOrbit?.classList.remove('on');
}

function setView(key: keyof typeof VIEWS, dur = 2.0): void {
  stopOrbit();
  const v = VIEWS[key];
  cam.flyTo({ pivot: placeWorld(v.place as keyof typeof PLACES), heading: v.heading, pitch: v.pitch, range: v.range }, dur);
}

$('btnHome')?.addEventListener('click', () => setView('general', 2.2));
$('btnAerial')?.addEventListener('click', () => setView('aerial'));
$('btnArch')?.addEventListener('click', () => setView('arch'));
btnPed?.addEventListener('click', () => {
  stopOrbit();
  if (cam.isWalking) cam.exitWalk();
  else cam.enterWalk(selected ? buildingDoor(selected) : undefined);
});
cam.onModeChange = (walking) => {
  btnPed?.classList.toggle('on', walking);
  const hint = $('hint');
  if (hint && walking) {
    hint.textContent = 'Peatonal: arrastra para mirar · WASD o flechas para caminar · Shift para correr · Doble clic para ir a un punto';
    hint.classList.remove('fade');
    setTimeout(() => hint.classList.add('fade'), 7000);
  }
};
document.querySelectorAll<HTMLButtonElement>('[data-place]').forEach((btn) => {
  btn.addEventListener('click', () => {
    stopOrbit();
    const key = btn.dataset.place as keyof typeof PLACES;
    cam.flyTo({ pivot: placeWorld(key), range: key === 'hotel' ? 300 : 520, pitch: -0.5 }, 2.0);
  });
});
btnOrbit?.addEventListener('click', () => {
  autoOrbit = !autoOrbit;
  btnOrbit.classList.toggle('on', autoOrbit);
  if (autoOrbit && cam.isWalking) cam.exitWalk();
});
container.addEventListener('pointerdown', stopOrbit);
container.addEventListener('wheel', stopOrbit, { passive: true });
addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    if (cam.isWalking) cam.exitWalk();
    else select(null);
  }
  if (e.code === 'KeyH' || e.code === 'Home') setView('general', 2.2);
  if (e.code === 'KeyP') btnPed?.click();
});

/* ------------------------------------------------------------ selección */

let selected: Building | null = null;
let trafico: Trafico | null = null;

/* Hotel La Fontana: al seleccionarlo se arma piso por piso */
const HOTEL_PISOS = 9;
let hotelAnim: { start: number } | null = null;
function playHotel(): void {
  if (!site) return;
  hotelAnim = { start: performance.now() };
  site.setHotelFloors(0);
}
let highlight: Cesium.Entity | null = null;
const card = $('card');

function buildingCenter(b: Building): Cesium.Cartesian3 {
  return enuToWorld((b.bb[0] + b.bb[2]) / 2, (b.bb[1] + b.bb[3]) / 2, b.b + b.h * 0.5);
}
/** Un punto en la calle junto al edificio, para bajar a pie. */
function buildingDoor(b: Building): Cesium.Cartesian3 {
  return enuToWorld((b.bb[0] + b.bb[2]) / 2, b.bb[1] - 9, b.b);
}

function select(b: Building | null): void {
  const wasHotel = selected?.s === 'Hotel';
  selected = b;
  if (highlight) { viewer.entities.remove(highlight); highlight = null; }
  if (!b || !site) { if (card) card.hidden = true; return; }

  const pos = b.r.map(([e, n]) => enuToWorld(e, n, 0, site!.matrix));
  const hBase = 2572 + b.b - 0.5;
  highlight = viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(pos),
      height: hBase,
      extrudedHeight: hBase + b.h + 2.2,
      material: Cesium.Color.fromCssColorString('#9dc4ea').withAlpha(0.2),
      outline: true,
      outlineColor: Cesium.Color.fromCssColorString('#d7ebff'),
      shadows: Cesium.ShadowMode.DISABLED,
    },
  });

  const hotel = b.s === 'Hotel';
  if (hotel && !wasHotel) {
    playHotel();
    stopOrbit();
    cam.flyTo({ pivot: placeWorld('hotel'), pitch: -0.38, range: 290 }, 1.8);
  }
  const piezas = hotel && site ? site.buildings.filter((x) => x.s === 'Hotel') : [b];
  const areaDe = (x: Building) => Math.abs(x.r.reduce((s, p, i) => { const q = x.r[(i + 1) % x.r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
  const huella = piezas.reduce((s, x) => s + areaDe(x), 0);
  const construida = piezas.reduce((s, x) => s + areaDe(x) * x.p, 0);
  const pisosMax = Math.max(...piezas.map((x) => x.p));
  const altoMax = Math.max(...piezas.map((x) => x.h));
  const area = Math.abs(b.r.reduce((s, p, i) => { const q = b.r[(i + 1) % b.r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
  $('cardKind')!.textContent = hotel ? 'Proyecto' : `Sector ${b.s}`;
  $('cardTitle')!.textContent = hotel ? 'Hotel La Fontana' : `Edificación ${b.id + 1}`;
  $('cardData')!.innerHTML =
    `<dt>Pisos</dt><dd>${hotel ? 'hasta ' + pisosMax : b.p}</dd>` +
    `<dt>Altura</dt><dd>${altoMax.toFixed(1)} m</dd>` +
    `<dt>Huella</dt><dd>${Math.round(huella).toLocaleString('es-CO')} m²</dd>` +
    `<dt>Área aprox.</dt><dd>${Math.round(construida).toLocaleString('es-CO')} m²</dd>`;
  void area;
  if (card) card.hidden = false;
}

cam.onPick = (world) => {
  if (!site) return;
  select(world ? site.buildingAt(world) : null);
};
$('cardClose')?.addEventListener('click', () => select(null));
$('cardFocus')?.addEventListener('click', () => {
  if (!selected) return;
  stopOrbit();
  const size = Math.max(selected.bb[2] - selected.bb[0], selected.bb[3] - selected.bb[1], selected.h);
  cam.flyTo({ pivot: buildingCenter(selected), pitch: -0.42, range: Math.max(60, size * 2.1) }, 1.7);
});
$('cardWalk')?.addEventListener('click', () => {
  if (!selected) return;
  stopOrbit();
  cam.enterWalk(buildingDoor(selected));
});

/* ------------------------------------------------------------ carga */

const statusEl = $('status');
const statusText = $('statusText');

async function boot(): Promise<void> {
  progress('Contexto geográfico', 0.04);
  await new Promise((r) => setTimeout(r, 30));

  site = await loadSite(
    viewer,
    (label, ratio) => progress(label, ratio),
    (loaded, total, label) => {
      if (!statusEl || !statusText) return;
      statusEl.hidden = false;
      statusText.textContent = loaded < total ? `Cargando secciones ${loaded}/${total} · ${label}` : `Modelo completo · ${total} secciones`;
      if (loaded >= total) setTimeout(() => statusEl.classList.add('fade'), 2600);
    },
  );
  site.setNight(currentNight);
  site.setTarde(currentTarde);
  const activeId = (document.querySelector<HTMLButtonElement>('[data-light].on')?.dataset.light as PresetId) || 'dia';
  applyLook(lookStudio.getPreset(activeId));
  applyQuality();
  progress('Listo', 1);

  setView('general', 2.4);
  loadingEl.classList.add('done');
  setTimeout(() => loadingEl.remove(), 900);
  const hint = $('hint');
  if (hint) setTimeout(() => hint.classList.add('fade'), 9000);
  (window as unknown as { __READY__?: boolean }).__READY__ = true;
  site.done.then(async () => {
    trafico = await createTrafico(viewer, site!.matrix);
    (window as unknown as { __ALL__?: boolean }).__ALL__ = true;
  });
}

const stats = { fps: 0, frames: 0, t0: performance.now(), low: 0 };
(window as unknown as { __DBG__?: unknown }).__DBG__ = {
  Cesium, viewer, cam, getSite: () => site, enuToWorld, select, stats, playHotel, getTrafico: () => trafico,
  setQuality: (q: number) => { quality = q; applyQuality(); },
};

boot().catch((err: unknown) => {
  console.error(err);
  loadLabel.textContent = 'No se pudo cargar la escena';
  (window as unknown as { __LOAD_ERROR__?: string }).__LOAD_ERROR__ = String((err as Error)?.message ?? err);
});

/* ------------------------------------------------------------ bucle */

let last = performance.now();
let settledAt = 0;
function tick(): void {
  const now = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;

  if (clockTween) {
    const t = Math.min(1, (now - clockTween.start) / clockTween.dur);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(clockTween.from + (clockTween.to - clockTween.from) * e));
    if (t >= 1) clockTween = null;
  }

  if (hotelAnim && site) {
    // 0,55 s por piso; cada piso entra con un pequeño rebote
    const t = (now - hotelAnim.start) / 550;
    const piso = Math.floor(t);
    const k = t - piso;
    const e = 1 - Math.pow(1 - Math.min(1, k * 1.6), 3);
    if (piso >= HOTEL_PISOS) { site.setHotelFloors(99); hotelAnim = null; }
    else site.setHotelFloors(piso + e);
  }
  trafico?.update(dt);
  const tSec = now * 0.001;
  site?.setTime(tSec);
  sky.uniforms.uTime = tSec;

  if (autoOrbit && !cam.isWalking) cam.flyTo({ heading: cam.state.heading + 0.16 * dt }, 0);
  cam.update(dt);

  // rendimiento: si el equipo no da, baja resolución, sombras y oclusión por pasos
  stats.frames++;
  if (now - stats.t0 >= 2000) {
    stats.fps = Math.round((stats.frames * 1000) / (now - stats.t0));
    stats.frames = 0;
    stats.t0 = now;
    (window as unknown as { __FPS__?: number }).__FPS__ = stats.fps;
    // solo se evalúa con todo cargado: las pausas de la carga no cuentan como equipo lento
    const settled = !!site && site.sections.loaded >= site.sections.total && now - settledAt > 8000;
    if (site && site.sections.loaded >= site.sections.total && !settledAt) settledAt = now;
    if (settled && document.visibilityState === 'visible') {
      if (stats.fps < 20 && quality > 0.25 && !(window as unknown as { __DBG__: { lock?: boolean } }).__DBG__.lock) {
        if (++stats.low >= 3) { quality = quality >= 1 ? 0.5 : 0.25; stats.low = 0; applyQuality(); }
      } else stats.low = 0;
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

addEventListener('resize', applyQuality);

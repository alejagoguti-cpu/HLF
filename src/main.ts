import './cesium-base';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium';
import { ASSETS, PLACES, VIEWS } from './config';
import { ArchCamera } from './arch-camera';
import { loadSite, enuToWorld, type Site, type Building } from './site';

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
scene.fog.enabled = true;
scene.fog.density = 0.00018;
scene.fog.minimumBrightness = 0.04;
scene.highDynamicRange = true;
scene.msaaSamples = 4;
scene.postProcessStages.fxaa.enabled = true;
scene.screenSpaceCameraController.enableCollisionDetection = false;
scene.light = new Cesium.SunLight({ intensity: 2.3 });

// sombras suaves concentradas en la zona que se mira
const sm = viewer.shadowMap;
sm.softShadows = true;
sm.size = 2048;
sm.maximumDistance = 900;
sm.darkness = 0.42;
sm.normalOffset = true;

// oclusión ambiental: da peso a aleros, ventanas y copas
const ao = scene.postProcessStages.ambientOcclusion;
ao.enabled = true;
ao.uniforms.intensity = 1.6;
ao.uniforms.bias = 0.12;
ao.uniforms.lengthCap = 0.28;
ao.uniforms.stepSize = 1.6;
ao.uniforms.blurStepSize = 0.9;

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
  sm.size = quality >= 1 ? 2048 : 1024;
  sm.softShadows = quality >= 0.5;
  ao.enabled = quality >= 1;
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

interface LightingPreset { id: string; iso: string; night: number; fog: number; label: string; sun: number }
const PRESETS: LightingPreset[] = [
  { id: 'dia', iso: '2026-06-21T10:10:00-05:00', night: 0, fog: 0.00022, label: '10:10', sun: 2.3 },
  { id: 'tarde', iso: '2026-06-21T16:50:00-05:00', night: 0.1, fog: 0.0003, label: '16:50', sun: 2.1 },
  { id: 'noche', iso: '2026-06-21T19:35:00-05:00', night: 1, fog: 0.0002, label: '19:35', sun: 1.0 },
];

let currentNight = 0;
let clockTween: { from: number; to: number; start: number; dur: number } | null = null;
const clockMs = (iso: string) => Cesium.JulianDate.toDate(Cesium.JulianDate.fromIso8601(iso)).getTime();

function applyPreset(p: LightingPreset): void {
  const from = Cesium.JulianDate.toDate(viewer.clock.currentTime).getTime();
  clockTween = { from, to: clockMs(p.iso), start: performance.now(), dur: 1600 };
  scene.fog.density = p.fog;
  (scene.light as Cesium.SunLight).intensity = p.sun;
  const fromN = currentNight;
  const start = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - start) / 1400);
    currentNight = fromN + (p.night - fromN) * (t * t * (3 - 2 * t));
    site?.setNight(currentNight);
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
  const area = Math.abs(b.r.reduce((s, p, i) => { const q = b.r[(i + 1) % b.r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
  $('cardKind')!.textContent = hotel ? 'Proyecto' : `Sector ${b.s}`;
  $('cardTitle')!.textContent = hotel ? 'Hotel La Fontana' : `Edificación ${b.id + 1}`;
  $('cardData')!.innerHTML =
    `<dt>Pisos</dt><dd>${b.p}</dd>` +
    `<dt>Altura</dt><dd>${b.h.toFixed(1)} m</dd>` +
    `<dt>Huella</dt><dd>${Math.round(area).toLocaleString('es-CO')} m²</dd>` +
    `<dt>Área aprox.</dt><dd>${Math.round(area * b.p).toLocaleString('es-CO')} m²</dd>`;
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
  applyQuality();
  progress('Listo', 1);

  setView('general', 2.4);
  loadingEl.classList.add('done');
  setTimeout(() => loadingEl.remove(), 900);
  const hint = $('hint');
  if (hint) setTimeout(() => hint.classList.add('fade'), 9000);
  (window as unknown as { __READY__?: boolean }).__READY__ = true;
  site.done.then(() => { (window as unknown as { __ALL__?: boolean }).__ALL__ = true; });
}

const stats = { fps: 0, frames: 0, t0: performance.now(), low: 0 };
(window as unknown as { __DBG__?: unknown }).__DBG__ = {
  Cesium, viewer, cam, getSite: () => site, enuToWorld, select, stats,
  setQuality: (q: number) => { quality = q; applyQuality(); },
};

boot().catch((err: unknown) => {
  console.error(err);
  loadLabel.textContent = 'No se pudo cargar la escena';
  (window as unknown as { __LOAD_ERROR__?: string }).__LOAD_ERROR__ = String((err as Error)?.message ?? err);
});

/* ------------------------------------------------------------ bucle */

let last = performance.now();
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

  if (autoOrbit && !cam.isWalking) cam.flyTo({ heading: cam.state.heading + 0.16 * dt }, 0);
  cam.update(dt);

  // rendimiento: si el equipo no da, baja resolución, sombras y oclusión por pasos
  stats.frames++;
  if (now - stats.t0 >= 2000) {
    stats.fps = Math.round((stats.frames * 1000) / (now - stats.t0));
    stats.frames = 0;
    stats.t0 = now;
    (window as unknown as { __FPS__?: number }).__FPS__ = stats.fps;
    if (site && document.visibilityState === 'visible') {
      if (stats.fps < 20 && quality > 0.25 && !(window as unknown as { __DBG__: { lock?: boolean } }).__DBG__.lock) {
        if (++stats.low >= 2) { quality = quality >= 1 ? 0.5 : 0.25; stats.low = 0; applyQuality(); }
      } else stats.low = 0;
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

addEventListener('resize', applyQuality);

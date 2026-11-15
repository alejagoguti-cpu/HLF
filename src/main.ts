import './cesium-base';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium';
import { SITE, ASSETS } from './config';
import { ArchCamera } from './arch-camera';
import { loadSite, type Site } from './site';

/* ============================================================
   UNICENTRO · Bogotá · visor arquitectónico
   CesiumJS + 3D Tiles reales + arquitectura glTF
   ============================================================ */

Cesium.Ion.defaultAccessToken = ASSETS.ionToken;

const container = document.getElementById('cesiumContainer')!;
const loadingEl = document.getElementById('loading')!;
const loadBar = document.getElementById('loadBar')!;
const loadLabel = document.getElementById('loadLabel')!;
const loadPct = document.getElementById('loadPct')!;

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
  terrain: Cesium.Terrain.fromWorldTerrain({
    requestWaterMask: false,
    requestVertexNormals: true,
  }),
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(2),
    {},
  ),
  contextOptions: {
    webgl: {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    },
  },
  requestRenderMode: false,
  useBrowserRecommendedResolution: false,
});

const scene = viewer.scene;
scene.globe.enableLighting = true;
scene.globe.showGroundAtmosphere = true;
scene.globe.depthTestAgainstTerrain = true;
scene.fog.enabled = true;
scene.fog.density = 0.00028;
scene.fog.minimumBrightness = 0.04;
scene.highDynamicRange = true;
scene.msaaSamples = 4;
scene.postProcessStages.fxaa.enabled = true;
scene.screenSpaceCameraController.enableCollisionDetection = false;

(viewer.camera.frustum as Cesium.PerspectiveFrustum).fov = Cesium.Math.toRadians(48);
viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, 2);

viewer.clock.shouldAnimate = false;
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601('2026-06-21T09:40:00-05:00');

const cam = new ArchCamera(viewer);
const homePivot = Cesium.Cartesian3.fromDegrees(SITE.longitude, SITE.latitude, SITE.height + 12);
cam.setPivot(homePivot, false);

/* ------------------------------------------------------------ luz / hora */

interface LightingPreset {
  id: string;
  label: string;
  iso: string;
  night: number;
  fog: number;
  exposureLabel: string;
}

const PRESETS: LightingPreset[] = [
  { id: 'dia', label: 'Día', iso: '2026-06-21T10:10:00-05:00', night: 0, fog: 0.00026, exposureLabel: '10:10' },
  { id: 'tarde', label: 'Tarde', iso: '2026-06-21T16:35:00-05:00', night: 0.12, fog: 0.00034, exposureLabel: '16:35' },
  { id: 'noche', label: 'Noche', iso: '2026-06-21T19:35:00-05:00', night: 1, fog: 0.00022, exposureLabel: '19:35' },
];

let site: Site | null = null;
let currentNight = 0;
let clockTween: { from: number; to: number; start: number; dur: number } | null = null;

const clockMs = (iso: string) => Cesium.JulianDate.toDate(Cesium.JulianDate.fromIso8601(iso)).getTime();

function applyPreset(p: LightingPreset): void {
  const from = Cesium.JulianDate.toDate(viewer.clock.currentTime).getTime();
  clockTween = { from, to: clockMs(p.iso), start: performance.now(), dur: 1600 };

  scene.fog.density = p.fog;
  animateNight(p.night);

  document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach((b) => {
    b.classList.toggle('on', b.dataset.light === p.id);
  });
  const clockEl = document.getElementById('clockLabel');
  if (clockEl) clockEl.textContent = p.exposureLabel;
}

function animateNight(to: number): void {
  const from = currentNight;
  const start = performance.now();
  const step = () => {
    const t = Math.min(1, (performance.now() - start) / 1400);
    const e = t * t * (3 - 2 * t);
    currentNight = from + (to - from) * e;
    site?.setNight(currentNight);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ------------------------------------------------------------ cámara */

const viewState = {
  aerial: { ...SITE.views.aerial },
  pedestrian: { ...SITE.views.pedestrian },
  general: { ...SITE.views.general },
};

function setView(key: keyof typeof viewState, pivot?: Cesium.Cartesian3): void {
  const v = viewState[key];
  cam.flyTo(
    {
      pivot: pivot ?? homePivot,
      heading: v.heading,
      pitch: v.pitch,
      range: v.range,
    },
    key === 'general' ? 2.2 : 1.9,
  );
}

document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = PRESETS.find((x) => x.id === btn.dataset.light);
    if (p) applyPreset(p);
  });
});

document.getElementById('btnAerial')?.addEventListener('click', () => setView('aerial'));
document.getElementById('btnPedestrian')?.addEventListener('click', () => setView('pedestrian'));
document.getElementById('btnHome')?.addEventListener('click', () => setView('general'));

/* ------------------------------------------------------------ carga */

async function boot(): Promise<void> {
  progress('Contexto geográfico', 0.06);
  await new Promise((r) => setTimeout(r, 30));

  site = await loadSite(viewer, (label, ratio) => progress(label, ratio));
  progress('Listo', 1);

  // encuadre inicial: aéreo mirando a los Cerros Orientales
  cam.flyTo(
    {
      pivot: homePivot,
      heading: SITE.views.general.heading,
      pitch: SITE.views.general.pitch,
      range: SITE.views.general.range * 2.1,
    },
    0.01,
  );
  await new Promise((r) => setTimeout(r, 120));
  setView('general');

  loadingEl.classList.add('done');
  setTimeout(() => loadingEl.remove(), 900);
  (window as unknown as { __READY__?: boolean }).__READY__ = true;
}

boot().catch((err: unknown) => {
  console.error(err);
  loadLabel.textContent = 'No se pudo cargar la escena';
  (window as unknown as { __LOAD_ERROR__?: string }).__LOAD_ERROR__ = String(
    (err as Error)?.message ?? err,
  );
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
    const ms = clockTween.from + (clockTween.to - clockTween.from) * e;
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date(ms));
    if (t >= 1) clockTween = null;
  }

  cam.update(dt);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ------------------------------------------------------------ utilidades */

addEventListener('resize', () => {
  viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, 2);
});

const hintEl = document.getElementById('hint');
document.querySelectorAll<HTMLButtonElement>('[data-light]').forEach(() => {
  if (hintEl) setTimeout(() => hintEl.classList.add('fade'), 6000);
});

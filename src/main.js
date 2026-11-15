import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { buildTextures, applySurface } from './textures.js';
import { buildMountains, buildCity, buildGround, buildStreetLights } from './city.js';
import { Forest } from './trees.js';

/* ============================================================
   UNICENTRO · Bogotá · visor 3D
   ============================================================ */

const canvas = document.getElementById('scene');
const bar = document.getElementById('bar');
const pct = document.getElementById('pct');
const loaderEl = document.getElementById('loader');
const statsEl = document.getElementById('stats');
const hudTitle = document.getElementById('sun-label');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xc9d8e6, 0.000165);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.6, 40000);
camera.position.set(880, 640, 1180);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.screenSpacePanning = true;
controls.maxPolarAngle = Math.PI * 0.497;
controls.minDistance = 12;
controls.maxDistance = 9000;
controls.target.set(0, 20, -60);

/* ---------- cielo ---------- */
const sky = new Sky();
sky.scale.setScalar(600000);
scene.add(sky);
const skyU = sky.material.uniforms;
skyU.turbidity.value = 5.2;
skyU.rayleigh.value = 1.4;
skyU.mieCoefficient.value = 0.005;
skyU.mieDirectionalG.value = 0.83;

const sun = new THREE.DirectionalLight(0xfff2dc, 3.0);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.9;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 3000;
scene.add(sun, sun.target);

const hemi = new THREE.HemisphereLight(0xc3d8ef, 0x6a6152, 1.15);
scene.add(hemi);

/* estrellas (noche) */
const starGeo = new THREE.BufferGeometry();
{
  const N = 2600, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const u = Math.random(), v = Math.random() * 0.55 + 0.02;
    const theta = u * Math.PI * 2, phi = Math.acos(1 - v);
    const r = 24000;
    pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    pos[i * 3 + 1] = Math.cos(phi) * r;
    pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
}
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xdfe9ff, size: 26, sizeAttenuation: true, transparent: true, opacity: 0.9, depthWrite: false, fog: false }));
stars.visible = false;
scene.add(stars);

/* ---------- entorno (IBL) ---------- */
const pmrem = new THREE.PMREMGenerator(renderer);
let envRT = null;
function updateEnv() {
  try {
    if (envRT) envRT.dispose();
    const s = new THREE.Scene();
    if (sky.visible) s.add(sky.clone());
    else {
      s.background = new THREE.Color(0x101a2c);
      const l = new THREE.DirectionalLight(0x88a8ff, 0.5); l.position.set(-200, 300, -400); s.add(l);
    }
    envRT = pmrem.fromScene(s, 0, 1, 100000);
    scene.environment = envRT.texture;
  } catch (e) { console.warn('env', e); }
}

/* ---------- post ---------- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.14, 0.9, 0.94);
composer.addPass(bloom);
const grade = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null }, contrast: { value: 1.045 }, saturation: { value: 1.06 },
    lift: { value: 0.004 }, vignette: { value: 0.26 }, warmth: { value: 0.02 },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float contrast, saturation, lift, vignette, warmth; varying vec2 vUv;
    void main(){
      vec4 t = texture2D(tDiffuse, vUv);
      vec3 c = t.rgb;
      c = (c - 0.5) * contrast + 0.5 + lift;
      c *= vec3(1.0 + warmth, 1.0, 1.0 - warmth * 0.7);
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c = mix(vec3(l), c, saturation);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.92, 0.32, length(d));
      c *= mix(1.0, v, vignette);
      gl_FragColor = vec4(c, t.a);
    }`,
});
composer.addPass(grade);
composer.addPass(new OutputPass());

/* ---------- texturas ---------- */
const lib = buildTextures(renderer);

/* ---------- mundo ---------- */
const worldGroup = new THREE.Group();
worldGroup.rotation.x = -Math.PI / 2;   // modelo en Z-up
scene.add(worldGroup);

const ground = buildGround(lib);
scene.add(ground);

const city = buildCity(lib, { extent: 7200, skip: { x: 1010, z: 950 } });
scene.add(city);

const mountains = buildMountains(9000);
mountains.position.y = -40;
scene.add(mountains);

const streetLights = buildStreetLights(280, 1300);
scene.add(streetLights);

/* ---------- materiales del modelo ---------- */
const SURFACES = {
  MI_Terreno: ['grass', { repeat: 1, color: 0x93a072, roughness: 0.95 }],
  MI_Vias: ['asphalt', { repeat: 1, color: 0xb9b9b9, roughness: 0.92 }],
  MI_Andenes: ['sidewalk', { repeat: 1, color: 0xffffff, roughness: 0.9 }],
  MI_Ciclorrutas: ['asphaltRed', { repeat: 1, color: 0xffffff, roughness: 0.92 }],
  MI_Separadores: ['grass', { repeat: 3, color: 0x8fa06b, roughness: 0.95 }],
  M_Fachada: ['facade', { repeat: 1, roughness: 0.86 }],
  M_UNICENTRO_Fachada_Tipologia: ['facadeCool', { repeat: 1, roughness: 0.82 }],
  M_Cubierta_GrisClaro: ['concrete', { repeat: 4, color: 0xd6d4cd, roughness: 0.93 }],
  MI_Teja_Hotel: ['roof', { repeat: 6, color: 0xffffff, roughness: 0.82 }],
  MI_Alero_Hotel: ['concrete', { repeat: 3, color: 0xe8e4da, roughness: 0.9 }],
  MI_Puentes: ['concrete', { repeat: 2, color: 0xcfcec7, roughness: 0.9 }],
  MI_Canal_Muros: ['concreteDark', { repeat: 2, color: 0xb6b3a9, roughness: 0.93 }],
  MI_Canal_Fondo: ['concreteDark', { repeat: 2, color: 0x9d9a92, roughness: 0.95 }],
  M_UNICENTRO_Agua: ['water', {}],
};

const facades = [];   // materiales con luces de ventana

function setupMaterial(mat, meshName) {
  const name = mat.name || '';
  if (name === 'WorldGridMaterial') {
    // el hotel (Revit) reutiliza un material genérico
    if (/Vidrios/i.test(meshName)) {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0x8fb3c9, roughness: 0.08, metalness: 0.1, transmission: 0.0,
        transparent: true, opacity: 0.55, envMapIntensity: 1.4, side: THREE.DoubleSide,
      });
      return m;
    }
    if (/Barandas/i.test(meshName)) {
      return new THREE.MeshStandardMaterial({ color: 0x8e8b84, roughness: 0.42, metalness: 0.75, envMapIntensity: 1.1 });
    }
    return applySurface(new THREE.MeshStandardMaterial({ color: 0xf1ece1 }), lib.facade, { repeat: 6, roughness: 0.88 });
  }

  if (/Agua/i.test(name)) {
    return new THREE.MeshPhysicalMaterial({
      color: 0x22414f, roughness: 0.06, metalness: 0.35, transparent: true, opacity: 0.86,
      envMapIntensity: 1.5,
    });
  }

  if (/hojas|leaves|agujas|island_tree_0[13]$/i.test(name)) {
    const m = mat.clone();
    m.color = new THREE.Color(name.includes('agujas') ? 0x2f4a33 : 0x3d6b30);
    m.roughness = 0.9; m.metalness = 0; m.side = THREE.DoubleSide;
    m.envMapIntensity = 0.45;
    return m;
  }
  if (/tronco|ramas|branch|tree_small_02_branches/i.test(name)) {
    mat.roughness = 0.95; mat.metalness = 0; mat.side = THREE.DoubleSide;
    mat.envMapIntensity = 0.4;
    return mat;
  }

  const key = Object.keys(SURFACES).find((k) => name.startsWith(k));
  if (key) {
    const [setName, opts] = SURFACES[key];
    const set = lib[setName];
    const m = mat.clone();
    applySurface(m, set, opts);
    if (set && set.emissiveMap) facades.push(m);
    return m;
  }

  // resto: aspecto neutro de concreto
  const m = mat.clone();
  applySurface(m, lib.concrete, { repeat: 2, roughness: 0.9, color: 0xd8d4c9 });
  return m;
}

/* ---------- presets de luz ---------- */
const PRESETS = [
  {
    id: 'dia', label: 'Día',
    elev: 54, azim: 152, exposure: 0.95, turb: 5.0, rayleigh: 1.5,
    fog: 0xc9d8e6, fogD: 0.000165, sunI: 3.0, sunC: 0xfff3de, hemiI: 1.15,
    hemiSky: 0xc3d8ef, hemiGround: 0x6a6152, bloom: 0.12, night: false,
  },
  {
    id: 'tarde', label: 'Tarde',
    elev: 26, azim: 214, exposure: 1.02, turb: 7.5, rayleigh: 1.9,
    fog: 0xd9c8b2, fogD: 0.000175, sunI: 2.7, sunC: 0xffd9a8, hemiI: 0.85,
    hemiSky: 0xcfd0e0, hemiGround: 0x6b5c48, bloom: 0.18, night: false,
  },
  {
    id: 'noche', label: 'Noche',
    elev: 38, azim: 300, exposure: 1.35, turb: 3.0, rayleigh: 0.4,
    fog: 0x0b1424, fogD: 0.00022, sunI: 0.16, sunC: 0x9fb6ff, hemiI: 0.22,
    hemiSky: 0x2a3c5e, hemiGround: 0x0a0e14, bloom: 0.44, night: true,
  },
];

let presetIdx = 0;
let currentNight = false;
const sunDir = new THREE.Vector3();

function applyPreset(idx) {
  presetIdx = idx;
  const p = PRESETS[idx];
  currentNight = p.night;

  const phi = THREE.MathUtils.degToRad(90 - p.elev);
  const theta = THREE.MathUtils.degToRad(p.azim);
  sunDir.setFromSphericalCoords(1, phi, theta);

  sky.visible = !p.night;
  stars.visible = !!p.night;
  if (!p.night) {
    skyU.sunPosition.value.copy(sunDir);
    skyU.turbidity.value = p.turb;
    skyU.rayleigh.value = p.rayleigh;
  } else {
    scene.background = new THREE.Color(0x060a14);
  }

  sun.intensity = p.sunI;
  sun.color.setHex(p.sunC);
  hemi.intensity = p.hemiI;
  hemi.color.setHex(p.hemiSky);
  hemi.groundColor.setHex(p.hemiGround);
  renderer.toneMappingExposure = p.exposure;

  scene.fog.color.setHex(p.fog);
  scene.fog.density = p.fogD;
  bloom.strength = p.bloom;

  ground.userData.mat.color.setHex(p.night ? 0x2c3138 : 0x6d6f63);

  // luces de la ciudad
  city.userData.setNight(p.night);
  mountains.userData.setNight(p.night);
  streetLights.visible = p.night;
  for (const f of facades) f.emissiveIntensity = p.night ? 1.5 : 0;

  updateEnv();
  hudTitle.textContent = p.label;
  document.querySelectorAll('[data-time]').forEach((b) => b.classList.toggle('on', b.dataset.time === p.id));
}

/* ---------- carga ---------- */
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/');
loader.setDRACOLoader(draco);

const setProgress = (v) => {
  const p = Math.max(0, Math.min(1, v));
  bar.style.width = (p * 100).toFixed(1) + '%';
  pct.textContent = Math.round(p * 100) + '%';
};

let forest = null;
let home = { pos: new THREE.Vector3(880, 640, 1180), target: new THREE.Vector3(0, 20, -60) };

async function boot() {
  const [gltf, treeMeta, treeBin] = await Promise.all([
    loader.loadAsync('./models/unicentro.glb', (e) => { if (e.total) setProgress(0.08 + 0.72 * (e.loaded / e.total)); }),
    fetch('./data/trees.json').then((r) => r.json()),
    fetch('./data/trees.bin').then((r) => r.arrayBuffer()),
  ]);

  setProgress(0.86);
  const root = gltf.scene;

  // materiales
  root.traverse((o) => {
    if (!o.isMesh) return;
    const src = Array.isArray(o.material) ? o.material[0] : o.material;
    if (src) o.material = setupMaterial(src, o.name || '');
    o.castShadow = true;
    o.receiveShadow = true;
    o.frustumCulled = true;
  });

  worldGroup.add(root);

  // vegetación
  const prototypes = [];
  for (let i = 0; i < treeMeta.types.length; i++) {
    const proto = root.getObjectByName('TREE_TYPE_' + i);
    if (proto) prototypes.push([i, proto]);
  }
  forest = new Forest(scene, new Float32Array(treeBin), treeMeta, { near: 105, far: 700 });
  forest.build(prototypes);
  // el bosque vive dentro del grupo Z-up
  worldGroup.add(forest.group);

  setProgress(0.94);

  // encuadre
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.z);
  controls.maxDistance = Math.max(3000, maxDim * 6);
  controls.minDistance = 15;

  home.pos.set(760, 560, 1080);
  home.target.set(-20, 15, -120);
  resetView();

  sun.shadow.camera.left = -700; sun.shadow.camera.right = 700;
  sun.shadow.camera.top = 700; sun.shadow.camera.bottom = -700;
  sun.shadow.camera.updateProjectionMatrix();

  applyPreset(0);
  setProgress(1);
  setTimeout(() => loaderEl.classList.add('done'), 220);
  window.__READY__ = true;
}

function resetView() {
  camera.position.copy(home.pos);
  controls.target.copy(home.target);
  controls.update();
}

boot().catch((err) => {
  console.error(err);
  pct.textContent = 'Error al cargar';
  window.__LOAD_ERROR__ = String((err && err.message) || err);
});

/* ---------- controles ---------- */
const keys = new Set();
addEventListener('keydown', (e) => {
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'Space', 'ShiftLeft', 'ShiftRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
});
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());

const fwd = new THREE.Vector3(), right = new THREE.Vector3(), move = new THREE.Vector3();

function updateMovement(dt) {
  if (!keys.size) return;
  let speed = Math.max(28, controls.target.distanceTo(camera.position) * 0.6);
  if (keys.has('ShiftLeft') || keys.has('ShiftRight')) speed *= 3.2;
  camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize();
  right.crossVectors(fwd, camera.up).normalize();
  move.set(0, 0, 0);
  if (keys.has('KeyW')) move.add(fwd);
  if (keys.has('KeyS')) move.sub(fwd);
  if (keys.has('KeyD')) move.add(right);
  if (keys.has('KeyA')) move.sub(right);
  if (keys.has('KeyE') || keys.has('Space')) move.y += 1;
  if (keys.has('KeyQ')) move.y -= 1;
  if (move.lengthSq() === 0) return;
  move.normalize().multiplyScalar(speed * dt);
  camera.position.add(move);
  controls.target.add(move);
}

document.querySelectorAll('[data-time]').forEach((btn) => {
  btn.addEventListener('click', () => applyPreset(PRESETS.findIndex((p) => p.id === btn.dataset.time)));
});
document.getElementById('btn-home').onclick = resetView;

/* ---------- resize ---------- */
function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w, h);
}
addEventListener('resize', onResize);

/* ---------- loop ---------- */
let last = performance.now(), frames = 0, fpsT = 0, fps = 60;
const camLocal = new THREE.Vector3();
const _q = new THREE.Quaternion();

function tick(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;

  updateMovement(dt);
  controls.update();

  sun.target.position.set(controls.target.x, 0, controls.target.z);
  sun.position.copy(sun.target.position).addScaledVector(sunDir, 1400);

  if (forest) {
    // cámara en el espacio del modelo (Z-up)
    camLocal.copy(camera.position);
    worldGroup.worldToLocal(camLocal);
    forest.update(camLocal, now / 1000);
  }

  composer.render();

  frames++; fpsT += dt;
  if (fpsT >= 0.5) { fps = Math.round(frames / fpsT); frames = 0; fpsT = 0; }
  statsEl.textContent = `${fps} fps · ${renderer.info.render.calls} draws · ${(renderer.info.render.triangles / 1e6).toFixed(2)}M tris`;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

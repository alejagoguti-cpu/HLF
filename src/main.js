import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

/* ============================================================
   UNICENTRO · Visor 3D
   ============================================================ */

const canvas = document.getElementById('scene');
const bar = document.getElementById('bar');
const pct = document.getElementById('pct');
const loaderEl = document.getElementById('loader');
const statsEl = document.getElementById('stats');

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, powerPreference: 'high-performance', stencil: false
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.92;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.5, 60000);
camera.position.set(420, 260, 520);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.screenSpacePanning = true;
controls.maxPolarAngle = Math.PI * 0.495;
controls.minDistance = 12;
controls.maxDistance = 9000;

/* ---------- Sky & Sun ---------- */
const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

const skyU = sky.material.uniforms;
skyU.turbidity.value = 6.2;
skyU.rayleigh.value = 1.35;
skyU.mieCoefficient.value = 0.004;
skyU.mieDirectionalG.value = 0.82;

const sun = new THREE.DirectionalLight(0xfff3df, 3.1);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.bias = -0.00018;
sun.shadow.normalBias = 0.6;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 4000;
scene.add(sun);
scene.add(sun.target);

const hemi = new THREE.HemisphereLight(0xbfd6ef, 0x6b5a48, 1.05);
scene.add(hemi);

const sunDir = new THREE.Vector3();
const presets = [
  { name: 'Mediodía',     elev: 52, azim: 168, exposure: 0.90, turb: 5.4, fog: 0xb9cfe4, fogD: 0.000098 },
  { name: 'Tarde',        elev: 24, azim: 205, exposure: 0.98, turb: 7.0, fog: 0xd8c3a8, fogD: 0.000105 },
  { name: 'Dorada',       elev: 9,  azim: 232, exposure: 1.15, turb: 9.0, fog: 0xe8b98a, fogD: 0.000120 },
];
let presetIdx = 0;

function applyPreset(i) {
  const p = presets[i];
  const phi = THREE.MathUtils.degToRad(90 - p.elev);
  const theta = THREE.MathUtils.degToRad(p.azim);
  sunDir.setFromSphericalCoords(1, phi, theta);
  skyU.sunPosition.value.copy(sunDir);
  skyU.turbidity.value = p.turb;
  sun.position.copy(sunDir).multiplyScalar(2200);
  sun.target.position.set(0, 0, 0);
  renderer.toneMappingExposure = p.exposure;
  hemi.intensity = p.elev > 30 ? 1.05 : 0.8;
  sun.intensity = p.elev > 30 ? 3.1 : (p.elev > 15 ? 2.6 : 2.0);
  sun.color.setHSL(0.105, p.elev > 30 ? 0.25 : 0.55, p.elev > 30 ? 0.96 : 0.72);
  scene.fog.color.setHex(p.fog);
  scene.fog.density = p.fogD;
  updateEnv();
  const btn = document.getElementById('btn-sun');
  btn.textContent = p.name;
}
scene.fog = new THREE.FogExp2(0xb9cfe4, 0.000098);

/* Environment map from the sky so glass / metal / car paint reflect it */
let pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
let envRT = null;
function updateEnv() {
  try {
    if (envRT) envRT.dispose();
    const s = new THREE.Scene();
    s.add(sky.clone());
    envRT = pmrem.fromScene(s, 0, 1, 100000);
    scene.environment = envRT.texture;
  } catch (e) { console.warn('env', e); }
}

/* ---------- Lights follow the camera for stable shadows ---------- */
function updateShadowFrustum(size) {
  const s = Math.max(120, size * 1.15);
  const c = sun.shadow.camera;
  c.left = -s; c.right = s; c.top = s; c.bottom = -s;
  c.near = 1; c.far = size * 6 + 4000;
  c.updateProjectionMatrix();
}

/* ---------- Mountains (Andean horizon) ---------- */
function makeNoise(seed) {
  const rnd = (() => { let s = seed; return () => (s = (s * 1664525 + 1013904223) % 2147483648) / 2147483648; })();
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y) => {
    const u = (h & 1) ? x : -x, v = (h & 2) ? y : -y;
    return u + v;
  };
  return (x, y) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = fade(xf), v = fade(yf);
    const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u), v);
  };
}
function fbm(n, x, y, oct = 4) {
  let a = 0.5, f = 1, s = 0;
  for (let i = 0; i < oct; i++) { s += a * n(x * f, y * f); f *= 2.03; a *= 0.5; }
  return s;
}

function buildMountainRing({ radius, height, color, opacity, yBase, seed, roughness = 0.9, segments = 720, rings = 3 }) {
  const n = makeNoise(seed);
  const geo = new THREE.BufferGeometry();
  const verts = [], cols = [];
  const layers = rings;
  const rows = layers + 1;
  const col = new THREE.Color(color);

  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const h0 = height * (0.45 + 0.55 * Math.abs(fbm(n, Math.cos(a0) * 3.0 + 10, Math.sin(a0) * 3.0 + 10, 5)));
    const h1 = height * (0.45 + 0.55 * Math.abs(fbm(n, Math.cos(a1) * 3.0 + 10, Math.sin(a1) * 3.0 + 10, 5)));
    // ridge with jagged top
    const r0 = radius * (0.98 + 0.04 * n(Math.cos(a0) * 8, Math.sin(a0) * 8));
    const r1 = radius * (0.98 + 0.04 * n(Math.cos(a1) * 8, Math.sin(a1) * 8));
    const rep = (a, r, h) => [Math.cos(a) * r, yBase + h, Math.sin(a) * r];
    const b0 = [Math.cos(a0) * (r0 + radius * 0.22), yBase - height * 0.15, Math.sin(a0) * (r0 + radius * 0.22)];
    const b1 = [Math.cos(a1) * (r1 + radius * 0.22), yBase - height * 0.15, Math.sin(a1) * (r1 + radius * 0.22)];
    const t0 = rep(a0, r0, h0), t1 = rep(a1, r1, h1);
    const p = (v) => verts.push(v[0], v[1], v[2]);
    const c = (shade) => { const cc = col.clone().multiplyScalar(shade); cols.push(cc.r, cc.g, cc.b); };
    // two triangles for the face
    p(b0); p(b1); p(t1); c(0.55); c(0.55); c(1.0);
    p(b0); p(t1); p(t0); c(0.55); c(1.0); c(1.0);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true, transparent: opacity < 1, opacity, depthWrite: opacity >= 1, fog: true
  });
  const m = new THREE.Mesh(geo, mat);
  m.frustumCulled = false;
  return m;
}

let mountains = new THREE.Group();
scene.add(mountains);
function rebuildMountains(span) {
  mountains.clear();
  const R = span * 9.5;
  mountains.add(buildMountainRing({ radius: R * 0.62, height: R * 0.10, color: 0x8fa9c4, opacity: 0.55, yBase: -R * 0.01, seed: 7, segments: 900 }));
  mountains.add(buildMountainRing({ radius: R * 0.80, height: R * 0.07, color: 0x7c97b6, opacity: 0.75, yBase: -R * 0.01, seed: 23, segments: 900 }));
  mountains.add(buildMountainRing({ radius: R * 1.0,  height: R * 0.055, color: 0x6b86a6, opacity: 0.92, yBase: -R * 0.01, seed: 51, segments: 700 }));
}

/* ---------- Ground fallback ---------- */
const ground = new THREE.Mesh(
  new THREE.CircleGeometry(1, 128),
  new THREE.MeshStandardMaterial({ color: 0x5f6f52, roughness: 0.97, metalness: 0.0 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
ground.position.y = -0.05;
scene.add(ground);

/* ---------- Post ---------- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.16, 0.85, 0.92);
composer.addPass(bloom);

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    contrast: { value: 1.06 },
    saturation: { value: 1.08 },
    lift: { value: 0.0 },
    vignette: { value: 0.22 }
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float contrast, saturation, lift, vignette; varying vec2 vUv;
    void main(){
      vec4 t = texture2D(tDiffuse, vUv);
      vec3 c = t.rgb;
      c = (c - 0.5) * contrast + 0.5 + lift;
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c = mix(vec3(l), c, saturation);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.85, 0.25, length(d));
      c *= mix(1.0, v, vignette);
      gl_FragColor = vec4(c, t.a);
    }`
};
const grade = new ShaderPass(GradeShader);
composer.addPass(grade);
composer.addPass(new OutputPass());
const smaa = new SMAAPass(window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio());
composer.addPass(smaa);

/* ---------- Loading ---------- */
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/');
loader.setDRACOLoader(draco);
loader.setMeshoptDecoder(MeshoptDecoder);

let world = null;
let home = { pos: new THREE.Vector3(), target: new THREE.Vector3() };

function setProgress(p) {
  const v = Math.round(p * 100);
  bar.style.width = v + '%';
  pct.textContent = v + '%';
}

function fitView(object, pad = 1.35) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.z);
  const dist = maxDim * 0.62 * pad;
  home.pos.set(center.x + dist * 0.62, center.y + dist * 0.46, center.z + dist * 0.78);
  home.target.copy(center).setY(center.y + size.y * 0.05);
  return { box, size, center, maxDim };
}

function resetView() {
  camera.position.copy(home.pos);
  controls.target.copy(home.target);
  controls.update();
}

loader.load('./models/unicentro.glb', (gltf) => {
  setProgress(1);
  world = gltf.scene;

  world.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
      o.frustumCulled = true;
      const m = o.material;
      if (m) {
        m.envMapIntensity = 0.85;
        if (m.map) m.map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      }
    }
  });

  scene.add(world);
  const { size, maxDim } = fitView(world);

  controls.minDistance = Math.max(6, maxDim * 0.008);
  controls.maxDistance = maxDim * 8;
  resetView();

  updateShadowFrustum(maxDim * 0.62);
  rebuildMountains(Math.max(maxDim, 900));

  ground.scale.setScalar(maxDim * 6);
  ground.position.y -= size.y * 0.02;
  ground.visible = true;

  applyPreset(presetIdx);
  updateEnv();

  setTimeout(() => { loaderEl.classList.add('done'); }, 350);
  window.__READY__ = true;
}, (ev) => {
  if (ev.total) setProgress(Math.min(0.99, ev.loaded / ev.total));
  else setProgress(Math.min(0.95, (ev.loaded || 0) / 250000000));
}, (err) => {
  console.error(err);
  pct.textContent = 'Error al cargar';
  window.__LOAD_ERROR__ = String(err && err.message || err);
});

/* ---------- Interaction: WASD fly + orbit ---------- */
const keys = new Set();
addEventListener('keydown', (e) => {
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'Space', 'ShiftLeft', 'ShiftRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
});
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());

const fwd = new THREE.Vector3();
const right = new THREE.Vector3();
const move = new THREE.Vector3();

function updateMovement(dt) {
  if (!keys.size) return;
  let speed = Math.max(25, controls.target.distanceTo(camera.position) * 0.55);
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

/* ---------- HUD actions ---------- */
document.getElementById('btn-home').onclick = () => resetView();
document.getElementById('btn-sun').onclick = () => {
  presetIdx = (presetIdx + 1) % presets.length;
  applyPreset(presetIdx);
};
const btnFly = document.getElementById('btn-fly');
btnFly.onclick = () => btnFly.classList.toggle('on');

/* ---------- Resize ---------- */
function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloom.setSize(w, h);
  smaa.setSize(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
}
addEventListener('resize', onResize);

/* ---------- Loop ---------- */
let last = performance.now(), frames = 0, fpsT = 0, fps = 0;
let pr = Math.min(window.devicePixelRatio, 2);
function tick(now) {
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  updateMovement(dt);
  controls.update();

  // keep sun/shadow frustum anchored near the camera target
  sun.target.position.copy(controls.target);
  sun.position.copy(controls.target).add(sunDir.clone().multiplyScalar(2200));

  composer.render();
  frames++; fpsT += dt;
  if (fpsT >= 0.5) {
    fps = Math.round(frames / fpsT); frames = 0; fpsT = 0;
  }

  // adaptive resolution
  if (fpsT === 0 && fps && fps < 42 && pr > 1) {
    pr = Math.max(1, pr - 0.25);
    renderer.setPixelRatio(pr); composer.setPixelRatio(pr); onResize();
  }

  statsEl.textContent = `${fps} fps · ${renderer.info.render.calls} draws · ${(renderer.info.render.triangles / 1e6).toFixed(2)}M tris`;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

applyPreset(0);

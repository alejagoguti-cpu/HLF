/**
 * Cubiertas del Hotel Estelar La Fontana en TEJA DE BARRO 3D REAL + PBR:
 *   - Base de cubierta con tex_teja.webp + normal/roughness PBR de barro cocido
 *   - Tejas de barro 3D reales (cobijas arqueadas cada 0.42 m con traslapo escalonado
 *     cada 0.85 m pendiente abajo y remate frontal con espesor) sobre cada faldón
 *   - Aleros en madera oscura PBR (vigas/entablado bajo la teja)
 * -> public/secciones/hotel_cubiertas.glb y docs/secciones/hotel_cubiertas.glb
 */
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { encodePng } from './pbr-textures.mjs';

const C = JSON.parse(readFileSync('C:/Users/aleja/Documents/Codex/2026-11-06/co/work/k2/cubiertas_hotel.json', 'utf8'));
const tejaBytes = readFileSync('public/secciones/tex_teja.webp');
const S = 1.000614, A = (0.0849 * Math.PI) / 180, CA = Math.cos(A), SA = Math.sin(A);

// Mapas PBR de teja de barro y madera de alero (PNG tileables)
function makeRoofMaps() {
  const Sz = 128;
  const tejaNorm = Buffer.alloc(Sz * Sz * 4);
  const tejaMr = Buffer.alloc(Sz * Sz * 4);
  const woodAlb = Buffer.alloc(Sz * Sz * 4);
  const woodNorm = Buffer.alloc(Sz * Sz * 4);
  const woodMr = Buffer.alloc(Sz * Sz * 4);

  for (let y = 0; y < Sz; y++) {
    const v = y / Sz;
    for (let x = 0; x < Sz; x++) {
      const u = x / Sz;
      const i = (y * Sz + x) * 4;
      // Teja: ondulación sinusoidal + traslapo + grano de barro cocido
      const wave = Math.cos(u * Math.PI * 8);
      const step = ((v * 4) % 1) < 0.08 ? -0.6 : 0.0;
      const grain = Math.sin(u * 91 + v * 57) * 0.12;
      const nx = -wave * 0.55 + grain;
      const ny = step + grain * 0.5;
      const nz = Math.sqrt(Math.max(0.1, 1 - nx * nx * 0.4 - ny * ny * 0.4));
      tejaNorm[i] = Math.round((nx * 0.5 + 0.5) * 255);
      tejaNorm[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      tejaNorm[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      tejaNorm[i + 3] = 255;
      const rough = Math.round((0.76 + (0.5 - 0.5 * wave) * 0.14) * 255);
      tejaMr[i] = 0; tejaMr[i + 1] = rough; tejaMr[i + 2] = 0; tejaMr[i + 3] = 255;

      // Madera oscura de alero (vigas/machimbre)
      const plank = (u * 6) % 1;
      const seam = plank < 0.06 ? 0.65 : 1.0;
      const wGrain = (Math.sin(v * 80 + Math.sin(u * 25) * 2) * 0.5 + 0.5) * 0.18;
      const base = (0.20 + wGrain * 0.15) * seam;
      woodAlb[i] = Math.round(base * 255);
      woodAlb[i + 1] = Math.round(base * 0.66 * 255);
      woodAlb[i + 2] = Math.round(base * 0.45 * 255);
      woodAlb[i + 3] = 255;
      woodNorm[i] = Math.round((0.5 + (plank < 0.06 ? -0.3 : wGrain * 0.15)) * 255);
      woodNorm[i + 1] = 128;
      woodNorm[i + 2] = 245;
      woodNorm[i + 3] = 255;
      woodMr[i] = 0; woodMr[i + 1] = 198; woodMr[i + 2] = 0; woodMr[i + 3] = 255;
    }
  }
  return {
    tejaNorm: encodePng(Sz, Sz, tejaNorm),
    tejaMr: encodePng(Sz, Sz, tejaMr),
    woodAlb: encodePng(Sz, Sz, woodAlb),
    woodNorm: encodePng(Sz, Sz, woodNorm),
    woodMr: encodePng(Sz, Sz, woodMr),
  };
}

const maps = makeRoofMaps();
const g = new Glb();
const tTejaBase = g.image(tejaBytes, 'image/webp');
const tTejaNorm = g.image(maps.tejaNorm, 'image/png');
const tTejaMr = g.image(maps.tejaMr, 'image/png');
const tWoodBase = g.image(maps.woodAlb, 'image/png');
const tWoodNorm = g.image(maps.woodNorm, 'image/png');
const tWoodMr = g.image(maps.woodMr, 'image/png');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

g.j.materials.push(
  {
    name: 'TejaBarro3DPBR',
    doubleSided: true,
    normalTexture: { index: tTejaNorm, scale: 1.35 },
    pbrMetallicRoughness: {
      baseColorTexture: { index: tTejaBase },
      baseColorFactor: [0.98, 0.84, 0.74, 1],
      metallicRoughnessTexture: { index: tTejaMr },
      metallicFactor: 0.0,
      roughnessFactor: 1.0,
    },
  },
  {
    name: 'AleroMaderaPBR',
    doubleSided: true,
    normalTexture: { index: tWoodNorm, scale: 1.0 },
    pbrMetallicRoughness: {
      baseColorTexture: { index: tWoodBase },
      baseColorFactor: [1, 1, 1, 1],
      metallicRoughnessTexture: { index: tWoodMr },
      metallicFactor: 0.0,
      roughnessFactor: 1.0,
    },
  },
);

const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// Acumulador de malla 3D para las tejas de barro sobre los faldones
const tileP = [], tileN = [], tileUV = [], tileI = [];
let tileCount = 0;

function pushTri(a, b, c, uva, uvb, uvc) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = norm(cross(u, v));
  const base = tileCount;
  for (const p of [a, b, c]) tileP.push(p[0], p[1], p[2]);
  for (let i = 0; i < 3; i++) tileN.push(n[0], n[1], n[2]);
  tileUV.push(uva[0], uva[1], uvb[0], uvb[1], uvc[0], uvc[1]);
  tileI.push(base, base + 1, base + 2);
  tileCount += 3;
}
function pushQuad(a, b, c, d, uva, uvb, uvc, uvd) {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n = norm(cross(u, v));
  const base = tileCount;
  for (const p of [a, b, c, d]) tileP.push(p[0], p[1], p[2]);
  for (let i = 0; i < 4; i++) tileN.push(n[0], n[1], n[2]);
  tileUV.push(uva[0], uva[1], uvb[0], uvb[1], uvc[0], uvc[1], uvd[0], uvd[1]);
  tileI.push(base, base + 1, base + 2, base, base + 2, base + 3);
  tileCount += 4;
}

// Genera hileras de teja de barro 3D sobre un triángulo inclinado (a, b, c)
function add3DBarrelTilesOnTri(a, b, c, nrm) {
  if (nrm[1] < 0.20 || nrm[1] > 0.985) return; // solo faldones inclinados
  const area = 0.5 * Math.hypot(...cross([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]));
  if (area < 0.08) return;

  // Vector pendiente abajo en el plano del faldón: proyección de (0, -1, 0) sobre el plano
  const dRaw = [0 - (-nrm[1]) * nrm[0], -1 - (-nrm[1]) * nrm[1], 0 - (-nrm[1]) * nrm[2]];
  const down = norm(dRaw);
  const across = norm(cross(nrm, down));

  const proj = (p) => [dot(p, across), dot(p, down)];
  const pts2 = [proj(a), proj(b), proj(c)];
  const originDist = dot(a, nrm);
  const to3D = (u, v, hOff) => [
    across[0] * u + down[0] * v + nrm[0] * (originDist + hOff),
    across[1] * u + down[1] * v + nrm[1] * (originDist + hOff),
    across[2] * u + down[2] * v + nrm[2] * (originDist + hOff),
  ];

  const uMin = Math.min(pts2[0][0], pts2[1][0], pts2[2][0]);
  const uMax = Math.max(pts2[0][0], pts2[1][0], pts2[2][0]);
  const SPACING = 0.46; // ancho entre cobijas (tejas)
  const HALF_W = 0.155;
  const RIDGE_H = 0.115; // altura 3D real de la teja de barro
  const COURSE = 1.05;  // traslapo escalonado pendiente abajo

  const uStart = Math.ceil((uMin + 0.06) / SPACING) * SPACING;
  for (let u = uStart; u <= uMax - 0.06; u += SPACING) {
    // Intersección de la recta U = u con los 3 lados del triángulo para hallar [v0, v1]
    const vs = [];
    for (let e = 0; e < 3; e++) {
      const p0 = pts2[e], p1 = pts2[(e + 1) % 3];
      const du = p1[0] - p0[0];
      if (Math.abs(du) < 1e-6) continue;
      const t = (u - p0[0]) / du;
      if (t >= 0 && t <= 1) vs.push(p0[1] + t * (p1[1] - p0[1]));
    }
    if (vs.length < 2) continue;
    const v0 = Math.min(...vs) + 0.04;
    const v1 = Math.max(...vs) - 0.04;
    if (v1 - v0 < 0.25) continue;

    // Dividir en hileras escalonadas (traslapo real de teja de barro)
    for (let vc = v0; vc < v1 - 0.12; vc += COURSE) {
      const vc1 = Math.min(v1, vc + COURSE);
      const hTop = 0.015;
      const hBot = 0.055; // el borde inferior monta sobre la teja siguiente (+4 cm de traslapo)

      const L0 = to3D(u - HALF_W, vc, hTop), L1 = to3D(u - HALF_W, vc1, hBot);
      const M0 = to3D(u, vc, hTop + RIDGE_H), M1 = to3D(u, vc1, hBot + RIDGE_H);
      const R0 = to3D(u + HALF_W, vc, hTop), R1 = to3D(u + HALF_W, vc1, hBot);
      const B1 = to3D(u, vc1, 0.01);

      const uTex = (u * 0.45) % 1;
      // Dos faldones curvos de la cobija + tapa frontal del traslapo
      pushQuad(L0, L1, M1, M0, [uTex, 0], [uTex, 1], [uTex + 0.25, 1], [uTex + 0.25, 0]);
      pushQuad(M0, M1, R1, R0, [uTex + 0.25, 0], [uTex + 0.25, 1], [uTex + 0.5, 1], [uTex + 0.5, 0]);
      pushTri(L1, R1, M1, [uTex, 0.9], [uTex + 0.5, 0.9], [uTex + 0.25, 1]);
      pushTri(L1, B1, R1, [uTex, 0.9], [uTex + 0.25, 0.9], [uTex + 0.5, 0.9]);
    }
  }
}

const prims = [];
for (const [k, matIdx] of [['Teja', 0], ['Alero', 1]]) {
  const { V, UV } = C[k];
  const n = V.length / 3;
  const P = new Float32Array(n * 3), N = new Float32Array(n * 3), T = new Float32Array(UV);
  for (let i = 0; i < n; i++) {
    const x = V[i * 3] / 100, y = -V[i * 3 + 1] / 100, z = V[i * 3 + 2] / 100;
    const e = S * (x * CA - y * SA), nn = S * (x * SA + y * CA);
    P.set([e, z, -nn], i * 3);
  }
  for (let t = 0; t < n; t += 3) {
    const a = P.subarray(t * 3, t * 3 + 3), b = P.subarray(t * 3 + 3, t * 3 + 6), c = P.subarray(t * 3 + 6, t * 3 + 9);
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let [nx, ny, nz] = norm(cross(u, v));
    if (ny < 0) {
      nx = -nx; ny = -ny; nz = -nz;
      for (let q = 0; q < 3; q++) { const tmp = P[t * 3 + 3 + q]; P[t * 3 + 3 + q] = P[t * 3 + 6 + q]; P[t * 3 + 6 + q] = tmp; }
      for (let q = 0; q < 2; q++) { const tmp = T[t * 2 + 2 + q]; T[t * 2 + 2 + q] = T[t * 2 + 4 + q]; T[t * 2 + 4 + q] = tmp; }
    }
    for (let q = 0; q < 3; q++) N.set([nx, ny, nz], (t + q) * 3);
    if (k === 'Teja') add3DBarrelTilesOnTri([a[0], a[1], a[2]], [b[0], b[1], b[2]], [c[0], c[1], c[2]], [nx, ny, nz]);
  }
  prims.push({
    attributes: {
      POSITION: g.acc(P, 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(N, 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(T, 'VEC2', { target: 34962 }),
    },
    material: matIdx,
  });
}

// Añadir las tejas de barro 3D reales como primitiva indexada sobre TejaBarro3DPBR
if (tileCount > 0) {
  prims.push({
    attributes: {
      POSITION: g.acc(new Float32Array(tileP), 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(new Float32Array(tileN), 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(new Float32Array(tileUV), 'VEC2', { target: 34962 }),
    },
    indices: g.acc(tileCount > 65535 ? new Uint32Array(tileI) : new Uint16Array(tileI), 'SCALAR', { target: 34963 }),
    material: 0,
  });
}

g.j.meshes.push({ name: 'Cubierta_Hotel', primitives: prims });
g.j.nodes.push({ name: 'Cubierta_Hotel', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/hotel_cubiertas.glb');
copyFileSync('public/secciones/hotel_cubiertas.glb', 'docs/secciones/hotel_cubiertas.glb');
console.log('hotel_cubiertas.glb 3D Teja de Barro PBR generado:', (bytes / 1024).toFixed(1), 'KB | tris tejas 3D:', tileI.length / 3);

/**
 * Modela en 3D con UV y mapas PBR completos (Albedo + Normal + MetallicRoughness)
 * la plazoleta, escaleras, marquesina, rejas, pérgola, parasol, mobiliario bistró,
 * vegetación botánica y balcón izquierdo del Hotel Estelar La Fontana.
 * -> public/secciones/hotel_plazoleta.glb
 */
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { Glb } from './glb-writer.mjs';
import { generatePbrTextures } from './pbr-textures.mjs';

// Leer malla real de suelo_Terreno.glb para adaptar todo el piso del lote sin Z-fighting ni huecos
const ioTerreno = new NodeIO();
const docTerreno = await ioTerreno.read('public/secciones/suelo_Terreno.glb');
const terrenoTris = [];
for (const n of docTerreno.getRoot().listNodes()) {
  for (const p of n.getMesh()?.listPrimitives() || []) {
    const pos = p.getAttribute('POSITION'), idx = p.getIndices();
    const getV = (i) => { const v = [0, 0, 0]; pos.getElement(i, v); return [v[0], -v[2], v[1]]; };
    const cnt = idx ? idx.getCount() : pos.getCount();
    for (let i = 0; i < cnt; i += 3) {
      const a = getV(idx ? idx.getScalar(i) : i);
      const b = getV(idx ? idx.getScalar(i + 1) : i + 1);
      const c = getV(idx ? idx.getScalar(i + 2) : i + 2);
      const mnX = Math.min(a[0], b[0], c[0]), mxX = Math.max(a[0], b[0], c[0]);
      const mnY = Math.min(a[1], b[1], c[1]), mxY = Math.max(a[1], b[1], c[1]);
      if (mxX >= -315 && mnX <= -155 && mxY >= 248 && mnY <= 406) terrenoTris.push([a, b, c, mnX, mxX, mnY, mxY]);
    }
  }
}

function terrenoZ(e, n, fallback = 4.20) {
  for (const [a, b, c, mnX, mxX, mnY, mxY] of terrenoTris) {
    if (e < mnX || e > mxX || n < mnY || n > mxY) continue;
    const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
    if (Math.abs(d) < 1e-6) continue;
    const w1 = ((b[1] - c[1]) * (e - c[0]) + (c[0] - b[0]) * (n - c[1])) / d;
    const w2 = ((c[1] - a[1]) * (e - c[0]) + (a[0] - c[0]) * (n - c[1])) / d;
    const w3 = 1 - w1 - w2;
    if (w1 >= -0.02 && w2 >= -0.02 && w3 >= -0.02) return w1 * a[2] + w2 * b[2] + w3 * c[2];
  }
  return fallback;
}

const g = new Glb();
const andenBytes = readFileSync('public/secciones/tex_anden.webp');
const ladrilloBytes = readFileSync('public/secciones/tex_ladrillo.webp');
const pbr = generatePbrTextures();

const texAnden = g.image(andenBytes, 'image/webp');
const texLadrillo = g.image(ladrilloBytes, 'image/webp');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const imgSet = (set) => ({
  base: set.albedo ? g.image(set.albedo, 'image/png') : null,
  norm: g.image(set.normal, 'image/png'),
  mr: g.image(set.mr, 'image/png'),
});

const tLad = imgSet(pbr.ladrillo);
const tAdo = imgSet(pbr.adoquin);
const tCon = imgSet(pbr.concreto);
const tHie = imgSet(pbr.hierro);
const tLon = imgSet(pbr.lona);
const tPar = imgSet(pbr.parasol);
const tDor = imgSet(pbr.dorado);
const tHoj = imgSet(pbr.hojas);

function pbrMat(name, baseTex, normTex, mrTex, factor = [1, 1, 1, 1], metallic = 0.0, roughness = 1.0, extra = {}) {
  return {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: true,
    def: {
      name,
      doubleSided: true,
      normalTexture: { index: normTex, scale: 1.0 },
      pbrMetallicRoughness: {
        baseColorTexture: { index: baseTex },
        baseColorFactor: factor,
        metallicRoughnessTexture: { index: mrTex },
        metallicFactor: metallic,
        roughnessFactor: roughness,
      },
      ...extra,
    },
  };
}

const mats = {
  adoquin: pbrMat('PisoAdoquinPBR', texAnden, tAdo.norm, tAdo.mr, [0.92, 0.80, 0.72, 1], 0.0, 1.0),
  ladrillo: pbrMat('LadrilloPlazaPBR', texLadrillo, tLad.norm, tLad.mr, [0.92, 0.78, 0.70, 1], 0.0, 1.0),
  hierro: pbrMat('HierroNegroPBR', tHie.base, tHie.norm, tHie.mr, [1, 1, 1, 1], 1.0, 1.0),
  lona: pbrMat('LonaBlancaPBR', tLon.base, tLon.norm, tLon.mr, [1, 1, 1, 1], 0.0, 1.0, { emissiveFactor: [0.08, 0.06, 0.04] }),
  parasolGris: pbrMat('ParasolOscuroPBR', tPar.base, tPar.norm, tPar.mr, [1, 1, 1, 1], 1.0, 1.0),
  materaBeige: pbrMat('MateraBeigePBR', tCon.base, tCon.norm, tCon.mr, [1, 1, 1, 1], 0.0, 1.0),
  dorado: pbrMat('BronceLetreroPBR', tDor.base, tDor.norm, tDor.mr, [1, 1, 1, 1], 1.0, 1.0),
  cipres: pbrMat('FollajeBotanicoPBR', tHoj.base, tHoj.norm, tHoj.mr, [1, 1, 1, 1], 0.0, 1.0),
  luzCalida: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'FocoCalido', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1.0, 0.84, 0.50, 1], metallicFactor: 0.0, roughnessFactor: 0.15 }, emissiveFactor: [1.0, 0.72, 0.34] },
  },
  vidrioPabellon: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'VidrioPabellon', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.11, 0.13, 0.145, 1], metallicFactor: 0.55, roughnessFactor: 0.06 } },
  },
  vidrioBaranda: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'VidrioBaranda', doubleSided: true, alphaMode: 'BLEND', pbrMetallicRoughness: { baseColorFactor: [0.68, 0.80, 0.88, 0.30], metallicFactor: 0.12, roughnessFactor: 0.10 } },
  },
};

function addQuad(mat, a, b, c, d, uva = [0, 0], uvb = [1, 0], uvc = [1, 1], uvd = [0, 1]) {
  const m = mats[mat];
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const L = Math.hypot(nx, ny, nz) || 1;
  nx /= L; ny /= L; nz /= L;
  const base = m.n;
  const pts = [a, b, c, d];
  const uvs = [uva, uvb, uvc, uvd];
  for (let i = 0; i < 4; i++) {
    const p = pts[i];
    m.P.push(p[0], p[2], -p[1]);
    m.N.push(nx, nz, -ny);
    if (m.hasUV) m.UV.push(uvs[i][0], uvs[i][1]);
    m.n++;
  }
  m.I.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

function addTri(mat, a, b, c, uvScale = 0.45) {
  const m = mats[mat];
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const L = Math.hypot(nx, ny, nz) || 1;
  nx /= L; ny /= L; nz /= L;
  const base = m.n;
  for (const p of [a, b, c]) {
    m.P.push(p[0], p[2], -p[1]);
    m.N.push(nx, nz, -ny);
    if (m.hasUV) {
      if (Math.abs(nz) >= Math.abs(nx) && Math.abs(nz) >= Math.abs(ny)) m.UV.push(p[0] * uvScale, p[1] * uvScale);
      else if (Math.abs(ny) >= Math.abs(nx)) m.UV.push(p[0] * uvScale, p[2] * uvScale);
      else m.UV.push(p[1] * uvScale, p[2] * uvScale);
    }
    m.n++;
  }
  m.I.push(base, base + 1, base + 2);
}

function addBox(mat, e0, n0, z0, e1, n1, z1, uvScale = 0.35) {
  const w = Math.abs(e1 - e0) * uvScale, d = Math.abs(n1 - n0) * uvScale, h = Math.abs(z1 - z0) * uvScale;
  addQuad(mat, [e0, n0, z1], [e1, n0, z1], [e1, n1, z1], [e0, n1, z1], [0, 0], [w, 0], [w, d], [0, d]);
  addQuad(mat, [e0, n0, z0], [e1, n0, z0], [e1, n0, z1], [e0, n0, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e1, n0, z0], [e1, n1, z0], [e1, n1, z1], [e1, n0, z1], [0, 0], [d, 0], [d, h], [0, h]);
  addQuad(mat, [e1, n1, z0], [e0, n1, z0], [e0, n1, z1], [e1, n1, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e0, n1, z0], [e0, n0, z0], [e0, n0, z1], [e0, n1, z1], [0, 0], [d, 0], [d, h], [0, h]);
}

function addCylinder(mat, cx, cy, z0, z1, rBot, rTop, segs = 14, uvScale = 0.5, capTop = true) {
  const m = mats[mat];
  const h = Math.abs(z1 - z0) * uvScale;
  const base = m.n;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const u = (i / segs) * Math.PI * 2 * Math.max(rBot, rTop) * uvScale;
    m.P.push(cx + ca * rBot, z0, -(cy + sa * rBot));
    m.N.push(ca, 0, -sa);
    if (m.hasUV) m.UV.push(u, 0);
    m.P.push(cx + ca * rTop, z1, -(cy + sa * rTop));
    m.N.push(ca, 0, -sa);
    if (m.hasUV) m.UV.push(u, h);
    m.n += 2;
  }
  for (let i = 0; i < segs; i++) {
    const k = base + i * 2;
    m.I.push(k, k + 2, k + 3, k, k + 3, k + 1);
  }
  if (capTop && rTop > 0.001) {
    const cIdx = m.n;
    m.P.push(cx, z1, -cy); m.N.push(0, 1, 0);
    if (m.hasUV) m.UV.push(0.5, 0.5);
    m.n++;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      m.P.push(cx + Math.cos(a) * rTop, z1, -(cy + Math.sin(a) * rTop));
      m.N.push(0, 1, 0);
      if (m.hasUV) m.UV.push(0.5 + Math.cos(a) * 0.5, 0.5 + Math.sin(a) * 0.5);
      m.n++;
    }
    for (let i = 0; i < segs; i++) m.I.push(cIdx, cIdx + 1 + i, cIdx + 2 + i);
  }
}

function addBeam(mat, a, b, r = 0.04) {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
  const L = Math.hypot(dx, dy, dz) || 1;
  const ux = -dy / L * r, uy = dx / L * r;
  const len = L * 0.5;
  addQuad(mat, [a[0] - ux, a[1] - uy, a[2]], [a[0] + ux, a[1] + uy, a[2]], [b[0] + ux, b[1] + uy, b[2]], [b[0] - ux, b[1] - uy, b[2]], [0, 0], [0.1, 0], [0.1, len], [0, len]);
  addQuad(mat, [a[0], a[1], a[2] - r], [a[0], a[1], a[2] + r], [b[0], b[1], b[2] + r], [b[0], b[1], b[2] - r], [0, 0], [0.1, 0], [0.1, len], [0, len]);
}

// Follaje botánico orgánico con cartas de hojas UV en múltiples ángulos (cero cajas)
function addFoliageSprig(cx, cy, cz, rx, rz, yaw, tilt) {
  const cyaw = Math.cos(yaw), syaw = Math.sin(yaw);
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  const pt = (lx, ly, lz) => {
    const ty = ly * ct - lz * st, tz = ly * st + lz * ct;
    return [cx + lx * cyaw - ty * syaw, cy + lx * syaw + ty * cyaw, cz + tz];
  };
  addQuad('cipres', pt(-rx, 0, -rz * 0.3), pt(rx, 0, -rz * 0.3), pt(rx * 0.75, 0.12, rz), pt(-rx * 0.75, 0.12, rz), [0, 0], [1, 0], [1, 1], [0, 1]);
  addQuad('cipres', pt(0, -rx, -rz * 0.3), pt(0, rx, -rz * 0.3), pt(0.12, rx * 0.75, rz), pt(0.12, -rx * 0.75, rz), [0, 0], [1, 0], [1, 1], [0, 1]);
}

const ZP = 4.17; // Cota de la plazoleta de acceso
const CX = -224.5; // Centro del acceso principal

// 1. PISO ADOQUINADO COMPLETO DE TODO EL LOTE DEL HOTEL LA FONTANA
// Polígono exacto del lote delimitado por la cara interior del andén real (suelo_Andenes.glb) y edificios.json
const HOTEL_LOT = [
  [-298.5, 265.2],
  [-274.0, 262.6],
  [-245.0, 259.9],
  [-225.0, 258.0],
  [-195.0, 255.0],
  [-178.0, 256.5],
  [-166.0, 262.0],
  [-166.0, 296.0],
  [-169.0, 394.5],
  [-292.0, 394.5],
  [-298.5, 330.0],
];
function pointInLot(x, y) {
  let inside = false;
  for (let i = 0, j = HOTEL_LOT.length - 1; i < HOTEL_LOT.length; j = i++) {
    const [xi, yi] = HOTEL_LOT[i], [xj, yj] = HOTEL_LOT[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
// Borde sur exacto (cara interior del andén de la Calle 127)
function nFrontEdge(e) {
  const t = Math.max(0, Math.min(1, (-195 - e) / (-195 - (-305))));
  return 255.0 + t * (265.4 - 255.0);
}
const floorZ = (e, n) => {
  const tz = terrenoZ(e, n, ZP);
  if (e >= -272 && e <= -195 && n >= nFrontEdge(e) && n <= 276.5) {
    return Math.max(ZP + 0.03, tz + 0.06);
  }
  return tz + 0.08;
};
const E0 = -298.5, E1 = -166.0, N0 = 255.0, N1 = 394.5, STEP = 3.5;
for (let e = E0; e < E1; e += STEP) {
  const eNext = Math.min(E1, e + STEP);
  for (let n = N0; n < N1; n += STEP) {
    const nNext = Math.min(N1, n + STEP);
    const ce = (e + eNext) * 0.5, cn = (n + nNext) * 0.5;
    if (!pointInLot(ce, cn)) continue;
    // Asegurar que la esquina sur no invada el andén ni la vía
    const nA = Math.max(n, nFrontEdge(e)), nB = Math.max(n, nFrontEdge(eNext));
    const nC = Math.max(nNext, nFrontEdge(eNext)), nD = Math.max(nNext, nFrontEdge(e));
    if (nA >= nD - 0.05 && nB >= nC - 0.05) continue;
    const z00 = floorZ(e, nA), z10 = floorZ(eNext, nB), z11 = floorZ(eNext, nC), z01 = floorZ(e, nD);
    const uvS = 0.28;
    addQuad('adoquin',
      [e, nA, z00], [eNext, nB, z10], [eNext, nC, z11], [e, nD, z01],
      [e * uvS, nA * uvS], [eNext * uvS, nB * uvS], [eNext * uvS, nC * uvS], [e * uvS, nD * uvS]);
  }
}
// Anillos concéntricos alrededor de la fuente (-225, 263.5)
for (const rad of [5.0, 7.2]) {
  const SEG = 36;
  for (let i = 0; i < SEG; i++) {
    const a0 = (i / SEG) * Math.PI * 2, a1 = ((i + 1) / SEG) * Math.PI * 2;
    const x0 = -225 + Math.cos(a0) * rad, y0 = 263.5 + Math.sin(a0) * rad;
    const x1 = -225 + Math.cos(a1) * rad, y1 = 263.5 + Math.sin(a1) * rad;
    const x0o = -225 + Math.cos(a0) * (rad + 0.25), y0o = 263.5 + Math.sin(a0) * (rad + 0.25);
    const x1o = -225 + Math.cos(a1) * (rad + 0.25), y1o = 263.5 + Math.sin(a1) * (rad + 0.25);
    if (y0 < nFrontEdge(x0) + 0.3 || y1 < nFrontEdge(x1) + 0.3) continue;
    const zR = floorZ(x0, y0) + 0.025;
    addQuad('ladrillo', [x0, y0, zR], [x1, y1, zR], [x1o, y1o, zR], [x0o, y0o, zR], [0, 0], [0.4, 0], [0.4, 0.2], [0, 0.2]);
  }
}

// 2. ESCALERAS Y DESCANSO DE ACCESO PRINCIPAL ENCUADRADAS A LA FACHADA
// Fachada sur (arista 21 de edificios.json b=375): de [-241.31, 277.20] a [-207.33, 283.78]
const pWall0 = [-241.31, 277.20], pWall1 = [-207.33, 283.78];
const wallL = Math.hypot(pWall1[0] - pWall0[0], pWall1[1] - pWall0[1]); // 34.61 m
const wtx = (pWall1[0] - pWall0[0]) / wallL; // 0.9818
const wty = (pWall1[1] - pWall0[1]) / wallL; // 0.1901
const wnx = wty; // 0.1901 (normal perpendicular saliente hacia la plazoleta)
const wny = -wtx; // -0.9818

// Coordenadas orientadas con la fachada:
// s: avance longitudinal a lo largo de la pared (m)
// d: distancia hacia afuera perpendicular a la pared (m), d=0 es en la pared misma
// z: altura
const ptWall = (s, d, z) => [
  pWall0[0] + wtx * s + wnx * d,
  pWall0[1] + wty * s + wny * d,
  z,
];

function addWallBox(mat, s0, s1, d0, d1, z0, z1, uvScale = 0.45) {
  const p000 = ptWall(s0, d0, z0), p100 = ptWall(s1, d0, z0);
  const p110 = ptWall(s1, d1, z0), p010 = ptWall(s0, d1, z0);
  const p001 = ptWall(s0, d0, z1), p101 = ptWall(s1, d0, z1);
  const p111 = ptWall(s1, d1, z1), p011 = ptWall(s0, d1, z1);
  const w = Math.abs(s1 - s0) * uvScale;
  const d = Math.abs(d1 - d0) * uvScale;
  const h = Math.abs(z1 - z0) * uvScale;
  // Superior (huella o descanso)
  addQuad(mat, p001, p101, p111, p011, [0, 0], [w, 0], [w, d], [0, d]);
  // Inferior
  addQuad(mat, p010, p110, p100, p000, [0, 0], [w, 0], [w, d], [0, d]);
  // Trasera (contra la fachada si d0=0)
  addQuad(mat, p100, p000, p001, p101, [0, 0], [w, 0], [w, h], [0, h]);
  // Frontal (contrahuella mirando a la plazoleta)
  addQuad(mat, p010, p110, p111, p011, [0, 0], [w, 0], [w, h], [0, h]);
  // Lateral oeste (izquierda)
  addQuad(mat, p000, p010, p011, p001, [0, 0], [d, 0], [d, h], [0, h]);
  // Lateral este (derecha)
  addQuad(mat, p110, p100, p101, p111, [0, 0], [d, 0], [d, h], [0, h]);
}

// Centro de la entrada en la fachada: sCenter = 22.215 m (canopy s=14.88 a 29.55 m)
const sCenter = 22.215;
const stairW = 16.6;
const s0 = sCenter - stairW * 0.5; // 13.915 m
const s1 = sCenter + stairW * 0.5; // 30.515 m
const STEPS = 7, tread = 0.44, riser = 0.14;
const zTop = ZP + STEPS * riser; // 5.15 m
const dLanding = 5.20; // 5.20 m de descanso bajo la marquesina

// Descanso superior plano directamente pegado a la fachada (d0=0, sin huecos)
addWallBox('ladrillo', s0, s1, 0.0, dLanding, ZP, zTop, 0.45);

// 7 peldaños escalonados hacia la plazoleta en ladrillo PBR
for (let k = 0; k < STEPS; k++) {
  const dk0 = dLanding + k * tread;
  const dk1 = dk0 + tread + 0.02;
  const zkTop = zTop - k * riser;
  addWallBox('ladrillo', s0, s1, dk0, dk1, ZP, zkTop, 0.45);
}

// Muretes laterales en ladrillo (guardaescobas / bordillo de confinamiento)
const borderThick = 0.40;
// Borde lateral izquierdo (oeste)
addWallBox('ladrillo', s0 - borderThick, s0, 0.0, dLanding, ZP, zTop + 0.24, 0.45);
for (let k = 0; k < STEPS; k++) {
  const dk0 = dLanding + k * tread;
  const dk1 = dk0 + tread + 0.02;
  const zkTop = zTop - k * riser + 0.24;
  addWallBox('ladrillo', s0 - borderThick, s0, dk0, dk1, ZP, zkTop, 0.45);
}
// Borde lateral derecho (este)
addWallBox('ladrillo', s1, s1 + borderThick, 0.0, dLanding, ZP, zTop + 0.24, 0.45);
for (let k = 0; k < STEPS; k++) {
  const dk0 = dLanding + k * tread;
  const dk1 = dk0 + tread + 0.02;
  const zkTop = zTop - k * riser + 0.24;
  addWallBox('ladrillo', s1, s1 + borderThick, dk0, dk1, ZP, zkTop, 0.45);
}

// 3. CIPRESES PIRAMIDALES BOTÁNICOS FLANQUEANDO LAS ESCALERAS ENCUADRADAS (3 izquierda, 3 derecha)
for (const [sideSign, sSide] of [[-1, s0 - borderThick - 0.75], [1, s1 + borderThick + 0.75]]) {
  for (let k = 0; k < 3; k++) {
    const dTree = 1.6 + k * 2.6; // d = 1.6, 4.2, 6.8 m
    const pTree = ptWall(sSide, dTree, ZP);
    const tx = pTree[0], ty = pTree[1], tz = ZP + 0.05;
    // Matera cuadrada en ladrillo
    addBox('ladrillo', tx - 0.38, ty - 0.38, tz, tx + 0.38, ty + 0.38, tz + 0.55, 0.6);
    addCylinder('hierro', tx, ty, tz + 0.55, tz + 2.9, 0.06, 0.02, 8, 0.5, false);
    const tiers = 10;
    for (let t = 0; t < tiers; t++) {
      const f = t / (tiers - 1);
      const r = 0.62 * (1 - f * 0.78);
      const z = tz + 0.72 + f * 2.55;
      for (let b = 0; b < 4; b++) {
        const ang = b * (Math.PI * 0.5) + t * 0.65 + k * 0.4;
        addFoliageSprig(tx + Math.cos(ang) * r * 0.45, ty + Math.sin(ang) * r * 0.45, z, r * 0.65, r * 0.55, ang, 0.35 + f * 0.25);
      }
    }
  }
}

// 4. MARQUESINA DE ACCESO EN HIERRO NEGRO Y VIDRIO ENCUADRADA A LA FACHADA
// Anclada a la fachada sin columnas invasivas en el suelo, suspendida con tensores de hierro negro
const canW = 14.8;
const sCan0 = sCenter - canW * 0.5; // 14.815 m
const sCan1 = sCenter + canW * 0.5; // 29.615 m
const dCan1 = 4.60;
const zWallCan = 7.72, zFrontCan = 7.32; // pendiente ligera hacia el frente

// Marco perimetral y vigas en hierro negro
// Viga trasera adosada al muro de ladrillo
addWallBox('hierro', sCan0 - 0.12, sCan1 + 0.12, 0.0, 0.18, zWallCan - 0.22, zWallCan, 0.4);
// Viga frontal volada
addWallBox('hierro', sCan0 - 0.12, sCan1 + 0.12, dCan1 - 0.18, dCan1, zFrontCan - 0.22, zFrontCan, 0.4);
// Costados laterales
addWallBox('hierro', sCan0 - 0.18, sCan0, 0.0, dCan1, zFrontCan - 0.22, zWallCan, 0.4);
addWallBox('hierro', sCan1, sCan1 + 0.18, 0.0, dCan1, zFrontCan - 0.22, zWallCan, 0.4);

// Viguetas transversales de hierro negro cada ~1.45 m
const numRibs = 10;
for (let i = 0; i <= numRibs; i++) {
  const sRib = sCan0 + (i / numRibs) * (sCan1 - sCan0);
  addWallBox('hierro', sRib - 0.045, sRib + 0.045, 0.0, dCan1, zFrontCan - 0.16, zWallCan - 0.04, 0.4);
}

// Cubierta acristalada inclinada con reflejos PBR
const pV0 = ptWall(sCan0, 0.04, zWallCan - 0.03);
const pV1 = ptWall(sCan1, 0.04, zWallCan - 0.03);
const pV2 = ptWall(sCan1, dCan1 - 0.04, zFrontCan - 0.03);
const pV3 = ptWall(sCan0, dCan1 - 0.04, zFrontCan - 0.03);
addQuad('vidrioPabellon', pV0, pV1, pV2, pV3, [0, 0], [1, 0], [1, 1], [0, 1]);

// 4 tensores / tirantes de hierro negro anclados arriba en la fachada
for (const frac of [0.10, 0.37, 0.63, 0.90]) {
  const sT = sCan0 + (sCan1 - sCan0) * frac;
  const pExt = ptWall(sT, dCan1 - 0.12, zFrontCan - 0.04);
  const pAnch = ptWall(sT, 0.04, zWallCan + 2.25);
  addBeam('hierro', pExt, pAnch, 0.038);
  // Focos cálidos empotrados bajo la marquesina
  const pFoco = ptWall(sT, dCan1 * 0.5, zFrontCan - 0.22);
  addCylinder('luzCalida', pFoco[0], pFoco[1], pFoco[2] - 0.12, pFoco[2] + 0.04, 0.12, 0.12, 10, 0.5, true);
}

// 5. REJA FRONTAL SIGUIENDO LA CARA INTERIOR EXACTA DEL ANDÉN (nFrontEdge, sin salirse jamás a la vía)
const rX0 = -274, rX1 = -196;
for (let x = rX0; x < rX1; x += 2.5) {
  const x1 = Math.min(rX1, x + 2.5);
  const xm = (x + x1) * 0.5;
  if (xm > -255 && xm < -244) continue; // Acceso vehicular libre
  const y0 = nFrontEdge(x) + 0.35, y1 = nFrontEdge(x1) + 0.35;
  const z0 = floorZ(x, y0), z1 = floorZ(x1, y1);
  // Sardinel en ladrillo alineado al andén
  addQuad('ladrillo', [x, y0 - 0.18, z0 + 0.28], [x1, y1 - 0.18, z1 + 0.28], [x1, y1 + 0.18, z1 + 0.28], [x, y0 + 0.18, z0 + 0.28], [0, 0], [0.8, 0], [0.8, 0.2], [0, 0.2]);
  addQuad('ladrillo', [x, y0 - 0.18, z0 - 0.15], [x1, y1 - 0.18, z1 - 0.15], [x1, y1 - 0.18, z1 + 0.28], [x, y0 - 0.18, z0 + 0.28], [0, 0], [0.8, 0], [0.8, 0.3], [0, 0.3]);
  addBeam('hierro', [x, y0, z0 + 0.40], [x1, y1, z1 + 0.40], 0.035);
  addBeam('hierro', [x, y0, z0 + 1.52], [x1, y1, z1 + 1.52], 0.038);
}
for (let x = rX0; x <= rX1; x += 0.44) {
  if (x > -255 && x < -244) continue;
  const yx = nFrontEdge(x) + 0.35;
  const zx = floorZ(x, yx);
  addCylinder('hierro', x, yx, zx + 0.28, zx + 1.62, 0.020, 0.016, 6, 0.5, true);
}

// 6. PÉRGOLA METÁLICA, PARASOL GIGANTE, MESAS BISTRÓ Y MATERAS DEL PATIO IZQUIERDO (dentro del lote)
const px0 = -271, px1 = -252, pn0 = 263.8, pn1 = 272.2, pzT = ZP + 3.15;
addBox('hierro', px0 - 0.12, pn0 - 0.12, pzT - 0.06, px1 + 0.12, pn0 + 0.08, pzT + 0.22, 0.4);
addBox('hierro', px0 - 0.12, pn1 - 0.08, pzT - 0.06, px1 + 0.12, pn1 + 0.12, pzT + 0.22, 0.4);
const bays = 4;
for (let i = 0; i <= bays; i++) {
  const sx = px0 + (px1 - px0) * (i / bays);
  addBox('hierro', sx - 0.09, pn0 - 0.09, pzT, sx + 0.09, pn1 + 0.09, pzT + 0.18, 0.4);
  for (const sy of [pn0, pn1]) {
    addBox('hierro', sx - 0.10, sy - 0.10, ZP, sx + 0.10, sy + 0.10, pzT, 0.4);
  }
}
for (let i = 0; i < bays; i++) {
  const bx0 = px0 + (px1 - px0) * (i / bays) + 0.12;
  const bx1 = px0 + (px1 - px0) * ((i + 1) / bays) - 0.12;
  const pleats = 4;
  for (let p = 0; p < pleats; p++) {
    const py0 = pn0 + 0.2 + ((pn1 - pn0 - 0.4) * p) / pleats;
    const py1 = pn0 + 0.2 + ((pn1 - pn0 - 0.4) * (p + 1)) / pleats;
    const pyM = (py0 + py1) * 0.5;
    addQuad('lona', [bx0, py0, pzT - 0.02], [bx1, py0, pzT - 0.02], [bx1, pyM, pzT - 0.22], [bx0, pyM, pzT - 0.22], [0, 0], [1, 0], [1, 0.5], [0, 0.5]);
    addQuad('lona', [bx0, pyM, pzT - 0.22], [bx1, pyM, pzT - 0.22], [bx1, py1, pzT - 0.02], [bx0, py1, pzT - 0.02], [0, 0.5], [1, 0.5], [1, 1], [0, 1]);
  }
  const lx = (bx0 + bx1) * 0.5;
  addCylinder('luzCalida', lx, (pn0 + pn1) * 0.5, pzT - 0.24, pzT - 0.18, 0.14, 0.14, 10, 0.5, true);
}

// PABELLÓN DE VIDRIO (foto real: terraza-restaurante cerrada en vidrio con perfilería negra y plantas adentro)
{
  const zb = ZP, zt = pzT - 0.06;
  // zócalo negro bajo el vidrio
  addBox('hierro', px0 - 0.1, pn0 - 0.1, zb, px1 + 0.1, pn0 + 0.06, zb + 0.32, 0.4);
  addBox('hierro', px0 - 0.1, pn1 - 0.06, zb, px1 + 0.1, pn1 + 0.1, zb + 0.32, 0.4);
  addBox('hierro', px0 - 0.1, pn0, zb, px0 + 0.06, pn1, zb + 0.32, 0.4);
  addBox('hierro', px1 - 0.06, pn0, zb, px1 + 0.1, pn1, zb + 0.32, 0.4);
  // paños de vidrio en las cuatro caras
  addBox('vidrioPabellon', px0, pn0 - 0.03, zb + 0.32, px1, pn0 + 0.02, zt);
  addBox('vidrioPabellon', px0, pn1 - 0.02, zb + 0.32, px1, pn1 + 0.03, zt);
  addBox('vidrioPabellon', px0 - 0.03, pn0, zb + 0.32, px0 + 0.02, pn1, zt);
  addBox('vidrioPabellon', px1 - 0.02, pn0, zb + 0.32, px1 + 0.03, pn1, zt);
  // techo acristalado sobre la lona
  addBox('hierro', px0 - 0.15, pn0 - 0.15, pzT + 0.2, px1 + 0.15, pn1 + 0.15, pzT + 0.36, 0.4);
  // montantes verticales cada ~1,2 m y travesaños horizontales (perfilería negra)
  const mont = (e0, n0, e1, n1) => {
    const L = Math.hypot(e1 - e0, n1 - n0), k = Math.max(1, Math.round(L / 1.2));
    for (let i = 0; i <= k; i++) {
      const e = e0 + ((e1 - e0) * i) / k, n = n0 + ((n1 - n0) * i) / k;
      addBox('hierro', e - 0.035, n - 0.035, zb + 0.32, e + 0.035, n + 0.035, zt, 0.4);
    }
    for (const z of [zb + 0.32, zb + 2.25, zt - 0.05]) {
      if (Math.abs(e1 - e0) > Math.abs(n1 - n0)) addBox('hierro', Math.min(e0, e1), n0 - 0.04, z, Math.max(e0, e1), n0 + 0.04, z + 0.06, 0.4);
      else addBox('hierro', e0 - 0.04, Math.min(n0, n1), z, e0 + 0.04, Math.max(n0, n1), z + 0.06, 0.4);
    }
  };
  mont(px0, pn0, px1, pn0); mont(px0, pn1, px1, pn1); mont(px0, pn0, px0, pn1); mont(px1, pn0, px1, pn1);
  // plantas en el interior, contra el vidrio y en el centro
  for (let e = px0 + 0.6; e < px1 - 0.4; e += 0.9) {
    for (const [n, h] of [[pn0 + 0.55, 0.9], [pn1 - 0.55, 1.1]]) {
      addBox('materaBeige', e - 0.3, n - 0.25, zb, e + 0.3, n + 0.25, zb + 0.45, 0.5);
      for (let j = 0; j < 4; j++) addFoliageSprig(e + (j - 1.5) * 0.14, n + ((j % 2) - 0.5) * 0.18, zb + 0.5 + (j % 3) * 0.12 + h * 0.3, 0.3, 0.36, j * 1.3 + e, 0.4);
    }
  }
  for (let e = px0 + 3; e < px1 - 2; e += 4.5) {
    addCylinder('hierro', e, (pn0 + pn1) / 2, zb, zb + 1.6, 0.05, 0.04, 8, 0.6, false);
    for (let j = 0; j < 9; j++) addFoliageSprig(e + Math.cos(j * 0.7) * 0.5, (pn0 + pn1) / 2 + Math.sin(j * 0.7) * 0.5, zb + 1.5 + (j % 3) * 0.25, 0.42, 0.46, j * 0.9, 0.5);
  }
}

// Fila de materas rectangulares beige PBR con arbustos botánicos orgánicos + baranda de vidrio
for (let mx = px0; mx < px1 - 0.4; mx += 1.55) {
  addBox('materaBeige', mx + 0.04, pn0 - 0.72, ZP, mx + 1.48, pn0 - 0.14, ZP + 0.62, 0.5);
  for (let j = 0; j < 6; j++) {
    const fx = mx + 0.22 + (j / 5) * 1.05;
    const fy = pn0 - 0.43 + ((j % 2) - 0.5) * 0.14;
    addFoliageSprig(fx, fy, ZP + 0.72 + (j % 3) * 0.08, 0.28, 0.32, j * 1.1, 0.42);
  }
}
addBox('vidrioBaranda', px0, pn0 - 0.08, ZP + 0.62, px1, pn0 - 0.03, ZP + 1.35);

// Parasol gigante octogonal PBR con mástil cilíndrico y varillas radiales
const ux = -248.5, uy = 267.5;
addCylinder('hierro', ux, uy, ZP, ZP + 0.07, 0.42, 0.40, 16, 0.5, true);
addCylinder('hierro', ux, uy, ZP + 0.07, ZP + 3.05, 0.085, 0.080, 14, 0.5, false);
addCylinder('luzCalida', ux, uy, ZP + 2.72, ZP + 2.86, 0.20, 0.22, 12, 0.5, true);
const uR = 3.95, uZ0 = ZP + 2.72, uZ1 = ZP + 3.65, uSeg = 8;
for (let k = 0; k < uSeg; k++) {
  const a0 = (k / uSeg) * Math.PI * 2;
  const a1 = ((k + 1) / uSeg) * Math.PI * 2;
  const p0 = [ux + Math.cos(a0) * uR, uy + Math.sin(a0) * uR, uZ0];
  const p1 = [ux + Math.cos(a1) * uR, uy + Math.sin(a1) * uR, uZ0];
  addTri('parasolGris', p0, p1, [ux, uy, uZ1], 0.4);
  const rm = [ux + Math.cos(a0) * (uR * 0.94), uy + Math.sin(a0) * (uR * 0.94), uZ0 + 0.02];
  addBeam('hierro', [ux, uy, ZP + 2.66], rm, 0.025);
}

// Anillos concéntricos de ladrillo en el patio frente al parasol
for (const rRing of [3.2, 5.2, 7.2]) {
  const segs = 32;
  for (let k = 0; k < segs; k++) {
    const a0 = (k / segs) * Math.PI * 2, a1 = ((k + 1) / segs) * Math.PI * 2;
    const r0 = rRing, r1 = rRing + 0.24;
    addQuad('ladrillo',
      [ux + Math.cos(a0) * r0, uy + Math.sin(a0) * r0, ZP + 0.015],
      [ux + Math.cos(a0) * r1, uy + Math.sin(a0) * r1, ZP + 0.015],
      [ux + Math.cos(a1) * r1, uy + Math.sin(a1) * r1, ZP + 0.015],
      [ux + Math.cos(a1) * r0, uy + Math.sin(a1) * r0, ZP + 0.015],
      [0, 0], [0.3, 0], [0.3, 0.2], [0, 0.2]);
  }
}

// Mesas redondas y sillas bistró cilíndricas + 2 calefactores de patio cónicos
const bistroCoords = [
  [ux - 1.8, uy - 1.2], [ux + 1.6, uy - 1.3], [ux - 1.4, uy + 1.6],
  [-255.5, 264.5], [-259.5, 265.0], [-264.0, 264.5],
];
for (const [mx, my] of bistroCoords) {
  addCylinder('hierro', mx, my, ZP, ZP + 0.04, 0.26, 0.24, 12, 0.6, true);
  addCylinder('hierro', mx, my, ZP + 0.04, ZP + 0.72, 0.035, 0.035, 10, 0.6, false);
  addCylinder('hierro', mx, my, ZP + 0.72, ZP + 0.76, 0.44, 0.44, 16, 0.6, true);
  for (let c = 0; c < 3; c++) {
    const ca = (c / 3) * Math.PI * 2 + 0.4;
    const cx = mx + Math.cos(ca) * 0.72, cy = my + Math.sin(ca) * 0.72;
    addCylinder('hierro', cx, cy, ZP, ZP + 0.43, 0.025, 0.025, 8, 0.6, false);
    addCylinder('hierro', cx, cy, ZP + 0.43, ZP + 0.46, 0.22, 0.22, 12, 0.6, true);
    addCylinder('hierro', cx + Math.cos(ca) * 0.18, cy + Math.sin(ca) * 0.18, ZP + 0.46, ZP + 0.85, 0.04, 0.16, 8, 0.6, true);
  }
}
for (const [hx, hy] of [[ux - 0.6, uy + 2.4], [-257.5, 263.0]]) {
  addCylinder('hierro', hx, hy, ZP, ZP + 0.85, 0.24, 0.20, 14, 0.5, true);
  addCylinder('hierro', hx, hy, ZP + 0.85, ZP + 2.15, 0.045, 0.040, 10, 0.5, false);
  addCylinder('luzCalida', hx, hy, ZP + 1.92, ZP + 2.12, 0.11, 0.11, 12, 0.5, true);
  addCylinder('hierro', hx, hy, ZP + 2.12, ZP + 2.24, 0.44, 0.08, 16, 0.5, true);
}

// 7. BALCÓN IZQUIERDO ESCALONADO (esquina oeste de la fachada principal)
// retirado: ese bloque ahora es el modelo de Revit, que trae sus propios balcones

// Escribir GLB
const prims = [];
for (const [, m] of Object.entries(mats)) {
  if (!m.I.length) continue;
  const matIdx = g.j.materials.length;
  g.j.materials.push(m.def);
  const attrs = {
    POSITION: g.acc(new Float32Array(m.P), 'VEC3', { target: 34962, minmax: true }),
    NORMAL: g.acc(new Float32Array(m.N), 'VEC3', { target: 34962 }),
  };
  if (m.hasUV) attrs.TEXCOORD_0 = g.acc(new Float32Array(m.UV), 'VEC2', { target: 34962 });
  prims.push({
    attributes: attrs,
    indices: g.acc(m.n > 65535 ? new Uint32Array(m.I) : new Uint16Array(m.I), 'SCALAR', { target: 34963 }),
    material: matIdx,
  });
}
g.j.meshes.push({ name: 'Hotel_Plazoleta', primitives: prims });
g.j.nodes.push({ name: 'Hotel_Plazoleta', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/hotel_plazoleta.glb');
copyFileSync('public/secciones/hotel_plazoleta.glb', 'docs/secciones/hotel_plazoleta.glb');
console.log('hotel_plazoleta.glb UV+PBR generado:', (bytes / 1024).toFixed(1), 'KB');

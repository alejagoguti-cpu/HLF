/**
 * Modela en 3D UV+PBR ultra realista la manzana de la Ak 15 x Calle 127 (al oriente del Hotel):
 *   - Edificio 2269: local esquinero con letreros reales "Pan Pa' Ya!", "OLIMPICA", "LAVANDERIA",
 *     valla publicitaria alta "UNIVERSAE", motos parqueadas, carros parqueados y bicicleta
 *   - Edificio 365: torre moderna gris/carbón con ventanales horizontales de vidrio reflectivo PBR
 *   - Edificios 171 y 164: edificios en ladrillo real PBR con ventanas trapezoidales en voladizo
 *   - Edificios 165, 358, 162: fachada moderna con marcos oscuros, fachaleta ocre PBR y barandas en vidrio
 * -> public/secciones/esquina_ak15.glb y docs/secciones/esquina_ak15.glb
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { Glb } from './glb-writer.mjs';
import { encodePng } from './pbr-textures.mjs';
import { CONSTRUCTORES } from '../../.gemini/antigravity/scratch/vehiculos-colombia/vehiculos.js';

// Leer malla de suelo_Andenes.glb / suelo_Terreno.glb para apoyar vehículos parqueados sobre el pavimento real
const ioSuelo = new NodeIO();
const docAnden = await ioSuelo.read('public/secciones/suelo_Andenes.glb');
const sueloTris = [];
for (const n of docAnden.getRoot().listNodes()) {
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
      if (mxX >= -140 && mnX <= -100 && mxY >= 235 && mnY <= 285) sueloTris.push([a, b, c, mnX, mxX, mnY, mxY]);
    }
  }
}
function sueloZ(e, n, fallback = 4.65) {
  for (const [a, b, c, mnX, mxX, mnY, mxY] of sueloTris) {
    if (e < mnX || e > mxX || n < mnY || n > mxY) continue;
    const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
    if (Math.abs(d) < 1e-6) continue;
    const w1 = ((b[1] - c[1]) * (e - c[0]) + (c[0] - b[0]) * (n - c[1])) / d;
    const w2 = ((c[1] - a[1]) * (e - c[0]) + (a[0] - c[0]) * (n - c[1])) / d;
    const w3 = 1 - w1 - w2;
    if (w1 >= -0.05 && w2 >= -0.05 && w3 >= -0.05) return w1 * a[2] + w2 * b[2] + w3 * c[2];
  }
  return fallback;
}

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const IDS = new Set([2269, 365, 171, 165, 358, 162, 164, 1364, 1375]);
const BLDS = DATA.edificios.filter((b) => IDS.has(b.id));
if (!BLDS.length) throw new Error('No se encontraron edificios de la esquina Ak 15');

const ladrilloBytes = readFileSync('public/secciones/tex_ladrillo.webp');

// Fuente pixel/vectorial gruesa para carteles nítidos (Pan Pa' Ya!, OLIMPICA, UNIVERSAE)
const GLYPHS = {
  A: ['01110','10001','10001','11111','10001','10001','10001'],
  B: ['11110','10001','10001','11110','10001','10001','11110'],
  C: ['01111','10000','10000','10000','10000','10000','01111'],
  D: ['11110','10001','10001','10001','10001','10001','11110'],
  E: ['11111','10000','10000','11110','10000','10000','11111'],
  I: ['11111','00100','00100','00100','00100','00100','11111'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  M: ['10001','11011','10101','10001','10001','10001','10001'],
  N: ['10001','11001','10101','10011','10001','10001','10001'],
  O: ['01110','10001','10001','10001','10001','10001','01110'],
  P: ['11110','10001','10001','11110','10000','10000','10000'],
  R: ['11110','10001','10001','11110','10100','10010','10001'],
  S: ['01111','10000','10000','01110','00001','00001','11110'],
  T: ['11111','00100','00100','00100','00100','00100','00100'],
  U: ['10001','10001','10001','10001','10001','10001','01110'],
  V: ['10001','10001','10001','10001','10001','01010','00100'],
  Y: ['10001','10001','01010','00100','00100','00100','00100'],
  "'": ['00100','00100','00000','00000','00000','00000','00000'],
  '!': ['00100','00100','00100','00100','00100','00000','00100'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000'],
};

function makeSignPng(bgRgb, fgRgb, borderRgb, text, w = 256, h = 64) {
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const border = x < 4 || x >= w - 4 || y < 4 || y >= h - 4;
    const c = border ? borderRgb : bgRgb;
    const i = (y * w + x) * 4;
    buf[i] = c[0]; buf[i + 1] = c[1]; buf[i + 2] = c[2]; buf[i + 3] = 255;
  }
  const str = text.toUpperCase();
  const scale = Math.max(3, Math.floor((w - 24) / (str.length * 6)));
  const totalW = str.length * 6 * scale - scale;
  const ox = Math.floor((w - totalW) * 0.5);
  const oy = Math.floor((h - 7 * scale) * 0.5);
  for (let ci = 0; ci < str.length; ci++) {
    const g = GLYPHS[str[ci]] || GLYPHS[' '];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
      if (g[r][c] !== '1') continue;
      for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
        const px = ox + ci * 6 * scale + c * scale + dx;
        const py = oy + r * scale + dy;
        if (px >= 0 && px < w && py >= 0 && py < h) {
          const i = (py * w + px) * 4;
          buf[i] = fgRgb[0]; buf[i + 1] = fgRgb[1]; buf[i + 2] = fgRgb[2];
        }
      }
    }
  }
  return encodePng(w, h, buf);
}

function makePbrSet(fn, S = 128, nStrength = 2.4) {
  const alb = Buffer.alloc(S * S * 4), nrm = Buffer.alloc(S * S * 4), mr = Buffer.alloc(S * S * 4);
  const h = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const [r, g, b, rough, metal, hv] = fn(x / S, y / S);
    const i = (y * S + x) * 4;
    alb[i] = Math.round(r * 255); alb[i + 1] = Math.round(g * 255); alb[i + 2] = Math.round(b * 255); alb[i + 3] = 255;
    mr[i] = 0; mr[i + 1] = Math.round(rough * 255); mr[i + 2] = Math.round(metal * 255); mr[i + 3] = 255;
    h[y * S + x] = hv;
  }
  for (let y = 0; y < S; y++) {
    const ym = (y - 1 + S) % S, yp = (y + 1) % S;
    for (let x = 0; x < S; x++) {
      const xm = (x - 1 + S) % S, xp = (x + 1) % S;
      const dx = (h[y * S + xp] - h[y * S + xm]) * nStrength;
      const dy = (h[yp * S + x] - h[ym * S + x]) * nStrength;
      let nx = -dx, ny = -dy, nz = 1;
      const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
      const i = (y * S + x) * 4;
      nrm[i] = Math.round((nx * 0.5 + 0.5) * 255);
      nrm[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      nrm[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      nrm[i + 3] = 255;
    }
  }
  return { alb: encodePng(S, S, alb), nrm: encodePng(S, S, nrm), mr: encodePng(S, S, mr) };
}

const pLad = makePbrSet((u, v) => {
  const row = Math.floor(v * 8), rv = (v * 8) % 1, ru = ((u * 4) + (row % 2) * 0.5) % 1;
  const m = (rv < 0.12 || rv > 0.94 || ru < 0.06 || ru > 0.97) ? 0 : 1;
  return [0.7, 0.4, 0.3, m ? 0.78 : 0.94, 0.0, m * 0.75];
});
const pCon = makePbrSet((u, v) => {
  const j = ((v * 4) % 1) < 0.05 ? 0.82 : 1.0;
  const n = Math.sin(u * 47) * Math.cos(v * 63) * 0.03;
  const c = (0.80 + n) * j;
  return [c, c * 0.99, c * 0.97, 0.76, 0.0, j * 0.7 + n * 2];
});
const pOscuro = makePbrSet((u, v) => {
  const n = Math.sin(u * 53 + v * 37) * 0.02;
  return [0.18 + n, 0.19 + n, 0.21 + n, 0.48, 0.25, 0.5 + n * 4];
});
const pFach = makePbrSet((u, v) => {
  const rv = (v * 6) % 1, ru = (u * 3) % 1;
  const j = (rv < 0.07 || ru < 0.04) ? 0.72 : 1.0;
  const g = Math.sin(u * 60 + v * 15) * 0.03;
  return [(0.74 + g) * j, (0.54 + g) * j, (0.34 + g) * j, 0.62, 0.05, j * 0.75];
});
const pVid = makePbrSet((u, v) => {
  const mullion = (u < 0.025 || u > 0.975 || Math.abs(u - 0.5) < 0.015 || v < 0.03 || v > 0.97);
  if (mullion) return [0.16, 0.17, 0.19, 0.30, 0.85, 0.9];
  // Gradiente realista: reflejo de cielo azul/cálido arriba + profundidad interior cálida abajo
  const skyGrad = Math.max(0, 1.0 - v * 1.15);
  const warmInt = (Math.sin(u * 12.56) * 0.5 + 0.5) * 0.12 * (1.0 - skyGrad);
  return [
    0.16 + skyGrad * 0.24 + warmInt * 1.2,
    0.24 + skyGrad * 0.30 + warmInt * 0.95,
    0.32 + skyGrad * 0.36 + warmInt * 0.55,
    0.04, 0.48, 0.2,
  ];
});

const g = new Glb();
const tLadBase = g.image(ladrilloBytes, 'image/webp');
const tLadN = g.image(pLad.nrm, 'image/png'), tLadMR = g.image(pLad.mr, 'image/png');
const tConB = g.image(pCon.alb, 'image/png'), tConN = g.image(pCon.nrm, 'image/png'), tConMR = g.image(pCon.mr, 'image/png');
const tOscB = g.image(pOscuro.alb, 'image/png'), tOscN = g.image(pOscuro.nrm, 'image/png'), tOscMR = g.image(pOscuro.mr, 'image/png');
const tFachB = g.image(pFach.alb, 'image/png'), tFachN = g.image(pFach.nrm, 'image/png'), tFachMR = g.image(pFach.mr, 'image/png');
const tVidB = g.image(pVid.alb, 'image/png'), tVidN = g.image(pVid.nrm, 'image/png'), tVidMR = g.image(pVid.mr, 'image/png');

const tPanPaYa = g.image(makeSignPng([195, 22, 28], [255, 245, 235], [245, 210, 80], "PAN PA' YA!"), 'image/png');
const tOlimpica = g.image(makeSignPng([22, 68, 165], [255, 255, 255], [215, 32, 32], 'OLIMPICA'), 'image/png');
const tUniversae = g.image(makeSignPng([18, 42, 92], [255, 255, 255], [240, 185, 40], 'UNIVERSAE'), 'image/png');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mkMat = (name, b, n, mr, factor = [1, 1, 1, 1], met = 0.0, extra = {}) => ({
  P: [], N: [], UV: [], I: [], n: 0,
  def: {
    name, doubleSided: true,
    ...(n !== null ? { normalTexture: { index: n, scale: 1.0 } } : {}),
    pbrMetallicRoughness: {
      baseColorTexture: { index: b },
      baseColorFactor: factor,
      ...(mr !== null ? { metallicRoughnessTexture: { index: mr } } : {}),
      metallicFactor: met,
      roughnessFactor: mr !== null ? 1.0 : 0.45,
    },
    ...extra,
  },
});

const mats = {
  ladrillo: mkMat('LadrilloAk15PBR', tLadBase, tLadN, tLadMR, [0.95, 0.78, 0.68, 1], 0.0),
  concreto: mkMat('EstucoConcretoPBR', tConB, tConN, tConMR, [1, 1, 1, 1], 0.0),
  oscuro: mkMat('MarcoOscuroPBR', tOscB, tOscN, tOscMR, [1, 1, 1, 1], 1.0),
  fachaleta: mkMat('FachaletaOcrePBR', tFachB, tFachN, tFachMR, [1, 1, 1, 1], 1.0),
  vidrio: mkMat('VidrioAk15PBR', tVidB, tVidN, tVidMR, [1, 1, 1, 1], 1.0, { emissiveFactor: [0.04, 0.05, 0.06] }),
  panpaya: mkMat('CartelPanPaYa', tPanPaYa, null, null, [1, 1, 1, 1], 0.0, { emissiveFactor: [0.18, 0.04, 0.04] }),
  olimpica: mkMat('CartelOlimpica', tOlimpica, null, null, [1, 1, 1, 1], 0.0, { emissiveFactor: [0.04, 0.08, 0.18] }),
  universae: mkMat('VallaUniversae', tUniversae, null, null, [1, 1, 1, 1], 0.0, { emissiveFactor: [0.08, 0.12, 0.22] }),
  pinturaRoja: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'VehiculoRojoPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.80, 0.10, 0.12, 1], metallicFactor: 0.72, roughnessFactor: 0.16 } } },
  pinturaAzul: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'VehiculoAzulPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.12, 0.30, 0.65, 1], metallicFactor: 0.72, roughnessFactor: 0.16 } } },
  pinturaPlata: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'VehiculoPlataPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.82, 0.84, 0.88, 1], metallicFactor: 0.78, roughnessFactor: 0.16 } } },
  pinturaBlanca: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'VehiculoBlancoPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.94, 0.94, 0.95, 1], metallicFactor: 0.55, roughnessFactor: 0.18 } } },
  rinAluminio: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'RinAluminioPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.86, 0.88, 0.92, 1], metallicFactor: 0.95, roughnessFactor: 0.18 } } },
  llanta: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'LlantaCauchoPBR', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.10, 0.11, 0.12, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } } },
};

function addQuad(mat, a, b, c, d, uva = [0, 0], uvb = [1, 0], uvc = [1, 1], uvd = [0, 1]) {
  const m = mats[mat];
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const L = Math.hypot(nx, ny, nz) || 1; nx /= L; ny /= L; nz /= L;
  const base = m.n;
  const pts = [a, b, c, d], uvs = [uva, uvb, uvc, uvd];
  for (let i = 0; i < 4; i++) {
    m.P.push(pts[i][0], pts[i][2], -pts[i][1]);
    m.N.push(nx, nz, -ny);
    m.UV.push(uvs[i][0], uvs[i][1]);
    m.n++;
  }
  m.I.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

function addBox(mat, e0, n0, z0, e1, n1, z1, uvScale = 0.25) {
  const w = Math.abs(e1 - e0) * uvScale, d = Math.abs(n1 - n0) * uvScale, h = Math.abs(z1 - z0) * uvScale;
  addQuad(mat, [e0, n0, z1], [e1, n0, z1], [e1, n1, z1], [e0, n1, z1], [0, 0], [w, 0], [w, d], [0, d]);
  addQuad(mat, [e0, n0, z0], [e1, n0, z0], [e1, n0, z1], [e0, n0, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e1, n0, z0], [e1, n1, z0], [e1, n1, z1], [e1, n0, z1], [0, 0], [d, 0], [d, h], [0, h]);
  addQuad(mat, [e1, n1, z0], [e0, n1, z0], [e0, n1, z1], [e1, n1, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e0, n1, z0], [e0, n0, z0], [e0, n0, z1], [e0, n1, z1], [0, 0], [d, 0], [d, h], [0, h]);
}

// Inserta un modelo de vehiculos.js (moto, sedan, suv, bici) posicionado y rotado en ENU
function placeVehiculosModel(tipo, cx, cy, cz, yawRad, paintMat) {
  const geoms = CONSTRUCTORES[tipo](0);
  const cyaw = Math.cos(yawRad), syaw = Math.sin(yawRad);
  for (const [k, geo] of Object.entries(geoms)) {
    const mat = k === 'glass' ? 'vidrio' : k === 'rubber' ? 'llanta' : (k === 'rim' || k === 'chrome') ? 'rinAluminio' : (k === 'body' ? paintMat : 'oscuro');
    const m = mats[mat];
    const pos = geo.attributes.position, nrm = geo.attributes.normal, idx = geo.index;
    const base = m.n;
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i), ly = pos.getY(i), lz = pos.getZ(i);
      const wx = cx + lx * cyaw - lz * syaw;
      const wy = cy + lx * syaw + lz * cyaw;
      m.P.push(wx, cz + ly, -wy);
      const nx = nrm ? nrm.getX(i) : 0, ny = nrm ? nrm.getY(i) : 1, nz = nrm ? nrm.getZ(i) : 0;
      m.N.push(nx * cyaw - nz * syaw, ny, -(nx * syaw + nz * cyaw));
      m.UV.push(0.5, 0.5);
      m.n++;
    }
    if (idx) for (let i = 0; i < idx.count; i++) m.I.push(base + idx.getX(i));
    else for (let i = 0; i < pos.count; i++) m.I.push(base + i);
  }
}

const area = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
};

for (const b of BLDS) {
  let ring = b.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b.b, zTop = b.b + b.h;
  const floors = Math.max(1, Math.round(b.h / 3.0));
  const flH = b.h / floors;

  // Cubierta plana con pretil
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const roofMat = (b.id === 171 || b.id === 164) ? 'ladrillo' : 'concreto';
  const mR = mats[roofMat], rBase = mR.n;
  for (const p of ring) {
    mR.P.push(p[0], zTop + 0.12, -p[1]); mR.N.push(0, 1, 0); mR.UV.push(p[0] * 0.25, p[1] * 0.25); mR.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mR.I.push(rBase + tris[i], rBase + tris[i + 1], rBase + tris[i + 2]);

  const style = b.id === 2269 || b.id === 1364 || b.id === 1375 ? 'comercial'
    : (b.id === 171 || b.id === 164) ? 'ladrillo'
    : b.id === 365 ? 'modernoGris'
    : 'fachaleta';

  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    const wallMat = style === 'ladrillo' ? 'ladrillo' : style === 'fachaleta' ? 'fachaleta' : 'concreto';
    addQuad(wallMat, pt(0, 0.10, zBase), pt(L, 0.10, zBase), pt(L, 0.10, zTop), pt(0, 0.10, zTop),
      [0, 0], [L * 0.35, 0], [L * 0.35, b.h * 0.35], [0, b.h * 0.35]);

    if (style === 'comercial') {
      // Vitrina acristalada en planta baja
      const bays = Math.max(1, Math.floor((L - 1.5) / 3.8));
      const bw = (L - 1.5) / bays;
      for (let k = 0; k < bays; k++) {
        const s0 = 0.75 + k * bw + 0.25, s1 = 0.75 + (k + 1) * bw - 0.25;
        addQuad('oscuro', pt(s0 - 0.06, 0.15, zBase + 0.2), pt(s1 + 0.06, 0.15, zBase + 0.2), pt(s1 + 0.06, 0.15, zBase + 2.3), pt(s0 - 0.06, 0.15, zBase + 2.3));
        addQuad('vidrio', pt(s0, 0.19, zBase + 0.28), pt(s1, 0.19, zBase + 0.28), pt(s1, 0.19, zBase + 2.22), pt(s0, 0.19, zBase + 2.22), [0, 0], [2, 0], [2, 1], [0, 1]);
      }
      continue;
    }

    const bays = Math.max(1, Math.floor((L - 1.8) / 4.2));
    const bw = (L - 1.8) / bays;
    for (let fl = 0; fl < floors; fl++) {
      const fz0 = zBase + fl * flH;
      if (style === 'fachaleta') {
        // Marcos horizontales oscuros entrelazados (foto 12754 Ak 15)
        addQuad('oscuro', pt(0, 0.28, fz0), pt(L, 0.28, fz0), pt(L, 0.28, fz0 + 0.42), pt(0, 0.28, fz0 + 0.42));
      }
      for (let k = 0; k < bays; k++) {
        const s0 = 0.9 + k * bw + 0.30, s1 = 0.9 + (k + 1) * bw - 0.30;
        if (s1 - s0 < 1.0) continue;
        if (style === 'ladrillo' && k % 2 === 0 && L > 8) {
          // Ventana trapezoidal en voladizo (bay window, foto 12746 Ak 15)
          const sm = (s0 + s1) * 0.5, hw = (s1 - s0) * 0.35;
          addQuad('vidrio', pt(s0, 0.16, fz0 + 0.7), pt(sm - hw, 0.65, fz0 + 0.7), pt(sm - hw, 0.65, fz0 + flH - 0.3), pt(s0, 0.16, fz0 + flH - 0.3));
          addQuad('vidrio', pt(sm - hw, 0.65, fz0 + 0.7), pt(sm + hw, 0.65, fz0 + 0.7), pt(sm + hw, 0.65, fz0 + flH - 0.3), pt(sm - hw, 0.65, fz0 + flH - 0.3), [0, 0], [2, 0], [2, 1], [0, 1]);
          addQuad('vidrio', pt(sm + hw, 0.65, fz0 + 0.7), pt(s1, 0.16, fz0 + 0.7), pt(s1, 0.16, fz0 + flH - 0.3), pt(sm + hw, 0.65, fz0 + flH - 0.3));
        } else {
          addQuad('oscuro', pt(s0 - 0.06, 0.16, fz0 + 0.75), pt(s1 + 0.06, 0.16, fz0 + 0.75), pt(s1 + 0.06, 0.16, fz0 + flH - 0.32), pt(s0 - 0.06, 0.16, fz0 + flH - 0.32));
          addQuad('vidrio', pt(s0, 0.21, fz0 + 0.82), pt(s1, 0.21, fz0 + 0.82), pt(s1, 0.21, fz0 + flH - 0.38), pt(s0, 0.21, fz0 + flH - 0.38), [0, 0], [2, 0], [2, 1], [0, 1]);
          if (style === 'fachaleta' && k % 2 === 1) {
            // Baranda de vidrio en balcones
            addQuad('vidrio', pt(s0, 0.45, fz0 + 0.42), pt(s1, 0.45, fz0 + 0.42), pt(s1, 0.45, fz0 + 1.25), pt(s0, 0.45, fz0 + 1.25));
          }
        }
      }
    }
  }
}

// ELEMENTOS ESQUINEROS REALES DE 1272 Ak 15 (pegados a la fachada real de 2269, sin flotar ni invertirse):
const ZC = 4.23;
const addWallSign = (mat, x0, y0, x1, y1, z0, z1) => {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
  // Normal exterior hacia la calle (+ny, -nx)
  const nx = -dy / L * 0.18, ny = dx / L * 0.18;
  addQuad(mat, [x0 + nx, y0 + ny, z0], [x1 + nx, y1 + ny, z0], [x1 + nx, y1 + ny, z1], [x0 + nx, y0 + ny, z1], [0, 1], [1, 1], [1, 0], [0, 0]);
};
// 1. OLIMPICA en cara occidental (-121.32, 272.22 -> -121.81, 259.67), leyendo de Norte (izq) a Sur (der)
addWallSign('olimpica', -121.38, 271.2, -121.76, 260.4, ZC + 2.35, ZC + 3.45);
// 2. PAN PA' YA! en la esquina real (-118.82, 259.54 -> -119.05, 253.55 -> -110.17, 253.20)
addWallSign('panpaya', -118.84, 259.1, -119.03, 253.8, ZC + 2.35, ZC + 3.45);
addWallSign('panpaya', -118.8, 253.54, -110.5, 253.22, ZC + 2.35, ZC + 3.45);

// 3. Valla publicitaria alta "UNIVERSAE" sobre el techo de la esquina
addBox('oscuro', -117.2, 256.8, ZC + 3.1, -116.7, 257.3, ZC + 10.6, 0.5);
addQuad('universae', [-120.2, 256.6, ZC + 9.6], [-113.8, 256.6, ZC + 9.6], [-113.8, 256.6, ZC + 13.0], [-120.2, 256.6, ZC + 13.0], [0, 1], [1, 1], [1, 0], [0, 0]);
addQuad('universae', [-113.8, 256.9, ZC + 9.6], [-120.2, 256.9, ZC + 9.6], [-120.2, 256.9, ZC + 13.0], [-113.8, 256.9, ZC + 13.0], [0, 1], [1, 1], [1, 0], [0, 0]);

// 4. Motos parqueadas sobre el pavimento real frente a Pan Pa' Ya! (8 motos)
const motoColors = ['pinturaRoja', 'pinturaAzul', 'oscuro', 'pinturaPlata'];
for (let i = 0; i < 8; i++) {
  const mx = -121.4, my = 254.0 + i * 0.72;
  placeVehiculosModel('moto', mx, my, sueloZ(mx, my) + 0.04, Math.PI * 0.42, motoColors[i % motoColors.length]);
}

// 5. Carros parqueados sobre el pavimento real frente a Olímpica / Lavandería (5 carros)
const carSpecs = [
  ['sedan', -124.2, 260.8, 'pinturaRoja'],
  ['suv', -124.2, 263.4, 'pinturaPlata'],
  ['hatch', -124.2, 266.0, 'pinturaBlanca'],
  ['sedan', -124.2, 268.6, 'pinturaAzul'],
  ['suv', -124.2, 271.2, 'pinturaPlata'],
];
for (const [tp, cx, cy, col] of carSpecs) {
  placeVehiculosModel(tp, cx, cy, sueloZ(cx, cy) + 0.04, Math.PI * 0.5, col);
}

// 6. Bicicleta parqueada junto al local
placeVehiculosModel('bici', -122.6, 272.2, sueloZ(-122.6, 272.2) + 0.04, 0.15, 'pinturaAzul');

const prims = [];
for (const [, m] of Object.entries(mats)) {
  if (!m.I.length) continue;
  const matIdx = g.j.materials.length;
  g.j.materials.push(m.def);
  prims.push({
    attributes: {
      POSITION: g.acc(new Float32Array(m.P), 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(new Float32Array(m.N), 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(new Float32Array(m.UV), 'VEC2', { target: 34962 }),
    },
    indices: g.acc(m.n > 65535 ? new Uint32Array(m.I) : new Uint16Array(m.I), 'SCALAR', { target: 34963 }),
    material: matIdx,
  });
}
g.j.meshes.push({ name: 'Esquina_Ak15_PBR', primitives: prims });
g.j.nodes.push({ name: 'Esquina_Ak15_PBR', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/esquina_ak15.glb');
copyFileSync('public/secciones/esquina_ak15.glb', 'docs/secciones/esquina_ak15.glb');
console.log('esquina_ak15.glb UV+PBR generado:', (bytes / 1024).toFixed(1), 'KB');

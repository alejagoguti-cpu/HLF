/**
 * Modela en 3D la plazoleta, escaleras, estructura metálica (marquesina y pérgola),
 * rejas perimetrales, piso adoquinado radial y balcón izquierdo del Hotel Estelar La Fontana
 * -> public/secciones/hotel_plazoleta.glb
 */
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const g = new Glb();
const andenBytes = readFileSync('public/secciones/tex_anden.webp');
const andenTexIdx = g.image(andenBytes, 'image/webp');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mats = {
  adoquin: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: true,
    def: {
      name: 'PisoAdoquin',
      doubleSided: true,
      pbrMetallicRoughness: {
        baseColorTexture: { index: andenTexIdx },
        baseColorFactor: [0.88, 0.75, 0.68, 1],
        metallicFactor: 0.0,
        roughnessFactor: 0.85,
      },
    },
  },
  ladrillo: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'LadrilloPlaza', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.64, 0.36, 0.26, 1], metallicFactor: 0.0, roughnessFactor: 0.86 } },
  },
  hierro: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'HierroNegro', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.10, 0.11, 0.13, 1], metallicFactor: 0.82, roughnessFactor: 0.34 } },
  },
  lona: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'LonaBlanca', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.92, 0.90, 0.86, 1], metallicFactor: 0.0, roughnessFactor: 0.72 }, emissiveFactor: [0.08, 0.06, 0.04] },
  },
  dorado: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'BronceLetrero', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.78, 0.62, 0.30, 1], metallicFactor: 0.85, roughnessFactor: 0.28 } },
  },
  luzCalida: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'FocoCalido', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1.0, 0.82, 0.48, 1], metallicFactor: 0.0, roughnessFactor: 0.2 }, emissiveFactor: [1.0, 0.72, 0.34] },
  },
  cipres: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'CipresVerde', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.16, 0.33, 0.12, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } },
  },
  materaBeige: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'MateraBeige', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.74, 0.70, 0.63, 1], metallicFactor: 0.0, roughnessFactor: 0.84 } },
  },
  parasolGris: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'ParasolOscuro', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.22, 0.22, 0.25, 1], metallicFactor: 0.05, roughnessFactor: 0.72 } },
  },
  vidrioBaranda: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'VidrioBaranda', doubleSided: true, alphaMode: 'BLEND', pbrMetallicRoughness: { baseColorFactor: [0.68, 0.80, 0.88, 0.32], metallicFactor: 0.1, roughnessFactor: 0.12 } },
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

function addTri(mat, a, b, c) {
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
    if (m.hasUV) m.UV.push(0, 0);
    m.n++;
  }
  m.I.push(base, base + 1, base + 2);
}

function addBox(mat, e0, n0, z0, e1, n1, z1, uvScale = 0.25) {
  const w = Math.abs(e1 - e0) * uvScale, d = Math.abs(n1 - n0) * uvScale, h = Math.abs(z1 - z0) * uvScale;
  addQuad(mat, [e0, n0, z1], [e1, n0, z1], [e1, n1, z1], [e0, n1, z1], [0, 0], [w, 0], [w, d], [0, d]);
  addQuad(mat, [e0, n0, z0], [e1, n0, z0], [e1, n0, z1], [e0, n0, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e1, n0, z0], [e1, n1, z0], [e1, n1, z1], [e1, n0, z1], [0, 0], [d, 0], [d, h], [0, h]);
  addQuad(mat, [e1, n1, z0], [e0, n1, z0], [e0, n1, z1], [e1, n1, z1], [0, 0], [w, 0], [w, h], [0, h]);
  addQuad(mat, [e0, n1, z0], [e0, n0, z0], [e0, n0, z1], [e0, n1, z1], [0, 0], [d, 0], [d, h], [0, h]);
}

function addBeam(mat, a, b, r = 0.04) {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
  const L = Math.hypot(dx, dy, dz) || 1;
  const ux = -dy / L * r, uy = dx / L * r;
  addQuad(mat, [a[0] - ux, a[1] - uy, a[2]], [a[0] + ux, a[1] + uy, a[2]], [b[0] + ux, b[1] + uy, b[2]], [b[0] - ux, b[1] - uy, b[2]]);
  addQuad(mat, [a[0], a[1], a[2] - r], [a[0], a[1], a[2] + r], [b[0], b[1], b[2] + r], [b[0], b[1], b[2] - r]);
}

const ZP = 4.17; // Cota de la plazoleta de acceso
const CX = -224.5; // Centro del acceso principal

// 1. PISO ADOQUINADO DE LA PLAZOLETA Y ANILLOS DE PIEDRA ALREDEDOR DE LA FUENTE
addBox('adoquin', -276, 254.5, ZP - 0.15, -195, 276.5, ZP + 0.03, 0.22);
// Anillos concéntricos alrededor de la fuente (-225, 263.5)
for (const rad of [5.4, 7.6, 9.8]) {
  const SEG = 28;
  for (let i = 0; i < SEG; i++) {
    const a0 = (i / SEG) * Math.PI * 2, a1 = ((i + 1) / SEG) * Math.PI * 2;
    const x0 = -225 + Math.cos(a0) * rad, y0 = 263.5 + Math.sin(a0) * rad;
    const x1 = -225 + Math.cos(a1) * rad, y1 = 263.5 + Math.sin(a1) * rad;
    const x0o = -225 + Math.cos(a0) * (rad + 0.25), y0o = 263.5 + Math.sin(a0) * (rad + 0.25);
    const x1o = -225 + Math.cos(a1) * (rad + 0.25), y1o = 263.5 + Math.sin(a1) * (rad + 0.25);
    addQuad('ladrillo', [x0, y0, ZP + 0.045], [x1, y1, ZP + 0.045], [x1o, y1o, ZP + 0.045], [x0o, y0o, ZP + 0.045]);
  }
}

// 2. ESCALERAS DE ACCESO PRINCIPAL (7 peldaños amplios en ladrillo/piedra)
const STEPS = 7;
const stairW = 17.5;
const tread = 0.44;
const riser = 0.14;
for (let s = 0; s < STEPS; s++) {
  const nFront = 270.0 + s * tread;
  const zTop = ZP + (s + 1) * riser;
  addBox('ladrillo', CX - stairW * 0.5, nFront, ZP, CX + stairW * 0.5, nFront + tread + 0.05, zTop);
}
// Descanso superior hasta la puerta
addBox('ladrillo', CX - stairW * 0.5, 270.0 + STEPS * tread, ZP, CX + stairW * 0.5, 276.5, ZP + STEPS * riser);

// 3. ESTRUCTURA METÁLICA: MARQUESINA DE ACCESO + TENSORES + COLUMNAS + LUCES
const zCan = ZP + STEPS * riser + 3.15;
const canW = 14.8, canD = 3.6;
const nCan0 = 270.4, nCan1 = nCan0 + canD;
// Marco perimetral metálico y cubierta de la marquesina
addBox('hierro', CX - canW * 0.5, nCan0, zCan, CX + canW * 0.5, nCan1, zCan + 0.34);
// Placa dorada frontal "HOTEL ESTELAR LA FONTANA"
addBox('dorado', CX - 3.6, nCan0 - 0.03, zCan + 0.08, CX + 3.6, nCan0, zCan + 0.26);
// 4 columnas metálicas de soporte y rejas bajas de baranda en el descanso
for (let i = 0; i < 4; i++) {
  const px = CX - canW * 0.42 + (i / 3) * (canW * 0.84);
  addBox('hierro', px - 0.11, nCan0 + 0.25, ZP + STEPS * riser, px + 0.11, nCan0 + 0.47, zCan);
  // Tensor metálico diagonal hacia el muro superior del hotel
  addBeam('hierro', [px, nCan0 + 0.3, zCan + 0.32], [px, 276.6, zCan + 3.1], 0.045);
  // Farol cálido colgante bajo la marquesina
  addBox('luzCalida', px - 0.12, nCan0 + 0.45, zCan - 0.36, px + 0.12, nCan0 + 0.69, zCan - 0.08);
}
// Puntos de luz perimetrales bajo el borde de la marquesina
for (let x = CX - canW * 0.46; x <= CX + canW * 0.46; x += 1.15) {
  addBox('luzCalida', x - 0.05, nCan0 + 0.06, zCan - 0.04, x + 0.05, nCan0 + 0.16, zCan);
}

// 4. CIPRESES EN MACETA FLANQUEANDO LAS ESCALERAS (3 izquierda, 3 derecha)
for (const side of [-1, 1]) {
  for (let k = 0; k < 3; k++) {
    const tx = CX + side * (5.6 + k * 1.45);
    const ty = 270.4 + k * 0.35;
    const tz = ZP + 0.15;
    addBox('ladrillo', tx - 0.34, ty - 0.34, tz, tx + 0.34, ty + 0.34, tz + 0.55);
    // Copa piramidal orgánica (2 niveles)
    addBox('cipres', tx - 0.52, ty - 0.52, tz + 0.55, tx + 0.52, ty + 0.52, tz + 1.85);
    addBox('cipres', tx - 0.35, ty - 0.35, tz + 1.85, tx + 0.35, ty + 0.35, tz + 2.95);
    addBox('cipres', tx - 0.16, ty - 0.16, tz + 2.95, tx + 0.16, ty + 0.16, tz + 3.65);
  }
}

// 5. REJAS PERIMETRALES NEGRAS Y SARDINEL EN EL ESPACIO PÚBLICO (n ≈ 254.6)
const nReja = 254.6;
addBox('ladrillo', -276, nReja - 0.22, ZP - 0.1, -196, nReja + 0.22, ZP + 0.32); // Sardinel base
addBox('hierro', -276, nReja - 0.04, ZP + 0.42, -196, nReja + 0.04, ZP + 0.48); // Barra inferior
addBox('hierro', -276, nReja - 0.04, ZP + 1.55, -196, nReja + 0.04, ZP + 1.62); // Barra superior
for (let x = -276; x <= -196; x += 0.42) {
  // Dejar abertura de acceso vehicular en el centro-izquierda (-255..-244)
  if (x > -255 && x < -244) continue;
  addBox('hierro', x - 0.02, nReja - 0.02, ZP + 0.32, x + 0.02, nReja + 0.02, ZP + 1.68);
}

// 6. PÉRGOLA METÁLICA, PARASOL GIGANTE, MESAS BISTRÓ Y MATERAS DEL PATIO IZQUIERDO
const px0 = -271, px1 = -252, pn0 = 260, pn1 = 271.5, pzT = ZP + 3.15;
// Estructura metálica negra (4 módulos con vigas y columnas)
addBox('hierro', px0 - 0.12, pn0 - 0.12, pzT - 0.06, px1 + 0.12, pn0 + 0.08, pzT + 0.22);
addBox('hierro', px0 - 0.12, pn1 - 0.08, pzT - 0.06, px1 + 0.12, pn1 + 0.12, pzT + 0.22);
const bays = 4;
for (let i = 0; i <= bays; i++) {
  const sx = px0 + (px1 - px0) * (i / bays);
  addBox('hierro', sx - 0.09, pn0 - 0.09, pzT, sx + 0.09, pn1 + 0.09, pzT + 0.18);
  for (const sy of [pn0, pn1]) {
    addBox('hierro', sx - 0.10, sy - 0.10, ZP, sx + 0.10, sy + 0.10, pzT);
  }
}
// Lona blanca plegada por módulos + focos cálidos empotrados
for (let i = 0; i < bays; i++) {
  const bx0 = px0 + (px1 - px0) * (i / bays) + 0.12;
  const bx1 = px0 + (px1 - px0) * ((i + 1) / bays) - 0.12;
  const pleats = 4;
  for (let p = 0; p < pleats; p++) {
    const py0 = pn0 + 0.2 + ((pn1 - pn0 - 0.4) * p) / pleats;
    const py1 = pn0 + 0.2 + ((pn1 - pn0 - 0.4) * (p + 1)) / pleats;
    const pyM = (py0 + py1) * 0.5;
    addQuad('lona', [bx0, py0, pzT - 0.02], [bx1, py0, pzT - 0.02], [bx1, pyM, pzT - 0.22], [bx0, pyM, pzT - 0.22]);
    addQuad('lona', [bx0, pyM, pzT - 0.22], [bx1, pyM, pzT - 0.22], [bx1, py1, pzT - 0.02], [bx0, py1, pzT - 0.02]);
  }
  const lx = (bx0 + bx1) * 0.5;
  addBox('luzCalida', lx - 0.12, (pn0 + pn1) * 0.5 - 0.12, pzT - 0.24, lx + 0.12, (pn0 + pn1) * 0.5 + 0.12, pzT - 0.18);
}

// Fila de materas rectangulares beige con vegetación densa y baranda de vidrio al frente de la pérgola
for (let mx = px0; mx < px1 - 0.4; mx += 1.55) {
  addBox('materaBeige', mx + 0.04, pn0 - 0.72, ZP, mx + 1.48, pn0 - 0.14, ZP + 0.62);
  addBox('cipres', mx + 0.12, pn0 - 0.64, ZP + 0.62, mx + 1.40, pn0 - 0.22, ZP + 1.18);
}
addBox('vidrioBaranda', px0, pn0 - 0.08, ZP + 0.62, px1, pn0 - 0.03, ZP + 1.35);

// Parasol gigante octogonal con varillas radiales junto a la pérgola
const ux = -248.5, uy = 267.5;
addBox('hierro', ux - 0.35, uy - 0.35, ZP, ux + 0.35, uy + 0.35, ZP + 0.08);
addBox('hierro', ux - 0.09, uy - 0.09, ZP, ux + 0.09, uy + 0.09, ZP + 3.05);
addBox('luzCalida', ux - 0.18, uy - 0.18, ZP + 2.75, ux + 0.18, uy + 0.18, ZP + 2.86);
const uR = 3.95, uZ0 = ZP + 2.72, uZ1 = ZP + 3.65, uSeg = 8;
for (let k = 0; k < uSeg; k++) {
  const a0 = (k / uSeg) * Math.PI * 2;
  const a1 = ((k + 1) / uSeg) * Math.PI * 2;
  const p0 = [ux + Math.cos(a0) * uR, uy + Math.sin(a0) * uR, uZ0];
  const p1 = [ux + Math.cos(a1) * uR, uy + Math.sin(a1) * uR, uZ0];
  addTri('parasolGris', p0, p1, [ux, uy, uZ1]);
  // Varilla radial metálica inferior
  const rm = [ux + Math.cos(a0) * (uR * 0.94), uy + Math.sin(a0) * (uR * 0.94), uZ0 + 0.02];
  addQuad('hierro', [ux - 0.03, uy - 0.03, ZP + 2.65], [ux + 0.03, uy + 0.03, ZP + 2.65], rm, rm);
}

// Anillos concéntricos de adoquín en el patio frente al parasol
for (const rRing of [3.2, 5.2, 7.2]) {
  const segs = 28;
  for (let k = 0; k < segs; k++) {
    const a0 = (k / segs) * Math.PI * 2;
    const a1 = ((k + 1) / segs) * Math.PI * 2;
    const r0 = rRing, r1 = rRing + 0.24;
    addQuad('ladrillo',
      [ux + Math.cos(a0) * r0, uy + Math.sin(a0) * r0, ZP + 0.015],
      [ux + Math.cos(a0) * r1, uy + Math.sin(a0) * r1, ZP + 0.015],
      [ux + Math.cos(a1) * r1, uy + Math.sin(a1) * r1, ZP + 0.015],
      [ux + Math.cos(a1) * r0, uy + Math.sin(a1) * r0, ZP + 0.015]);
  }
}

// Mesas y sillas bistró bajo el parasol y la pérgola + 2 calefactores de patio
const bistroCoords = [
  [ux - 1.8, uy - 1.2], [ux + 1.6, uy - 1.3], [ux - 1.4, uy + 1.6],
  [-255.5, 264.5], [-259.5, 265.0], [-264.0, 264.5],
];
for (const [mx, my] of bistroCoords) {
  addBox('hierro', mx - 0.04, my - 0.04, ZP, mx + 0.04, my + 0.04, ZP + 0.72);
  addBox('hierro', mx - 0.42, my - 0.42, ZP + 0.72, mx + 0.42, my + 0.42, ZP + 0.76);
  for (let c = 0; c < 3; c++) {
    const ca = (c / 3) * Math.PI * 2 + 0.4;
    const cx = mx + Math.cos(ca) * 0.72, cy = my + Math.sin(ca) * 0.72;
    addBox('hierro', cx - 0.20, cy - 0.20, ZP, cx + 0.20, cy + 0.20, ZP + 0.44);
    addBox('hierro', cx - 0.20, cy + 0.14, ZP + 0.44, cx + 0.20, cy + 0.20, ZP + 0.84);
  }
}
for (const [hx, hy] of [[ux - 0.6, uy + 2.4], [-257.5, 263.0]]) {
  addBox('hierro', hx - 0.22, hy - 0.22, ZP, hx + 0.22, hy + 0.22, ZP + 0.85);
  addBox('hierro', hx - 0.05, hy - 0.05, ZP + 0.85, hx + 0.05, hy + 0.05, ZP + 2.15);
  addBox('luzCalida', hx - 0.10, hy - 0.10, ZP + 1.95, hx + 0.10, hy + 0.10, ZP + 2.12);
  addBox('hierro', hx - 0.40, hy - 0.40, ZP + 2.15, hx + 0.40, hy + 0.40, ZP + 2.22);
}

// 7. BALCÓN IZQUIERDO ESCALONADO (esquina oeste de la fachada principal, foto 4)
for (let fl = 1; fl <= 4; fl++) {
  const bz0 = ZP + fl * 3.05;
  addBox('ladrillo', -246.2, 276.8, bz0, -241.5, 280.4, bz0 + 1.05);
  addBox('luzCalida', -245.5, 277.4, bz0 + 1.06, -244.8, 278.0, bz0 + 1.25);
}

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
console.log('hotel_plazoleta.glb generado:', (bytes / 1024).toFixed(1), 'KB');

/**
 * Modela la cubierta arquitectónica de Unicentro Bogotá -> public/secciones/unicentro_cubierta.glb
 *
 * Incluye: losa/membrana limpia, antepecho perimetral, domo central acristalado,
 * galerías de tragaluces con perfilería metálica, cuartos técnicos / HVAC y
 * arreglos de paneles solares dentro de la huella real del edificio.
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const uni = DATA.edificios.find((b) => b.id === 1041) || DATA.edificios.find((b) => b.s === 'T12' && b.bb[0] < -50 && b.bb[2] > 40);
if (!uni) throw new Error('No se encontró el edificio de Unicentro en edificios.json');

const ring = uni.r;
const Z0 = +(uni.b + uni.h).toFixed(2); // ~12.65 m ENU

function pointInRing(x, y, r) {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function distToRing(x, y, r) {
  let best = Infinity;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [ax, ay] = r[j], [bx, by] = r[i];
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return best;
}

const safeInside = (e, n, margin = 7) => pointInRing(e, n, ring) && distToRing(e, n, ring) >= margin;
const rectInside = (e0, n0, e1, n1, margin = 7) =>
  safeInside(e0, n0, margin) && safeInside(e1, n0, margin) && safeInside(e1, n1, margin) && safeInside(e0, n1, margin) &&
  safeInside((e0 + e1) * 0.5, (n0 + n1) * 0.5, margin);

// Acumulador por material
const mats = {
  membrana: { P: [], N: [], I: [], n: 0, def: { name: 'Membrana', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.68, 0.67, 0.64, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } } },
  concreto: { P: [], N: [], I: [], n: 0, def: { name: 'Concreto', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.52, 0.51, 0.48, 1], metallicFactor: 0.0, roughnessFactor: 0.82 } } },
  metal: { P: [], N: [], I: [], n: 0, def: { name: 'Metal', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.16, 0.18, 0.21, 1], metallicFactor: 0.78, roughnessFactor: 0.34 } } },
  vidrio: { P: [], N: [], I: [], n: 0, def: { name: 'Vidrio', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.22, 0.42, 0.50, 1], metallicFactor: 0.15, roughnessFactor: 0.08 }, emissiveFactor: [0.05, 0.08, 0.10] } },
  solar: { P: [], N: [], I: [], n: 0, def: { name: 'Solar', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.08, 0.13, 0.24, 1], metallicFactor: 0.55, roughnessFactor: 0.16 } } },
  hvac: { P: [], N: [], I: [], n: 0, def: { name: 'HVAC', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.62, 0.64, 0.66, 1], metallicFactor: 0.42, roughnessFactor: 0.46 } } },
};

function addTri(mat, a, b, c) {
  const m = mats[mat];
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
  const L = Math.hypot(nx, ny, nz) || 1;
  nx /= L; ny /= L; nz /= L;
  const base = m.n;
  for (const p of [a, b, c]) {
    // ENU (e, n, z) -> glTF Y-up (e, z, -n)
    m.P.push(p[0], p[2], -p[1]);
    m.N.push(nx, nz, -ny);
    m.n++;
  }
  m.I.push(base, base + 1, base + 2);
}

function addQuad(mat, a, b, c, d) {
  addTri(mat, a, b, c);
  addTri(mat, a, c, d);
}

function addBox(mat, e0, n0, z0, e1, n1, z1) {
  addQuad(mat, [e0, n0, z1], [e1, n0, z1], [e1, n1, z1], [e0, n1, z1]); // top
  addQuad(mat, [e0, n0, z0], [e1, n0, z0], [e1, n0, z1], [e0, n0, z1]); // south
  addQuad(mat, [e1, n0, z0], [e1, n1, z0], [e1, n1, z1], [e1, n0, z1]); // east
  addQuad(mat, [e1, n1, z0], [e0, n1, z0], [e0, n1, z1], [e1, n1, z1]); // north
  addQuad(mat, [e0, n1, z0], [e0, n0, z0], [e0, n0, z1], [e0, n1, z1]); // west
}

// 1. Losa / membrana limpia sobre la huella
{
  const flat = [];
  for (const [e, n] of ring) flat.push(e, n);
  const tris = earcut(flat, [], 2);
  const m = mats.membrana;
  const base = m.n;
  for (const [e, n] of ring) {
    m.P.push(e, Z0 + 0.08, -n);
    m.N.push(0, 1, 0);
    m.n++;
  }
  for (let i = 0; i < tris.length; i += 3) {
    m.I.push(base + tris[i], base + tris[i + 1], base + tris[i + 2]);
  }
}

// 2. Antepecho perimetral (remate arquitectónico)
for (let i = 0; i < ring.length; i++) {
  const [e0, n0] = ring[i], [e1, n1] = ring[(i + 1) % ring.length];
  const L = Math.hypot(e1 - e0, n1 - n0);
  if (L < 0.2) continue;
  const inE = -(n1 - n0) / L * 0.45, inN = (e1 - e0) / L * 0.45;
  const zB = Z0 + 0.05, zT = Z0 + 1.15;
  addQuad('concreto', [e0, n0, zB], [e1, n1, zB], [e1, n1, zT], [e0, n0, zT]);
  addQuad('concreto', [e1 + inE, n1 + inN, zB], [e0 + inE, n0 + inN, zB], [e0 + inE, n0 + inN, zT], [e1 + inE, n1 + inN, zT]);
  addQuad('metal', [e0, n0, zT], [e1, n1, zT], [e1 + inE, n1 + inN, zT], [e0 + inE, n0 + inN, zT]);
}

// 3. Domo central acristalado (rotonda de Unicentro)
{
  const ce = -12, cn = 16;
  const R = 17, SEG = 18;
  const zCurb0 = Z0 + 0.08, zCurb1 = Z0 + 1.45, zApex = Z0 + 5.6;
  for (let i = 0; i < SEG; i++) {
    const a0 = (i / SEG) * Math.PI * 2, a1 = ((i + 1) / SEG) * Math.PI * 2;
    const x0 = ce + Math.cos(a0) * R, y0 = cn + Math.sin(a0) * R;
    const x1 = ce + Math.cos(a1) * R, y1 = cn + Math.sin(a1) * R;
    const mx0 = ce + Math.cos(a0) * R * 0.52, my0 = cn + Math.sin(a0) * R * 0.52;
    const mx1 = ce + Math.cos(a1) * R * 0.52, my1 = cn + Math.sin(a1) * R * 0.52;
    const zMid = zCurb1 + (zApex - zCurb1) * 0.62;
    // Tambor de concreto
    addQuad('concreto', [x0, y0, zCurb0], [x1, y1, zCurb0], [x1, y1, zCurb1], [x0, y0, zCurb1]);
    // Cúpula en 2 anillos de vidrio
    addQuad('vidrio', [x0, y0, zCurb1], [x1, y1, zCurb1], [mx1, my1, zMid], [mx0, my0, zMid]);
    addTri('vidrio', [mx0, my0, zMid], [mx1, my1, zMid], [ce, cn, zApex]);
    // Costilla metálica radial
    const dx = Math.cos(a0 + 0.02) * 0.14, dy = Math.sin(a0 + 0.02) * 0.14;
    addQuad('metal', [x0 - dy, y0 + dx, zCurb1 + 0.05], [x0 + dy, y0 - dx, zCurb1 + 0.05], [ce + dy, cn - dx, zApex + 0.08], [ce - dy, cn + dx, zApex + 0.08]);
  }
}

// 4. Galerías de tragaluces (naves norte y sur)
function addSkylightGallery(ce, nStart, nEnd, halfW) {
  const zB = Z0 + 0.08, zC = Z0 + 1.05, zR = Z0 + 3.2;
  const step = 6;
  for (let n = nStart; n < nEnd; n += step) {
    const n1 = Math.min(nEnd, n + step);
    if (!rectInside(ce - halfW, n, ce + halfW, n1, 7)) continue;
    // Muretes laterales
    addQuad('concreto', [ce - halfW, n, zB], [ce - halfW, n1, zB], [ce - halfW, n1, zC], [ce - halfW, n, zC]);
    addQuad('concreto', [ce + halfW, n1, zB], [ce + halfW, n, zB], [ce + halfW, n, zC], [ce + halfW, n1, zC]);
    // Dos aguas de vidrio
    addQuad('vidrio', [ce - halfW, n, zC], [ce - halfW, n1, zC], [ce, n1, zR], [ce, n, zR]);
    addQuad('vidrio', [ce + halfW, n1, zC], [ce + halfW, n, zC], [ce, n, zR], [ce, n1, zR]);
    // Costillas metálicas cada 6m
    addBox('metal', ce - halfW - 0.1, n - 0.12, zC, ce + halfW + 0.1, n + 0.12, zC + 0.18);
    addQuad('metal', [ce - halfW, n - 0.1, zC + 0.04], [ce - halfW, n + 0.1, zC + 0.04], [ce, n + 0.1, zR + 0.06], [ce, n - 0.1, zR + 0.06]);
    addQuad('metal', [ce + halfW, n + 0.1, zC + 0.04], [ce + halfW, n - 0.1, zC + 0.04], [ce, n - 0.1, zR + 0.06], [ce, n + 0.1, zR + 0.06]);
    // Cumbrera
    addBox('metal', ce - 0.15, n, zR - 0.05, ce + 0.15, n1, zR + 0.12);
  }
}
addSkylightGallery(-12, 38, 128, 6.5);
addSkylightGallery(-12, -108, -8, 6.5);

// 5. Equipos HVAC / cuartos técnicos en cubierta
for (let e = -70; e <= 45; e += 22) {
  for (let n = -110; n <= 135; n += 28) {
    if (Math.abs(e + 12) < 20) continue; // respeta la espina de tragaluces
    if (!rectInside(e - 5, n - 3.5, e + 5, n + 3.5, 11)) continue;
    if ((Math.abs(e + n) % 3) === 0) {
      // Unidad chiller + ducto
      addBox('concreto', e - 4.2, n - 2.6, Z0 + 0.08, e + 4.2, n + 2.6, Z0 + 0.35);
      addBox('hvac', e - 3.6, n - 2.0, Z0 + 0.35, e + 3.6, n + 2.0, Z0 + 2.1);
      addBox('metal', e - 3.2, n - 1.4, Z0 + 2.1, e - 0.6, n + 1.4, Z0 + 2.45);
      addBox('metal', e + 0.6, n - 1.4, Z0 + 2.1, e + 3.2, n + 1.4, Z0 + 2.45);
    } else {
      // Arreglo de paneles solares inclinados
      for (let row = -1; row <= 1; row++) {
        const y0 = n + row * 2.4;
        const zLo = Z0 + 0.38, zHi = Z0 + 0.95;
        addQuad('solar', [e - 4.5, y0 - 0.9, zLo], [e + 4.5, y0 - 0.9, zLo], [e + 4.5, y0 + 0.9, zHi], [e - 4.5, y0 + 0.9, zHi]);
        addBox('metal', e - 4.2, y0 + 0.75, Z0 + 0.08, e - 4.0, y0 + 0.9, zHi);
        addBox('metal', e + 4.0, y0 + 0.75, Z0 + 0.08, e + 4.2, y0 + 0.9, zHi);
      }
    }
  }
}

// Escribir GLB
const g = new Glb();
const prims = [];
for (const [, m] of Object.entries(mats)) {
  if (!m.I.length) continue;
  const matIdx = g.j.materials.length;
  g.j.materials.push(m.def);
  prims.push({
    attributes: {
      POSITION: g.acc(new Float32Array(m.P), 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(new Float32Array(m.N), 'VEC3', { target: 34962 }),
    },
    indices: g.acc(m.n > 65535 ? new Uint32Array(m.I) : new Uint16Array(m.I), 'SCALAR', { target: 34963 }),
    material: matIdx,
  });
}
g.j.meshes.push({ name: 'Cubierta_Unicentro', primitives: prims });
g.j.nodes.push({ name: 'Cubierta_Unicentro', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/unicentro_cubierta.glb');
copyFileSync('public/secciones/unicentro_cubierta.glb', 'docs/secciones/unicentro_cubierta.glb');
console.log('unicentro_cubierta.glb generado:', (bytes / 1024).toFixed(1), 'KB');

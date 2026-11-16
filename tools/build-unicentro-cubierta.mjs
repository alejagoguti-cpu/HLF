/**
 * Modela las cubiertas acristaladas y volúmenes elevados reales de Unicentro Bogotá
 * replicando la disposición exacta de la foto aérea:
 *   - Espina principal en zig-zag (4 tramos a dos aguas + 3 nodos piramidales)
 *   - 2 lucernarios lineales orientados norte-sur al costado oriental
 *   - Lucernario piramidal en el extremo suroccidental
 *   - Marquesina acristalada de acceso oriental
 *   - Volúmenes técnicos / sobrecubiertas blancas perimetrales
 *
 * NO tapa la losa base: deja ver la ortofoto real debajo y levanta los elementos 3D encima.
 */
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const uni = DATA.edificios.find((b) => b.id === 1041);
if (!uni) throw new Error('No se encontró Unicentro (id 1041) en edificios.json');

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

// Materiales PBR realistas
const mats = {
  concreto: {
    P: [], N: [], I: [], n: 0,
    def: { name: 'ConcretoBlanco', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.82, 0.82, 0.80, 1], metallicFactor: 0.0, roughnessFactor: 0.82 } },
  },
  metal: {
    P: [], N: [], I: [], n: 0,
    def: { name: 'PerfilAluminio', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.15, 0.18, 0.21, 1], metallicFactor: 0.82, roughnessFactor: 0.30 } },
  },
  vidrio: {
    P: [], N: [], I: [], n: 0,
    def: {
      name: 'VidrioAzul',
      doubleSided: true,
      alphaMode: 'BLEND',
      pbrMetallicRoughness: { baseColorFactor: [0.18, 0.38, 0.45, 0.84], metallicFactor: 0.22, roughnessFactor: 0.05 },
    },
  },
  interior: {
    P: [], N: [], I: [], n: 0,
    def: {
      name: 'InteriorAtrio',
      doubleSided: true,
      pbrMetallicRoughness: { baseColorFactor: [0.14, 0.16, 0.18, 1], metallicFactor: 0.0, roughnessFactor: 0.9 },
      emissiveFactor: [0.06, 0.05, 0.04],
    },
  },
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

function addOrientedBox(mat, cx, cy, z0, z1, dirX, dirY, halfL, halfW) {
  const px = -dirY, py = dirX;
  const p = (sl, sw, z) => [cx + dirX * sl + px * sw, cy + dirY * sl + py * sw, z];
  const a0 = p(-halfL, -halfW, z0), b0 = p(halfL, -halfW, z0), c0 = p(halfL, halfW, z0), d0 = p(-halfL, halfW, z0);
  const a1 = p(-halfL, -halfW, z1), b1 = p(halfL, -halfW, z1), c1 = p(halfL, halfW, z1), d1 = p(-halfL, halfW, z1);
  addQuad(mat, a1, b1, c1, d1);
  addQuad(mat, a0, b0, b1, a1);
  addQuad(mat, b0, c0, c1, b1);
  addQuad(mat, c0, d0, d1, c1);
  addQuad(mat, d0, a0, a1, d1);
}

/** Tragaluz lineal a dos aguas entre (ax, ay) y (bx, by) con perfilería metálica */
function addLinearSkylight(ax, ay, bx, by, halfW, zCurb = Z0 + 0.85, zRidge = Z0 + 3.4) {
  const dx = bx - ax, dy = by - ay;
  const L = Math.hypot(dx, dy);
  if (L < 1) return;
  const ux = dx / L, uy = dy / L;
  const px = -uy, py = ux;
  const pt = (s, w, z) => [ax + ux * s + px * w, ay + uy * s + py * w, z];

  addQuad('interior', pt(0, -halfW, Z0 + 0.05), pt(L, -halfW, Z0 + 0.05), pt(L, halfW, Z0 + 0.05), pt(0, halfW, Z0 + 0.05));
  addQuad('concreto', pt(0, -halfW, Z0), pt(L, -halfW, Z0), pt(L, -halfW, zCurb), pt(0, -halfW, zCurb));
  addQuad('concreto', pt(L, halfW, Z0), pt(0, halfW, Z0), pt(0, halfW, zCurb), pt(L, halfW, zCurb));

  addTri('vidrio', pt(0, -halfW, zCurb), pt(0, halfW, zCurb), pt(0, 0, zRidge));
  addTri('vidrio', pt(L, halfW, zCurb), pt(L, -halfW, zCurb), pt(L, 0, zRidge));

  addQuad('vidrio', pt(0, -halfW, zCurb), pt(L, -halfW, zCurb), pt(L, 0, zRidge), pt(0, 0, zRidge));
  addQuad('vidrio', pt(L, halfW, zCurb), pt(0, halfW, zCurb), pt(0, 0, zRidge), pt(L, 0, zRidge));

  addOrientedBox('metal', (ax + bx) * 0.5, (ay + by) * 0.5, zRidge - 0.06, zRidge + 0.14, ux, uy, L * 0.5, 0.16);
  addOrientedBox('metal', (ax + bx) * 0.5 - px * halfW, (ay + by) * 0.5 - py * halfW, zCurb - 0.04, zCurb + 0.12, ux, uy, L * 0.5, 0.12);
  addOrientedBox('metal', (ax + bx) * 0.5 + px * halfW, (ay + by) * 0.5 + py * halfW, zCurb - 0.04, zCurb + 0.12, ux, uy, L * 0.5, 0.12);

  const steps = Math.max(2, Math.round(L / 3.5));
  for (let i = 0; i <= steps; i++) {
    const s = (i / steps) * L;
    const t = 0.09;
    addQuad('metal', pt(s - t, -halfW, zCurb + 0.03), pt(s + t, -halfW, zCurb + 0.03), pt(s + t, 0, zRidge + 0.05), pt(s - t, 0, zRidge + 0.05));
    addQuad('metal', pt(s + t, halfW, zCurb + 0.03), pt(s - t, halfW, zCurb + 0.03), pt(s - t, 0, zRidge + 0.05), pt(s + t, 0, zRidge + 0.05));
  }
}

/** Pirámide acristalada orientada según (ux, uy) */
function addPyramidSkylight(cx, cy, halfSize, ux, uy, zCurb = Z0 + 1.1, zApex = Z0 + 5.2) {
  const px = -uy, py = ux;
  const c = (sx, sy, z) => [cx + ux * sx + px * sy, cy + uy * sx + py * sy, z];
  const b0 = c(-halfSize, -halfSize, Z0), b1 = c(halfSize, -halfSize, Z0), b2 = c(halfSize, halfSize, Z0), b3 = c(-halfSize, halfSize, Z0);
  const t0 = c(-halfSize, -halfSize, zCurb), t1 = c(halfSize, -halfSize, zCurb), t2 = c(halfSize, halfSize, zCurb), t3 = c(-halfSize, halfSize, zCurb);
  const apex = [cx, cy, zApex];

  addQuad('interior', c(-halfSize, -halfSize, Z0 + 0.05), c(halfSize, -halfSize, Z0 + 0.05), c(halfSize, halfSize, Z0 + 0.05), c(-halfSize, halfSize, Z0 + 0.05));

  addQuad('concreto', b0, b1, t1, t0);
  addQuad('concreto', b1, b2, t2, t1);
  addQuad('concreto', b2, b3, t3, t2);
  addQuad('concreto', b3, b0, t0, t3);

  addTri('vidrio', t0, t1, apex);
  addTri('vidrio', t1, t2, apex);
  addTri('vidrio', t2, t3, apex);
  addTri('vidrio', t3, t0, apex);

  for (const corner of [t0, t1, t2, t3]) {
    const dx = cx - corner[0], dy = cy - corner[1], d = Math.hypot(dx, dy) || 1;
    const nx = (-dy / d) * 0.14, ny = (dx / d) * 0.14;
    addQuad('metal', [corner[0] - nx, corner[1] - ny, zCurb + 0.04], [corner[0] + nx, corner[1] + ny, zCurb + 0.04],
      [cx + nx, cy + ny, zApex + 0.08], [cx - nx, cy - ny, zApex + 0.08]);
  }
  addOrientedBox('metal', cx, cy, zApex - 0.1, zApex + 0.25, ux, uy, 0.45, 0.45);
}

const ux = -0.757, uy = -0.653; // eje SW
const vx = 0.653, vy = -0.757;  // eje SE

// 1. Espina principal en Z (replicando la foto aérea)
const N1 = [-36, 102];  // Pirámide Norte-Oeste
const N2 = [6, 59];     // Codo Norte-Este
const N3 = [-37, 13];   // Pirámide Central
const N4 = [9, -30];    // Codo Sur-Este
const N5 = [-31, -76];  // Pirámide Sur-Oeste

addPyramidSkylight(N1[0], N1[1], 11.0, vx, vy, Z0 + 1.0, Z0 + 5.0);
addLinearSkylight(N1[0] + vx * 10, N1[1] + vy * 10, N2[0], N2[1], 6.4, Z0 + 0.9, Z0 + 3.4);
addLinearSkylight(N2[0], N2[1], N3[0] - ux * 11, N3[1] - uy * 11, 6.4, Z0 + 0.9, Z0 + 3.4);

addPyramidSkylight(N3[0], N3[1], 12.0, vx, vy, Z0 + 1.1, Z0 + 5.4);
addLinearSkylight(N3[0] + vx * 11, N3[1] + vy * 11, N4[0], N4[1], 6.4, Z0 + 0.9, Z0 + 3.4);
addLinearSkylight(N4[0], N4[1], N5[0] - ux * 10, N5[1] - uy * 10, 6.4, Z0 + 0.9, Z0 + 3.4);
addPyramidSkylight(N5[0], N5[1], 10.5, vx, vy, Z0 + 1.0, Z0 + 4.8);

// 2. Dos lucernarios lineales orientados N-S al costado oriental
addLinearSkylight(21, 74, 26, 36, 5.2, Z0 + 0.85, Z0 + 3.1);
addLinearSkylight(26, -30, 31, -66, 5.2, Z0 + 0.85, Z0 + 3.1);

// 3. Pequeña pirámide en el extremo suroccidental
addPyramidSkylight(-66, -98, 7.2, vx, vy, Z0 + 0.8, Z0 + 3.4);

// 4. Marquesina acristalada de acceso oriental
addLinearSkylight(42, -2, 43, 18, 4.8, Z0 + 0.6, Z0 + 2.4);

// 5. Volúmenes blancos elevados (sobrecubiertas de salas / almacenes ancla)
if (pointInRing(24, 108, ring)) addOrientedBox('concreto', 24, 108, Z0, Z0 + 2.4, vx, vy, 22, 14);
if (pointInRing(15, -86, ring)) addOrientedBox('concreto', 15, -86, Z0, Z0 + 2.2, vx, vy, 20, 13);

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

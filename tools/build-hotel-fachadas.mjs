/**
 * Modela en 3D real las fachadas del Hotel Estelar La Fontana -> public/secciones/hotel_fachadas.glb
 *
 * Optimizado para bajo peso (~3-5 MB) y alto detalle 3D:
 *   - Muros y derrames de ladrillo texturizado (tex_ladrillo.webp) con profundidad de 38 cm
 *   - Ventanas hundidas con marcos, parteluces 3D y vidrio reflectivo
 *   - Jardineras 3D con follaje verde en pisos intermedios
 *   - Franja superior blanca con ventanería corrida y cornisa volada bajo la teja
 *   - Cornisas horizontales entre pisos, zócalo de piedra, torrecilla blanca y pérgola del patio
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const HOTELS = DATA.edificios.filter((b) => b.s === 'Hotel');
if (!HOTELS.length) throw new Error('No se encontraron edificios del Hotel en edificios.json');

const area = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) {
    const p = r[i], q = r[(i + 1) % r.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};

const g = new Glb();
const ladrilloBytes = readFileSync('public/secciones/tex_ladrillo.webp');
const ladrilloTexIdx = g.image(ladrilloBytes, 'image/webp');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mats = {
  ladrillo: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: true,
    def: {
      name: 'LadrilloHotel',
      doubleSided: true,
      pbrMetallicRoughness: {
        baseColorTexture: { index: ladrilloTexIdx },
        baseColorFactor: [0.95, 0.80, 0.72, 1],
        metallicFactor: 0.0,
        roughnessFactor: 0.86,
      },
    },
  },
  concreto: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'CornisaBlanca', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.84, 0.83, 0.80, 1], metallicFactor: 0.0, roughnessFactor: 0.78 } },
  },
  zocalo: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'ZocaloPiedra', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.46, 0.44, 0.41, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } },
  },
  marco: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'MarcoVentana', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.18, 0.19, 0.21, 1], metallicFactor: 0.45, roughnessFactor: 0.42 } },
  },
  marcoBlanco: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'MarcoBlanco', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.90, 0.90, 0.88, 1], metallicFactor: 0.15, roughnessFactor: 0.45 } },
  },
  vidrio: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'VidrioHotel', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.14, 0.21, 0.26, 1], metallicFactor: 0.20, roughnessFactor: 0.05 }, emissiveFactor: [0.03, 0.03, 0.035] },
  },
  jardinera: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'FollajeJardinera', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.15, 0.30, 0.11, 1], metallicFactor: 0.0, roughnessFactor: 0.92 } },
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

function makeWallHelper(x0, y0, tx, ty, nx, ny) {
  const pt = (s, d, z) => [x0 + tx * s + nx * d, y0 + ty * s + ny * d, z];
  const quad = (mat, a, b, c, d, uvScale = 0.45) => {
    const w = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) * uvScale;
    const h = Math.hypot(d[0] - a[0], d[1] - a[1], d[2] - a[2]) * uvScale;
    addQuad(mat, a, b, c, d, [0, 0], [w, 0], [w, h], [0, h]);
  };
  // Caja optimizada: solo caras exteriores (sin caras traseras ocultas)
  const frontBox = (mat, s0, s1, d0, d1, z0, z1, withBottom = true) => {
    quad(mat, pt(s0, d1, z0), pt(s1, d1, z0), pt(s1, d1, z1), pt(s0, d1, z1));
    quad(mat, pt(s0, d0, z0), pt(s0, d1, z0), pt(s0, d1, z1), pt(s0, d0, z1));
    quad(mat, pt(s1, d1, z0), pt(s1, d0, z0), pt(s1, d0, z1), pt(s1, d1, z1));
    quad(mat, pt(s0, d1, z1), pt(s1, d1, z1), pt(s1, d0, z1), pt(s0, d0, z1));
    if (withBottom) quad(mat, pt(s0, d0, z0), pt(s1, d0, z0), pt(s1, d1, z0), pt(s0, d1, z0));
  };
  return { pt, quad, frontBox };
}

for (const b of HOTELS) {
  const ring = b.r.map(([e, n]) => [e, n]);
  if (area(ring) < 0) ring.reverse();

  const z0 = b.b;
  const pisos = Math.max(1, b.p);
  const fh = b.h / pisos;

  // Tapa superior bajo la teja
  const flat = [];
  for (const [e, n] of ring) flat.push(e, n);
  const tris = earcut(flat, [], 2);
  const zTop = z0 + b.h + 0.1;
  for (let i = 0; i < tris.length; i += 3) {
    const i0 = tris[i], i1 = tris[i + 1], i2 = tris[i + 2];
    addTri('concreto', [ring[i0][0], ring[i0][1], zTop], [ring[i1][0], ring[i1][1], zTop], [ring[i2][0], ring[i2][1], zTop]);
  }

  for (let k = 0; k < ring.length; k++) {
    const [x0, y0] = ring[k], [x1, y1] = ring[(k + 1) % ring.length];
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L < 0.1) continue;
    const tx = (x1 - x0) / L, ty = (y1 - y0) / L;
    const nx = ty, ny = -tx;
    const { pt, quad, frontBox } = makeWallHelper(x0, y0, tx, ty, nx, ny);

    // Zócalo bajo rasante
    quad('zocalo', pt(0, 0.20, z0 - 4.5), pt(L, 0.20, z0 - 4.5), pt(L, 0.20, z0), pt(0, 0.20, z0));

    if (L < 2.2) {
      quad('ladrillo', pt(0, 0.22, z0), pt(L, 0.22, z0), pt(L, 0.22, z0 + b.h + 0.35), pt(0, 0.22, z0 + b.h + 0.35));
      continue;
    }

    const nb = Math.max(1, Math.round(L / 3.6));
    const bw = L / nb;

    for (let fl = 0; fl < pisos; fl++) {
      const fz0 = z0 + fl * fh;
      const fz1 = z0 + (fl + 1) * fh;
      const esUltimo = fl === pisos - 1 && pisos >= 3;
      const esBajo = fl === 0;

      if (esUltimo) {
        const wz0 = fz0 + 0.24 * fh;
        const wz1 = fz0 + 0.88 * fh;
        frontBox('marcoBlanco', 0, L, -0.04, 0.26, fz0, wz0, true);
        frontBox('marcoBlanco', 0, L, -0.04, 0.48, wz1, fz1 + 0.28, true);
        quad('vidrio', pt(0, 0.02, wz0), pt(L, 0.02, wz0), pt(L, 0.02, wz1), pt(0, 0.02, wz1));
        const mCount = nb * 3;
        for (let m = 0; m <= mCount; m++) {
          const ms = (m / mCount) * L;
          quad('marco', pt(ms - 0.04, 0.22, wz0), pt(ms + 0.04, 0.22, wz0), pt(ms + 0.04, 0.22, wz1), pt(ms - 0.04, 0.22, wz1));
        }
      } else {
        const winRatio = esBajo ? 0.68 : 0.54;
        const wh0 = esBajo ? 0.08 * fh : 0.30 * fh;
        const wh1 = esBajo ? 0.88 * fh : 0.86 * fh;
        const wz0 = fz0 + wh0;
        const wz1 = fz0 + wh1;
        const dWall = 0.22;
        const dGlass = -0.16;

        if (fl >= 1) {
          frontBox('concreto', 0, L, dWall - 0.02, dWall + 0.08, fz0 - 0.05, fz0 + 0.07, true);
        }

        for (let bi = 0; bi < nb; bi++) {
          const sA = bi * bw;
          const sB = (bi + 1) * bw;
          const pier = bw * (1 - winRatio) * 0.5;
          const w0 = sA + pier;
          const w1 = sB - pier;

          // Caras frontales de ladrillo (machones + antepecho + dintel)
          quad('ladrillo', pt(sA, dWall, fz0), pt(w0, dWall, fz0), pt(w0, dWall, fz1), pt(sA, dWall, fz1));
          quad('ladrillo', pt(w1, dWall, fz0), pt(sB, dWall, fz0), pt(sB, dWall, fz1), pt(w1, dWall, fz1));
          quad('ladrillo', pt(w0, dWall, fz0), pt(w1, dWall, fz0), pt(w1, dWall, wz0), pt(w0, dWall, wz0));
          quad('ladrillo', pt(w0, dWall, wz1), pt(w1, dWall, wz1), pt(w1, dWall, fz1), pt(w0, dWall, fz1));

          // 4 caras del derrame 3D (38 cm de profundidad real)
          quad('ladrillo', pt(w0, dGlass, wz0), pt(w0, dWall, wz0), pt(w0, dWall, wz1), pt(w0, dGlass, wz1)); // jamba izq
          quad('ladrillo', pt(w1, dWall, wz0), pt(w1, dGlass, wz0), pt(w1, dGlass, wz1), pt(w1, dWall, wz1)); // jamba der
          quad('ladrillo', pt(w0, dWall, wz0), pt(w1, dWall, wz0), pt(w1, dGlass, wz0), pt(w0, dGlass, wz0)); // alféizar
          quad('ladrillo', pt(w0, dGlass, wz1), pt(w1, dGlass, wz1), pt(w1, dWall, wz1), pt(w0, dWall, wz1)); // dintel

          // Vidrio reflectivo hundido
          quad('vidrio', pt(w0, dGlass, wz0), pt(w1, dGlass, wz0), pt(w1, dGlass, wz1), pt(w0, dGlass, wz1));

          // Parteluz central en cruz (ligero)
          const dMull = dGlass + 0.04;
          const wm = (w0 + w1) * 0.5;
          const hm = wz0 + (wz1 - wz0) * 0.34;
          quad('marco', pt(wm - 0.03, dMull, wz0), pt(wm + 0.03, dMull, wz0), pt(wm + 0.03, dMull, wz1), pt(wm - 0.03, dMull, wz1));
          quad('marco', pt(w0, dMull, hm - 0.03), pt(w1, dMull, hm - 0.03), pt(w1, dMull, hm + 0.03), pt(w0, dMull, hm + 0.03));

          // Jardinera 3D con follaje verde en pisos medios
          if (!esBajo && pisos >= 3) {
            frontBox('zocalo', w0 - 0.05, w1 + 0.05, dWall, dWall + 0.26, wz0 - 0.32, wz0 - 0.08, true);
            frontBox('jardinera', w0 - 0.07, w1 + 0.07, dWall, dWall + 0.32, wz0 - 0.10, wz0 + 0.16, false);
          }
        }
      }
    }
  }
}

// Torrecilla / linterna blanca central y pérgola del patio izquierdo
function addStandaloneBox(mat, cx, cy, z0, z1, hx, hy) {
  const { frontBox } = makeWallHelper(cx - hx, cy - hy, 1, 0, 0, -1);
  frontBox(mat, 0, hx * 2, -hy * 2, 0, z0, z1, true);
}
addStandaloneBox('marcoBlanco', -226, 315, 25.2, 29.8, 1.5, 1.5);
addStandaloneBox('marco', -226, 315, 29.8, 30.6, 1.7, 1.7);
addStandaloneBox('marcoBlanco', -260, 267, 7.2, 7.65, 9.5, 5.5);
for (const px of [-268, -260, -252]) {
  for (const py of [262.5, 271.5]) {
    addStandaloneBox('marco', px, py, 4.17, 7.2, 0.14, 0.14);
  }
}

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
g.j.meshes.push({ name: 'Hotel_Fachadas_3D', primitives: prims });
g.j.nodes.push({ name: 'Hotel_Fachadas_3D', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/hotel_fachadas.glb');
copyFileSync('public/secciones/hotel_fachadas.glb', 'docs/secciones/hotel_fachadas.glb');
console.log('hotel_fachadas.glb generado:', (bytes / 1024).toFixed(1), 'KB');

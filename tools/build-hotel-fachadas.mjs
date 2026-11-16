/**
 * Modela en 3D real las fachadas y vegetación del Hotel Estelar La Fontana
 * -> public/secciones/hotel_fachadas.glb
 *
 * Basado en conteo directo de las fotografías reales del hotel:
 *   - ID 375 arista 21 (fachada principal acceso): 7 ejes de ventanas en pisos 2-4,
 *     piso 1 sólido en ladrillo sobre la marquesina (solo 1 ventana a la izquierda),
 *     piso 0 lobby/marquesina, piso 5 franja superior acristalada bajo la teja.
 *   - ID 375 arista 22 (ala SE diagonal): 4 ejes de ventanas, piso 4 galería acristalada.
 *   - ID 68 (torre esquinera SE): ladrillo macizo sin ventanas en pisos 0-7, mirador en piso 8.
 *   - ID 189 arista 11 y ID 102 arista 0 (ala SO): 5 y 6 ejes de ventanas con amplio ladrillo.
 *   - Jardineras con arbustos botánicos 3D (ramas y hojas anguladas en múltiples tonos de verde),
 *     cero franjas verdes planas y cero bandas negras horizontales.
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

let seed = 4242;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

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
        baseColorFactor: [0.96, 0.82, 0.74, 1],
        metallicFactor: 0.0,
        roughnessFactor: 0.86,
      },
    },
  },
  jardineraCaja: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'JardineraTerracota', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.42, 0.36, 0.32, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } },
  },
  zocalo: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'ZocaloPiedra', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.46, 0.44, 0.41, 1], metallicFactor: 0.0, roughnessFactor: 0.88 } },
  },
  marco: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'MarcoVentana', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.16, 0.17, 0.19, 1], metallicFactor: 0.45, roughnessFactor: 0.42 } },
  },
  vidrio: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'VidrioHotel', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.18, 0.26, 0.32, 1], metallicFactor: 0.18, roughnessFactor: 0.06 }, emissiveFactor: [0.04, 0.04, 0.045] },
  },
  hoja1: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'HojaOscura', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.12, 0.24, 0.09, 1], metallicFactor: 0.0, roughnessFactor: 0.86 } },
  },
  hoja2: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'HojaMedia', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.20, 0.36, 0.14, 1], metallicFactor: 0.0, roughnessFactor: 0.82 } },
  },
  hoja3: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'HojaClara', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.28, 0.44, 0.17, 1], metallicFactor: 0.0, roughnessFactor: 0.78 } },
  },
  rama: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'RamaMadera', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.24, 0.18, 0.12, 1], metallicFactor: 0.0, roughnessFactor: 0.92 } },
  },
  blanco: {
    P: [], N: [], UV: [], I: [], n: 0, hasUV: false,
    def: { name: 'EstucoBlanco', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.90, 0.89, 0.86, 1], metallicFactor: 0.0, roughnessFactor: 0.76 } },
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

/** Arbusto botánico 3D real: ramas y racimos de hojas anguladas con silueta orgánica */
function addBotanicalShrub(cx, cy, cz, scale, density = 1.0) {
  const leafMats = ['hoja1', 'hoja2', 'hoja3'];
  const stems = Math.max(3, Math.round(4 * density));
  for (let st = 0; st < stems; st++) {
    const ang = rnd() * Math.PI * 2;
    const tilt = 0.25 + rnd() * 0.5;
    const len = (0.28 + rnd() * 0.22) * scale;
    const tx = cx + Math.cos(ang) * len * Math.sin(tilt);
    const ty = cy + Math.sin(ang) * len * Math.sin(tilt);
    const tz = cz + len * Math.cos(tilt);
    const rx = -Math.sin(ang) * 0.025 * scale, ry = Math.cos(ang) * 0.025 * scale;
    addTri('rama', [cx - rx, cy - ry, cz], [cx + rx, cy + ry, cz], [tx, ty, tz]);
  }
  const leaves = Math.max(18, Math.round(26 * density));
  for (let i = 0; i < leaves; i++) {
    const a = rnd() * Math.PI * 2;
    const r = (0.05 + rnd() * 0.26) * scale;
    const lx = cx + Math.cos(a) * r;
    const ly = cy + Math.sin(a) * r;
    const lz = cz + (0.02 + rnd() * 0.34) * scale - r * 0.32;
    const lw = (0.14 + rnd() * 0.11) * scale;
    const lh = (0.20 + rnd() * 0.14) * scale;
    const yaw = rnd() * Math.PI * 2;
    const pitch = (rnd() - 0.42) * 1.3;
    const ux = Math.cos(yaw) * lw, uy = Math.sin(yaw) * lw;
    const vx = -Math.sin(yaw) * Math.cos(pitch) * lh, vy = Math.cos(yaw) * Math.cos(pitch) * lh, vz = Math.sin(pitch) * lh;
    const mat = leafMats[Math.floor(rnd() * leafMats.length)];
    const p0 = [lx, ly, lz];
    const p1 = [lx + ux * 0.5 + vx * 0.5, ly + uy * 0.5 + vy * 0.5, lz + vz * 0.5];
    const p2 = [lx + vx, ly + vy, lz + vz];
    const p3 = [lx - ux * 0.5 + vx * 0.5, ly - uy * 0.5 + vy * 0.5, lz + vz * 0.5];
    addTri(mat, p0, p1, p2);
    addTri(mat, p0, p2, p3);
  }
}

function makeWallHelper(x0, y0, tx, ty, nx, ny) {
  const pt = (s, d, z) => [x0 + tx * s + nx * d, y0 + ty * s + ny * d, z];
  const quad = (mat, a, b, c, d, uvScale = 0.45) => {
    const w = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) * uvScale;
    const h = Math.hypot(d[0] - a[0], d[1] - a[1], d[2] - a[2]) * uvScale;
    addQuad(mat, a, b, c, d, [0, 0], [w, 0], [w, h], [0, h]);
  };
  const frontBox = (mat, s0, s1, d0, d1, z0, z1, withBottom = true) => {
    quad(mat, pt(s0, d1, z0), pt(s1, d1, z0), pt(s1, d1, z1), pt(s0, d1, z1));
    quad(mat, pt(s0, d0, z0), pt(s0, d1, z0), pt(s0, d1, z1), pt(s0, d0, z1));
    quad(mat, pt(s1, d1, z0), pt(s1, d0, z0), pt(s1, d0, z1), pt(s1, d1, z1));
    quad(mat, pt(s0, d1, z1), pt(s1, d1, z1), pt(s1, d0, z1), pt(s0, d0, z1));
    if (withBottom) quad(mat, pt(s0, d0, z0), pt(s1, d0, z0), pt(s1, d1, z0), pt(s0, d1, z0));
  };
  return { pt, quad, frontBox };
}

/**
 * Matriz específica de fachadas verificadas en las fotografías reales.
 * Devuelve: { bays, winW, floors: fn(fl) -> 'solid' | 'ribbon' | 'gallery' | { mask: boolean[], planter: number[] } }
 */
function getFacadeSpec(id, edgeIdx, L, pisos) {
  // 1. Torre esquinera SE (ID 68): ladrillo macizo en pisos 0-7, mirador en piso 8
  if (id === 68) {
    return {
      bays: 2,
      winW: 1.4,
      floorRule: (fl) => (fl === pisos - 1 ? 'ribbon' : 'solid'),
    };
  }
  // 2. Fachada principal de acceso sur (ID 375 arista 21, L=34.6m): 7 ejes verificados
  if (id === 375 && edgeIdx === 21) {
    return {
      bays: 7,
      winW: 2.05,
      floorRule: (fl) => {
        if (fl === pisos - 1) return 'ribbon';
        if (fl === 0) return { mask: [true, true, false, false, false, false, false], planter: [0, 0, 0, 0, 0, 0, 0] };
        if (fl === 1) return { mask: [true, false, false, false, false, false, false], planter: [0.9, 0, 0, 0, 0, 0, 0] };
        return {
          mask: [true, true, true, true, true, true, true],
          planter: [0.9, 1.0, 1.1, 0.95, 1.05, 0.9, 1.0],
        };
      },
    };
  }
  // 3. Ala SE diagonal junto al acceso (ID 375 arista 22, L=19.0m): 4 ejes + galería en piso 4
  if (id === 375 && edgeIdx === 22) {
    return {
      bays: 4,
      winW: 2.0,
      floorRule: (fl) => {
        if (fl === pisos - 1) return 'ribbon';
        if (fl === pisos - 2) return 'gallery';
        if (fl === 0) return { mask: [false, false, true, true], planter: [0, 0, 0, 0] };
        if (fl === 1) return { mask: [true, true, false, false], planter: [0.8, 0.9, 0, 0] };
        return { mask: [true, true, true, true], planter: [0.95, 1.05, 0.85, 1.0] };
      },
    };
  }
  // 4. Ala SO mirando al patio (ID 189 arista 11, L=24.0m): 5 ejes verificados
  if (id === 189 && edgeIdx === 11) {
    return {
      bays: 5,
      winW: 1.95,
      floorRule: (fl) => {
        if (fl === pisos - 1) return 'ribbon';
        if (fl === 0) return { mask: [true, true, true, false, false], planter: [0, 0, 0, 0, 0] };
        return { mask: [true, true, true, true, true], planter: [0.9, 1.0, 0.85, 1.05, 0.9] };
      },
    };
  }
  // 5. Ala SO extremo (ID 102 arista 0, L=29.3m): 6 ejes verificados
  if (id === 102 && edgeIdx === 0) {
    return {
      bays: 6,
      winW: 1.95,
      floorRule: (fl) => {
        if (fl === pisos - 1) return 'ribbon';
        if (fl === 0) return { mask: [true, true, true, true, false, false], planter: [0, 0, 0, 0, 0, 0] };
        return { mask: [true, true, true, true, true, true], planter: [0.85, 1.0, 0.9, 1.1, 0.8, 0.95] };
      },
    };
  }

  // Otras fachadas secundarias: separación amplia de ladrillo (1 vano cada ~5.2 m, sin sobrepoblar)
  if (L < 4.5) return { bays: 0, winW: 0, floorRule: () => 'solid' };
  const bays = Math.max(1, Math.floor(L / 5.2));
  return {
    bays,
    winW: 1.85,
    floorRule: (fl) => {
      if (fl === pisos - 1 && pisos >= 4) return 'ribbon';
      if (fl === 0) return 'solid';
      const mask = Array.from({ length: bays }, (_, i) => (i + fl) % 5 !== 4);
      const planter = Array.from({ length: bays }, (_, i) => ((i * 3 + fl) % 3 === 0 ? 0.85 : 0));
      return { mask, planter };
    },
  };
}

for (const b of HOTELS) {
  const ring = b.r.map(([e, n]) => [e, n]);
  if (area(ring) < 0) ring.reverse();

  const z0 = b.b;
  const pisos = Math.max(1, b.p);
  const fh = b.h / pisos;

  // Tapa superior bajo la teja (sin alterar cubiertas ni volúmenes)
  const flat = [];
  for (const [e, n] of ring) flat.push(e, n);
  const tris = earcut(flat, [], 2);
  const zTop = z0 + b.h + 0.08;
  for (let i = 0; i < tris.length; i += 3) {
    const i0 = tris[i], i1 = tris[i + 1], i2 = tris[i + 2];
    addTri('ladrillo', [ring[i0][0], ring[i0][1], zTop], [ring[i1][0], ring[i1][1], zTop], [ring[i2][0], ring[i2][1], zTop]);
  }

  for (let k = 0; k < ring.length; k++) {
    const [x0, y0] = ring[k], [x1, y1] = ring[(k + 1) % ring.length];
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (L < 0.1) continue;
    const tx = (x1 - x0) / L, ty = (y1 - y0) / L;
    const nx = ty, ny = -tx;
    const { pt, quad, frontBox } = makeWallHelper(x0, y0, tx, ty, nx, ny);
    const dWall = 0.04;
    const dGlass = -0.32; // derrame real de 36 cm hacia adentro

    // Zócalo bajo rasante
    quad('zocalo', pt(0, dWall, z0 - 4.5), pt(L, dWall, z0 - 4.5), pt(L, dWall, z0), pt(0, dWall, z0));

    const spec = getFacadeSpec(b.id, k, L, pisos);
    if (spec.bays === 0) {
      quad('ladrillo', pt(0, dWall, z0), pt(L, dWall, z0), pt(L, dWall, z0 + b.h + 0.25), pt(0, dWall, z0 + b.h + 0.25));
      continue;
    }

    const bw = L / spec.bays;
    const winW = Math.min(spec.winW, bw * 0.56);

    for (let fl = 0; fl < pisos; fl++) {
      const fz0 = z0 + fl * fh;
      const fz1 = z0 + (fl + 1) * fh;
      const rule = spec.floorRule(fl);

      if (rule === 'solid') {
        quad('ladrillo', pt(0, dWall, fz0), pt(L, dWall, fz0), pt(L, dWall, fz1), pt(0, dWall, fz1));
        continue;
      }

      if (rule === 'ribbon' || rule === 'gallery') {
        const wz0 = fz0 + 0.24 * fh;
        const wz1 = fz0 + 0.88 * fh;
        const proj = rule === 'gallery' ? 0.34 : 0.16;
        // Antepecho inferior en ladrillo (sin bandas negras)
        quad('ladrillo', pt(0, dWall, fz0), pt(L, dWall, fz0), pt(L, dWall, wz0), pt(0, dWall, wz0));
        // Remate superior
        frontBox('ladrillo', 0, L, dGlass, dWall + proj, wz1, fz1 + (rule === 'ribbon' ? 0.22 : 0.05), true);
        // Vidrio de la franja acristalada
        quad('vidrio', pt(0, dWall + proj - 0.12, wz0), pt(L, dWall + proj - 0.12, wz0), pt(L, dWall + proj - 0.12, wz1), pt(0, dWall + proj - 0.12, wz1));
        // Parteluces verticales metálicos finos
        const mCount = spec.bays * 3;
        for (let m = 0; m <= mCount; m++) {
          const ms = (m / mCount) * L;
          quad('marco', pt(ms - 0.035, dWall + proj - 0.06, wz0), pt(ms + 0.035, dWall + proj - 0.06, wz0), pt(ms + 0.035, dWall + proj - 0.06, wz1), pt(ms - 0.035, dWall + proj - 0.06, wz1));
        }
        // Arbustos reales sobre la cornisa de la franja superior (tal como en las fotos)
        if (rule === 'gallery' || fl === pisos - 1) {
          for (let s = 1.2; s < L - 1.0; s += 1.6) {
            const p = pt(s, dWall + proj + 0.10, wz0 - 0.06);
            addBotanicalShrub(p[0], p[1], p[2], 0.95, 0.85);
          }
        }
        continue;
      }

      // Piso con ventanas individuales verificadas
      const wh0 = fl === 0 ? 0.10 * fh : 0.30 * fh;
      const wh1 = fl === 0 ? 0.86 * fh : 0.85 * fh;
      const wz0 = fz0 + wh0;
      const wz1 = fz0 + wh1;

      for (let bi = 0; bi < spec.bays; bi++) {
        const sA = bi * bw;
        const sB = (bi + 1) * bw;
        if (!rule.mask[bi]) {
          quad('ladrillo', pt(sA, dWall, fz0), pt(sB, dWall, fz0), pt(sB, dWall, fz1), pt(sA, dWall, fz1));
          continue;
        }
        const pier = (bw - winW) * 0.5;
        const w0 = sA + pier;
        const w1 = sB - pier;

        // Ladrillo alrededor del vano (amplia separación entre ventanas)
        quad('ladrillo', pt(sA, dWall, fz0), pt(w0, dWall, fz0), pt(w0, dWall, fz1), pt(sA, dWall, fz1));
        quad('ladrillo', pt(w1, dWall, fz0), pt(sB, dWall, fz0), pt(sB, dWall, fz1), pt(w1, dWall, fz1));
        quad('ladrillo', pt(w0, dWall, fz0), pt(w1, dWall, fz0), pt(w1, dWall, wz0), pt(w0, dWall, wz0));
        quad('ladrillo', pt(w0, dWall, wz1), pt(w1, dWall, wz1), pt(w1, dWall, fz1), pt(w0, dWall, fz1));

        // 4 caras del derrame 3D en ladrillo
        quad('ladrillo', pt(w0, dGlass, wz0), pt(w0, dWall, wz0), pt(w0, dWall, wz1), pt(w0, dGlass, wz1));
        quad('ladrillo', pt(w1, dWall, wz0), pt(w1, dGlass, wz0), pt(w1, dGlass, wz1), pt(w1, dWall, wz1));
        quad('ladrillo', pt(w0, dWall, wz0), pt(w1, dWall, wz0), pt(w1, dGlass, wz0), pt(w0, dGlass, wz0));
        quad('ladrillo', pt(w0, dGlass, wz1), pt(w1, dGlass, wz1), pt(w1, dWall, wz1), pt(w0, dWall, wz1));

        // Vidrio PBR hundido
        quad('vidrio', pt(w0, dGlass, wz0), pt(w1, dGlass, wz0), pt(w1, dGlass, wz1), pt(w0, dGlass, wz1));

        // Marco fino 3D + parteluz central
        const dM = dGlass + 0.04;
        const wm = (w0 + w1) * 0.5;
        const hm = wz0 + (wz1 - wz0) * 0.34;
        quad('marco', pt(w0, dM, wz0), pt(w1, dM, wz0), pt(w1, dM, wz0 + 0.05), pt(w0, dM, wz0 + 0.05));
        quad('marco', pt(w0, dM, wz1 - 0.05), pt(w1, dM, wz1 - 0.05), pt(w1, dM, wz1), pt(w0, dM, wz1));
        quad('marco', pt(w0, dM, wz0), pt(w0 + 0.05, dM, wz0), pt(w0 + 0.05, dM, wz1), pt(w0, dM, wz1));
        quad('marco', pt(w1 - 0.05, dM, wz0), pt(w1, dM, wz0), pt(w1, dM, wz1), pt(w1 - 0.05, dM, wz1));
        quad('marco', pt(wm - 0.025, dM, wz0), pt(wm + 0.025, dM, wz0), pt(wm + 0.025, dM, wz1), pt(wm - 0.025, dM, wz1));
        quad('marco', pt(w0, dM, hm - 0.025), pt(w1, dM, hm - 0.025), pt(w1, dM, hm + 0.025), pt(w0, dM, hm + 0.025));

        // Jardinera con profundidad real + arbustos botánicos 3D (NO franjas verdes)
        const pDens = rule.planter[bi] || 0;
        if (pDens > 0.1) {
          frontBox('jardineraCaja', w0 - 0.04, w1 + 0.04, dWall, dWall + 0.28, wz0 - 0.34, wz0 - 0.06, true);
          const nShrubs = 3;
          for (let sh = 0; sh < nShrubs; sh++) {
            const ss = w0 + ((sh + 0.5) / nShrubs) * (w1 - w0) + (rnd() - 0.5) * 0.12;
            const pos = pt(ss, dWall + 0.16, wz0 - 0.08);
            addBotanicalShrub(pos[0], pos[1], pos[2], 1.15 * pDens, pDens);
          }
        }
      }
    }
  }
}

// Hitos 3D verificados en las fotografías: torrecilla blanca y pérgola del patio izquierdo
function addStandaloneBox(mat, cx, cy, z0, z1, hx, hy) {
  const { frontBox } = makeWallHelper(cx - hx, cy - hy, 1, 0, 0, -1);
  frontBox(mat, 0, hx * 2, -hy * 2, 0, z0, z1, true);
}
addStandaloneBox('blanco', -226, 315, 25.2, 29.8, 1.5, 1.5);
addStandaloneBox('marco', -226, 315, 29.8, 30.5, 1.7, 1.7);
addStandaloneBox('blanco', -260, 267, 7.2, 7.65, 9.5, 5.5);
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

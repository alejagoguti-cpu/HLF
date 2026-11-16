/**
 * Modela en 3D UV+PBR ultra realista el complejo METRO 127 / SONESTA HOTEL
 * frente al Hotel La Fontana (esquina SO de Calle 127 x Ak 15):
 *   - Fachada ajedrezada en paneles de aluminio blanco/gris PBR (Sonesta & ala occidental)
 *   - Muro cortina central en vidrio reflectivo PBR (roughness 0.05) + valla PRIME
 *   - Celosía metálica horizontal en esquina y frente Calle 127
 *   - Zócalo comercial negro con carpas inclinadas negras, jardineras y letreros
 *     (METRO 127, SONESTA HOTEL, MILLIONAIRES, RELX)
 *   - Ala 12447 Ak 15 con pilastras blancas, bandas de vidrio y celosía plateada
 * -> public/secciones/metro127.glb y docs/secciones/metro127.glb
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { encodePng } from './pbr-textures.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const IDS = new Set([373, 175, 176, 181, 680, 692, 374, 1076, 2319, 2333]);
const BLDS = DATA.edificios.filter((b) => IDS.has(b.id));
if (!BLDS.length) throw new Error('No se encontraron edificios de Metro 127 en edificios.json');

const GLYPHS = {
  A: ['01110','10001','10001','11111','10001','10001','10001'],
  C: ['01111','10000','10000','10000','10000','10000','01111'],
  E: ['11111','10000','10000','11110','10000','10000','11111'],
  H: ['10001','10001','10001','11111','10001','10001','10001'],
  I: ['11111','00100','00100','00100','00100','00100','11111'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  M: ['10001','11011','10101','10001','10001','10001','10001'],
  N: ['10001','11001','10101','10011','10001','10001','10001'],
  O: ['01110','10001','10001','10001','10001','10001','01110'],
  P: ['11110','10001','10001','11110','10000','10000','10000'],
  R: ['11110','10001','10001','11110','10100','10010','10001'],
  S: ['01111','10000','10000','01110','00001','00001','11110'],
  T: ['11111','00100','00100','00100','00100','00100','00100'],
  X: ['10001','01010','00100','00100','00100','01010','10001'],
  '1': ['00100','01100','00100','00100','00100','00100','01110'],
  '2': ['01110','10001','00001','00110','01000','10000','11111'],
  '7': ['11111','00001','00010','00100','01000','01000','01000'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000'],
};

function makeSignPng(bgRgb, fgRgb, text, w = 256, h = 64) {
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    buf[i] = bgRgb[0]; buf[i + 1] = bgRgb[1]; buf[i + 2] = bgRgb[2]; buf[i + 3] = 255;
  }
  const str = text.toUpperCase();
  const scale = Math.max(3, Math.floor((w - 20) / (str.length * 6)));
  const ox = Math.floor((w - (str.length * 6 * scale - scale)) * 0.5);
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

// 1. Paneles ajedrezados blanco/gris (Metro 127 / Sonesta)
const pAjedrez = makePbrSet((u, v) => {
  const gx = Math.floor(u * 4), gy = Math.floor(v * 4);
  const rx = (u * 4) % 1, ry = (v * 4) % 1;
  const seam = (rx < 0.04 || ry < 0.04);
  if (seam) return [0.22, 0.24, 0.26, 0.5, 0.4, 0.1];
  const isWin = ((gx + gy * 2) % 4 === 1) && rx > 0.18 && rx < 0.82 && ry > 0.15 && ry < 0.85;
  if (isWin) return [0.14, 0.22, 0.28, 0.06, 0.40, 0.2];
  const shade = ((gx + gy) % 2 === 0) ? 0.86 : 0.64;
  return [shade, shade * 1.01, shade * 1.02, 0.34, 0.55, 0.85];
});

// 2. Celosía metálica horizontal (esquina curva Calle 127 & 12447 Ak 15)
const pCelosia = makePbrSet((u, v) => {
  const slat = Math.sin(v * Math.PI * 24);
  const gap = slat < -0.2;
  if (gap) return [0.14, 0.19, 0.22, 0.10, 0.35, 0.15];
  const c = 0.42 + slat * 0.10;
  return [c, c * 0.98, c * 0.90, 0.38, 0.72, 0.5 + slat * 0.4];
}, 128, 3.0);

// 3. Muro cortina vidrio reflectivo PBR
const pVidrio = makePbrSet((u, v) => {
  const m = (u < 0.03 || u > 0.97 || Math.abs(u - 0.5) < 0.02 || v < 0.04 || v > 0.96);
  if (m) return [0.55, 0.58, 0.62, 0.28, 0.85, 0.9];
  const refl = 0.07 * Math.sin((u + v) * 6.28);
  return [0.18 + refl, 0.28 + refl, 0.36 + refl, 0.05, 0.42, 0.2];
});

// 4. Zócalo / carpa negra y blanco arquitectónico
const pNegro = makePbrSet((u, v) => {
  const n = Math.sin(u * 40 + v * 40) * 0.02;
  return [0.10 + n, 0.11 + n, 0.12 + n, 0.42, 0.35, 0.5 + n * 4];
});
const pBlanco = makePbrSet((u, v) => {
  const j = ((v * 4) % 1) < 0.04 ? 0.88 : 1.0;
  return [0.88 * j, 0.88 * j, 0.87 * j, 0.58, 0.10, j * 0.8];
});

const g = new Glb();
const img = (p) => [g.image(p.alb, 'image/png'), g.image(p.nrm, 'image/png'), g.image(p.mr, 'image/png')];
const [tAjB, tAjN, tAjM] = img(pAjedrez);
const [tCeB, tCeN, tCeM] = img(pCelosia);
const [tViB, tViN, tViM] = img(pVidrio);
const [tNeB, tNeN, tNeM] = img(pNegro);
const [tBlB, tBlN, tBlM] = img(pBlanco);
const tSignMetro = g.image(makeSignPng([20, 24, 30], [235, 242, 250], 'METRO 127'), 'image/png');
const tSignSonesta = g.image(makeSignPng([28, 32, 38], [240, 244, 248], 'SONESTA HOTEL'), 'image/png');
const tSignPrime = g.image(makeSignPng([24, 62, 128], [230, 242, 255], 'MILLIONAIRES'), 'image/png');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mkMat = (name, b, n, mr, met = 1.0, extra = {}) => ({
  P: [], N: [], UV: [], I: [], n: 0,
  def: {
    name, doubleSided: true,
    ...(n !== null ? { normalTexture: { index: n, scale: 1.0 } } : {}),
    pbrMetallicRoughness: {
      baseColorTexture: { index: b },
      baseColorFactor: [1, 1, 1, 1],
      ...(mr !== null ? { metallicRoughnessTexture: { index: mr } } : {}),
      metallicFactor: met,
      roughnessFactor: mr !== null ? 1.0 : 0.4,
    },
    ...extra,
  },
});

const mats = {
  ajedrez: mkMat('PanelAjedrezPBR', tAjB, tAjN, tAjM, 1.0),
  celosia: mkMat('CelosiaMetroPBR', tCeB, tCeN, tCeM, 1.0),
  vidrio: mkMat('VidrioMetroPBR', tViB, tViN, tViM, 1.0, { emissiveFactor: [0.04, 0.06, 0.08] }),
  negro: mkMat('ZocaloNegroPBR', tNeB, tNeN, tNeM, 1.0),
  blanco: mkMat('ConcretoBlancoPBR', tBlB, tBlN, tBlM, 1.0),
  signMetro: mkMat('LetreroMetro127', tSignMetro, null, null, 0.2, { emissiveFactor: [0.22, 0.24, 0.28] }),
  signSonesta: mkMat('LetreroSonesta', tSignSonesta, null, null, 0.2, { emissiveFactor: [0.18, 0.20, 0.24] }),
  signPrime: mkMat('VallaMetro127', tSignPrime, null, null, 0.1, { emissiveFactor: [0.12, 0.18, 0.28] }),
  verde: { P: [], N: [], UV: [], I: [], n: 0, def: { name: 'SetoMetro', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [0.15, 0.32, 0.12, 1], metallicFactor: 0.0, roughnessFactor: 0.86 } } },
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

const area = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
};

for (const b of BLDS) {
  let ring = b.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b.b, zTop = b.b + b.h;
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const mTop = mats.blanco, tBase = mTop.n;
  for (const p of ring) {
    mTop.P.push(p[0], zTop + 0.12, -p[1]); mTop.N.push(0, 1, 0); mTop.UV.push(p[0] * 0.2, p[1] * 0.2); mTop.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mTop.I.push(tBase + tris[i], tBase + tris[i + 1], tBase + tris[i + 2]);

  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    if (b.id === 2319 || b.id === 2333) {
      // Zócalo comercial negro con carpa inclinada negra + seto verde
      addQuad('negro', pt(0, 0.12, zBase), pt(L, 0.12, zBase), pt(L, 0.12, zTop), pt(0, 0.12, zTop), [0, 0], [L * 0.3, 0], [L * 0.3, 1], [0, 1]);
      if (L > 8) {
        addQuad('negro', pt(1, 0.12, zBase + 3.1), pt(L - 1, 0.12, zBase + 3.1), pt(L - 1, 2.2, zBase + 2.3), pt(1, 2.2, zBase + 2.3), [0, 0], [L * 0.3, 0], [L * 0.3, 1], [0, 1]);
        addQuad('verde', pt(1, 1.8, zBase), pt(L - 1, 1.8, zBase), pt(L - 1, 1.8, zBase + 0.9), pt(1, 1.8, zBase + 0.9), [0, 0], [1, 0], [1, 1], [0, 1]);
      }
      continue;
    }

    // Zócalo negro en planta baja (0..4.2 m)
    const zSock = Math.min(zTop, zBase + 4.2);
    addQuad('negro', pt(0, 0.14, zBase), pt(L, 0.14, zBase), pt(L, 0.14, zSock), pt(0, 0.14, zSock), [0, 0], [L * 0.25, 0], [L * 0.25, 1], [0, 1]);
    addQuad('vidrio', pt(0.5, 0.18, zBase + 0.4), pt(L - 0.5, 0.18, zBase + 0.4), pt(L - 0.5, 0.18, zSock - 0.4), pt(0.5, 0.18, zSock - 0.4), [0, 0], [L * 0.3, 0], [L * 0.3, 1], [0, 1]);

    if (b.h > 5) {
      // Tercios arquitectónicos de Metro 127: vidrio cortina central + celosía o ajedrez
      if (L >= 18) {
        const sA = L * 0.30, sB = L * 0.65;
        addQuad('ajedrez', pt(0, 0.12, zSock), pt(sA, 0.12, zSock), pt(sA, 0.12, zTop), pt(0, 0.12, zTop), [0, 0], [sA * 0.12, 0], [sA * 0.12, (zTop - zSock) * 0.12], [0, (zTop - zSock) * 0.12]);
        addQuad('vidrio', pt(sA, 0.10, zSock), pt(sB, 0.10, zSock), pt(sB, 0.10, zTop), pt(sA, 0.10, zTop), [0, 0], [(sB - sA) * 0.25, 0], [(sB - sA) * 0.25, (zTop - zSock) * 0.25], [0, (zTop - zSock) * 0.25]);
        addQuad('celosia', pt(sB, 0.16, zSock), pt(L, 0.16, zSock), pt(L, 0.16, zTop), pt(sB, 0.16, zTop), [0, 0], [(L - sB) * 0.2, 0], [(L - sB) * 0.2, (zTop - zSock) * 0.25], [0, (zTop - zSock) * 0.25]);
        // Valla central sobre el muro cortina
        const vm = (sA + sB) * 0.5;
        addQuad('signPrime', pt(vm - 3.5, 0.22, zSock + 3.0), pt(vm + 3.5, 0.22, zSock + 3.0), pt(vm + 3.5, 0.22, zTop - 2.5), pt(vm - 3.5, 0.22, zTop - 2.5), [0, 1], [1, 1], [1, 0], [0, 0]);
      } else {
        const matBody = (b.id === 175 || b.id === 680) ? 'celosia' : 'ajedrez';
        addQuad(matBody, pt(0, 0.12, zSock), pt(L, 0.12, zSock), pt(L, 0.12, zTop), pt(0, 0.12, zTop), [0, 0], [L * 0.18, 0], [L * 0.18, (zTop - zSock) * 0.18], [0, (zTop - zSock) * 0.18]);
      }
      // Cornisa superior blanca + letreros
      addQuad('blanco', pt(0, 0.24, zTop - 0.9), pt(L, 0.24, zTop - 0.9), pt(L, 0.24, zTop + 0.3), pt(0, 0.24, zTop + 0.3), [0, 0], [L * 0.2, 0], [L * 0.2, 0.3], [0, 0.3]);
      if (b.id === 175 && L > 15 && ny > 0.5) {
        addQuad('signMetro', pt(L * 0.15, 0.30, zTop - 0.8), pt(L * 0.55, 0.30, zTop - 0.8), pt(L * 0.55, 0.30, zTop + 0.8), pt(L * 0.15, 0.30, zTop + 0.8), [0, 1], [1, 1], [1, 0], [0, 0]);
      }
      if (b.id === 373 && L > 20 && nx > 0.5) {
        addQuad('signSonesta', pt(L * 0.12, 0.30, zTop - 0.8), pt(L * 0.45, 0.30, zTop - 0.8), pt(L * 0.45, 0.30, zTop + 0.7), pt(L * 0.12, 0.30, zTop + 0.7), [0, 1], [1, 1], [1, 0], [0, 0]);
      }
    }
  }
}

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
g.j.meshes.push({ name: 'Metro127_Sonesta_PBR', primitives: prims });
g.j.nodes.push({ name: 'Metro127_Sonesta_PBR', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/metro127.glb');
copyFileSync('public/secciones/metro127.glb', 'docs/secciones/metro127.glb');
console.log('metro127.glb UV+PBR generado:', (bytes / 1024).toFixed(1), 'KB');

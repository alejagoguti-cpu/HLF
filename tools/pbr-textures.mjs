/**
 * Generador procedural de texturas PBR tileables (PNG: Albedo, Normal, MetallicRoughness)
 * sin dependencias externas (solo node:zlib).
 */
import { deflateSync } from 'node:zlib';

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  CRC_TABLE[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

export function encodePng(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    const rowStart = y * (w * 4 + 1);
    raw[rowStart] = 0; // filter None
    rgba.copy(raw, rowStart + 1, y * w * 4, (y + 1) * w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

// Hash 2D determinista y ruido tileable
function hash2(x, y, s = 1) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1442695041);
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}
function tileNoise(u, v, period, seed = 1) {
  const x = u * period, y = v * period;
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = x - x0, fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const ix0 = ((x0 % period) + period) % period, ix1 = (ix0 + 1) % period;
  const iy0 = ((y0 % period) + period) % period, iy1 = (iy0 + 1) % period;
  const a = hash2(ix0, iy0, seed), b = hash2(ix1, iy0, seed);
  const c = hash2(ix0, iy1, seed), d = hash2(ix1, iy1, seed);
  return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
}
function fbm(u, v, basePeriod = 8, seed = 1) {
  return (
    tileNoise(u, v, basePeriod, seed) * 0.55 +
    tileNoise(u, v, basePeriod * 2, seed + 17) * 0.30 +
    tileNoise(u, v, basePeriod * 4, seed + 53) * 0.15
  );
}

function makeNormalPng(size, hGrid, strength = 2.2) {
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size, yp = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size, xp = (x + 1) % size;
      const dx = (hGrid[y * size + xp] - hGrid[y * size + xm]) * strength;
      const dy = (hGrid[yp * size + x] - hGrid[ym * size + x]) * strength;
      let nx = -dx, ny = -dy, nz = 1.0;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len; ny /= len; nz /= len;
      const idx = (y * size + x) * 4;
      rgba[idx] = Math.round((nx * 0.5 + 0.5) * 255);
      rgba[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      rgba[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      rgba[idx + 3] = 255;
    }
  }
  return encodePng(size, size, rgba);
}

function buildPbrSet(size, evalFn, normalStrength = 2.2) {
  const albedo = Buffer.alloc(size * size * 4);
  const mr = Buffer.alloc(size * size * 4);
  const hGrid = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const [r, g, b, rough, metal, h] = evalFn(u, v);
      const idx = (y * size + x) * 4;
      albedo[idx] = Math.max(0, Math.min(255, Math.round(r * 255)));
      albedo[idx + 1] = Math.max(0, Math.min(255, Math.round(g * 255)));
      albedo[idx + 2] = Math.max(0, Math.min(255, Math.round(b * 255)));
      albedo[idx + 3] = 255;
      // glTF metallicRoughness: G = roughness, B = metallic
      mr[idx] = 0;
      mr[idx + 1] = Math.max(0, Math.min(255, Math.round(rough * 255)));
      mr[idx + 2] = Math.max(0, Math.min(255, Math.round(metal * 255)));
      mr[idx + 3] = 255;
      hGrid[y * size + x] = h;
    }
  }
  return {
    albedo: encodePng(size, size, albedo),
    normal: makeNormalPng(size, hGrid, normalStrength),
    mr: encodePng(size, size, mr),
  };
}

export function generatePbrTextures() {
  const S = 128;
  // 1. Ladrillo (solo normal + mr para complementar tex_ladrillo.webp)
  const ladrillo = buildPbrSet(S, (u, v) => {
    const rows = 8, cols = 4;
    const row = Math.floor(v * rows);
    const rv = (v * rows) % 1;
    const ru = ((u * cols) + (row % 2) * 0.5) % 1;
    const mortar = (rv < 0.12 || rv > 0.94 || ru < 0.06 || ru > 0.97) ? 0 : 1;
    const grain = fbm(u, v, 16, 11);
    const h = mortar * (0.65 + grain * 0.35);
    return [0.7, 0.4, 0.3, mortar ? 0.78 + grain * 0.1 : 0.95, 0.0, h];
  }, 3.4);

  // 2. Adoquín (normal + mr para complementar tex_anden.webp)
  const adoquin = buildPbrSet(S, (u, v) => {
    const rows = 8, cols = 8;
    const row = Math.floor(v * rows);
    const rv = (v * rows) % 1;
    const ru = ((u * cols) + (row % 2) * 0.5) % 1;
    const edge = Math.min(rv, 1 - rv, ru, 1 - ru);
    const bevel = Math.min(1, edge / 0.12);
    const grain = fbm(u, v, 16, 23);
    const h = bevel * (0.7 + grain * 0.3);
    return [0.6, 0.55, 0.5, 0.74 + grain * 0.16, 0.0, h];
  }, 3.0);

  // 3. Concreto arquitectónico beige (materas)
  const concreto = buildPbrSet(S, (u, v) => {
    const n1 = fbm(u, v, 8, 31), n2 = fbm(u, v, 24, 37);
    const joint = (v < 0.03 || u < 0.03) ? 0.85 : 1.0;
    const base = (0.72 + (n1 - 0.5) * 0.09 + (n2 - 0.5) * 0.05) * joint;
    return [base, base * 0.95, base * 0.86, 0.80 + n2 * 0.12, 0.0, n1 * 0.6 + n2 * 0.4];
  }, 1.8);

  // 4. Hierro forjado / acero negro
  const hierro = buildPbrSet(S, (u, v) => {
    const n = fbm(u, v, 12, 43);
    const brush = tileNoise(u, v, 32, 47);
    const c = 0.09 + n * 0.04 + brush * 0.02;
    return [c, c * 1.04, c * 1.12, 0.28 + n * 0.16, 0.85, n * 0.65 + brush * 0.35];
  }, 1.4);

  // 5. Lona blanca tejida (pérgola)
  const lona = buildPbrSet(S, (u, v) => {
    const wx = Math.sin(u * Math.PI * 64) * 0.5 + 0.5;
    const wy = Math.sin(v * Math.PI * 64) * 0.5 + 0.5;
    const weave = (wx + wy) * 0.5;
    const n = fbm(u, v, 8, 59);
    const c = 0.88 + weave * 0.05 - n * 0.04;
    return [c, c * 0.98, c * 0.94, 0.72 + weave * 0.12, 0.0, weave * 0.6 + n * 0.4];
  }, 1.3);

  // 6. Parasol oscuro tejido
  const parasol = buildPbrSet(S, (u, v) => {
    const wx = Math.sin(u * Math.PI * 64) * 0.5 + 0.5;
    const wy = Math.sin(v * Math.PI * 64) * 0.5 + 0.5;
    const weave = (wx + wy) * 0.5;
    const n = fbm(u, v, 8, 67);
    const c = 0.20 + weave * 0.04 + n * 0.03;
    return [c, c, c * 1.08, 0.70 + weave * 0.12, 0.04, weave * 0.65 + n * 0.35];
  }, 1.4);

  // 7. Bronce cepillado (letrero)
  const dorado = buildPbrSet(S, (u, v) => {
    const streak = tileNoise(u * 0.25, v, 32, 71);
    const r = 0.76 + streak * 0.10, g = 0.60 + streak * 0.08, b = 0.28 + streak * 0.05;
    return [r, g, b, 0.22 + streak * 0.10, 0.88, streak];
  }, 1.0);

  // 8. Follaje botánico multi-tono (cipreses y arbustos)
  const hojas = buildPbrSet(S, (u, v) => {
    const n1 = fbm(u, v, 12, 83), n2 = fbm(u, v, 32, 89);
    const leaf = Math.sin(u * Math.PI * 16 + n1 * 4) * Math.cos(v * Math.PI * 16 + n2 * 4);
    const tone = 0.5 + 0.5 * leaf;
    const r = 0.11 + tone * 0.14 + n2 * 0.05;
    const g = 0.24 + tone * 0.22 + n1 * 0.08;
    const b = 0.07 + tone * 0.07;
    return [r, g, b, 0.58 + (1 - tone) * 0.22, 0.0, tone * 0.7 + n2 * 0.3];
  }, 2.8);

  return { ladrillo, adoquin, concreto, hierro, lona, parasol, dorado, hojas };
}

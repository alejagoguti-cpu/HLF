import * as THREE from 'three';

/* ============================================================
   Librería de texturas procedurales (canvas, sin assets)
   ============================================================ */

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function valueNoise(size, cells, seed) {
  const r = rng(seed);
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(size * size);
  const smooth = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < size; y++) {
    const fy = (y / size) * cells;
    const y0 = Math.floor(fy) % cells, y1 = (y0 + 1) % cells;
    const ty = smooth(fy - Math.floor(fy));
    for (let x = 0; x < size; x++) {
      const fx = (x / size) * cells;
      const x0 = Math.floor(fx) % cells, x1 = (x0 + 1) % cells;
      const tx = smooth(fx - Math.floor(fx));
      const a = g[y0 * cells + x0], b = g[y0 * cells + x1];
      const c = g[y1 * cells + x0], d = g[y1 * cells + x1];
      const top = a + (b - a) * tx, bot = c + (d - c) * tx;
      out[y * size + x] = top + (bot - top) * ty;
    }
  }
  return out;
}

function fbm(size, seed, octaves = 5, baseCells = 4) {
  const acc = new Float32Array(size * size);
  let amp = 1, tot = 0, cells = baseCells;
  for (let o = 0; o < octaves; o++) {
    const n = valueNoise(size, cells, seed + o * 997);
    for (let i = 0; i < acc.length; i++) acc[i] += n[i] * amp;
    tot += amp; amp *= 0.5; cells *= 2;
    if (cells > size) break;
  }
  for (let i = 0; i < acc.length; i++) acc[i] /= tot;
  return acc;
}

const setPx = (d, i, r, g, b, a = 255) => { d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = a; };

function canvasFrom(size, fn) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  fn(img.data, size);
  ctx.putImageData(img, 0, 0);
  return c;
}

function normalFrom(canvas, strength = 2.0) {
  const size = canvas.width;
  const src = canvas.getContext('2d').getImageData(0, 0, size, size).data;
  const out = document.createElement('canvas');
  out.width = out.height = size;
  const ctx = out.getContext('2d');
  const img = ctx.createImageData(size, size);
  const L = (x, y) => {
    x = (x + size) % size; y = (y + size) % size;
    const i = (y * size + x) * 4;
    return (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) / 255;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (L(x + 1, y) - L(x - 1, y)) * strength;
      const dy = (L(x, y + 1) - L(x, y - 1)) * strength;
      const nx = -dx, ny = -dy, nz = 1.0;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      setPx(img.data, i, (nx / len * 0.5 + 0.5) * 255, (ny / len * 0.5 + 0.5) * 255, (nz / len * 0.5 + 0.5) * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return out;
}

/* ---------------- superficies ---------------- */

function asphalt(seed, red = false) {
  const S = 512, n = fbm(S, seed, 6, 6), fine = fbm(S, seed + 11, 7, 32);
  return canvasFrom(S, (d) => {
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const v = n[p] * 0.65 + fine[p] * 0.35;
      const g = (Math.random() - 0.5) * 15;
      if (red) setPx(d, i, 96 + v * 40 + g, 44 + v * 22 + g, 40 + v * 18 + g);
      else { const b = 34 + v * 26; setPx(d, i, b + g, b + g, b + 2 + g); }
    }
    const r = rng(seed + 5);
    for (let k = 0; k < S * 8; k++) {
      const x = (r() * S) | 0, y = (r() * S) | 0, i = (y * S + x) * 4, g = 58 + r() * 45;
      d[i] = g; d[i + 1] = g * (red ? 0.55 : 1); d[i + 2] = g * (red ? 0.5 : 1.02);
    }
  });
}

function concrete(seed, tone = 172) {
  const S = 512, n = fbm(S, seed, 6, 5), stain = fbm(S, seed + 21, 4, 3);
  return canvasFrom(S, (d) => {
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const v = 0.74 + n[p] * 0.26 - Math.max(0, stain[p] - 0.62) * 0.30;
      const base = tone * v, g = (Math.random() - 0.5) * 8;
      setPx(d, i, base + g, base * 0.99 + g, base * 0.955 + g);
    }
  });
}

function sidewalk(seed) {
  const S = 512, n = fbm(S, seed, 5, 6);
  const cell = S / 8;
  return canvasFrom(S, (d) => {
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = (y * S + x) * 4;
        const jx = ((x % cell) < 3) || ((y % cell) < 3);
        const v = 0.86 + n[(y * S + x)] * 0.14;
        const base = 176 * v * (jx ? 0.82 : 1);
        const g = (Math.random() - 0.5) * 7;
        setPx(d, i, base + g, base * 0.985 + g, base * 0.95 + g);
      }
    }
  });
}

function roofTiles(seed) {
  const S = 512, rows = 14, cols = 10;
  const rh = S / rows, cw = S / cols;
  return canvasFrom(S, (d) => {
    for (let y = 0; y < S; y++) {
      const row = Math.floor(y / rh), ly = (y % rh) / rh, off = (row % 2) * cw * 0.5;
      for (let x = 0; x < S; x++) {
        const lx = ((x + off) % cw) / cw;
        const curve = Math.sin(lx * Math.PI);
        const shade = 0.58 + curve * 0.52 + (1 - ly) * 0.2;
        const j = 0.9 + ((Math.sin(row * 12.9 + Math.floor((x + off) / cw) * 7.7) + 1) * 0.5) * 0.2;
        const edge = (ly < 0.05 || lx < 0.04 || lx > 0.96) ? 0.7 : 1;
        const i = (y * S + x) * 4;
        setPx(d, i, Math.min(255, 178 * shade * j * edge), Math.min(255, 88 * shade * j * edge), Math.min(255, 52 * shade * j * edge));
      }
    }
  });
}

function bark(seed) {
  const S = 512, n = fbm(S, seed, 5, 6);
  return canvasFrom(S, (d) => {
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = (y * S + x) * 4, p = n[y * S + x];
        const streak = Math.sin(x * 0.42 + p * 7.0);
        const v = 0.52 + p * 0.5 + streak * 0.12;
        setPx(d, i, 76 * v, 56 * v, 40 * v);
      }
    }
  });
}

function grass(seed) {
  const S = 512, n = fbm(S, seed, 6, 8), fine = fbm(S, seed + 3, 7, 48);
  return canvasFrom(S, (d) => {
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const v = n[p] * 0.65 + fine[p] * 0.35;
      setPx(d, i, 48 + v * 44, 76 + v * 66, 34 + v * 26);
    }
    const r = rng(seed + 9);
    for (let k = 0; k < S * 30; k++) {
      const x = (r() * S) | 0, y = (r() * S) | 0, i = (y * S + x) * 4, v = r();
      d[i] = 58 + v * 66; d[i + 1] = 92 + v * 74; d[i + 2] = 40 + v * 28;
    }
  });
}

/* fachada con ventanas + su mapa de emisión (luces encendidas) */
function facadePair(seed, opts = {}) {
  const S = 512;
  const cols = opts.cols || 8, rows = opts.rows || 10;
  const cw = S / cols, rh = S / rows;
  const n = fbm(S, seed, 5, 6);
  const base = opts.tone || [214, 202, 182];
  const r = rng(seed + 3);
  const lit = [];
  for (let i = 0; i < cols * rows; i++) lit.push(r() < 0.55 ? 0.55 + r() * 0.45 : 0);

  const day = canvasFrom(S, (d) => {
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = (y * S + x) * 4;
        const cx = Math.floor(x / cw), cy = Math.floor(y / rh);
        const wx = (x % cw) / cw, wy = (y % rh) / rh;
        const inWin = wx > 0.2 && wx < 0.8 && wy > 0.22 && wy < 0.82;
        const mottle = 0.94 + n[y * S + x] * 0.12;
        if (inWin) {
          const glassTint = 0.30 + ((cx * 7 + cy * 13) % 5) * 0.03;
          setPx(d, i, base[0] * glassTint * mottle, base[1] * glassTint * 1.04 * mottle, base[2] * glassTint * 1.2 * mottle);
        } else {
          const g = (Math.random() - 0.5) * 6;
          setPx(d, i, base[0] * mottle + g, base[1] * mottle + g, base[2] * mottle + g);
        }
      }
    }
  });

  const emis = canvasFrom(S, (d) => {
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const i = (y * S + x) * 4;
        const cx = Math.floor(x / cw), cy = Math.floor(y / rh);
        const wx = (x % cw) / cw, wy = (y % rh) / rh;
        const inWin = wx > 0.22 && wx < 0.78 && wy > 0.24 && wy < 0.8;
        const k = lit[cy * cols + cx];
        if (inWin && k > 0) {
          const warm = 0.85 + ((cx * 3 + cy * 5) % 4) * 0.05;
          setPx(d, i, 255 * k * warm, 214 * k * warm, 150 * k * warm);
        } else setPx(d, i, 0, 0, 0);
      }
    }
  });
  return { day, emis };
}

/* ---------------- API ---------------- */

function tex(canvas, aniso, srgb = true) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

export function buildTextures(renderer) {
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const lib = {};
  const add = (key, canvas, nstr, rep = 1) => {
    lib[key] = {
      map: tex(canvas, aniso),
      normalMap: tex(normalFrom(canvas, nstr), aniso, false),
      repeat: rep,
    };
  };
  add('asphalt', asphalt(101), 2.0, 1);
  add('asphaltRed', asphalt(202, true), 2.0, 1);
  add('concrete', concrete(303), 1.4, 1);
  add('concreteDark', concrete(404, 132), 1.4, 1);
  add('sidewalk', sidewalk(505), 1.2, 1);
  add('roof', roofTiles(606), 2.6, 1);
  add('bark', bark(707), 2.0, 1);
  add('grass', grass(808), 1.4, 1);

  const warm = facadePair(909, { cols: 8, rows: 10, tone: [216, 204, 184] });
  const cool = facadePair(1010, { cols: 7, rows: 12, tone: [198, 200, 202] });
  const brickF = facadePair(1111, { cols: 9, rows: 9, tone: [186, 128, 96] });

  for (const [key, pair, rep] of [['facade', warm, 1], ['facadeCool', cool, 1], ['facadeBrick', brickF, 1]]) {
    lib[key] = {
      map: tex(pair.day, aniso),
      normalMap: tex(normalFrom(pair.day, 1.6), aniso, false),
      emissiveMap: tex(pair.emis, aniso),
      repeat: rep,
    };
  }
  return lib;
}

export function applySurface(material, set, { repeat, color, metalness, roughness, emissive } = {}) {
  if (!set || !material) return material;
  material.map = set.map;
  material.normalMap = set.normalMap;
  material.normalScale = new THREE.Vector2(0.6, 0.6);
  if (set.emissiveMap) {
    material.emissiveMap = set.emissiveMap;
    material.emissive = new THREE.Color(emissive ?? 0xffffff);
    material.emissiveIntensity = 0;
  }
  const r = repeat ?? set.repeat ?? 1;
  for (const t of [material.map, material.normalMap, material.emissiveMap]) {
    if (t && t.clone) continue;
  }
  material.map.repeat.set(r, r);
  if (material.normalMap) material.normalMap.repeat.set(r, r);
  if (material.emissiveMap) material.emissiveMap.repeat.set(r, r);
  if (color !== undefined) material.color = new THREE.Color(color);
  if (metalness !== undefined) material.metalness = metalness;
  if (roughness !== undefined) material.roughness = roughness;
  material.roughness = roughness ?? 0.9;
  material.metalness = metalness ?? 0.0;
  material.needsUpdate = true;
  return material;
}

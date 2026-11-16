/**
 * Edificaciones del proyecto Unreal -> secciones GLB para la web.
 *
 * Fuente: la misma que alimenta los actores Edificios2_* de Unreal
 * (work/k2/edificios.json: huella, base, altura y pisos por edificio).
 * Se parte en los mismos 16 cuadrantes de 500 m + Hotel.
 *
 * Marco de salida: ENU en metros respecto al origen de CesiumGeoreference_UNICENTRO,
 * escrito como glTF Y-up (x = Este, y = Arriba, z = -Norte).
 *
 * Atributos:
 *   TEXCOORD_0  muros: (vanos, pisos)   cubierta: (E, N) en metros
 *   COLOR_0     r = aleatorio por edificio, g = pisos/32, b = tipo (0 muro, 1 cubierta), a = segundo aleatorio
 */
import earcut from 'earcut';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { enZona } from './zona.mjs';

const K2 = 'C:/Users/aleja/Documents/Codex/2026-11-06/co/work/k2/';
const OUT = 'public/secciones/';
const E = JSON.parse(readFileSync(K2 + 'edificios.json', 'utf8'));

// transformación del actor en Unreal (escala XY y giro) -> ENU
const S = 1.000614;
const A = (0.0849 * Math.PI) / 180;
const CA = Math.cos(A), SA = Math.sin(A);
const enu = (x, y) => [S * (x * CA - y * SA), S * (x * SA + y * CA)];

const HX = -246, HY = 291, TILE = 500;
const BAY = 3.3;
const SKIRT = 5; // el muro baja bajo la rasante para no dejar luz contra el terreno real
const area = (r) => { let a = 0; for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; };
const clean = (r) => {
  const o = [];
  for (const p of r) { const l = o[o.length - 1]; if (!l || Math.hypot(p[0] - l[0], p[1] - l[1]) > 0.02) o.push(p); }
  if (o.length > 1 && Math.hypot(o[0][0] - o[o.length - 1][0], o[0][1] - o[o.length - 1][1]) < 0.02) o.pop();
  return o;
};
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// triángulos (en planta, coords del modelo) de la cubierta de teja del hotel
const TEJA = JSON.parse(readFileSync(K2 + 'cubiertas_hotel.json', 'utf8')).Teja.V;
const bajoTeja = (x, y) => {
  for (let i = 0; i < TEJA.length; i += 9) {
    const ax = TEJA[i] / 100, ay = -TEJA[i + 1] / 100, bx = TEJA[i + 3] / 100, by = -TEJA[i + 4] / 100, cx = TEJA[i + 6] / 100, cy = -TEJA[i + 7] / 100;
    if (Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) < 0.05) continue; // triángulo degenerado
    const d1 = (x - bx) * (ay - by) - (ax - bx) * (y - by), d2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy), d3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay);
    if (!((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))) return true;
  }
  return false;
};
const secs = new Map();
const CUSTOM_IDS = new Set([7,8,9,10,11,12,14,15,50,51,54,94,96, 162,164,165,171,175,176,181,358,365,373,374,680,692,1076,1364,1375,2269,2319,2333]);
const index = [];
let id = 0;
let omitidos = 0;

for (const e of E) {
  const rings = e.rings.map((r) => clean(r.map(([x, y]) => enu(x, y)))).filter((r) => r.length >= 3);
  if (!rings.length) continue;
  if (area(rings[0]) < 0) rings[0].reverse();
  for (let i = 1; i < rings.length; i++) if (area(rings[i]) > 0) rings[i].reverse();

  // mismo criterio de sección que Unreal (sobre coordenadas del modelo)
  let cx = 0, cy = 0; for (const p of e.rings[0]) { cx += p[0]; cy += p[1]; } cx /= e.rings[0].length; cy /= e.rings[0].length;
  // en la zona real manda la captura 3D del edificio verdadero: ahí no se generan volúmenes
  { const [zx, zy] = enu(cx, cy); if (enZona(zx, zy)) { omitidos++; continue; } }
  // hotel: centro bajo la teja, o la mayoría de sus vértices bajo la teja
  const frac = e.rings[0].filter((p) => bajoTeja(p[0], p[1])).length / e.rings[0].length;
  const key = Math.hypot(cx - HX, cy - HY) < 75 || bajoTeja(cx, cy) || frac > 0.4 ? 'Hotel' : `T${Math.floor((cx + 1000) / TILE)}${Math.floor((cy + 1000) / TILE)}`;
  if (!secs.has(key)) secs.set(key, { P: [], N: [], UV: [], C: [], I: [], n: 0 });
  const m = secs.get(key);

  const z0 = e.base, z1 = e.base + e.h, pisos = Math.max(1, e.pisos);
  const parapet = pisos >= 3 ? 1.0 : 0.35;
  const fh = e.h / pisos;
  const esHotel = key === 'Hotel';
  // el hotel va todo en el mismo ladrillo a la vista (tipo 0.12 en el canal b)
  const col = [Math.round(e.rnd * 255), Math.round(Math.min(1, pisos / 32) * 255), 0, Math.round((esHotel ? 0.5 : hash(id + 1)) * 255)];
  const WALL = esHotel ? 30 : 0;
  const vert = (x, y, z, nx, ny, nz, u, v, type) => {
    m.P.push(x, z, -y); m.N.push(nx, nz, -ny); m.UV.push(u, v); m.C.push(col[0], col[1], type, col[3]);
    return m.n++;
  };

  if (!CUSTOM_IDS.has(id)) {
    for (const ring of rings) {
      for (let k = 0; k < ring.length; k++) {
        const [x0, y0] = ring[k], [x1, y1] = ring[(k + 1) % ring.length];
        const L = Math.hypot(x1 - x0, y1 - y0);
        if (L < 0.05) continue;
        const nx = (y1 - y0) / L, ny = -(x1 - x0) / L;
        const nb = L < 1.8 ? 0 : Math.max(1, Math.round(L / BAY));
        const vb = -SKIRT / fh, vt = (e.h + parapet) / fh;
        const a = vert(x0, y0, z0 - SKIRT, nx, ny, 0, 0, vb, WALL);
        const b = vert(x1, y1, z0 - SKIRT, nx, ny, 0, nb, vb, WALL);
        const c = vert(x1, y1, z1 + parapet, nx, ny, 0, nb, vt, WALL);
        const d = vert(x0, y0, z1 + parapet, nx, ny, 0, 0, vt, WALL);
        m.I.push(a, b, c, a, c, d);
      }
    }

    const flat = [], holes = [];
    rings.forEach((r, i) => { if (i) holes.push(flat.length / 2); for (const p of r) flat.push(p[0], p[1]); });
    const tris = earcut(flat, holes, 2);
    const base = m.n;
    for (let i = 0; i < flat.length; i += 2) vert(flat[i], flat[i + 1], z1, 0, 0, 1, flat[i], flat[i + 1], esHotel ? 236 : 255);
    for (let i = 0; i < tris.length; i += 3) m.I.push(base + tris[i], base + tris[i + 1], base + tris[i + 2]);
  }

  const ext = rings[0];
  let mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
  for (const p of ext) { mnx = Math.min(mnx, p[0]); mny = Math.min(mny, p[1]); mxx = Math.max(mxx, p[0]); mxy = Math.max(mxy, p[1]); }
  index.push({
    id, s: key, p: pisos, b: +z0.toFixed(2), h: +e.h.toFixed(2),
    bb: [mnx, mny, mxx, mxy].map((v) => +v.toFixed(1)),
    r: ext.map((p) => [+p[0].toFixed(2), +p[1].toFixed(2)]),
  });
  id++;
}

mkdirSync(OUT, { recursive: true });
const manifest = [];
for (const [key, m] of [...secs].sort()) {
  const g = new Glb();
  const P = new Float32Array(m.P);
  const prim = {
    attributes: {
      POSITION: g.acc(P, 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(new Float32Array(m.N), 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(new Float32Array(m.UV), 'VEC2', { target: 34962 }),
      COLOR_0: g.acc(new Uint8Array(m.C), 'VEC4', { target: 34962, normalized: true }),
    },
    indices: g.acc(m.n > 65535 ? new Uint32Array(m.I) : new Uint16Array(m.I), 'SCALAR', { target: 34963 }),
    material: 0,
  };
  g.j.materials.push({ name: 'Fachada', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.85 } });
  g.j.meshes.push({ name: 'Edificios_' + key, primitives: [prim] });
  g.j.nodes.push({ name: 'Edificios_' + key, mesh: 0 });
  g.j.scenes[0].nodes.push(0);
  const file = `edificios_${key}.glb`;
  const bytes = g.write(OUT + file);
  let c = [0, 0], n = 0;
  for (let i = 0; i < P.length; i += 3) { c[0] += P[i]; c[1] -= P[i + 2]; n++; }
  manifest.push({ key, file, tris: m.I.length / 3, kb: Math.round(bytes / 1024), c: [Math.round(c[0] / n), Math.round(c[1] / n)] });
  console.log(key, 'tris', m.I.length / 3, 'verts', m.n, (bytes / 1024).toFixed(0) + ' KB');
}

writeFileSync(OUT + 'edificios.json', JSON.stringify({ secciones: manifest, edificios: index }));
console.log('edificios', index.length, 'secciones', manifest.length, '· en zona real (no generados):', omitidos);

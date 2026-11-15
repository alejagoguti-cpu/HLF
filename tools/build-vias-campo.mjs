/**
 * Campo de navegación para los vehículos: se rasteriza la malla de vías del modelo en una
 * retícula de 2,5 m y se guarda, por celda, la distancia al borde de calzada (0 = fuera de la vía)
 * y la cota del pavimento. Los carros se guían por ese campo (se mantienen en su carril).
 *   public/secciones/vias_campo.bin  [W*H distancia (uint8, 0.5 m por unidad)] [W*H cota (uint8, 0.1 m por unidad, +2 m)]
 */
import { readFileSync, writeFileSync } from 'node:fs';
const buf = readFileSync('public/secciones/suelo_Vias.glb');
const jl = buf.readUInt32LE(12);
const g = JSON.parse(buf.subarray(20, 20 + jl));
const bin = buf.subarray(20 + jl + 8);
const prim = g.meshes[0].primitives[0];
const view = (ai) => { const a = g.accessors[ai], bv = g.bufferViews[a.bufferView]; return { a, off: bv.byteOffset || 0 }; };
const pv = view(prim.attributes.POSITION), iv = view(prim.indices);
const P = new Float32Array(bin.buffer, bin.byteOffset + pv.off, pv.a.count * 3);
const I = new Uint32Array(bin.buffer.slice(bin.byteOffset + iv.off, bin.byteOffset + iv.off + iv.a.count * 4));
const CELL = 2.5, X0 = -1000, Y0 = -950, W = 800, H = 760;
const road = new Uint8Array(W * H), hgt = new Float32Array(W * H);
for (let t = 0; t < I.length; t += 3) {
  const v = [0, 1, 2].map((k) => { const i = I[t + k] * 3; return [(P[i] - X0) / CELL, (-P[i + 2] - Y0) / CELL, P[i + 1]]; });
  const minx = Math.max(0, Math.floor(Math.min(v[0][0], v[1][0], v[2][0]))), maxx = Math.min(W - 1, Math.ceil(Math.max(v[0][0], v[1][0], v[2][0])));
  const miny = Math.max(0, Math.floor(Math.min(v[0][1], v[1][1], v[2][1]))), maxy = Math.min(H - 1, Math.ceil(Math.max(v[0][1], v[1][1], v[2][1])));
  const den = (v[1][1] - v[2][1]) * (v[0][0] - v[2][0]) + (v[2][0] - v[1][0]) * (v[0][1] - v[2][1]);
  if (Math.abs(den) < 1e-9) continue;
  for (let y = miny; y <= maxy; y++) for (let x = minx; x <= maxx; x++) {
    const px = x + 0.5, py = y + 0.5;
    const a = ((v[1][1] - v[2][1]) * (px - v[2][0]) + (v[2][0] - v[1][0]) * (py - v[2][1])) / den;
    const b = ((v[2][1] - v[0][1]) * (px - v[2][0]) + (v[0][0] - v[2][0]) * (py - v[2][1])) / den;
    const c = 1 - a - b;
    if (a < -0.02 || b < -0.02 || c < -0.02) continue;
    road[y * W + x] = 1; hgt[y * W + x] = a * v[0][2] + b * v[1][2] + c * v[2][2];
  }
}
// distancia al borde (chamfer 3-4, en celdas)
const INF = 1e6, D = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) D[i] = road[i] ? INF : 0;
const relax = (i, j, w) => { if (D[j] + w < D[i]) D[i] = D[j] + w; };
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!road[i]) continue; if (x > 0) relax(i, i - 1, 1); if (y > 0) { relax(i, i - W, 1); if (x > 0) relax(i, i - W - 1, 1.414); if (x < W - 1) relax(i, i - W + 1, 1.414); } }
for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!road[i]) continue; if (x < W - 1) relax(i, i + 1, 1); if (y < H - 1) { relax(i, i + W, 1); if (x < W - 1) relax(i, i + W + 1, 1.414); if (x > 0) relax(i, i + W - 1, 1.414); } }
const out = new Uint8Array(W * H * 2);
let n = 0, mx = 0;
for (let i = 0; i < W * H; i++) {
  const d = Math.min(255, Math.round((D[i] * CELL) / 0.5)); out[i] = d; if (d) n++; mx = Math.max(mx, d);
  out[W * H + i] = Math.max(0, Math.min(255, Math.round((hgt[i] + 2) / 0.1)));
}
writeFileSync('public/secciones/vias_campo.bin', out);
writeFileSync('public/secciones/vias_campo.json', JSON.stringify({ cell: CELL, x0: X0, y0: Y0, w: W, h: H }));
console.log('celdas de vía', n, 'de', W * H, '· ancho medio máx', (mx * 0.5).toFixed(1), 'm ·', (out.length / 1024).toFixed(0), 'KB');

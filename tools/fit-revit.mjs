// Ajusta la posición del Revit sobre la huella real del bloque que reemplaza (Catastro 375 + 177).
// Busca giro y traslado que minimizan la distancia entre los bordes de la huella y los muros de Revit.
import { readFileSync, writeFileSync } from 'node:fs';
const E = JSON.parse(readFileSync('C:/Users/aleja/Documents/Codex/2026-11-06/co/work/k2/edificios.json', 'utf8'));
const A = JSON.parse(readFileSync('build/revit/alineacion.json', 'utf8'));
const IDS = (process.argv[2] || '375,177').split(',').map(Number);
// puntos sobre los bordes de la huella (coords del modelo, m)
const edge = [];
for (const id of IDS) for (const ring of E[id].rings) for (let i = 0; i < ring.length; i++) {
  const [x0, y0] = ring[i], [x1, y1] = ring[(i + 1) % ring.length]; const L = Math.hypot(x1 - x0, y1 - y0);
  for (let t = 0; t < L; t += 0.5) edge.push([x0 + ((x1 - x0) * t) / L, y0 + ((y1 - y0) * t) / L]);
}
// muros exteriores de Revit: vértices de muros de los pisos tipo, en coords de Revit
const W = [];
for (const k of [2, 3, 4]) { const d = JSON.parse(readFileSync(`build/revit/nivel_${k}.json`, 'utf8')); const V = d.cats.ventanas.V; for (let i = 0; i < V.length; i += 3) W.push([V[i] - A.rx, V[i + 1] - A.ry]); }
// rejilla de muros para búsqueda rápida del vecino
const CELL = 1;
const idx = new Map();
const put = (x, y, p) => { const k = Math.floor(x / CELL) + ',' + Math.floor(y / CELL); (idx.get(k) || idx.set(k, []).get(k)).push(p); };
// rejilla de los bordes de la huella
for (const [x, y] of edge) put(x, y, [x, y]);
const EI = new Map(idx);
const cost = (th, dx, dy) => {
  const c = Math.cos((th * Math.PI) / 180), s = Math.sin((th * Math.PI) / 180);
  let sum = 0;
  for (let i = 0; i < W.length; i += 7) {
    const [x, y] = W[i];
    const X = x * c - y * s + A.cx + dx, Y = x * s + y * c + A.cy + dy;
    let best = 6;
    const gx = Math.floor(X / CELL), gy = Math.floor(Y / CELL);
    for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) for (const [ex, ey] of EI.get(gx + a + ',' + (gy + b)) || []) best = Math.min(best, Math.hypot(ex - X, ey - Y));
    sum += best;
  }
  return sum / Math.ceil(W.length / 7);
};
let best = { c: cost(A.th, 0, 0), th: A.th, dx: 0, dy: 0 };
console.log('actual: error medio', best.c.toFixed(2), 'm');
for (const [step, span] of [[2, 40], [0.5, 4], [0.1, 1]]) {
  const b0 = { ...best };
  for (let dx = -span; dx <= span; dx += step) for (let dy = -span; dy <= span; dy += step) for (const dth of [-8, -4, -2, -1, 0, 1, 2, 4, 8].map((v) => v * (step < 1 ? 0.1 : 1))) {
    const c = cost(b0.th + dth, b0.dx + dx, b0.dy + dy);
    if (c < best.c) best = { c, th: b0.th + dth, dx: b0.dx + dx, dy: b0.dy + dy };
  }
  console.log('paso', step, 'error', best.c.toFixed(2), 'th', best.th.toFixed(2), 'dx', best.dx.toFixed(1), 'dy', best.dy.toFixed(1));
}
if (process.argv[3] === 'guardar') {
  const N = { ...A, th: +best.th.toFixed(3), cx: +(A.cx + best.dx).toFixed(3), cy: +(A.cy + best.dy).toFixed(3), ajuste_error_m: +best.c.toFixed(2), bloques: IDS };
  writeFileSync('build/revit/alineacion.json', JSON.stringify(N, null, 1));
  console.log('guardado', JSON.stringify(N));
}

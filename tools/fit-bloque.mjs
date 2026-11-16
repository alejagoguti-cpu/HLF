/** Encaja el Revit en los bloques que reemplaza (máxima cobertura) sin invadir los vecinos. */
import { readFileSync, writeFileSync } from 'node:fs';
const A = JSON.parse(readFileSync('build/revit/alineacion.json', 'utf8'));
const OBJ = A.bloques ?? [375, 1383, 2353];
const S = 1.000614, AA = (0.0849 * Math.PI) / 180, CA = Math.cos(AA), SA = Math.sin(AA);
const toENU = (mx, my) => [S * (mx * CA - my * SA), S * (mx * SA + my * CA)];
// celdas del Revit en coords relativas al punto de giro (rx, ry)
const G = 0.5, pts = new Map();
for (let k = 1; k <= 6; k++) {
  const d = JSON.parse(readFileSync(`build/revit/nivel_${k}.json`, 'utf8'));
  for (const cat of ['losas', 'cubiertas', 'muros']) { const m = d.cats[cat]; if (!m) continue;
    for (let t = 0; t < m.T.length; t += 3) { const q = [0,1,2].map((j) => [m.V[m.T[t+j]*3] - A.rx, m.V[m.T[t+j]*3+1] - A.ry]);
      const e1 = [q[1][0]-q[0][0], q[1][1]-q[0][1]], e2 = [q[2][0]-q[0][0], q[2][1]-q[0][1]]; const st = Math.min(300, Math.ceil(Math.max(Math.hypot(...e1), Math.hypot(...e2)) / 0.4));
      for (let a = 0; a <= st; a++) for (let b = 0; a + b <= st; b++) { const x = q[0][0] + (e1[0]*a + e2[0]*b)/st, y = q[0][1] + (e1[1]*a + e2[1]*b)/st; pts.set(Math.round(x/G)+','+Math.round(y/G), [x, y]); } } }
}
const P = [...pts.values()];
// mapa de bloques en ENU (rejilla 0,5 m): 1 = objetivo, 2 = vecino
const E = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8')).edificios;
const near = E.filter((b) => b.bb[2] > -320 && b.bb[0] < -140 && b.bb[3] > 220 && b.bb[1] < 400);
const X0 = -330, Y0 = 210, W = 400, H = 400, lab = new Uint8Array(W * H);
const inside = (x, y, r) => { let o = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) o = !o; } return o; };
let objArea = 0;
for (const b of near) { const v = OBJ.includes(b.id) ? 1 : 2;
  for (let x = Math.floor((b.bb[0] - X0) / G); x <= Math.ceil((b.bb[2] - X0) / G); x++) for (let y = Math.floor((b.bb[1] - Y0) / G); y <= Math.ceil((b.bb[3] - Y0) / G); y++) {
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    if (inside(X0 + (x + 0.5) * G, Y0 + (y + 0.5) * G, b.r)) { if (v === 1 && lab[y * W + x] !== 1) objArea++; lab[y * W + x] = Math.max(lab[y * W + x] === 1 ? 1 : 0, v) === 2 && v === 1 ? 1 : (lab[y * W + x] || v); } } }
const score = (th, cx, cy) => {
  const c = Math.cos((th * Math.PI) / 180), s = Math.sin((th * Math.PI) / 180);
  let cov = 0, inv = 0, fuera = 0;
  for (const [x, y] of P) { const [e, n] = toENU(x * c - y * s + cx, x * s + y * c + cy); const gx = Math.floor((e - X0) / G), gy = Math.floor((n - Y0) / G);
    const l = gx >= 0 && gy >= 0 && gx < W && gy < H ? lab[gy * W + gx] : 0; if (l === 1) cov++; else if (l === 2) inv++; else fuera++; }
  return { s: cov - 3 * inv - 0.35 * fuera, cov, inv, fuera };
};
const TH0 = process.argv[3] ? Number(process.argv[3]) : A.th;
let best = { th: TH0, cx: A.cx, cy: A.cy, ...score(TH0, A.cx, A.cy) };
const show = (t) => console.log(t, 'giro', best.th.toFixed(2), 'cubre', (best.cov * G * G).toFixed(0) + '/' + (objArea * G * G).toFixed(0), 'm2 · invade vecinos', (best.inv * G * G).toFixed(0), 'm2 · fuera de bloques', (best.fuera * G * G).toFixed(0), 'm2');
show('actual');
for (const [st, span, dth] of [[1, 20, 0.25], [0.25, 2, 0.1], [0.1, 0.5, 0.05]]) {
  const b0 = { ...best };
  for (let t = -4; t <= 4; t++) for (let dx = -span; dx <= span; dx += st) for (let dy = -span; dy <= span; dy += st) {
    const r = score(b0.th + t * dth, b0.cx + dx, b0.cy + dy); if (r.s > best.s) best = { th: b0.th + t * dth, cx: b0.cx + dx, cy: b0.cy + dy, ...r };
  }
  show('paso ' + st);
}
if (process.argv[2] === 'guardar') { const N = { ...A, th: +best.th.toFixed(3), cx: +best.cx.toFixed(3), cy: +best.cy.toFixed(3), bloques: OBJ, nota: 'encajado en los bloques ' + OBJ.join('+') + ' sin invadir vecinos' }; writeFileSync('build/revit/alineacion.json', JSON.stringify(N, null, 1)); console.log('guardado'); }

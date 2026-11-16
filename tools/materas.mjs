/**
 * Materas con vegetación bajo cada ventana del modelo de Revit (como en las demás fachadas del hotel).
 *
 * Las ventanas se reconocen en la geometría exportada: los vértices de la categoría
 * "ventanas" se agrupan por cercanía (cada grupo = una ventana). La orientación sale del
 * eje de menor espesor del grupo, y el lado exterior es el que no cae sobre losa
 * (rejilla de ocupación de las losas de todos los niveles).
 *
 * Devuelve triángulos en coordenadas de Revit (m) con código de categoría:
 *   240 = matera de barro · 250/251/252 = hojas (oscura, media, clara)
 */
export function materas(ventanasV, losasXY, ventanasT = []) {
  // ---- ocupación de losas (celdas de 0,5 m) ----
  const OC = 0.5;
  const occ = new Set();
  for (const [x, y] of losasXY) occ.add(Math.floor(x / OC) + ',' + Math.floor(y / OC));
  const ocupado = (x, y) => occ.has(Math.floor(x / OC) + ',' + Math.floor(y / OC));

  // ---- agrupar vértices de ventanas (union-find sobre rejilla de 0,25 m) ----
  const n = ventanasV.length / 3;
  const parent = new Int32Array(n).map((_, i) => i);
  const find = (i) => { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  const G = 0.25;
  const grid = new Map();
  for (let i = 0; i < n; i++) {
    const k = Math.floor(ventanasV[i * 3] / G) + ',' + Math.floor(ventanasV[i * 3 + 1] / G) + ',' + Math.floor(ventanasV[i * 3 + 2] / G);
    const j = grid.get(k);
    if (j === undefined) grid.set(k, i); else parent[find(i)] = find(j);
  }
  for (const [k, i] of grid) {
    const [a, b, c] = k.split(',').map(Number);
    for (const [da, db, dc] of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) {
      const j = grid.get(a + da + ',' + (b + db) + ',' + (c + dc));
      if (j !== undefined) parent[find(i)] = find(j);
    }
  }
  // los vértices de un mismo triángulo son de la misma ventana (une vidrio, alféizar y dintel)
  for (let t = 0; t < ventanasT.length; t += 3) { const a = find(ventanasT[t]); parent[find(ventanasT[t + 1])] = a; parent[find(ventanasT[t + 2])] = a; }
  const groups = new Map();
  for (let i = 0; i < n; i++) { const r = find(i); (groups.get(r) || groups.set(r, []).get(r)).push(i); }

  const P = [], C = [];
  let seed = 9173;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const quad = (a, b, c, d, code) => { P.push(...a, ...b, ...c, ...a, ...c, ...d); for (let k = 0; k < 6; k++) C.push(code); };
  let cuenta = 0;
  for (const idx of groups.values()) {
    if (idx.length < 12) continue;
    // centro, extensión vertical
    let cx = 0, cy = 0, z0 = 1e9, z1 = -1e9;
    for (const i of idx) { cx += ventanasV[i * 3]; cy += ventanasV[i * 3 + 1]; z0 = Math.min(z0, ventanasV[i * 3 + 2]); z1 = Math.max(z1, ventanasV[i * 3 + 2]); }
    cx /= idx.length; cy /= idx.length;
    if (z1 - z0 < 0.6) continue;
    // ejes en planta (PCA 2x2)
    let sxx = 0, syy = 0, sxy = 0;
    for (const i of idx) { const dx = ventanasV[i * 3] - cx, dy = ventanasV[i * 3 + 1] - cy; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; }
    const ang = 0.5 * Math.atan2(2 * sxy, sxx - syy);
    const ux = Math.cos(ang), uy = Math.sin(ang);         // a lo largo de la fachada
    let lo = 1e9, hi = -1e9;
    for (const i of idx) { const t = (ventanasV[i * 3] - cx) * ux + (ventanasV[i * 3 + 1] - cy) * uy; lo = Math.min(lo, t); hi = Math.max(hi, t); }
    const ancho = hi - lo;
    if (ancho < 0.5 || ancho > 4.5) continue;            // muro cortina u objetos raros: sin matera
    let nx = -uy, ny = ux;                                // normal en planta
    // exterior = el lado que no cae sobre losa
    const fuera = (s) => !ocupado(cx + nx * s * 1.2, cy + ny * s * 1.2);
    if (!fuera(1) && fuera(-1)) { nx = -nx; ny = -ny; }
    else if (fuera(1) === fuera(-1)) continue;            // no se sabe hacia dónde da: se omite
    const mid = (lo + hi) / 2;
    const bx = cx + ux * mid, by = cy + uy * mid;
    const W = ancho * 0.96, D = 0.34, H = 0.30, out = 0.04;
    const zb = z0 - 0.02;                                  // bajo el alféizar
    const p = (t, s, z) => [bx + ux * t + nx * (out + s), by + uy * t + ny * (out + s), z];
    // matera: frente, laterales, fondo y tapa de tierra
    const a = -W / 2, b = W / 2;
    quad(p(a, D, zb - H), p(b, D, zb - H), p(b, D, zb), p(a, D, zb), 240);
    quad(p(a, 0, zb - H), p(a, D, zb - H), p(a, D, zb), p(a, 0, zb), 240);
    quad(p(b, D, zb - H), p(b, 0, zb - H), p(b, 0, zb), p(b, D, zb), 240);
    quad(p(a, 0, zb - H), p(b, 0, zb - H), p(b, D, zb - H), p(a, D, zb - H), 240);
    // vegetación: macizo de hojas inclinadas en tres tonos, que desborda un poco la matera
    const hojas = Math.round(W * 34);
    for (let k = 0; k < hojas; k++) {
      const t = a + rnd() * W, s = rnd() * D * 1.25, zc = zb + rnd() * 0.28 - (rnd() < 0.25 ? rnd() * 0.22 : 0);
      const L = 0.09 + rnd() * 0.09, Wd = 0.05 + rnd() * 0.04;
      const th = rnd() * Math.PI * 2, tilt = 0.3 + rnd() * 0.9;
      const dx = Math.cos(th) * L, dy = Math.sin(th) * L * Math.cos(tilt), dz = Math.sin(tilt) * L * 0.8;
      const px = -Math.sin(th) * Wd, py = Math.cos(th) * Wd;
      const c0 = p(t, s, zc);
      const code = 250 + Math.floor(rnd() * 3);
      const A = c0, B = [c0[0] + px, c0[1] + py, c0[2]], Cc = [c0[0] + dx + px * 0.5, c0[1] + dy + py * 0.5, c0[2] + dz], Dd = [c0[0] + dx, c0[1] + dy, c0[2] + dz];
      quad(A, B, Cc, Dd, code);
    }
    cuenta++;
  }
  return { P, C, cuenta };
}

/** Recorte de los tiles de Google: polígono del modelo menos la zona real (4 piezas alrededor del rectángulo). */
import { readFileSync, writeFileSync } from 'node:fs';
import { ZONA } from './zona.mjs';
const g = JSON.parse(readFileSync('build/k2_geo.json', 'utf8'));
const LON = -74.04145021, LAT = 4.70207636, R = 6378137, D = Math.PI / 180;
const kx = D * R * Math.cos(LAT * D), ky = D * 6367449; // metros por grado (este / norte) en el origen
const toENU = ([lo, la]) => [(lo - LON) * kx, (la - LAT) * ky];
const toLL = ([x, y]) => [+(LON + x / kx).toFixed(7), +(LAT + y / ky).toFixed(7)];
// Sutherland–Hodgman contra un semiplano: conserva lo que cumple keep(p)
function half(poly, keep, cut) {
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const ka = keep(a), kb = keep(b);
    if (ka) out.push(a);
    if (ka !== kb) out.push(cut(a, b));
  }
  return out;
}
const cutX = (x) => (a, b) => [x, a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0])];
const cutY = (y) => (a, b) => [a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]), y];
const clip = g.clip.map(toENU);
const { x0, y0, x1, y1 } = ZONA;
const W = half(clip, (p) => p[0] <= x0, cutX(x0));
const E = half(clip, (p) => p[0] >= x1, cutX(x1));
const mid = half(half(clip, (p) => p[0] >= x0, cutX(x0)), (p) => p[0] <= x1, cutX(x1));
const S = half(mid, (p) => p[1] <= y0, cutY(y0));
const N = half(mid, (p) => p[1] >= y1, cutY(y1));
const clips = [W, E, S, N].filter((p) => p.length >= 3).map((p) => p.map(toLL));
writeFileSync('public/secciones/recorte.json', JSON.stringify({ clips, zona: [x0, y0, x1, y1] }));
console.log('recorte:', clips.map((c) => c.length).join(' + '), 'vértices');

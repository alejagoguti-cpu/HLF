import { readFileSync } from 'node:fs';
const f = process.argv[2];
const buf = readFileSync(f);
const around = [12005, 12026, 12049];
const start = Math.min(...around) - 90, end = Math.max(...around) + 320;
const slice = buf.subarray(start, end);
// busca dobles plausibles en todo el archivo
const cand = { lat: [], lon: [], h: [] };
for (let o = 0; o + 8 <= buf.length; o += 1) {
  const v = buf.readDoubleLE(o);
  if (v > 4.2 && v < 4.9) cand.lat.push([o, +v.toFixed(6)]);
  if (v > -74.2 && v < -73.9) cand.lon.push([o, +v.toFixed(6)]);
  if (v > 2400 && v < 2900) cand.h.push([o, +v.toFixed(2)]);
}
const near = (arr, o, d = 400) => arr.filter(([p]) => Math.abs(p - o) < d);
console.log('candidatos lat cerca:', near(cand.lat, 12026).slice(0, 8));
console.log('candidatos lon cerca:', near(cand.lon, 12049).slice(0, 8));
console.log('candidatos altura cerca:', near(cand.h, 12005).slice(0, 8));
console.log('\n--- ventana ---');
let s = '';
for (let i = 0; i < slice.length; i++) {
  const b = slice[i];
  s += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
}
console.log(s);

/** Cubiertas del Hotel La Fontana (mismas mallas que Cubierta_Hotel_Teja / _Alero en Unreal). */
import { readFileSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
const C = JSON.parse(readFileSync('C:/Users/aleja/Documents/Codex/2026-11-06/co/work/k2/cubiertas_hotel.json', 'utf8'));
const S = 1.000614, A = (0.0849 * Math.PI) / 180, CA = Math.cos(A), SA = Math.sin(A);
const g = new Glb();
g.j.materials.push({ name: 'Cubierta', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.8 } });
const prims = [];
for (const [k, type] of [['Teja', 128], ['Alero', 200]]) {
  const { V, UV } = C[k];
  const n = V.length / 3;
  const P = new Float32Array(n * 3), N = new Float32Array(n * 3), T = new Float32Array(UV), Col = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    const x = V[i * 3] / 100, y = -V[i * 3 + 1] / 100, z = V[i * 3 + 2] / 100; // UE (cm, Y sur) -> modelo (m, Y norte)
    const e = S * (x * CA - y * SA), nn = S * (x * SA + y * CA);
    P.set([e, z, -nn], i * 3);
    Col.set([128, 0, type, 128], i * 4);
  }
  for (let t = 0; t < n; t += 3) {
    const a = P.subarray(t * 3, t * 3 + 3), b = P.subarray(t * 3 + 3, t * 3 + 6), c = P.subarray(t * 3 + 6, t * 3 + 9);
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let nx = u[1] * v[2] - u[2] * v[1], ny = u[2] * v[0] - u[0] * v[2], nz = u[0] * v[1] - u[1] * v[0];
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    if (ny < 0) { // deja la cara mirando al cielo (y = arriba)
      nx = -nx; ny = -ny; nz = -nz;
      for (let q = 0; q < 3; q++) { const tmp = P[t * 3 + 3 + q]; P[t * 3 + 3 + q] = P[t * 3 + 6 + q]; P[t * 3 + 6 + q] = tmp; }
      for (let q = 0; q < 2; q++) { const tmp = T[t * 2 + 2 + q]; T[t * 2 + 2 + q] = T[t * 2 + 4 + q]; T[t * 2 + 4 + q] = tmp; }
    }
    for (let q = 0; q < 3; q++) N.set([nx, ny, nz], (t + q) * 3);
  }
  let mn = [1e9, 1e9], mx = [-1e9, -1e9];
  for (let i = 0; i < T.length; i += 2) { mn[0] = Math.min(mn[0], T[i]); mn[1] = Math.min(mn[1], T[i + 1]); mx[0] = Math.max(mx[0], T[i]); mx[1] = Math.max(mx[1], T[i + 1]); }
  console.log(k, 'tris', n / 3, 'uv', mn, mx);
  prims.push({
    attributes: {
      POSITION: g.acc(P, 'VEC3', { target: 34962, minmax: true }), NORMAL: g.acc(N, 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(T, 'VEC2', { target: 34962 }), COLOR_0: g.acc(Col, 'VEC4', { target: 34962, normalized: true }),
    }, material: 0,
  });
}
g.j.meshes.push({ name: 'Cubierta_Hotel', primitives: prims });
g.j.nodes.push({ name: 'Cubierta_Hotel', mesh: 0 });
g.j.scenes[0].nodes.push(0);
console.log('hotel_cubiertas.glb', (g.write('public/secciones/hotel_cubiertas.glb') / 1024).toFixed(0), 'KB');

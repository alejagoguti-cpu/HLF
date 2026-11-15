/** Carro de baja carga para el tráfico: carrocería, cabina con vidrios y ruedas. Eje +X = frente, Y = arriba, metros. */
import { Glb } from './glb-writer.mjs';
const P = [], N = [], C = [], I = [];
function box(x0, x1, y0, y1, z0, z1, col, taper = 0) {
  // taper: la cara superior se encoge en X (parabrisas inclinado)
  const v = [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [x0 + taper, y1, z0 + taper * 0.2], [x1 - taper * 0.7, y1, z0 + taper * 0.2], [x1 - taper * 0.7, y1, z1 - taper * 0.2], [x0 + taper, y1, z1 - taper * 0.2]];
  const faces = [[0, 1, 2, 3], [7, 6, 5, 4], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]];
  for (const f of faces) {
    const a = v[f[0]], b = v[f[1]], c = v[f[2]];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
    const l = Math.hypot(...n) || 1; n = n.map((k) => -k / l);
    const base = P.length / 3;
    for (const i of f) { P.push(...v[i]); N.push(...n); C.push(...col); }
    I.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
}
const BODY = [255, 255, 255, 255], GLASS = [28, 34, 40, 255], DARK = [22, 22, 24, 255], LIGHT = [250, 245, 225, 255], RED = [170, 30, 25, 255];
box(-2.15, 2.15, 0.32, 0.92, -0.88, 0.88, BODY, 0.06);          // carrocería
box(-1.35, 0.95, 0.92, 1.42, -0.80, 0.80, GLASS, 0.34);         // cabina (vidrios)
box(-0.95, 0.45, 1.40, 1.45, -0.70, 0.70, BODY);                 // techo
for (const x of [-1.35, 1.35]) for (const z of [-0.90, 0.72]) box(x - 0.34, x + 0.34, 0.0, 0.66, z, z + 0.18, DARK); // ruedas
box(2.13, 2.17, 0.58, 0.74, -0.80, -0.42, LIGHT); box(2.13, 2.17, 0.58, 0.74, 0.42, 0.80, LIGHT);   // faros
box(-2.17, -2.13, 0.62, 0.78, -0.82, -0.40, RED); box(-2.17, -2.13, 0.62, 0.78, 0.40, 0.82, RED);  // stops
const g = new Glb();
g.j.materials.push({ name: 'carro', pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0.2, roughnessFactor: 0.45 } });
g.j.meshes.push({ name: 'carro', primitives: [{ attributes: { POSITION: g.acc(new Float32Array(P), 'VEC3', { target: 34962, minmax: true }), NORMAL: g.acc(new Float32Array(N), 'VEC3', { target: 34962 }), COLOR_0: g.acc(new Uint8Array(C), 'VEC4', { target: 34962, normalized: true }) }, indices: g.acc(new Uint16Array(I), 'SCALAR', { target: 34963 }), material: 0 }] });
g.j.nodes.push({ name: 'carro', mesh: 0 }); g.j.scenes[0].nodes.push(0);
console.log('carro.glb', g.write('public/secciones/carro.glb'), 'bytes');

/**
 * Modelo de Revit del Hotel La Fontana (HLF_P2-P6.rvt) -> una sección GLB por nivel.
 *
 * Fuente: build/revit/nivel_<i>.json, exportados nivel por nivel desde Revit con
 * tools/revit_nivel.py (muros, losas, ventanas, puertas, muro cortina, barandas,
 * columnas, escaleras, vigas y cubiertas; sin mobiliario ni interiores).
 *
 * Alineación (build/revit/alineacion.json): giro `th` alrededor del punto de Revit
 * (rx, ry) y traslado a (cx, cy) en coordenadas del modelo del proyecto, más cota z.
 * Salida en el marco del visor: x = Este, y = arriba, z = -Norte (metros).
 *
 * COLOR_0: rgb = color base del material, a = código de categoría (para el sombreador):
 *   muros 10 · losas 30 · cubiertas 50 · ventanas 70 · puertas 90 · paneles 110 ·
 *   montantes 130 · barandas 150 · columnas 170 · escaleras 190 · vigas 210
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { materas } from './materas.mjs';

// ocupación de losas de todos los niveles (para saber qué lado de cada ventana es exterior)
const LOSAS = [];
for (let i = 1; i < 12; i++) { // sin el nivel 0: su placa cubre también el exterior
  const f = `build/revit/nivel_${i}.json`;
  if (!existsSync(f)) continue;
  const L = JSON.parse(readFileSync(f, 'utf8')).cats.losas;
  if (!L) continue;
  for (let t = 0; t < L.T.length; t += 3) {
    const q = [0, 1, 2].map((k) => [L.V[L.T[t + k] * 3], L.V[L.T[t + k] * 3 + 1]]);
    // muestrea el triángulo cada 0,4 m
    const e1 = [q[1][0] - q[0][0], q[1][1] - q[0][1]], e2 = [q[2][0] - q[0][0], q[2][1] - q[0][1]];
    const steps = Math.min(400, Math.ceil(Math.max(Math.hypot(...e1), Math.hypot(...e2)) / 0.4));
    for (let a = 0; a <= steps; a++) for (let b = 0; a + b <= steps; b++) LOSAS.push([q[0][0] + (e1[0] * a + e2[0] * b) / steps, q[0][1] + (e1[1] * a + e2[1] * b) / steps]);
  }
}
let totalMaceteros = 0;

const A = JSON.parse(readFileSync('build/revit/alineacion.json', 'utf8'));
const TH = (A.th * Math.PI) / 180, CT = Math.cos(TH), ST = Math.sin(TH);
// modelo del proyecto -> ENU (igual que los demás generadores)
const S = 1.000614, AA = (0.0849 * Math.PI) / 180, CA = Math.cos(AA), SA = Math.sin(AA);

const MAT = {
  muros: [[152, 86, 62], 10], losas: [[176, 172, 164], 30], cubiertas: [[166, 96, 70], 50], ventanas: [[150, 172, 186], 70],
  puertas: [[120, 84, 56], 90], paneles: [[140, 168, 184], 110], montantes: [[62, 64, 68], 130], barandas: [[52, 54, 58], 150],
  columnas: [[182, 178, 170], 170], escaleras: [[168, 164, 156], 190], vigas: [[176, 172, 164], 210],
};

const manifest = { niveles: [], alineacion: A };
let box = [1e9, 1e9, -1e9, -1e9];

/*
 * Milhoja: toda la geometría se corta en rebanadas horizontales exactas, una por nivel.
 * Un muro que en Revit sube varios pisos queda partido piso a piso, así cada nivel llega
 * completo (su losa, sus muros, sus ventanas) y se apila sobre el anterior.
 * La losa de cada piso pertenece al piso que sostiene (el corte va 0,35 m bajo la cota del nivel).
 */
const levels = [];
const TRIS = []; // [x0,y0,z0, x1,y1,z1, x2,y2,z2] en coords de Revit + color
for (let i = 0; i < 12; i++) {
  const f = `build/revit/nivel_${i}.json`;
  if (!existsSync(f)) continue;
  const d = JSON.parse(readFileSync(f, 'utf8'));
  levels.push({ i, nombre: d.nivel, elev: d.elev_m });
  if (i === 0) delete d.cats.losas; // el primer piso no lleva la placa de contrapiso
  if (d.cats.ventanas) {
    const mt = materas(d.cats.ventanas.V, LOSAS, d.cats.ventanas.T);
    totalMaceteros += mt.cuenta;
    if (mt.P.length) d.cats.__materas = { V: mt.P, T: Array.from({ length: mt.P.length / 3 }, (_, k) => k), codes: mt.C };
  }
  for (const [cat, m] of Object.entries(d.cats)) {
    const [rgb, code] = MAT[cat] ?? [[160, 160, 160], 230];
    for (let t = 0; t < m.T.length; t += 3) {
      const v = [m.T[t], m.T[t + 1], m.T[t + 2]].map((k) => [m.V[k * 3], m.V[k * 3 + 1], m.V[k * 3 + 2]]);
      let col = [...rgb, code];
      if (m.codes) {
        const cc = m.codes[m.T[t]];
        col = cc === 240 ? [150, 78, 52, cc] : cc === 250 ? [44, 70, 34, cc] : cc === 251 ? [64, 98, 46, cc] : [92, 128, 60, cc];
      }
      TRIS.push({ v, col, cat });
    }
  }
}
const cuts = levels.map((l, k) => (k === 0 ? -1e9 : l.elev - 0.35));
cuts.push(1e9);

// recorte de un polígono por el plano horizontal z = h (conserva el lado keep)
const clipZ = (poly, h, above) => {
  const out = [];
  for (let k = 0; k < poly.length; k++) {
    const a = poly[k], b = poly[(k + 1) % poly.length];
    const ia = above ? a[2] >= h : a[2] < h, ib = above ? b[2] >= h : b[2] < h;
    if (ia) out.push(a);
    if (ia !== ib) { const t = (h - a[2]) / (b[2] - a[2]); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, h]); }
  }
  return out;
};
const toView = ([x0, y0, z0]) => {
  const x = x0 - A.rx, y = y0 - A.ry, z = z0 + A.z;
  const mx = x * CT - y * ST + A.cx, my = x * ST + y * CT + A.cy;
  return [S * (mx * CA - my * SA), z, -S * (mx * SA + my * CA)];
};

for (let li = 0; li < levels.length; li++) {
  const lo = cuts[li], hi = cuts[li + 1];
  const P = [], N = [], C = [];
  let zmin = 1e9, zmax = -1e9;
  for (const { v, col, cat } of TRIS) {
    const tz0 = Math.min(v[0][2], v[1][2], v[2][2]), tz1 = Math.max(v[0][2], v[1][2], v[2][2]);
    if (tz1 < lo || tz0 >= hi) continue;
    let poly = v;
    if (tz0 < lo) poly = clipZ(poly, lo, true);
    if (poly.length >= 3 && tz1 >= hi) poly = clipZ(poly, hi, false);
    if (poly.length < 3) continue;
    const pv = poly.map(toView);
    // normal plana del triángulo original
    const a = toView(v[0]), b = toView(v[1]), c = toView(v[2]);
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], wx = c[0] - a[0], wy = c[1] - a[1], wz = c[2] - a[2];
    let nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
    for (let k = 1; k + 1 < pv.length; k++) {
      for (const p of [pv[0], pv[k], pv[k + 1]]) {
        P.push(p[0], p[1], p[2]); N.push(nx, ny, nz); C.push(col[0], col[1], col[2], col[3]);
        if (p[1] < zmin) zmin = p[1]; if (p[1] > zmax) zmax = p[1];
        if (cat === 'muros' || cat === 'losas') box = [Math.min(box[0], p[0]), Math.min(box[1], -p[2]), Math.max(box[2], p[0]), Math.max(box[3], -p[2])];
      }
    }
  }
  const nV = P.length / 3;
  const g = new Glb();
  g.j.materials.push({ name: 'Revit', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.85 } });
  g.j.meshes.push({
    name: levels[li].nombre,
    primitives: [{
      attributes: {
        POSITION: g.acc(new Float32Array(P), 'VEC3', { target: 34962, minmax: true }), NORMAL: g.acc(new Float32Array(N), 'VEC3', { target: 34962 }),
        COLOR_0: g.acc(new Uint8Array(C), 'VEC4', { target: 34962, normalized: true }),
      },
      indices: g.acc(Uint32Array.from({ length: nV }, (_, k) => k), 'SCALAR', { target: 34963 }), material: 0,
    }],
  });
  g.j.nodes.push({ name: 'Revit_' + levels[li].nombre, mesh: 0 }); g.j.scenes[0].nodes.push(0);
  const file = `revit_nivel_${levels[li].i}.glb`;
  const bytes = g.write('public/secciones/' + file);
  manifest.niveles.push({ i: levels[li].i, nombre: levels[li].nombre, file, elev: +(levels[li].elev + A.z).toFixed(2), z0: +zmin.toFixed(2), z1: +zmax.toFixed(2), tris: nV / 3, kb: Math.round(bytes / 1024) });
  console.log(levels[li].nombre.padEnd(9), 'tris', String(nV / 3).padStart(6), (bytes / 1024).toFixed(0).padStart(5) + ' KB', 'z', zmin.toFixed(1), zmax.toFixed(1));
}
manifest.caja = box.map((v) => +v.toFixed(1));
manifest.bloques = A.bloques ?? [];
// huella real del Revit (losas, muros y cubiertas de los pisos altos) en franjas de 1 m, agrandada 0,8 m:
// ahí se recortan los restos del modelo viejo (aleros, placas de balcón)
{
  const C = 1.0, occ = new Map();
  for (let i = 1; i < 12; i++) {
    const f = `build/revit/nivel_${i}.json`;
    if (!existsSync(f)) continue;
    const d = JSON.parse(readFileSync(f, 'utf8'));
    for (const cat of ['losas', 'muros', 'cubiertas']) {
      const m = d.cats[cat]; if (!m) continue;
      for (let t = 0; t < m.T.length; t += 3) {
        const q = [0, 1, 2].map((k) => [m.V[m.T[t + k] * 3] - A.rx, m.V[m.T[t + k] * 3 + 1] - A.ry]);
        const e1 = [q[1][0] - q[0][0], q[1][1] - q[0][1]], e2 = [q[2][0] - q[0][0], q[2][1] - q[0][1]];
        const st = Math.min(200, Math.ceil(Math.max(Math.hypot(...e1), Math.hypot(...e2)) / 0.5));
        for (let u = 0; u <= st; u++) for (let v = 0; u + v <= st; v++) {
          const x = q[0][0] + (e1[0] * u + e2[0] * v) / st, y = q[0][1] + (e1[1] * u + e2[1] * v) / st;
          const gy = Math.floor(y / C), gx = Math.floor(x / C);
          const r = occ.get(gy) || occ.set(gy, new Set()).get(gy); r.add(gx);
        }
      }
    }
  }
  const toENU = (x, y) => { const mx = x * CT - y * ST + A.cx, my = x * ST + y * CT + A.cy; return [+(S * (mx * CA - my * SA)).toFixed(2), +(S * (mx * SA + my * CA)).toFixed(2)]; };
  const strips = [];
  for (const gy of [...occ.keys()].sort((p, q) => p - q)) {
    const xs = [...occ.get(gy)].sort((p, q) => p - q);
    let s0 = xs[0], prev = xs[0];
    const push = (x0, x1) => {
      const last = strips.find((r) => r.x0 === x0 && r.x1 === x1 && r.y1 === gy);
      if (last) last.y1 = gy + 1; else strips.push({ x0, x1, y0: gy, y1: gy + 1 });
    };
    for (const x of xs.slice(1)) { if (x - prev > 2) { push(s0, prev + 1); s0 = x; } prev = x; }
    push(s0, prev + 1);
  }
  const PAD = 0.8;
  manifest.huella = strips.map((r) => [[r.x0 * C - PAD, r.y0 * C - PAD], [r.x1 * C + PAD, r.y0 * C - PAD], [r.x1 * C + PAD, r.y1 * C + PAD], [r.x0 * C - PAD, r.y1 * C + PAD]].map(([x, y]) => toENU(x, y)));
  console.log('huella Revit:', manifest.huella.length, 'franjas');
} // este0, norte0, este1, norte1 (muros y losas)
writeFileSync('public/secciones/revit.json', JSON.stringify(manifest));
console.log('caja ENU', manifest.caja, '· materas', totalMaceteros);

// compresión: soldar vértices + Draco (16 MB -> ~0,6 MB)
import { execSync } from 'node:child_process';
for (const n of manifest.niveles) {
  const f = 'public/secciones/' + n.file;
  execSync(`npx gltf-transform weld "${f}" build/revit/_w.glb`, { stdio: 'ignore' });
  execSync(`npx gltf-transform draco build/revit/_w.glb "${f}" --method edgebreaker`, { stdio: 'ignore' });
}
console.log('niveles comprimidos con Draco');

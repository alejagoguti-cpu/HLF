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
for (let i = 0; i < 12; i++) {
  const f = `build/revit/nivel_${i}.json`;
  if (!existsSync(f)) continue;
  const d = JSON.parse(readFileSync(f, 'utf8'));
  const P = [], N = [], C = [], I = [];
  let n = 0, zmin = 1e9, zmax = -1e9;
  if (i === 0) delete d.cats.losas; // el primer piso no lleva la placa de contrapiso
  // materas con vegetación bajo cada ventana (código 240 = barro, 250-252 = hojas)
  if (d.cats.ventanas) {
    const mt = materas(d.cats.ventanas.V, LOSAS, d.cats.ventanas.T);
    totalMaceteros += mt.cuenta;
    if (mt.P.length) {
      const T = Array.from({ length: mt.P.length / 3 }, (_, k) => k);
      d.cats.__materas = { V: mt.P, T, codes: mt.C };
    }
  }
  for (const [cat, m] of Object.entries(d.cats)) {
    const [rgb, code] = MAT[cat] ?? [[160, 160, 160], 230];
    const base = n;
    const nv = m.V.length / 3;
    const pos = new Float32Array(nv * 3);
    for (let k = 0; k < nv; k++) {
      const x = m.V[k * 3] - A.rx, y = m.V[k * 3 + 1] - A.ry, z = m.V[k * 3 + 2] + A.z;
      const mx = x * CT - y * ST + A.cx, my = x * ST + y * CT + A.cy;
      const e = S * (mx * CA - my * SA), nn = S * (mx * SA + my * CA);
      pos.set([e, z, -nn], k * 3);
      if (z < zmin) zmin = z; if (z > zmax) zmax = z;
      if (cat === 'muros' || cat === 'losas') { box = [Math.min(box[0], e), Math.min(box[1], nn), Math.max(box[2], e), Math.max(box[3], nn)]; }
    }
    // normales por vértice (los vértices no se comparten entre caras de Revit: caras planas quedan planas)
    const nor = new Float32Array(nv * 3);
    for (let t = 0; t < m.T.length; t += 3) {
      const a = m.T[t] * 3, b = m.T[t + 1] * 3, c = m.T[t + 2] * 3;
      const ux = pos[b] - pos[a], uy = pos[b + 1] - pos[a + 1], uz = pos[b + 2] - pos[a + 2];
      const vx = pos[c] - pos[a], vy = pos[c + 1] - pos[a + 1], vz = pos[c + 2] - pos[a + 2];
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      for (const q of [a, b, c]) { nor[q] += nx; nor[q + 1] += ny; nor[q + 2] += nz; }
    }
    for (let k = 0; k < nv; k++) {
      const l = Math.hypot(nor[k * 3], nor[k * 3 + 1], nor[k * 3 + 2]) || 1;
      P.push(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);
      N.push(nor[k * 3] / l, nor[k * 3 + 1] / l, nor[k * 3 + 2] / l);
      if (m.codes) {
        const cc = m.codes[k];
        const col = cc === 240 ? [150, 78, 52] : cc === 250 ? [44, 70, 34] : cc === 251 ? [64, 98, 46] : [92, 128, 60];
        C.push(col[0], col[1], col[2], cc);
      } else C.push(rgb[0], rgb[1], rgb[2], code);
    }
    for (const t of m.T) I.push(base + t);
    n += nv;
  }
  const g = new Glb();
  g.j.materials.push({ name: 'Revit', doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.85 } });
  g.j.meshes.push({
    name: d.nivel,
    primitives: [{
      attributes: {
        POSITION: g.acc(new Float32Array(P), 'VEC3', { target: 34962, minmax: true }), NORMAL: g.acc(new Float32Array(N), 'VEC3', { target: 34962 }),
        COLOR_0: g.acc(new Uint8Array(C), 'VEC4', { target: 34962, normalized: true }),
      },
      indices: g.acc(new Uint32Array(I), 'SCALAR', { target: 34963 }), material: 0,
    }],
  });
  g.j.nodes.push({ name: 'Revit_' + d.nivel, mesh: 0 }); g.j.scenes[0].nodes.push(0);
  const file = `revit_nivel_${i}.glb`;
  const bytes = g.write('public/secciones/' + file);
  manifest.niveles.push({ i, nombre: d.nivel, file, elev: +(d.elev_m + A.z).toFixed(2), z0: +zmin.toFixed(2), z1: +zmax.toFixed(2), tris: I.length / 3, kb: Math.round(bytes / 1024) });
  console.log(d.nivel.padEnd(9), 'tris', String(I.length / 3).padStart(6), (bytes / 1024).toFixed(0).padStart(5) + ' KB', 'z', zmin.toFixed(1), zmax.toFixed(1));
}
manifest.caja = box.map((v) => +v.toFixed(1));
manifest.bloques = A.bloques ?? []; // este0, norte0, este1, norte1 (muros y losas)
writeFileSync('public/secciones/revit.json', JSON.stringify(manifest));
console.log('caja ENU', manifest.caja, '· materas', totalMaceteros);

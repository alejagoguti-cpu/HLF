/**
 * Suelo modelado del proyecto Unreal (terreno, vías, andenes, separadores, ciclorrutas,
 * agua, canal y puentes) -> una sección GLB por capa.
 * Fuente: malla exportada de Unreal (build/legacy/models/unicentro-cesium.glb),
 * ya en el marco del proyecto (x = Este, y = arriba, z = -Norte, metros).
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3d';
import { writeFileSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'draco3d.decoder': await draco3d.createDecoderModule() });
const doc = await io.read('build/legacy/models/unicentro-cesium.glb');
const CAPAS = ['Terreno', 'Vias', 'Andenes', 'Separadores', 'Ciclorrutas', 'Agua', 'Canal_Fondo', 'Canal_Muros', 'Puentes'];
const acc = Object.fromEntries(CAPAS.map((c) => [c, { P: [], N: [], I: [], n: 0 }]));

for (const node of doc.getRoot().listNodes()) {
  const mesh = node.getMesh();
  const name = node.getName();
  const capa = CAPAS.find((c) => name.startsWith('UNICENTRO_3D_' + c + '_T'));
  if (!mesh || !capa) continue;
  const M = node.getWorldMatrix();
  const a = acc[capa];
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION'), nrm = prim.getAttribute('NORMAL'), idx = prim.getIndices();
    const base = a.n, p = [0, 0, 0];
    for (let i = 0; i < pos.getCount(); i++) {
      pos.getElement(i, p);
      a.P.push(M[0] * p[0] + M[4] * p[1] + M[8] * p[2] + M[12], M[1] * p[0] + M[5] * p[1] + M[9] * p[2] + M[13], M[2] * p[0] + M[6] * p[1] + M[10] * p[2] + M[14]);
      if (nrm) { nrm.getElement(i, p); const x = M[0] * p[0] + M[4] * p[1] + M[8] * p[2], y = M[1] * p[0] + M[5] * p[1] + M[9] * p[2], z = M[2] * p[0] + M[6] * p[1] + M[10] * p[2], l = Math.hypot(x, y, z) || 1; a.N.push(x / l, y / l, z / l); } else a.N.push(0, 1, 0);
      a.n++;
    }
    if (idx) for (let i = 0; i < idx.getCount(); i++) a.I.push(base + idx.getScalar(i));
    else for (let i = 0; i < pos.getCount(); i++) a.I.push(base + i);
  }
}
const manifest = [];
for (const capa of CAPAS) {
  const a = acc[capa];
  if (!a.n) { console.log(capa, 'sin datos'); continue; }
  const P = new Float32Array(a.P);
  let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
  for (let i = 0; i < P.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], P[i + k]); mx[k] = Math.max(mx[k], P[i + k]); }
  const g = new Glb();
  g.j.materials.push({ name: capa, doubleSided: true, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.9 } });
  g.j.meshes.push({ name: capa, primitives: [{ attributes: { POSITION: g.acc(P, 'VEC3', { target: 34962, minmax: true }), NORMAL: g.acc(new Float32Array(a.N), 'VEC3', { target: 34962 }) }, indices: g.acc(new Uint32Array(a.I), 'SCALAR', { target: 34963 }), material: 0 }] });
  g.j.nodes.push({ name: 'Suelo_' + capa, mesh: 0 });
  g.j.scenes[0].nodes.push(0);
  const file = `suelo_${capa}.glb`;
  const bytes = g.write('public/secciones/' + file);
  manifest.push({ key: capa, file, tris: a.I.length / 3, kb: Math.round(bytes / 1024) });
  console.log(capa.padEnd(12), 'tris', a.I.length / 3, 'verts', a.n, (bytes / 1024).toFixed(0) + ' KB', 'E', mn[0].toFixed(0), mx[0].toFixed(0), 'U', mn[1].toFixed(1), mx[1].toFixed(1), 'N', (-mx[2]).toFixed(0), (-mn[2]).toFixed(0));
}
writeFileSync('public/secciones/suelo.json', JSON.stringify({ secciones: manifest }));

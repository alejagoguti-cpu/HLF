/**
 * Optimiza el GLB de Unreal para web:
 *  - elimina los tiles Cesium (negros, georreferenciados, bbox ±6M)
 *  - simplifica la vegetación instanciada (631M vértices de render -> ~30M)
 *  - recomprime las 380 MB de PNG a WebP 1K
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, simplify, textureCompress } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3d';
import sharp from 'sharp';
import { statSync } from 'node:fs';

const IN = process.argv[2];
const OUT = process.argv[3];

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

console.log('leyendo', IN);
const doc = await io.read(IN);
const root = doc.getRoot();
await MeshoptSimplifier.ready;

/* ---------- 1. fuera los tiles Cesium ---------- */
let dropped = 0;
for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const mats = mesh.listPrimitives().map((p) => p.getMaterial());
  if (mats.length && mats.every((m) => m && m.getName().startsWith('CesiumMaterial'))) {
    node.dispose();
    dropped++;
  }
}
console.log('nodos Cesium eliminados:', dropped);

/* ---------- 2. dedupe + weld ---------- */
await doc.transform(dedup(), prune());
await doc.transform(weld({ tolerance: 0.0001, overwrite: true }));
console.log('welded');

/* ---------- 3. simplificar vegetación ---------- */
const FOLIAGE = new Set([
  'MI_ramas', 'MI_tronco', 'MI_hojas', 'MI_agujas',
  'MI_island_tree_01', 'MI_island_tree_01_branches', 'MI_island_tree_01_leaves',
  'MI_island_tree_02', 'MI_island_tree_03', 'MI_island_tree_03_branches', 'MI_island_tree_03_leaves',
  'MI_tree_small_02_trunk', 'MI_tree_small_02_branches', 'MI_tree_small_02_leaves',
]);

// cuántas veces se instancia cada malla
const use = new Map();
for (const node of root.listNodes()) {
  const m = node.getMesh();
  if (m) use.set(m, (use.get(m) || 0) + 1);
}

let target = 0;
const jobs = [];
for (const mesh of root.listMeshes()) {
  const inst = use.get(mesh) || 1;
  const prims = mesh.listPrimitives();
  const isFoliage = prims.some((p) => p.getMaterial() && FOLIAGE.has(p.getMaterial().getName()));
  if (!isFoliage) continue;
  const verts = prims.reduce((s, p) => s + p.getAttribute('POSITION').getCount(), 0);
  // presupuesto: ~2.6k vértices por árbol (antes 14k–47k)
  const wanted = 2600;
  const ratio = Math.min(0.95, Math.max(0.02, wanted / verts));
  jobs.push({ mesh, verts, inst, ratio, render: verts * inst });
}

jobs.sort((a, b) => b.render - a.render);
for (const job of jobs) {
  const prims = new Set(job.mesh.listPrimitives());
  try {
    await doc.transform(
      simplify({
        simplifier: MeshoptSimplifier,
        ratio: job.ratio,
        error: 0.0035,
        filter: (prim) => prims.has(prim),
      })
    );
  } catch (e) {
    console.warn('simplify falló en', job.mesh.getName(), e.message);
  }
  const after = job.mesh.listPrimitives().reduce((s, p) => s + p.getAttribute('POSITION').getCount(), 0);
  target += after * job.inst;
  console.log(`  ${job.mesh.getName().padEnd(22)} inst=${String(job.inst).padStart(5)}  ${job.verts} -> ${after} verts  (render ${(after * job.inst / 1e6).toFixed(1)}M)`);
}
console.log('vértices de render tras simplificar:', (target / 1e6).toFixed(1) + 'M');

/* ---------- 4. quitar atributos caros ---------- */
for (const mesh of root.listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    for (const name of ['TANGENT', 'TEXCOORD_1', 'COLOR_1', 'JOINTS_0', 'WEIGHTS_0']) {
      const a = prim.getAttribute(name);
      if (a) prim.setAttribute(name, null);
    }
  }
}

/* ---------- 5. texturas -> WebP 1K ---------- */
const before = root.listTextures().reduce((s, t) => s + (t.getImage()?.byteLength || 0), 0);
try {
  await doc.transform(textureCompress({ encoder: sharp, resize: [1024, 1024], targetFormat: 'webp', quality: 82 }));
} catch (e) {
  console.warn('textureCompress:', e.message);
}
const after = root.listTextures().reduce((s, t) => s + (t.getImage()?.byteLength || 0), 0);
console.log(`texturas ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);

/* ---------- 6. limpieza final ---------- */
await doc.transform(prune(), dedup());
await io.write(OUT, doc);
console.log('escrito', OUT, (statSync(OUT).size / 1048576).toFixed(1), 'MB');

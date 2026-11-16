/**
 * Árboles 3D escaneados (los mismos de planosfinales: jacarandá e island_tree 01/02, LOD1 con
 * hojas y madera reales) alrededor del Hotel La Fontana, instanciados con EXT_mesh_gpu_instancing.
 * Posiciones, giro y altura: las instancias de Unreal (build/ue/*.json) a menos de RADIO del hotel.
 * Lejos del hotel siguen los impostores fotográficos (build-arboles.mjs los excluye con cerca3d()).
 *   -> public/secciones/arboles3d_<especie>.glb + arboles3d.json
 */
import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshGPUInstancing } from '@gltf-transform/extensions';
import { flatten, clearNodeTransform, mergeDocuments, prune, dedup } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { cerca3d, sustituto } from './arboles-cerca.mjs';

await MeshoptDecoder.ready; await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
const IMP = JSON.parse(readFileSync('C:/Users/aleja/Documents/Codex/2026-11-06/co/web/build/impostors/meta.json', 'utf8'));
const SRC = { island_tree_01: 'island_tree_01', island_tree_02: 'island_tree_02', jacaranda_tree: 'jacaranda' };

// instancias de Unreal cercanas al hotel, agrupadas por la especie 3D que las representa
const grupos = { island_tree_01: [], island_tree_02: [], jacaranda_tree: [] };
for (const ue of ['island_tree_01', 'island_tree_02', 'island_tree_03', 'jacaranda_tree', 'tree_small_02']) {
  for (const pre of ['Arboles_', 'ArbolesSat_']) {
    const f = `build/ue/${pre}${ue}.json`;
    if (!existsSync(f)) continue;
    const d = JSON.parse(readFileSync(f, 'utf8'));
    for (let i = 0; i < d.inst.length; i += 6) {
      const [x, y, z, yaw, , sz] = d.inst.slice(i, i + 6);
      if (!cerca3d(x / 100, -y / 100)) continue;
      const sp = sustituto(ue, i);
      grupos[sp].push({ x, y, z, yaw, alto: IMP[ue].height_m * sz });
    }
  }
}

const manifest = [];
for (const [sp, inst] of Object.entries(grupos)) {
  if (!inst.length) continue;
  const doc = new Document();
  for (const k of ['hojas', 'madera']) mergeDocuments(doc, await io.read(`build/pf/arboles/${SRC[sp]}_L1_${k}.glb`));
  // una sola escena; transformaciones de nodo horneadas en la geometría
  const root = doc.getRoot();
  const scene = root.listScenes()[0];
  for (const s of root.listScenes().slice(1)) { for (const n of s.listChildren()) scene.addChild(n); s.dispose(); }
  // un solo buffer (al fusionar quedan dos)
  { const bufs = root.listBuffers(); for (const acc of root.listAccessors()) acc.setBuffer(bufs[0]); for (const b of bufs.slice(1)) b.dispose(); }
  await doc.transform(flatten());
  for (const n of root.listNodes()) if (n.getMesh()) clearNodeTransform(n);
  // base del tronco en y = 0 y altura natural
  let y0 = Infinity, y1 = -Infinity;
  for (const m of root.listMeshes()) for (const p of m.listPrimitives()) { const a = p.getAttribute('POSITION'); const mn = a.getMinNormalized ? null : null; const v = [0, 0, 0]; for (let i = 0; i < a.getCount(); i++) { a.getElement(i, v); y0 = Math.min(y0, v[1]); y1 = Math.max(y1, v[1]); } void mn; }
  for (const m of root.listMeshes()) for (const p of m.listPrimitives()) {
    const a = p.getAttribute('POSITION'); const v = [0, 0, 0];
    const arr = new Float32Array(a.getCount() * 3);
    for (let i = 0; i < a.getCount(); i++) { a.getElement(i, v); arr.set([v[0], v[1] - y0, v[2]], i * 3); }
    p.setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(arr).setBuffer(root.listBuffers()[0]));
  }
  const natural = y1 - y0;
  // hojas con recorte alfa (como en planosfinales), doble cara
  for (const mat of root.listMaterials()) {
    mat.setDoubleSided(true);
    if (/leaves|hojas/i.test(mat.getName())) mat.setAlphaMode('MASK').setAlphaCutoff(0.4);
  }
  // instancias: (E, arriba, -N) del visor; giro alrededor de +Y; escala uniforme a la altura de Unreal
  const n = inst.length;
  const T = new Float32Array(n * 3), R = new Float32Array(n * 4), S = new Float32Array(n * 3);
  inst.forEach((t, k) => {
    T.set([t.x / 100, t.z / 100, t.y / 100], k * 3);
    const h = (-t.yaw * Math.PI) / 360;
    R.set([0, Math.sin(h), 0, Math.cos(h)], k * 4);
    const s = Math.max(4, t.alto) / natural;
    S.set([s, s, s], k * 3);
  });
  const buf = root.listBuffers()[0];
  const ext = doc.createExtension(EXTMeshGPUInstancing).setRequired(true);
  const batch = ext.createInstancedMesh()
    .setAttribute('TRANSLATION', doc.createAccessor().setType('VEC3').setArray(T).setBuffer(buf))
    .setAttribute('ROTATION', doc.createAccessor().setType('VEC4').setArray(R).setBuffer(buf))
    .setAttribute('SCALE', doc.createAccessor().setType('VEC3').setArray(S).setBuffer(buf));
  for (const node of root.listNodes()) if (node.getMesh()) node.setExtension('EXT_mesh_gpu_instancing', batch);
  for (const e of root.listExtensionsUsed()) if (e.extensionName === 'EXT_meshopt_compression') e.dispose();
  await doc.transform(dedup(), prune());
  const file = `arboles3d_${sp}.glb`;
  await io.write('public/secciones/' + file, doc);
  const kb = Math.round(readFileSync('public/secciones/' + file).length / 1024);
  manifest.push({ key: sp, file, n });
  console.log(sp, n, 'árboles 3D ·', kb, 'KB · altura natural', natural.toFixed(1), 'm');
}
writeFileSync('public/secciones/arboles3d.json', JSON.stringify({ secciones: manifest }));

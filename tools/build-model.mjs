/**
 * UNICENTRO -> web
 *  - fuera los tiles Cesium (negros, georreferenciados)
 *  - la vegetación (30.027 árboles instanciados, 631M vértices) pasa a:
 *      public/models/trees.bin  (pos + giro + escala por árbol)
 *      prototipos TREE_TYPE_n dentro del GLB (una copia de cada árbol)
 *  - texturas PNG 2K -> WebP 1K
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup } from '@gltf-transform/functions';
import draco3d from 'draco3d';
import sharp from 'sharp';
import { statSync, writeFileSync } from 'node:fs';
import { Matrix4, Vector3, Quaternion } from 'three';

const IN = process.argv[2];
const OUT = process.argv[3];
const TREES = process.argv[4];
const TREESBIN = process.argv[5];

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

console.log('leyendo', IN);
const doc = await io.read(IN);
const root = doc.getRoot();

/* ---------- 1. tiles Cesium ---------- */
let cesium = 0;
for (const node of [...root.listNodes()]) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const mats = mesh.listPrimitives().map((p) => p.getMaterial());
  if (mats.length && mats.every((m) => m && m.getName().startsWith('CesiumMaterial'))) {
    node.dispose(); cesium++;
  }
}
console.log('Cesium eliminados:', cesium);

/* ---------- 2. vegetación ---------- */
const FOLIAGE = new Set([
  'MI_ramas', 'MI_tronco', 'MI_hojas', 'MI_agujas',
  'MI_island_tree_01', 'MI_island_tree_01_branches', 'MI_island_tree_01_leaves',
  'MI_island_tree_02', 'MI_island_tree_03', 'MI_island_tree_03_branches', 'MI_island_tree_03_leaves',
  'MI_tree_small_02_trunk', 'MI_tree_small_02_branches', 'MI_tree_small_02_leaves',
]);

const byMesh = new Map();
for (const node of [...root.listNodes()]) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const isFol = mesh.listPrimitives().some((p) => p.getMaterial() && FOLIAGE.has(p.getMaterial().getName()));
  if (!isFol) continue;
  if (!byMesh.has(mesh)) byMesh.set(mesh, []);
  byMesh.get(mesh).push(node);
}

const m4 = (v) => new Matrix4().fromArray(v);
const inv = (v) => m4(v).clone().invert();
const mulM = (a, b) => new Matrix4().multiplyMatrices(m4(a), m4(b));

const types = [];
const bin = [];
let total = 0;
let typeIdx = 0;
for (const [mesh, nodes] of byMesh) {
  const protoNode = nodes[0];
  const P = protoNode.getWorldMatrix();
  // hornear la matriz del prototipo en su geometría (queda en coordenadas de mundo)
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute('POSITION');
    if (pos) {
      const arr = pos.getArray().slice();
      const v = new Vector3();
      for (let i = 0; i < arr.length; i += 3) {
        v.set(arr[i], arr[i + 1], arr[i + 2]).applyMatrix4(m4(P));
        arr[i] = v.x; arr[i + 1] = v.y; arr[i + 2] = v.z;
      }
      pos.setArray(arr);
    }
    const nrm = prim.getAttribute('NORMAL');
    if (nrm) {
      const arr = nrm.getArray().slice();
      const v = new Vector3();
      const nm = new Matrix4().copy(m4(P)).invert().transpose();
      for (let i = 0; i < arr.length; i += 3) {
        v.set(arr[i], arr[i + 1], arr[i + 2]).applyMatrix4(nm).normalize();
        arr[i] = v.x; arr[i + 1] = v.y; arr[i + 2] = v.z;
      }
      nrm.setArray(arr);
    }
  }
  const Pinv = inv(P);

  types.push({ i: typeIdx, name: mesh.getName() || ('tree' + typeIdx), count: nodes.length });
  const t = new Vector3(), q = new Quaternion(), s = new Vector3();
  for (const node of nodes) {
    const R = mulM(node.getWorldMatrix(), Pinv.toArray());
    R.decompose(t, q, s);
    const e = new (q.constructor === Quaternion ? Object : Object)();
    // yaw alrededor de Z (modelo en Z-up)
    const siny = 2 * (q.w * q.z + q.x * q.y);
    const cosy = 1 - 2 * (q.y * q.y + q.z * q.z);
    const yaw = Math.atan2(siny, cosy);
    bin.push(typeIdx, t.x, t.y, t.z, yaw, (s.x + s.y + s.z) / 3);
    total++;
  }
  // prototipo a un nodo raíz con matriz identidad
  const protoMesh = mesh;
  protoNode.dispose();
  const holder = doc.createNode('TREE_TYPE_' + typeIdx).setMesh(protoMesh);
  root.getDefaultScene().addChild(holder);
  typeIdx++;
  if (typeIdx % 1 === 0) console.log('  tipo', typeIdx, protoMesh.getName(), nodes.length, 'instancias');
}

const f32 = Float32Array.from(bin);
writeFileSync(TREESBIN, Buffer.from(f32.buffer));
writeFileSync(TREES, JSON.stringify({ types, count: total, stride: 6 }));
console.log('árboles:', total, '->', TREESBIN, (f32.byteLength / 1048576).toFixed(2), 'MB');

/* ---------- 3. texturas ---------- */
// el navegador no decodifica EXR: se quitan esas referencias
for (const tex of [...root.listTextures()]) {
  const mime = tex.getMimeType() || '';
  if (!/^image\/(png|jpeg|webp)$/.test(mime)) {
    for (const mat of root.listMaterials()) {
      for (const get of ['getNormalTexture', 'getOcclusionTexture', 'getEmissiveTexture', 'getBaseColorTexture', 'getMetallicRoughnessTexture']) {
        const info = mat[get]();
        const ref = info && (typeof info.getTexture === 'function' ? info.getTexture() : info);
        if (ref === tex) {
          const set = get.replace('get', 'set');
          mat[set](null);
        }
      }
    }
    tex.dispose();
  }
}

const usable = root.listTextures().filter((t) => {
  const mime = t.getMimeType();
  return mime === 'image/png' || mime === 'image/jpeg';
});
console.log('texturas a recomprimir:', usable.length, 'de', root.listTextures().length);
const before = usable.reduce((s, t) => s + (t.getImage()?.byteLength || 0), 0);
for (const tex of usable) {
  try {
    const img = await sharp(Buffer.from(tex.getImage()))
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    tex.setImage(new Uint8Array(img)).setMimeType('image/webp');
  } catch (e) {
    console.warn('  textura falló', tex.getName(), e.message);
  }
}
const after = usable.reduce((s, t) => s + (t.getImage()?.byteLength || 0), 0);
console.log(`texturas ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);

/* ---------- 4. limpieza ---------- */
await doc.transform(dedup(), prune());
for (const mesh of root.listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    for (const name of ['TANGENT', 'TEXCOORD_1']) if (prim.getAttribute(name)) prim.setAttribute(name, null);
  }
}
await doc.transform(prune());
await io.write(OUT, doc);
console.log('escrito', OUT, (statSync(OUT).size / 1048576).toFixed(1), 'MB');

/**
 * Deja el GLB del proyecto en un formato que Cesium diga "ready" sin dudas:
 *  - decodifica Draco y guarda geometría plana (sin extensiones obligatorias)
 *  - conserva materiales y texturas WebP
 *  - quita KHR_lights_punctual (no lo usamos: la luz es la del globo)
 */
import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, prune } from '@gltf-transform/functions';
import draco3d from 'draco3d';

const src = process.argv[2] || 'public/models/unicentro-cesium.glb';
const dst = process.argv[3] || 'public/models/unicentro-cesium.glb';

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

const doc = await io.read(src);
await doc.transform(dedup(), prune());

doc.getRoot().listExtensionsUsed().forEach((ext) => {
  if (ext.extensionName === 'KHR_lights_punctual' || ext.extensionName === 'KHR_draco_mesh_compression') {
    ext.dispose();
  }
});

await io.write(dst, doc);
console.log(JSON.stringify({
  dst,
  extensionsUsed: doc.getRoot().listExtensionsUsed().map((e) => e.extensionName),
  extensionsRequired: doc.getRoot().listExtensionsRequired().map((e) => e.extensionName),
  meshes: doc.getRoot().listMeshes().length,
  nodes: doc.getRoot().listNodes().length,
}));

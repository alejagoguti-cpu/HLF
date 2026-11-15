import fs from 'node:fs';
for (const f of process.argv.slice(2)) {
  const b = fs.readFileSync(f); const l = b.readUInt32LE(12); const g = JSON.parse(b.subarray(20, 20 + l));
  console.log(f, (b.length / 1e6).toFixed(2) + 'MB', 'ext', (g.extensionsUsed || []).join());
  for (const n of g.nodes) if (n.mesh !== undefined) {
    const m = g.meshes[n.mesh];
    console.log('  node', n.name, JSON.stringify({ t: n.translation, r: n.rotation, s: n.scale }), m.primitives.map((p) => {
      const a = g.accessors[p.attributes.POSITION]; const mat = g.materials[p.material] || {};
      return `${(g.accessors[p.indices]?.count / 3) | 0}t ${mat.name} ${mat.alphaMode || 'OPAQUE'} tex=${mat.pbrMetallicRoughness?.baseColorTexture ? 1 : 0} min=${a.min?.map((v) => v.toFixed(1))} max=${a.max?.map((v) => v.toFixed(1))}`;
    }).join(' | '));
  }
  console.log('  images', (g.images || []).map((i) => i.mimeType + ':' + (g.bufferViews[i.bufferView]?.byteLength / 1024 | 0) + 'k').join(' '));
}

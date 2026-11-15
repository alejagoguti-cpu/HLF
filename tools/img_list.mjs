import { readFileSync } from 'node:fs';
const path = process.argv[2];
const buf = readFileSync(path);
const length = buf.readUInt32LE(8);
let off = 12, g = null, bin = null;
while (off < length) {
  const clen = buf.readUInt32LE(off), ctype = buf.readUInt32LE(off + 4);
  if (ctype === 0x4E4F534A) g = JSON.parse(buf.toString('utf8', off + 8, off + 8 + clen));
  if (ctype === 0x004E4942) bin = buf.subarray(off + 8, off + 8 + clen);
  off += 8 + clen;
}
console.log('images:');
(g.images||[]).forEach((im,i)=>console.log(i, im.name, im.mimeType, (g.bufferViews[im.bufferView].byteLength/1048576).toFixed(1)+'MB'));
console.log('\nmaterials referencing images:');
for (const m of g.materials||[]) {
  const refs = [];
  const p = m.pbrMetallicRoughness||{};
  for (const k of ['baseColorTexture','metallicRoughnessTexture']) if (p[k]) refs.push(k+'='+g.textures[p[k].index].source);
  if (m.normalTexture) refs.push('normal='+g.textures[m.normalTexture.index].source);
  if (m.emissiveTexture) refs.push('emissive='+g.textures[m.emissiveTexture.index].source);
  if (refs.length) console.log(' ', m.name, '| alpha:', m.alphaMode||'OPAQUE', '| base:', JSON.stringify(p.baseColorFactor||null), '|', refs.join(' '));
}

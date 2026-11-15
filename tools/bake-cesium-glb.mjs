/**
 * Convierte el GLB Z-up (Unreal) a Y-up para Cesium.
 *
 * Mapeo verificado con el modelo de Three.js que ya rotaba -90° en X:
 *   (x, y, z) -> (x, z, -y)
 * Esto deja: +X = Este, +Y(glTF) = Arriba, -Z(glTF) = Norte
 * (Cesium interpreta glTF Y-up: glTF +Z pasa a -Norte).
 * Determinante +1, asi que el orden de vertices se mantiene.
 *
 * Ademas elimina los nodos TREE_TYPE_* (la vegetacion se resuelve aparte).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const src = process.argv[2] || 'public/models/unicentro.glb';
const dst = process.argv[3] || 'public/models/unicentro-cesium.glb';

const buf = readFileSync(src);
const magic = buf.readUInt32LE(0);
if (magic !== 0x46546c67) throw new Error('no es GLB');

let offset = 12;
let json = null;
let bin = null;
const total = buf.readUInt32LE(8);
while (offset < total) {
  const clen = buf.readUInt32LE(offset);
  const ctype = buf.readUInt32LE(offset + 4);
  const chunk = buf.subarray(offset + 8, offset + 8 + clen);
  if (ctype === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8'));
  else if (ctype === 0x004e4942) bin = Buffer.from(chunk);
  offset += 8 + clen;
}

const g = json;

/* ---------- 1. quitar subarboles de vegetacion ---------- */
const dropNodes = new Set();
g.nodes.forEach((n, i) => { if (/^TREE_TYPE_/.test(n.name || '')) dropNodes.add(i); });
if (dropNodes.size) {
  g.scenes.forEach((s) => { s.nodes = s.nodes.filter((i) => !dropNodes.has(i)); });
  g.nodes.forEach((n) => { if (n.children) n.children = n.children.filter((i) => !dropNodes.has(i)); });
}

/* ---------- 2. recolectar accessors a permutar ---------- */
const xform = new Set();
for (const mesh of g.meshes) {
  for (const p of mesh.primitives) {
    for (const key of ['POSITION', 'NORMAL', 'TANGENT']) {
      if (p.attributes[key] !== undefined) xform.add(p.attributes[key]);
    }
  }
}

const COMP = { 5126: 4 }; // float
for (const ai of xform) {
  const acc = g.accessors[ai];
  if (acc.componentType !== 5126) continue;
  const nComp = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[acc.type];
  if (nComp < 3) continue;
  const bv = g.bufferViews[acc.bufferView];
  if (!bv || acc.bufferView === undefined) continue;
  const base = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const stride = bv.byteStride || nComp * 4;

  for (let i = 0; i < acc.count; i++) {
    const o = base + i * stride;
    const y = bin.readFloatLE(o + 4);
    const z = bin.readFloatLE(o + 8);
    bin.writeFloatLE(z, o + 4);    // y' =  z
    bin.writeFloatLE(-y, o + 8);   // z' = -y
  }

  // bounds: min/max se recalculan permutando
  if (acc.min && acc.max) {
    const mn = acc.min.slice(), mx = acc.max.slice();
    const nmin = [mn[0], mn[2], -mx[1]];
    const nmax = [mx[0], mx[2], -mn[1]];
    acc.min = nmin;
    acc.max = nmax;
  }
}

/* ---------- 3. reempaquetar GLB ---------- */
function align4(n) { return (n + 3) & ~3; }

const jsonStr = JSON.stringify(g);
const jsonBuf = Buffer.from(jsonStr, 'utf8');
const jsonPad = Buffer.alloc(align4(jsonBuf.length) - jsonBuf.length, 0x20);
const jsonChunk = Buffer.concat([jsonBuf, jsonPad]);

const binPad = Buffer.alloc(align4(bin.length) - bin.length, 0);
const binChunk = Buffer.concat([bin, binPad]);

const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binChunk.length, 8);

const jHead = Buffer.alloc(8);
jHead.writeUInt32LE(jsonChunk.length, 0);
jHead.writeUInt32LE(0x4e4f534a, 4);

const bHead = Buffer.alloc(8);
bHead.writeUInt32LE(binChunk.length, 0);
bHead.writeUInt32LE(0x004e4942, 4);

mkdirSync(dirname(dst), { recursive: true });
const out = Buffer.concat([header, jHead, jsonChunk, bHead, binChunk]);
writeFileSync(dst, out);

console.log(JSON.stringify({
  src, dst,
  bytesIn: buf.length,
  bytesOut: out.length,
  nodes: g.nodes.length,
  meshes: g.meshes.length,
  accessorsPermuted: xform.size,
}));

import { readFileSync } from 'node:fs';

const path = process.argv[2] || 'public/models/unicentro.glb';
const b = readFileSync(path);
let o = 12, json = null;
const total = b.readUInt32LE(8);
while (o < total) {
  const cl = b.readUInt32LE(o);
  const ct = b.readUInt32LE(o + 4);
  if (ct === 0x4e4f534a) json = JSON.parse(b.toString('utf8', o + 8, o + 8 + cl));
  o += 8 + cl;
}

const g = json;
const groups = new Map();

function nodeBounds(idx, out) {
  const n = g.nodes[idx];
  if (n.mesh !== undefined) {
    for (const p of g.meshes[n.mesh].primitives) {
      const acc = g.accessors[p.attributes.POSITION];
      if (!acc.min) continue;
      out.push({ min: acc.min, max: acc.max, name: n.name || g.meshes[n.mesh].name });
    }
  }
  for (const c of n.children || []) nodeBounds(c, out);
  return out;
}

function classify(name) {
  if (/Terreno/i.test(name)) return 'terreno';
  if (/TREE_TYPE/i.test(name)) return 'arboles';
  if (/Hotel|Fontana/i.test(name)) return 'hotel';
  if (/UNICENTRO/i.test(name)) return 'unicentro';
  return 'otros';
}

const scene = g.scenes[g.scene || 0];
for (const rootIdx of scene.nodes) {
  const rootName = g.nodes[rootIdx].name || '';
  if (/^TREE_TYPE/.test(rootName)) continue;
  const out = [];
  nodeBounds(rootIdx, out);
  for (const it of out) {
    const k = classify(it.name || rootName);
    let e = groups.get(k);
    if (!e) { e = { min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9], count: 0 }; groups.set(k, e); }
    for (let i = 0; i < 3; i++) {
      e.min[i] = Math.min(e.min[i], it.min[i]);
      e.max[i] = Math.max(e.max[i], it.max[i]);
    }
    e.count++;
  }
}

for (const [k, e] of groups) {
  const size = e.max.map((v, i) => +(v - e.min[i]).toFixed(1));
  const center = e.max.map((v, i) => +((v + e.min[i]) / 2).toFixed(1));
  console.log(k.padEnd(10), 'prims', String(e.count).padStart(4), 'size', JSON.stringify(size), 'center', JSON.stringify(center));
}
console.log('\nscene span', scene.nodes.length, 'roots');

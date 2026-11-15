import fs from 'node:fs';

const file = process.argv[2] || 'public/models/unicentro-cesium.glb';
const buf = fs.readFileSync(file);
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));

// Matrices 4x4 (column-major) mínimas
const mul = (a, b) => {
  const o = new Array(16).fill(0);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return o;
};
const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const trs = (node) => {
  if (node.matrix) return node.matrix.slice();
  const t = node.translation || [0, 0, 0];
  const s = node.scale || [1, 1, 1];
  const q = node.rotation || [0, 0, 0, 1];
  const [x, y, z, w] = q;
  const m = [
    (1 - 2 * (y * y + z * z)) * s[0], (2 * (x * y + z * w)) * s[0], (2 * (x * z - y * w)) * s[0], 0,
    (2 * (x * y - z * w)) * s[1], (1 - 2 * (x * x + z * z)) * s[1], (2 * (y * z + x * w)) * s[1], 0,
    (2 * (x * z + y * w)) * s[2], (2 * (y * z - x * w)) * s[2], (1 - 2 * (x * x + y * y)) * s[2], 0,
    t[0], t[1], t[2], 1,
  ];
  return m;
};
const apply = (m, p) => [
  m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
  m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
  m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14],
];

const groups = new Map(); // nombre limpio -> bbox mundo
const walk = (idx, parent) => {
  const node = gltf.nodes[idx];
  const world = mul(parent, trs(node));
  if (node.mesh !== undefined) {
    const mesh = gltf.meshes[node.mesh];
    const base = (node.name || mesh.name || 'mesh').replace(/\d+$/g, '');
    for (const prim of mesh.primitives) {
      const a = gltf.accessors[prim.attributes.POSITION];
      if (!a?.min || !a?.max) continue;
      const corners = [];
      for (const x of [a.min[0], a.max[0]])
        for (const y of [a.min[1], a.max[1]])
          for (const z of [a.min[2], a.max[2]]) corners.push(apply(world, [x, y, z]));
      let g = groups.get(base);
      if (!g) {
        g = { name: base, count: 0, min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9] };
        groups.set(base, g);
      }
      g.count++;
      for (const c of corners)
        for (let i = 0; i < 3; i++) {
          g.min[i] = Math.min(g.min[i], c[i]);
          g.max[i] = Math.max(g.max[i], c[i]);
        }
    }
  }
  for (const child of node.children || []) walk(child, world);
};

for (const root of gltf.scenes[gltf.scene].nodes) walk(root, ident());

const rows = [...groups.values()]
  .filter((g) => !/^TREE/i.test(g.name) && g.name.trim())
  .sort((a, b) => (b.max[0] - b.min[0]) * (b.max[2] - b.min[2]) - (a.max[0] - a.min[0]) * (a.max[2] - a.min[2]))
  .map((g) => ({
    name: g.name.slice(0, 46),
    meshes: g.count,
    size: [+(g.max[0] - g.min[0]).toFixed(1), +(g.max[1] - g.min[1]).toFixed(1), +(g.max[2] - g.min[2]).toFixed(1)],
    minY: +g.min[1].toFixed(1),
    maxY: +g.max[1].toFixed(1),
    cx: +((g.min[0] + g.max[0]) / 2).toFixed(0),
    cz: +((g.min[2] + g.max[2]) / 2).toFixed(0),
  }));

console.log(JSON.stringify(rows.slice(0, 26), null, 1));
console.log('grupos:', rows.length);

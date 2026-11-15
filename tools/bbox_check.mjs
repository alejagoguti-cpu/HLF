import { readFileSync } from 'node:fs';
const path = process.argv[2];
const buf = readFileSync(path);
const length = buf.readUInt32LE(8);
let off = 12, g = null;
while (off < length) {
  const clen = buf.readUInt32LE(off), ctype = buf.readUInt32LE(off + 4);
  if (ctype === 0x4E4F534A) g = JSON.parse(buf.toString('utf8', off + 8, off + 8 + clen));
  off += 8 + clen;
}
const fol = new Set([0,1,2,3,4,5,864]);
let minx=1e30,maxx=-1e30,miny=1e30,maxy=-1e30,minz=1e30,maxz=-1e30;
const rows=[];
for (let i=0;i<g.meshes.length;i++) {
  if (fol.has(i)) continue;
  const m = g.meshes[i];
  let mnx=1e30,mxx=-1e30,mny=1e30,mxy=-1e30,mnz=1e30,mxz=-1e30, verts=0;
  let cesium = true;
  for (const p of m.primitives||[]) {
    const a = g.accessors[p.attributes.POSITION];
    if (!a || !a.min) continue;
    verts += a.count;
    mnx=Math.min(mnx,a.min[0]); mxx=Math.max(mxx,a.max[0]);
    mny=Math.min(mny,a.min[1]); mxy=Math.max(mxy,a.max[1]);
    mnz=Math.min(mnz,a.min[2]); mxz=Math.max(mxz,a.max[2]);
    const mat = g.materials[p.material];
    if (!mat || !/^CesiumMaterial/.test(mat.name||'')) cesium=false;
  }
  if (cesium) continue;
  minx=Math.min(minx,mnx); maxx=Math.max(maxx,mxx);
  miny=Math.min(miny,mny); maxy=Math.max(maxy,mxy);
  minz=Math.min(minz,mnz); maxz=Math.max(maxz,mxz);
  rows.push({i, name:m.name, verts, x:[Math.round(mnx),Math.round(mxx)], y:[Math.round(mny),Math.round(mxy)], z:[Math.round(mnz),Math.round(mxz)]});
}
rows.sort((a,b)=>b.verts-a.verts);
console.log(JSON.stringify({bbox:{minx,maxx,miny,maxy,minz,maxz}, top:rows.slice(0,25)},null,1));

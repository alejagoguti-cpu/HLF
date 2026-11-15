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
function mul(a,b){const o=new Array(16).fill(0);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s;}return o;}
function trs(n){if(n.matrix)return n.matrix.slice();const t=n.translation||[0,0,0],r=n.rotation||[0,0,0,1],s=n.scale||[1,1,1];const[x,y,z,w]=r,x2=x+x,y2=y+y,z2=z+z;const xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;return[(1-(yy+zz))*s[0],(xy+wz)*s[0],(xz-wy)*s[0],0,(xy-wz)*s[1],(1-(xx+zz))*s[1],(yz+wx)*s[1],0,(xz+wy)*s[2],(yz-wx)*s[2],(1-(xx+yy))*s[2],0,t[0],t[1],t[2],1];}
const IDENT=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
const scene=g.scenes[g.scene||0];
const fol=new Set([0,1,2,3,4,5,864]);
const stack=(scene.nodes||[]).map(i=>[i,IDENT]);
const radii=[60,100,150,220,320,500,800,1200];
const per=new Map();
const all=[];
while(stack.length){
  const [idx,parent]=stack.pop();
  const n=g.nodes[idx]; const wm=mul(parent,trs(n));
  if(n.mesh!==undefined&&fol.has(n.mesh)){
    const d=Math.hypot(wm[12],wm[14]);
    all.push([n.mesh,d,wm[12],wm[13],wm[14],Math.hypot(wm[0],wm[1],wm[2])]);
    if(!per.has(n.mesh)) per.set(n.mesh,new Array(radii.length).fill(0));
    const h=per.get(n.mesh);
    for(let i=0;i<radii.length;i++) if(d<radii[i]) h[i]++;
  }
  if(n.children) for(const c of n.children) stack.push([c,wm]);
}
const out={ radii, total:all.length, perMesh:{} };
for(const [k,v] of [...per.entries()].sort((a,b)=>a[0]-b[0])) out.perMesh[k]=v;
out.positionsSample = all.slice(0,5).map(p=>p.map(x=>+x.toFixed(1)));
out.distStats = (()=>{const ds=all.map(a=>a[1]).sort((a,b)=>a-b);return{q10:ds[Math.floor(ds.length*0.1)],q50:ds[Math.floor(ds.length*0.5)],q90:ds[Math.floor(ds.length*0.9)],max:ds[ds.length-1]};})();
console.log(JSON.stringify(out,null,1));

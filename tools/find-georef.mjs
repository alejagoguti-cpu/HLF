import { readFileSync } from 'node:fs';
const f = process.argv[2];
const buf = readFileSync(f);
const txt = buf.toString('latin1');
const keys = ['OriginLatitude', 'OriginLongitude', 'OriginHeight', 'OriginPlaceOrigin'];
for (const key of keys) {
  let idx = -1;
  const hits = [];
  while ((idx = txt.indexOf(key, idx + 1)) !== -1) hits.push(idx);
  console.log(`\n=== ${key} (${hits.length} hits) ===`);
  for (const h of hits.slice(0, 6)) {
    const slice = buf.subarray(h, h + 220);
    const dbl = [];
    for (let o = 0; o + 8 <= slice.length; o += 1) {
      const v = slice.readDoubleLE(o);
      if (Number.isFinite(v) && Math.abs(v) > 0.000001 && Math.abs(v) < 1e8) dbl.push([o, +v.toFixed(7)]);
      if (dbl.length > 6) break;
    }
    console.log(' @', h, JSON.stringify(dbl.slice(0, 4)));
  }
}
// nombres de assets Cesium
const urls = [...txt.matchAll(/https?:\/\/[ -~]{6,140}/g)].map((m) => m[0]).slice(0, 25);
console.log('\n=== urls ===\n' + [...new Set(urls)].join('\n'));
const assets = [...txt.matchAll(/[A-Za-z0-9_\-\/]{4,80}\.(json|glb|b3dm|terrain)/g)].map((m) => m[0]);
console.log('\n=== assets ===\n' + [...new Set(assets)].slice(0, 30).join('\n'));

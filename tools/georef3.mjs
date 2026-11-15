import { readFileSync } from 'node:fs';

const f = process.argv[2];
const buf = readFileSync(f);

// Unreal tagged property: <name>\0 <type>\0 <size:i32> <value>
// CesiumGeoreference stores OriginLatitude/OriginLongitude/OriginHeight
function findTag(tag) {
  const needle = Buffer.from(tag + '\0', 'latin1');
  const hits = [];
  let i = -1;
  while ((i = buf.indexOf(needle, i + 1)) !== -1) hits.push(i);
  return hits;
}

function readTagged(tag) {
  const out = [];
  for (const h of findTag(tag)) {
    const tail = buf.subarray(h + tag.length + 1, h + tag.length + 120);
    const tailStr = tail.toString('latin1');
    const typeEnd = tailStr.indexOf('\0');
    if (typeEnd < 0) continue;
    const type = tailStr.slice(0, typeEnd);
    let o = typeEnd + 1;
    while (o < tail.length && tail[o] === 0) o++;
    if (o + 4 > tail.length) continue;
    const size = tail.readInt32LE(o);
    if (size < 0 || size > 64) continue;
    const valStart = h + tag.length + 1 + o + 4;
    let val = null;
    if (type === 'DoubleProperty' && size === 8) val = buf.readDoubleLE(valStart);
    else if (type === 'FloatProperty' && size === 4) val = buf.readFloatLE(valStart);
    else if (type === 'IntProperty' && size === 4) val = buf.readInt32LE(valStart);
    else if (type === 'BoolProperty') val = size;
    out.push({ at: h, type, size, val });
  }
  return out;
}

for (const tag of ['OriginLatitude', 'OriginLongitude', 'OriginHeight', 'OriginPlaceOrigin', 'Scale']) {
  console.log(tag, JSON.stringify(readTagged(tag).filter((r) => r.val !== null).slice(0, 6)));
}

// Fallback: any float32/float64 in plausible Bogotá ranges
const f32lat = [], f64lat = [];
for (let o = 0; o + 8 <= buf.length; o += 4) {
  const a = buf.readFloatLE(o);
  if (a > 4.3 && a < 5.2) f32lat.push([o, +a.toFixed(6)]);
  const b = buf.readDoubleLE(o);
  if (b > 4.3 && b < 5.2) f64lat.push([o, +b.toFixed(6)]);
}
console.log('\nfloat32 lat candidates', f32lat.slice(0, 12));
console.log('float64 lat candidates', f64lat.slice(0, 12));

const f32lon = [];
for (let o = 0; o + 4 <= buf.length; o += 4) {
  const a = buf.readFloatLE(o);
  if (a > -74.3 && a < -73.8) f32lon.push([o, +a.toFixed(6)]);
}
console.log('float32 lon candidates', f32lon.slice(0, 12));

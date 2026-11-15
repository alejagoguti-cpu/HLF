/**
 * Vegetación del proyecto Unreal -> secciones GLB para la web.
 *
 * Posición, giro y escala: instancias reales de los 12 actores HISM de Unreal
 * (Arboles_* del censo y ArbolesSat_* de satélite), exportadas a build/ue/*.json.
 * Geometría: impostores fotográficos de los mismos escaneos PolyHaven que usa
 * Unreal (4 vistas laterales + 4 cortes horizontales de copa), instanciados con
 * EXT_mesh_gpu_instancing. Una sección por especie.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';

const IMP = 'C:/Users/aleja/Documents/Codex/2026-11-06/co/web/build/impostors/';
const UE = 'build/ue/';
const OUT = 'public/secciones/';
const META = JSON.parse(readFileSync(IMP + 'meta.json', 'utf8'));
const SPECIES = ['island_tree_01', 'island_tree_02', 'island_tree_03', 'jacaranda_tree', 'tree_small_02', 'fir_sapling_medium', 'shrub_02'];
const SIDES = ['side', 'side45', 'side2', 'side135'];
const SLICES = ['slice0', 'slice1', 'slice2', 'slice3'];

/** Rellena el color de los píxeles transparentes con el del follaje vecino (evita halos oscuros en los mipmaps). */
async function bleed(file, size) {
  const { data, info } = await sharp(file).resize(size, size, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const pre = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const a = data[i * 4 + 3] / 255;
    pre[i * 4] = data[i * 4] * a; pre[i * 4 + 1] = data[i * 4 + 1] * a; pre[i * 4 + 2] = data[i * 4 + 2] * a; pre[i * 4 + 3] = data[i * 4 + 3];
  }
  const out = Buffer.from(data);
  let src = pre;
  for (const sigma of [2, 6, 18]) {
    const bl = await sharp(src, { raw: { width: info.width, height: info.height, channels: 4 } }).blur(sigma).raw().toBuffer();
    for (let i = 0; i < n; i++) {
      if (out[i * 4 + 3] > 8 || out[i * 4] + out[i * 4 + 1] + out[i * 4 + 2] > 0 && data[i * 4 + 3] <= 8 && out._f?.[i]) continue;
      const a = bl[i * 4 + 3];
      if (data[i * 4 + 3] <= 8 && a > 2 && !(out._f ??= new Uint8Array(n))[i]) {
        out[i * 4] = Math.min(255, (bl[i * 4] * 255) / a); out[i * 4 + 1] = Math.min(255, (bl[i * 4 + 1] * 255) / a); out[i * 4 + 2] = Math.min(255, (bl[i * 4 + 2] * 255) / a);
        out._f[i] = 1;
      }
    }
  }
  // lo que quede sin vecino: verde follaje medio
  for (let i = 0; i < n; i++) if (data[i * 4 + 3] <= 8 && !(out._f && out._f[i])) { out[i * 4] = 70; out[i * 4 + 1] = 92; out[i * 4 + 2] = 48; }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

function quadMesh(m, cs) {
  const W = 4 * cs, H = 1.5 * cs;
  const F = m.frame_size_m, T = m.top_frame_size_m;
  const P = [], UV = [], I = [];
  const quad = (c, u0, v0, u1, v1) => {
    const b = P.length / 3;
    for (const p of c) P.push(...p);
    UV.push(u0, v1, u1, v1, u1, v0, u0, v0);
    I.push(b, b + 1, b + 2, b, b + 2, b + 3);
  };
  [0, 45, 90, 135].forEach((ang, i) => {
    const a = (ang * Math.PI) / 180, dx = (Math.cos(a) * F) / 2, dz = (-Math.sin(a) * F) / 2;
    quad([[-dx, 0, -dz], [dx, 0, dz], [dx, F, dz], [-dx, F, -dz]], (i * cs) / W, 0, ((i + 1) * cs) / W, cs / H);
  });
  m.slices.forEach(([lo, hi], i) => {
    const y = (lo + hi) / 2, h = cs / 2;
    quad([[-T / 2, y, T / 2], [T / 2, y, T / 2], [T / 2, y, -T / 2], [-T / 2, y, -T / 2]], (i * h) / W, cs / H, ((i + 1) * h) / W, (cs + h) / H);
  });
  // normales radiales desde el centro de la copa: volumen con el sol en vez de cartón plano
  const N = [];
  const cy = F * 0.5;
  for (let i = 0; i < P.length; i += 3) {
    const x = P[i], y = (P[i + 1] - cy) * 1.1 + F * 0.12, z = P[i + 2];
    const l = Math.hypot(x, y, z) || 1;
    N.push(x / l, y / l, z / l);
  }
  return { P: new Float32Array(P), N: new Float32Array(N), UV: new Float32Array(UV), I: new Uint16Array(I) };
}

mkdirSync(OUT, { recursive: true });
const manifest = [];
let total = 0;
for (const k of SPECIES) {
  const inst = [];
  const origen = [];
  for (const pre of ['Arboles_', 'ArbolesSat_']) {
    const f = `${UE}${pre}${k}.json`;
    if (!existsSync(f)) continue;
    const d = JSON.parse(readFileSync(f, 'utf8'));
    for (let i = 0; i < d.inst.length; i += 6) inst.push(d.inst.slice(i, i + 6));
    origen.push({ actor: d.actor, n: d.n });
  }
  if (!inst.length) continue;
  const m = META[k];
  const cs = k === 'shrub_02' || k === 'fir_sapling_medium' ? 512 : 1024;

  const layers = [];
  for (let i = 0; i < 4; i++) layers.push({ input: await bleed(`${IMP}${k}/${SIDES[i]}.png`, cs), left: i * cs, top: 0 });
  for (let i = 0; i < 4; i++) layers.push({ input: await bleed(`${IMP}${k}/${SLICES[i]}.png`, cs / 2), left: (i * cs) / 2, top: cs });
  const atlas = await sharp({ create: { width: 4 * cs, height: 1.5 * cs, channels: 4, background: { r: 70, g: 92, b: 48, alpha: 0 } } })
    .composite(layers).webp({ quality: 86, alphaQuality: 92, effort: 5 }).toBuffer();

  const g = new Glb();
  g.use('EXT_mesh_gpu_instancing');
  const tex = g.image(atlas, 'image/webp');
  g.j.materials.push({
    name: k, doubleSided: true, alphaMode: 'MASK', alphaCutoff: 0.42,
    pbrMetallicRoughness: { baseColorTexture: { index: tex }, metallicFactor: 0, roughnessFactor: 0.82 },
  });
  const q = quadMesh(m, cs);
  g.j.meshes.push({
    name: k,
    primitives: [{
      attributes: {
        POSITION: g.acc(q.P, 'VEC3', { target: 34962, minmax: true }),
        NORMAL: g.acc(q.N, 'VEC3', { target: 34962 }),
        TEXCOORD_0: g.acc(q.UV, 'VEC2', { target: 34962 }),
      },
      indices: g.acc(q.I, 'SCALAR', { target: 34963 }),
      material: 0,
    }],
  });
  const n = inst.length;
  const tr = new Float32Array(n * 3), rot = new Float32Array(n * 4), sc = new Float32Array(n * 3);
  inst.forEach(([x, y, z, yaw, sx, sz], i) => {
    tr.set([x / 100, z / 100, y / 100], i * 3); // ENU -> (E, Arriba, -N);  N = -y_UE
    const h = (-yaw * Math.PI) / 360;
    rot.set([0, Math.sin(h), 0, Math.cos(h)], i * 4);
    sc.set([sx, sz, sx], i * 3);
  });
  g.j.nodes.push({
    name: 'Arboles_' + k, mesh: 0,
    extensions: { EXT_mesh_gpu_instancing: { attributes: { TRANSLATION: g.acc(tr, 'VEC3', { minmax: true }), ROTATION: g.acc(rot, 'VEC4'), SCALE: g.acc(sc, 'VEC3') } } },
  });
  g.j.scenes[0].nodes.push(0);
  const file = `arboles_${k}.glb`;
  const bytes = g.write(OUT + file);
  manifest.push({ key: k, file, n, kb: Math.round(bytes / 1024), alto: m.height_m, origen });
  total += n;
  console.log(k, n, 'árboles', (bytes / 1024).toFixed(0) + ' KB', JSON.stringify(origen));
}
writeFileSync(OUT + 'arboles.json', JSON.stringify({ total, secciones: manifest }));
console.log('TOTAL', total);

/**
 * Vegetación del proyecto Unreal -> secciones para la web.
 *
 * Posición, giro y escala: instancias reales de los 12 actores HISM de Unreal
 * (Arboles_* del censo y ArbolesSat_* de satélite), exportadas a build/ue/*.json.
 * Imagen: fotografías ortográficas de los mismos escaneos PolyHaven que usa Unreal
 * (4 vistas laterales cada 45° + vista superior). Cada árbol es un único plano que
 * siempre mira a la cámara y elige/mezcla la vista que corresponde al ángulo real
 * desde el que se le mira (src/shaders.ts). Una sección por especie:
 *   arboles_<especie>.glb   un quad por árbol (centro, esquina, escala, giro)
 *   arboles_<especie>.webp  atlas 4096x2048: fila 0 = 4 vistas laterales, fila 1 = vista superior
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { enZona } from './zona.mjs';
let enZonaReal = 0;

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
    for (let i = 0; i < d.inst.length; i += 6) {
      // en la zona real los árboles son los de la captura 3D
      if (enZona(d.inst[i] / 100, -d.inst[i + 1] / 100)) { enZonaReal++; continue; }
      inst.push(d.inst.slice(i, i + 6));
    }
    origen.push({ actor: d.actor, n: d.n });
  }
  if (!inst.length) continue;
  const m = META[k];
  const small = k === 'shrub_02' || k === 'fir_sapling_medium';
  const cs = small ? 512 : 1024;

  const layers = [];
  for (let i = 0; i < 4; i++) layers.push({ input: await bleed(`${IMP}${k}/${SIDES[i]}.png`, cs), left: i * cs, top: 0 });
  layers.push({ input: await bleed(`${IMP}${k}/top.png`, cs), left: 0, top: cs });
  const atlas = await sharp({ create: { width: 4 * cs, height: 2 * cs, channels: 4, background: { r: 70, g: 92, b: 48, alpha: 0 } } })
    .composite(layers).webp({ quality: 88, alphaQuality: 94, effort: 5 }).toBuffer();
  writeFileSync(`${OUT}arboles_${k}.webp`, atlas);

  const n = inst.length;
  const P = new Float32Array(n * 12), C = new Float32Array(n * 8), Z = new Float32Array(n * 8), Col = new Uint8Array(n * 16);
  const I = new Uint32Array(n * 6);
  const corners = [[-1, 0], [1, 0], [1, 1], [-1, 1]];
  inst.forEach(([x, y, z, yaw, sx, sz], i) => {
    const giro = ((((-yaw * Math.PI) / 180) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); // giro glTF alrededor de +Y
    const seed = Math.abs(Math.sin(x * 0.0127 + y * 0.0311) * 43758.5453) % 1;
    for (let c = 0; c < 4; c++) {
      P.set([x / 100, z / 100, y / 100], i * 12 + c * 3);       // base del árbol: ENU -> (E, arriba, -N)
      C.set(corners[c], i * 8 + c * 2);
      Z.set([sx, sz], i * 8 + c * 2);
      Col.set([Math.round((giro / (2 * Math.PI)) * 255), Math.round(seed * 255), 0, 255], i * 16 + c * 4);
    }
    I.set([i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3], i * 6);
  });
  const g = new Glb();
  g.j.materials.push({ name: k, doubleSided: true, alphaMode: 'MASK', alphaCutoff: 0.5, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.9 } });
  g.j.meshes.push({
    name: k,
    primitives: [{
      attributes: {
        POSITION: g.acc(P, 'VEC3', { target: 34962, minmax: true }),
        TEXCOORD_0: g.acc(C, 'VEC2', { target: 34962 }),
        TEXCOORD_1: g.acc(Z, 'VEC2', { target: 34962 }),
        COLOR_0: g.acc(Col, 'VEC4', { target: 34962, normalized: true }),
      },
      indices: g.acc(I, 'SCALAR', { target: 34963 }),
      material: 0,
    }],
  });
  g.j.nodes.push({ name: 'Arboles_' + k, mesh: 0 });
  g.j.scenes[0].nodes.push(0);
  const file = `arboles_${k}.glb`;
  const bytes = g.write(OUT + file);
  manifest.push({ key: k, file, atlas: `arboles_${k}.webp`, n, kb: Math.round((bytes + atlas.length) / 1024), marco: m.frame_size_m, marcoSup: m.top_frame_size_m, alto: m.height_m, origen });
  total += n;
  console.log(k, n, 'árboles', ((bytes + atlas.length) / 1024).toFixed(0) + ' KB');
}
writeFileSync(OUT + 'arboles.json', JSON.stringify({ total, secciones: manifest }));
console.log('TOTAL', total, '· en zona real (no generados):', enZonaReal);

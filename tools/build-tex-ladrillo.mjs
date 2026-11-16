/**
 * Ladrillo del Hotel La Fontana (como en la foto): ladrillo cocido naranja-terracota, aparejo
 * a soga, junta clara de mortero, cada pieza con su tono. Se parte del escaneo PolyHaven
 * red_brick_03 (dibujo, poros, desgaste) y se lleva al color real del hotel.
 *   -> public/secciones/tex_ladrillo_hlf.webp (color, 2048) + tex_ladrillo_hlf_n.webp (normal)
 */
import sharp from 'sharp';
const T = 'C:/Users/aleja/Documents/Codex/2026-11-06/co/outputs/3dsmax/texturas/red_brick_03/';
const S = 2048;
const { data, info } = await sharp(T + 'red_brick_03_diff_2k.jpg').resize(S, S).raw().toBuffer({ resolveWithObject: true });
const n = S * S, ch = info.channels;
// luminancia media para normalizar el dibujo
let sum = 0;
for (let i = 0; i < n; i++) sum += data[i * ch] * 0.3 + data[i * ch + 1] * 0.59 + data[i * ch + 2] * 0.11;
const mean = sum / n;
// paleta medida de la foto del hotel (sRGB): piezas naranja, algunas más tostadas, junta beige
const PIEZAS = [[196, 112, 70], [184, 100, 62], [205, 124, 80], [170, 92, 58], [210, 132, 88]];
const JUNTA = [196, 182, 160];
const out = Buffer.alloc(n * 3);
const h = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
  const i = y * S + x;
  const r = data[i * ch], g = data[i * ch + 1], b = data[i * ch + 2];
  const lum = r * 0.3 + g * 0.59 + b * 0.11;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const sat = mx > 0 ? (mx - mn) / mx : 0;
  // la junta del escaneo es más gris y clara que la pieza
  const junta = Math.max(0, Math.min(1, (0.3 - sat) / 0.14)) * Math.max(0, Math.min(1, (lum - mean * 0.85) / (mean * 0.3)));
  // tono por pieza: celdas del aparejo (el escaneo trae ~6 x 18 hiladas en 2048 px)
  // color base del hotel; el tono de cada pieza sale de la propia foto (rojo/verde relativos)
  const tost = Math.max(-1, Math.min(1, ((r - g) / Math.max(1, lum) - 0.55) * 3));
  const p = PIEZAS[0].map((v, c) => v * (1 - 0.1 * tost) + PIEZAS[3][c] * 0.1 * tost);
  const k = lum / mean;
  for (let c = 0; c < 3; c++) {
    const pieza = p[c] * (0.72 + 0.28 * k);
    const mort = JUNTA[c] * (0.86 + 0.14 * k);
    out[i * 3 + c] = Math.max(0, Math.min(255, Math.round(pieza * (1 - junta) + mort * junta)));
  }
}
await sharp(out, { raw: { width: S, height: S, channels: 3 } }).webp({ quality: 86 }).toFile('public/secciones/tex_ladrillo_hlf.webp');
await sharp(T + 'red_brick_03_nor_dx_2k.jpg').resize(S, S).webp({ quality: 88 }).toFile('public/secciones/tex_ladrillo_hlf_n.webp');
console.log('tex_ladrillo_hlf.webp + normal listos');

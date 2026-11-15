/** Texturas fotográficas reales (PolyHaven, las mismas del proyecto Unreal) para vías, andenes, prado y ciclorruta. */
import sharp from 'sharp';
const T = 'C:/Users/aleja/Documents/Codex/2026-11-06/co/outputs/3dsmax/texturas/';
const MAP = { asfalto: 'asphalt_02', anden: 'interlocking_concrete_pavers', prado: 'leafy_grass', ciclo: 'ciclorruta_asfalto_rojo' };
for (const [k, d] of Object.entries(MAP)) {
  const info = await sharp(`${T}${d}/${d}_diff_2k.jpg`).resize(1024, 1024).webp({ quality: 84 }).toFile(`public/secciones/tex_${k}.webp`);
  console.log(k, d, Math.round(info.size / 1024) + ' KB');
}

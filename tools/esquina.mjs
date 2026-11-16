/**
 * Torre de la esquina oeste del Hotel La Fontana (foto de la calle):
 * sobre la pila de balcones del Revit faltaban el último piso acristalado, la cubierta
 * de teja a cuatro aguas con alero ancho y la chimenea de ladrillo.
 * Devuelve triángulos en ENU (este, norte, cota) con código de material del sombreador Revit:
 *   10 ladrillo · 30 losa · 50 teja · 70 vidrio · 72 marco negro
 */
export function esquinaOeste() {
  // huella de la torre (ENU), en sentido antihorario, tomada de los balcones y muros del Revit
  const H = [[-253.6, 282.4], [-251.9, 280.6], [-246.5, 277.2], [-243.0, 276.3], [-238.3, 277.0], [-238.6, 288.4], [-245.2, 288.6], [-250.4, 286.1], [-253.6, 284.6]];
  const Z0 = 21.8;   // nivel de cubierta del Revit
  const ZV = 24.3;   // remate del piso acristalado
  const ZR = 27.4;   // cumbrera
  const ALERO = 1.3;
  const T = [];
  const tri = (a, b, c, code) => T.push({ v: [a, b, c], code });
  const quad = (a, b, c, d, code) => { tri(a, b, c, code); tri(a, c, d, code); };
  const cx = H.reduce((s, p) => s + p[0], 0) / H.length, cy = H.reduce((s, p) => s + p[1], 0) / H.length;
  const off = (p, k) => { const dx = p[0] - cx, dy = p[1] - cy, l = Math.hypot(dx, dy) || 1; return [p[0] + (dx / l) * k, p[1] + (dy / l) * k]; };

  // losa de piso del nivel acristalado
  for (let i = 1; i + 1 < H.length; i++) tri([...H[0], Z0], [...H[i], Z0], [...H[i + 1], Z0], 30);
  // piso acristalado: paños de vidrio con montantes negros cada ~1,3 m y zócalo de ladrillo
  for (let i = 0; i < H.length; i++) {
    const a = H[i], b = H[(i + 1) % H.length];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    quad([...a, Z0], [...b, Z0], [...b, Z0 + 0.45], [...a, Z0 + 0.45], 10);
    quad([...a, Z0 + 0.45], [...b, Z0 + 0.45], [...b, ZV], [...a, ZV], 70);
    const k = Math.max(1, Math.round(L / 1.3));
    const nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L; // normal exterior (antihorario)
    for (let j = 0; j <= k; j++) {
      const t = j / k, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
      const ux = (b[0] - a[0]) / L * 0.05, uy = (b[1] - a[1]) / L * 0.05, ox = nx * 0.04, oy = ny * 0.04;
      quad([x - ux + ox, y - uy + oy, Z0 + 0.45], [x + ux + ox, y + uy + oy, Z0 + 0.45], [x + ux + ox, y + uy + oy, ZV], [x - ux + ox, y - uy + oy, ZV], 72);
    }
    // travesaño a media altura
    quad([a[0] + nx * 0.04, a[1] + ny * 0.04, Z0 + 1.45], [b[0] + nx * 0.04, b[1] + ny * 0.04, Z0 + 1.45], [b[0] + nx * 0.04, b[1] + ny * 0.04, Z0 + 1.52], [a[0] + nx * 0.04, a[1] + ny * 0.04, Z0 + 1.52], 72);
  }
  // alero: borde y plafón
  const E = H.map((p) => off(p, ALERO));
  for (let i = 0; i < H.length; i++) {
    const a = H[i], b = H[(i + 1) % H.length], ea = E[i], eb = E[(i + 1) % H.length];
    quad([...a, ZV], [...b, ZV], [...eb, ZV], [...ea, ZV], 30);                       // plafón
    quad([...ea, ZV], [...eb, ZV], [...eb, ZV + 0.22], [...ea, ZV + 0.22], 50);       // canto
  }
  // cubierta a cuatro aguas: cada faldón sube del alero a la cumbrera (punto alto desplazado hacia el centro)
  const top = [cx, cy, ZR];
  for (let i = 0; i < E.length; i++) tri([...E[i], ZV + 0.22], [...E[(i + 1) % E.length], ZV + 0.22], top, 50);
  // chimenea de ladrillo con remate (como en la foto)
  const ch = [cx + 1.6, cy + 2.2], w = 1.1, d = 0.9, zc0 = ZR - 2.2, zc1 = ZR + 1.6;
  const C = [[ch[0] - w, ch[1] - d], [ch[0] + w, ch[1] - d], [ch[0] + w, ch[1] + d], [ch[0] - w, ch[1] + d]];
  for (let i = 0; i < 4; i++) { const a = C[i], b = C[(i + 1) % 4]; quad([...a, zc0], [...b, zc0], [...b, zc1], [...a, zc1], 10); }
  quad([...C[0], zc1], [...C[1], zc1], [...C[2], zc1], [...C[3], zc1], 30);
  return T;
}

/**
 * Zona real: alrededor del Hotel La Fontana, la plazoleta, Unicentro y las manzanas
 * de enfrente se muestra la captura 3D real (fotogrametría de Google), sin volúmenes
 * genéricos encima. Rectángulo en metros ENU respecto al origen del proyecto.
 */
export const ZONA = { x0: -400, y0: -205, x1: 125, y1: 470 };
export const enZona = (x, y) => x > ZONA.x0 && x < ZONA.x1 && y > ZONA.y0 && y < ZONA.y1;

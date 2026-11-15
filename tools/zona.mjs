/**
 * Zona donde se deja la captura 3D de Google en vez del modelo (rectángulo ENU en metros).
 * Vacía: todo el ámbito del proyecto va modelado (volúmenes, vías y vegetación propios).
 */
export const ZONA = { x0: 0, y0: 0, x1: 0, y1: 0 };
export const enZona = (x, y) => x > ZONA.x0 && x < ZONA.x1 && y > ZONA.y0 && y < ZONA.y1;

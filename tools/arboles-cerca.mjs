/** Zona de árboles 3D reales alrededor del Hotel La Fontana (ENU, metros). */
export const HOTEL = [-235, 320];
export const RADIO = 650;
const SP3D = new Set(['island_tree_01', 'island_tree_02', 'island_tree_03', 'jacaranda_tree', 'tree_small_02']);
export const cerca3d = (e, n) => Math.hypot(e - HOTEL[0], n - HOTEL[1]) < RADIO;
/** ¿Esta instancia de Unreal la dibuja un árbol 3D (y no el impostor)? */
export const es3d = (ue, e, n) => SP3D.has(ue) && cerca3d(e, n);
/** Especie 3D que representa a cada especie de Unreal. */
export function sustituto(ue, i) {
  if (ue === 'island_tree_01' || ue === 'island_tree_02' || ue === 'jacaranda_tree') return ue;
  return (i / 6) % 2 ? 'island_tree_01' : 'island_tree_02';
}

/**
 * Configuración del sitio.
 *
 * Georreferencia derivada cruzando la geometría del modelo (Unreal, metros,
 * +X = Este, +Y = Norte) con las coordenadas reales de OSM:
 *   Unicentro Bogotá     4.7021592, -74.0412813
 *   Hotel La Fontana     4.7046687, -74.0435171
 * El hotel queda en el modelo a (-233, +331) m del origen, y en la realidad
 * a (-248, +279) m del centro del centro comercial: mismo cuadrante y misma
 * escala, así que el origen del modelo se ancla en el centro del centro comercial.
 */
export interface SiteConfig {
  latitude: number; longitude: number; height: number; headingOffset: number;
  verticalOffset: number; views: Record<string, { range: number; pitch: number; heading: number }>;
}

export const SITE: SiteConfig = {
  /** Origen del modelo (centro del conjunto) */
  latitude: 4.7021951,
  longitude: -74.0413210,
  /** Altitud de referencia; se corrige con el terreno al cargar */
  height: 2565,
  /** Giro adicional si la malla no está alineada al norte real (grados) */
  headingOffset: 0,
  /** El modelo se eleva levemente para no pelear con el terreno de Google */
  verticalOffset: 0.4,
  /** Encuadres de cámara (metros) */
  views: {
    aerial: { range: 1150, pitch: -0.62, heading: 0.62 },
    pedestrian: { range: 34, pitch: -0.045, heading: 0.9 },
    general: { range: 1750, pitch: -0.52, heading: 0.5 },
  },
};

export const ASSETS = {
  model: 'models/unicentro-cesium.glb',
  googleTiles:
    'https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4',
  /** Token de Cesium ion del propio proyecto Unreal (terreno + imagen satelital) */
  ionToken:
    'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFUNkhDMjZ6M2M3QURxcTM5OHV4bmxuN2hpQVdEb19LS0RxZFVIcHpoV0UifQ.eyJub25jZSI6Ik9weGdlVVFTd1BGZjlZR04iLCJqdGkiOiJhNTVkMjU4MS02YTU4LTQ4OGUtODE2Mi1kMjg3MWM5YmY2NjYiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21leiIsImlzcyI6Imh0dHBzOi8vYXBpLmNlc2l1bS5jb20iLCJjbGllbnRfaWQiOjE5MCwiYXVkIjoiQXBwIFRva2VuIGZvciBDZXNpdW0gZm9yIFVucmVhbCIsImlhdCI6MTc5Mzk4MzE1Mn0._vVcFXQr9Qza5ZqnUNsTwN6aO5Au0ZE7C4g8Mo4bhTBIa76SwQ_pTPl1fAKrysZBx1gsJIs9EJAeD9xQ3iSDpQ',
} as const;

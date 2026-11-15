/**
 * Configuración del sitio.
 *
 * Georreferencia derivada cruzando la geometría del modelo (Unreal, metros,
 * +X = Este, +Y = Norte) con las coordenadas reales de OSM:
 *   Unicentro Bogotá     4.7021592, -74.0412813
 *   Hotel La Fontana     4.7046687, -74.0435171
 * El hotel cae en el modelo a (-233, +331) m del origen y en la realidad a
 * (-248, +279) m del centro comercial: mismo cuadrante y misma escala, así que
 * el origen del modelo se ancla en el centro del centro comercial.
 */
export interface SiteConfig {
  latitude: number;
  longitude: number;
  height: number;
  headingOffset: number;
  verticalOffset: number;
  views: Record<string, { range: number; pitch: number; heading: number }>;
}

export const SITE: SiteConfig = {
  latitude: 4.7021951,
  longitude: -74.041321,
  /** Altitud real de Unicentro (se refina con el terreno al cargar) */
  height: 2565,
  /** Giro adicional si la malla no está alineada al norte real (grados) */
  headingOffset: 0,
  /** El modelo se eleva levemente para no pelear con el terreno */
  verticalOffset: 0.4,
  views: {
    aerial: { range: 900, pitch: -0.58, heading: -1.42 },
    pedestrian: { range: 30, pitch: -0.03, heading: -1.0 },
    general: { range: 1900, pitch: -0.5, heading: -1.52 },
  },
};

export const ASSETS = {
  model: 'models/unicentro-cesium.glb',
  /** Mismo dataset que el proyecto Unreal: Imágenes 3D de Google */
  googleTiles:
    'https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4',
  /** Token de Cesium ion: terreno mundial y ortoimagen */
  ionToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts',
  /** Bing Maps Aerial de Cesium ion */
  imageryAssetId: 2,
} as const;

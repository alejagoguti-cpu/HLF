/**
 * Configuración del sitio.
 *
 * Georreferencia: la misma del proyecto Unreal (actor CesiumGeoreference_UNICENTRO).
 * El origen del mundo de Unreal (0,0,0) es este punto; +X = Este, +Y = Sur, +Z = arriba.
 * Todas las secciones GLB están en metros ENU respecto a este origen.
 */
export const GEO = {
  longitude: -74.04145021,
  latitude: 4.70207636,
  /** altura elipsoidal del origen (2549 m s. n. m. + 23 m de geoide) */
  height: 2572,
} as const;

/** Puntos de interés en metros ENU (este, norte, altura sobre el origen) */
export const PLACES = {
  hotel: { name: 'Hotel La Fontana', e: -236, n: 330, u: 18 },
  unicentro: { name: 'Unicentro', e: 10, n: 0, u: 14 },
} as const;

export const VIEWS = {
  general: { place: 'hotel', range: 1250, pitch: -0.52, heading: 0.55 },
  aerial: { place: 'hotel', range: 420, pitch: -0.62, heading: 2.35 },
  arch: { place: 'hotel', range: 210, pitch: -0.2, heading: 3.35 },
} as const;

export const ASSETS = {
  secciones: 'secciones/',
  /** Mismo dataset que el proyecto Unreal: Imágenes 3D de Google */
  googleTiles:
    'https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyCF2MXjc0DYRFrHk7j_BCyxVpWOdYqDIC4',
  /** Token de Cesium ion: terreno mundial y ortoimagen */
  ionToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImF2ZnN2RnJVaUNyUzJBMUUiLCJqdGkiOiJjY2I2YjZkYy00MzVlLTRkN2QtOWE1OC1kYjc3ODgxNTIwZTMiLCJpZCI6NTE4MTQ4LCJzdWIiOiJhbGVqYW5kcmFnb21lemciLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiVW50aXRsZWQiLCJpYXQiOjE3OTQxMDYyMjF9.ZiqV9XpE9kYg8-lutOYpMnZxhtiKBPlZHpv2Eg983ts',
  imageryAssetId: 2,
} as const;

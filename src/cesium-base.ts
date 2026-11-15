/**
 * Cesium resuelve Workers/Assets/ThirdParty en tiempo de ejecución.
 * Este módulo se importa antes que "cesium" para fijar la base.
 */
const raw = import.meta.env.BASE_URL || '/';
const base = raw.endsWith('/') ? raw : raw + '/';

// En desarrollo Vite sirve node_modules; en producción los copia tools/copy-cesium.mjs
const url = import.meta.env.DEV ? '/node_modules/cesium/Build/Cesium/' : base + 'cesium/';

(window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL = url;

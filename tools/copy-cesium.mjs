import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const src = 'node_modules/cesium/Build/Cesium';
const dst = 'docs/cesium';

if (!existsSync(dst)) mkdirSync(dst, { recursive: true });

for (const dir of ['Workers', 'Assets', 'ThirdParty', 'Widgets']) {
  cpSync(join(src, dir), join(dst, dir), { recursive: true });
}
console.log('Cesium runtime copiado a dist/cesium');

// Misma vista que la captura del usuario, con el número de cada bloque del hotel y el Revit oculto.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true', { timeout: 300000, polling: 500 });
await page.evaluate((cam) => {
  const d = window.__DBG__; d.lock = true; const C = d.Cesium;
  d.getRevit()?.hide(); d.getSite().setRevitZone(null);
  for (const b of d.getSite().buildings.filter((x) => x.s === 'Hotel')) {
    d.viewer.entities.add({ position: d.enuToWorld((b.bb[0] + b.bb[2]) / 2, (b.bb[1] + b.bb[3]) / 2, b.b + b.h + 4),
      label: { text: String(b.id), font: 'bold 22px sans-serif', fillColor: C.Color.YELLOW, outlineColor: C.Color.BLACK, outlineWidth: 4, style: C.LabelStyle.FILL_AND_OUTLINE, disableDepthTestDistance: 1e9 } });
  }
  d.cam.flyTo({ pivot: d.enuToWorld(cam.e, cam.n, cam.u), heading: cam.h, pitch: cam.p, range: cam.r }, 0);
}, JSON.parse(process.argv[2]));
await new Promise((r) => setTimeout(r, 9000));
await page.screenshot({ path: process.argv[3], type: 'jpeg', quality: 85 });
await browser.close();

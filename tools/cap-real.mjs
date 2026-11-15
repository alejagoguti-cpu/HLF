// Captura la fotogrametría real de Google (sin recorte, sin modelo) como referencia. Uso: node tools/cap-real.mjs out camJson
import puppeteer from 'puppeteer-core';
const out = process.argv[2]; const c = JSON.parse(process.argv[3]);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 500 });
await page.evaluate((c) => {
  const d = window.__DBG__; d.lock = true; d.setQuality(1);
  const s = d.getSite(); s.tileset.clippingPolygons.enabled = false; s.tileset.maximumScreenSpaceError = 4; s.tileset.customShader = undefined;
  const p = d.viewer.scene.primitives; for (let i = 0; i < p.length; i++) if (p.get(i) !== s.tileset) p.get(i).show = false;
  d.viewer.scene.postProcessStages.ambientOcclusion.enabled = false;
  d.cam.flyTo({ pivot: d.enuToWorld(c.e, c.n, c.u), heading: c.heading, pitch: c.pitch, range: c.range }, 0);
  document.querySelectorAll('.dock,.brand,.clock,#hint,#status').forEach((e) => (e.style.display = 'none'));
}, c);
await new Promise((r) => setTimeout(r, Number(process.argv[4] || 30000)));
await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
await browser.close(); console.log('ok', out);

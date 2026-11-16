// Graba cuadros de la milhoja (tiempo ralentizado) para la portada animada.
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
mkdirSync('build/milhoja', { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 600000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1280,720'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 15000));
await page.evaluate(() => {
  const d = window.__DBG__; d.lock = true; d.select(null);
  for (const s of ['.dock', '.brand', '.clock', '#hint', '#status', '.tiempo', '.pisos', '#card', '.look-toggle', '.cesium-widget-credits']) document.querySelectorAll(s).forEach((e) => (e.style.display = 'none'));
  const c = d.getRevit().caja;
  d.cam.flyTo({ pivot: d.enuToWorld((c[0] + c[2]) / 2, (c[1] + c[3]) / 2, 13), heading: 0.62, pitch: -0.3, range: 150 }, 0);
});
await new Promise((r) => setTimeout(r, 9000));
// tiempo ralentizado 8 veces: cada captura cae en un instante preciso de la animación
await page.evaluate(() => {
  const real = performance.now.bind(performance); const t0 = real();
  performance.now = () => t0 + (real() - t0) / 11;
  window.__DBG__.getRevit().hide();
  window.__DBG__.playRevit();
});
const N = 110;
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  await page.screenshot({ path: `build/milhoja/f${String(i).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 86 });
  await new Promise((r) => setTimeout(r, 20));
}
console.log('cuadros', N, 'segundos reales', (Date.now() - t0) / 1000);
await browser.close();

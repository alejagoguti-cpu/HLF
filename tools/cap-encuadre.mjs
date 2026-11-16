// Prueba encuadres fijos (sin animación de llegada) para calcar una captura de referencia
import puppeteer from 'puppeteer-core';
const C = JSON.parse(process.argv[2]);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1917,910'] });
const page = await browser.newPage();
await page.setViewport({ width: 1917, height: 910 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 20000));
for (const [i, c] of C.entries()) {
  await page.evaluate((c) => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(c.e, c.n, c.u), heading: c.h, pitch: c.p, range: c.r }, 0); }, c);
  await new Promise((r) => setTimeout(r, 4000));
  await page.screenshot({ path: `shots/enc_${i}.jpg`, type: 'jpeg', quality: 60 });
}
await browser.close();

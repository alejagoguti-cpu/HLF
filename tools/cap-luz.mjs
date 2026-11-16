// Transición + apilado + reloj del día y clima.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') msgs.push(m.text().slice(0, 200)); });
const t0 = Date.now();
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 100 });
const telon = (Date.now() - t0) / 1000;
const tr = Date.now();
const fps = [];
for (const [i, t] of [[1, 2500], [2, 6000], [3, 8000], [4, 9500], [5, 13500]]) {
  const w = t - (Date.now() - tr); if (w > 0) await new Promise((r) => setTimeout(r, w));
  await page.screenshot({ path: `shots/z${i}.jpg`, type: 'jpeg', quality: 80 });
  fps.push(await page.evaluate(() => window.__FPS__));
}
const set = async (h, clima) => {
  await page.evaluate((h, clima) => {
    const r = document.querySelector('.tiempo input'); r.value = String(h); r.dispatchEvent(new Event('input'));
    if (clima) document.querySelector(`[data-clima="${clima}"]`).click();
  }, h, clima);
  await new Promise((r) => setTimeout(r, 2500));
};
await set(7.0, 'sol'); await page.screenshot({ path: 'shots/h07.jpg', type: 'jpeg', quality: 80 });
await set(17.3); await page.screenshot({ path: 'shots/h17.jpg', type: 'jpeg', quality: 80 });
await set(19.6); await page.screenshot({ path: 'shots/h19.jpg', type: 'jpeg', quality: 80 });
await set(11.0, 'lluvia'); await page.screenshot({ path: 'shots/h11_lluvia.jpg', type: 'jpeg', quality: 80 });
await set(11.0, 'nublado'); await page.screenshot({ path: 'shots/h11_nublado.jpg', type: 'jpeg', quality: 80 });
console.log(JSON.stringify({ telon_s: telon, fps, errores: [...new Set(msgs)].slice(0, 6) }));
await browser.close();

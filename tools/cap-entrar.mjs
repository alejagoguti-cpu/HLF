// Portada -> Entrar -> transición; luego esquina oeste, marcos y filtros.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 200)));
const t0 = Date.now();
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 4000));
await page.screenshot({ path: 'shots/x0_portada.jpg', type: 'jpeg', quality: 80 });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
const carga = (Date.now() - t0) / 1000;
await page.screenshot({ path: 'shots/x1_listo.jpg', type: 'jpeg', quality: 80 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 13500));
await page.screenshot({ path: 'shots/x2_llegada.jpg', type: 'jpeg', quality: 80 });
const vista = async (n, c) => { await page.evaluate((c) => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(c.e, c.n, c.u), heading: c.h, pitch: c.p, range: c.r }, 0); }, c); await new Promise((r) => setTimeout(r, 6000)); await page.screenshot({ path: `shots/${n}.jpg`, type: 'jpeg', quality: 82 }); };
await page.evaluate(() => { const r = document.querySelector('.tiempo .play'); if (r.textContent.includes('❚')) r.click(); const g = document.querySelector('.tiempo input'); g.value = '10.3'; g.dispatchEvent(new Event('input')); });
await vista('x3_esquina', { e: -250, n: 276, u: 14, h: 0.75, p: -0.2, r: 70 });
await vista('x4_marcos', { e: -214, n: 270, u: 12, h: 0.1, p: -0.1, r: 42 });
for (const f of ['natural', 'calido', 'cine']) {
  await page.evaluate((f) => { const s = document.querySelector('.tiempo select'); s.value = f; s.dispatchEvent(new Event('change')); }, f);
  await vista('x5_' + f, { e: -225, n: 290, u: 12, h: 0.5, p: -0.4, r: 230 });
}
console.log(JSON.stringify({ carga_s: carga, errores: msgs }));
await browser.close();

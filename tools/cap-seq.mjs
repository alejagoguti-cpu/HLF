// Secuencia: selecciona el hotel y captura la animación; luego tarde y noche.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') msgs.push(m.type() + ': ' + m.text().slice(0, 200)); });
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 200)));
page.on('response', (r) => { if (r.status() >= 400) msgs.push(r.status() + ' ' + r.url().slice(0, 120)); });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true', { timeout: 300000, polling: 500 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = (n) => page.screenshot({ path: `shots/${n}.jpg`, type: 'jpeg', quality: 86 });
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(-236, 330, 18), heading: 3.35, pitch: -0.38, range: 290 }, 0); });
await sleep(14000);
await page.evaluate(() => { const d = window.__DBG__; const b = d.getSite().buildings.find((x) => x.s === 'Hotel'); d.select(b); });
await sleep(3300); await shot('s1_hotel_pisos');
await sleep(4500); await shot('s2_hotel_completo');
await page.evaluate(() => { const d = window.__DBG__; d.select(null); d.cam.flyTo({ pivot: d.enuToWorld(-120, 200, 6), heading: 0.9, pitch: -0.32, range: 150 }, 0); });
await sleep(6000); await shot('s3_via_carros');
await page.evaluate(() => { const d = window.__DBG__; d.cam.flyTo({ pivot: d.enuToWorld(-236, 330, 18), heading: 2.2, pitch: -0.22, range: 420 }, 0); document.querySelector('[data-light="tarde"]').click(); });
await sleep(7000); await shot('s4_tarde');
await page.evaluate(() => document.querySelector('[data-light="noche"]').click());
await sleep(7000); await shot('s5_noche');
console.log(JSON.stringify({ fps: await page.evaluate(() => window.__FPS__), msgs: [...new Set(msgs)].slice(0, 12) }));
await browser.close();

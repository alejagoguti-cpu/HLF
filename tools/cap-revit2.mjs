// Prueba como usuario: botón "Hotel" del menú -> apilado; luego acercamiento a fachada y cubierta.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = [];
page.on('console', (m) => { if (m.type() === 'error') msgs.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 200)));
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 500 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = (n) => page.screenshot({ path: `shots/${n}.jpg`, type: 'jpeg', quality: 86 });
await sleep(1500);
await page.click('[data-place="hotel"]');           // inmediatamente, sin esperar a que cargue todo
await sleep(4200); await shot('t1_boton_hotel');
await sleep(7000); await shot('t2_completo');
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(-205, 268, 14), heading: 0.25, pitch: -0.18, range: 62 }, 0); });
await sleep(7000); await shot('t3_fachada');
console.log(JSON.stringify({ revit: await page.evaluate(() => !!window.__DBG__.getRevit()?.visible), panel: await page.evaluate(() => !document.querySelector('.pisos')?.hidden), msgs: [...new Set(msgs)].slice(0, 8) }));
await browser.close();

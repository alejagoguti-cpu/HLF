// Mide cuánto tarda en levantarse el telón y captura la milhoja.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 160)));
const t0 = Date.now();
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 100 });
const tReady = (Date.now() - t0) / 1000;
for (const [i, t] of [[1, 7600], [2, 8900], [3, 10200], [4, 14000]]) { const w = t - (Date.now() - t0 - tReady * 1000); if (w > 0) await new Promise((r) => setTimeout(r, w)); await page.screenshot({ path: `shots/m${i}.jpg`, type: 'jpeg', quality: 80 }); }
console.log(JSON.stringify({ telon_s: tReady, errores: msgs }));
await browser.close();

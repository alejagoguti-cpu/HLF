// Vista del usuario + planta: Revit completo en su sitio y el resto del hotel intacto.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 160)));
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true && !!window.__DBG__.getRevit()', { timeout: 300000, polling: 500 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.playRevit(); });
await sleep(1800);
await page.evaluate(() => { const d = window.__DBG__; d.cam.flyTo({ pivot: d.enuToWorld(-214, 284, 12), heading: 0.5, pitch: -0.42, range: 210 }, 0); });
await sleep(1500); await page.screenshot({ path: 'shots/c_anim.jpg', type: 'jpeg', quality: 84 });
await sleep(7000); await page.screenshot({ path: 'shots/c_vista.jpg', type: 'jpeg', quality: 84 });
await page.evaluate(() => { const d = window.__DBG__; d.cam.flyTo({ pivot: d.enuToWorld(-230, 300, 12), heading: 0, pitch: -1.55, range: 230 }, 0); });
await sleep(7000); await page.screenshot({ path: 'shots/c_planta.jpg', type: 'jpeg', quality: 84 });
console.log(JSON.stringify({ errores: msgs }));
await browser.close();

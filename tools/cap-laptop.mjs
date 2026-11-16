// Portada -> Entrar -> transición; luego esquina oeste, marcos y filtros.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1229,650'] });
const page = await browser.newPage();
await page.setViewport({ width: 1229, height: 650, deviceScaleFactor: 1.25 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 200)));
const t0 = Date.now();
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 4000));
await page.screenshot({ path: 'shots/l0_portada.jpg', type: 'jpeg', quality: 80 });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
const carga = (Date.now() - t0) / 1000;
await page.screenshot({ path: 'shots/l1_listo.jpg', type: 'jpeg', quality: 80 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 13500));
await page.screenshot({ path: 'shots/l2_llegada.jpg', type: 'jpeg', quality: 80 });
await browser.close();

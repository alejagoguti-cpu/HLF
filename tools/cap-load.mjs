// Como un visitante: abre la página y captura lo que ve al levantarse el telón y durante el apilado.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = []; page.on('pageerror', (e) => msgs.push(e.message.slice(0, 160)));
page.on('console', (m) => { if (m.type() === 'error') msgs.push(m.text().slice(0, 160)); });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 200 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(1600); await page.screenshot({ path: 'shots/L1.jpg', type: 'jpeg', quality: 84 });
await sleep(1800); await page.screenshot({ path: 'shots/L2.jpg', type: 'jpeg', quality: 84 });
await sleep(6000); await page.screenshot({ path: 'shots/L3.jpg', type: 'jpeg', quality: 84 });
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(-214, 262, 12), heading: 0.15, pitch: -0.12, range: 48 }, 0); });
await sleep(6000); await page.screenshot({ path: 'shots/L4_cerca.jpg', type: 'jpeg', quality: 86 });
console.log(JSON.stringify({ errores: [...new Set(msgs)].slice(0, 6) }));
await browser.close();

// Secuencia del hotel de Revit: cenital de alineación, apilado y apertura en un piso.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = [];
page.on('console', (m) => { if (m.type() === 'error') msgs.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 200)));
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true && !!window.__DBG__.getRevit()', { timeout: 300000, polling: 500 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = (n) => page.screenshot({ path: `shots/${n}.jpg`, type: 'jpeg', quality: 86 });
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; const b = d.getSite().buildings.find((x) => x.s === 'Hotel'); d.select(b); });
await sleep(3200); await shot('r1_apilando');
await sleep(6500); await shot('r2_completo');
await page.evaluate(() => { const d = window.__DBG__; d.cam.flyTo({ pivot: d.enuToWorld(-214, 284, 14), heading: 0, pitch: -1.55, range: 190 }, 0); });
await sleep(5000); await shot('r3_cenital');
await page.evaluate(() => { [...document.querySelectorAll('.pisos button')].find((b) => b.textContent.startsWith('Piso 2')).click(); });
await sleep(6500); await shot('r4_piso2');
console.log(JSON.stringify({ fps: await page.evaluate(() => window.__FPS__), msgs: [...new Set(msgs)].slice(0, 8) }));
await browser.close();

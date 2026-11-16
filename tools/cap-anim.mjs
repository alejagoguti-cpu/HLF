// Cuadros de la animación de apilado (modelo Revit) con el sitio ya cargado.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true && !!window.__DBG__.getRevit()', { timeout: 300000, polling: 500 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(-214, 284, 12), heading: 0.5, pitch: -0.42, range: 210 }, 0); });
await sleep(9000);
await page.evaluate(() => window.__DBG__.playRevit());
let prev = 0; for (const [i, t] of [[1, 1200], [2, 2600], [3, 4000], [4, 8500]]) { await sleep(t - prev); prev = t; await page.screenshot({ path: `shots/a${i}.jpg`, type: 'jpeg', quality: 82 }); }
const info = await page.evaluate(() => { const p = window.__DBG__.viewer.scene.primitives; const names = []; for (let i = 0; i < p.length; i++) { const m = p.get(i); const u = m?._resource?.url ?? m?._url ?? m?.basePath ?? ''; if (u && /hotel|revit|cubierta|plazoleta/i.test(String(u))) names.push(String(u).split('/').pop() + (m.show ? '' : ' (oculto)')); } return names; });
console.log(JSON.stringify(info));
await browser.close();

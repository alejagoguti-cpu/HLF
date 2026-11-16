// Vista del usuario y acercamiento a la junta trasera de cubiertas.
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true', { timeout: 300000, polling: 300 });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(9000);
for (const [name, c] of Object.entries(JSON.parse(process.argv[2]))) {
  await page.evaluate((c) => { const d = window.__DBG__; d.lock = true; d.cam.flyTo({ pivot: d.enuToWorld(c.e, c.n, c.u), heading: c.h, pitch: c.p, range: c.r }, 0); }, c);
  await sleep(6000);
  await page.screenshot({ path: `shots/${name}.jpg`, type: 'jpeg', quality: 86 });
}
await browser.close();

// Entrar -> fotos a lo largo de la llegada para ver que la milhoja arranca con la cámara quieta
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
const t0 = Date.now();
for (const s of [8, 11, 13, 15, 18]) {
  await new Promise((r) => setTimeout(r, Math.max(0, s * 1000 - (Date.now() - t0))));
  await page.screenshot({ path: `shots/ll_${s}.jpg`, type: 'jpeg', quality: 70 });
}
await browser.close();

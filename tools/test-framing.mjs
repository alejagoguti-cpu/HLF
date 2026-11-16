import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900']
});
const page = await browser.newPage();
await page.setCacheEnabled(false);
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 14000));

await page.evaluate(() => {
  const d = window.__DBG__;
  d.lock = true;
  const revit = d.getRevit();
  if (revit) revit.openAt(1);
  const pivot = d.enuToWorld(-222, 278, 12);
  d.cam.flyTo({ pivot, heading: 0.1928, pitch: -1.55, range: 105 }, 0);
});

await new Promise((r) => setTimeout(r, 5000));
await page.screenshot({ path: 'shots/piso2_encuadrado.jpg', type: 'jpeg', quality: 85 });
console.log('Saved: piso2_encuadrado.jpg');
await browser.close();

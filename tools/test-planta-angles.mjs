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

const snap = async (name, pivotE, pivotN, heading, range) => {
  await page.evaluate((c) => {
    const d = window.__DBG__;
    d.lock = true;
    const revit = d.getRevit();
    if (revit) revit.openAt(1);
    const pivot = d.enuToWorld(c.e, c.n, 12);
    d.cam.flyTo({ pivot, heading: c.h, pitch: -1.55, range: c.r }, 0);
  }, { e: pivotE, n: pivotN, h: heading, r: range });
  await new Promise((r) => setTimeout(r, 4000));
  await page.screenshot({ path: `shots/${name}.jpg`, type: 'jpeg', quality: 85 });
  console.log('Saved:', name);
};

// Test A: North up (heading 0), shifted right to clear panel
await snap('planta_north', -205, 275, 0.0, 92);

// Test B: Aligned with main corridor (heading ~0.38)
await snap('planta_axis', -205, 275, 0.38, 88);

// Test C: Aligned with building rotation 11.05 deg (heading 0.193)
await snap('planta_11deg', -205, 275, 0.193, 88);

await browser.close();

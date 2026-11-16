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

// Click hotel or trigger revit
await page.evaluate(() => {
  const d = window.__DBG__;
  // Let's see what is on window or click on hotel
});

await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: 'shots/piso2_test.jpg', type: 'jpeg', quality: 85 });
await browser.close();

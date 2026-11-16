import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900']
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900 });

await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
await new Promise(r => setTimeout(r, 12000));

// Clic en vista Aérea
await page.click('#btnAerial');
await new Promise(r => setTimeout(r, 4000));

const shotPath = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/hlf_current_aerial.jpg';
await page.screenshot({ path: shotPath, quality: 90, type: 'jpeg' });
console.log('Saved aerial screenshot:', shotPath);

// Clic en vista General
await page.click('#btnHome');
await new Promise(r => setTimeout(r, 4000));

const shotPath2 = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/hlf_current_general.jpg';
await page.screenshot({ path: shotPath2, quality: 90, type: 'jpeg' });
console.log('Saved general screenshot:', shotPath2);

await browser.close();

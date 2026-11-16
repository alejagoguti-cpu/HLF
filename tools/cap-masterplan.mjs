import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900']
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900 });

console.log('Navigating to http://127.0.0.1:4173/HLF/ ...');
await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });

console.log('Clicking btnEntrar...');
await page.click('#btnEntrar');
await new Promise(r => setTimeout(r, 12000));

// Aerial view
console.log('Switching to aerial view...');
await page.click('#btnAerial');
await new Promise(r => setTimeout(r, 5000));

const outAerial = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/hlf_masterplan_aerial.jpg';
await page.screenshot({ path: outAerial, quality: 92, type: 'jpeg' });
console.log('Saved aerial to', outAerial);

// General view
console.log('Switching to general view...');
await page.click('#btnHome');
await new Promise(r => setTimeout(r, 5000));

const outGen = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/hlf_masterplan_general.jpg';
await page.screenshot({ path: outGen, quality: 92, type: 'jpeg' });
console.log('Saved general to', outGen);

await browser.close();
console.log('All screenshots captured successfully!');

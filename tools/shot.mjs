import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://127.0.0.1:4173/HLF/';
const out = process.argv[3] || 'shots/shot.png';
const mode = process.argv[4] || '';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=gl',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
    '--window-size=1600,900',
    '--hide-scrollbars',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

const msgs = [];
page.on('console', (m) => msgs.push(`${m.type()}: ${m.text()}`.slice(0, 400)));
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 400)));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

await page
  .waitForFunction('window.__READY__ === true || window.__LOAD_ERROR__', { timeout: 300000, polling: 500 })
  .catch(() => msgs.push('timeout esperando __READY__'));

if (mode === 'night') {
  await page.evaluate(() => document.querySelector('[data-light="noche"]')?.click());
} else if (mode === 'tarde') {
  await page.evaluate(() => document.querySelector('[data-light="tarde"]')?.click());
}

// deja asentar el stream de tiles y la amortiguación de cámara
await new Promise((r) => setTimeout(r, 14000));

await page.screenshot({ path: out });

const info = await page.evaluate(() => ({
  ready: !!window.__READY__,
  err: window.__LOAD_ERROR__ || null,
  label: document.getElementById('loadLabel')?.textContent ?? null,
}));

console.log(JSON.stringify({ info, msgs: msgs.slice(-18) }, null, 1));
await browser.close();

import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const t0 = Date.now(); const log = []; let last = '';
const reqs = new Map();
page.on('requestfinished', (r) => { const u = r.url(); if (/secciones|tile\.googleapis|assets/.test(u)) { const t = (Date.now() - t0) / 1000; reqs.set(u.split('/').pop().split('?')[0], t); } });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
while (Date.now() - t0 < 120000) {
  const s = await page.evaluate(() => (document.getElementById('loadLabel')?.textContent || '') + ' | ' + (window.__READY__ ? 'READY' : ''));
  if (s !== last) { log.push(((Date.now() - t0) / 1000).toFixed(1) + 's ' + s); last = s; }
  if (s.includes('READY')) break;
  await new Promise((r) => setTimeout(r, 250));
}
console.log(log.join('\n'));
console.log('secciones descargadas (s):', [...reqs].filter(([k]) => /glb|json|webp/.test(k)).map(([k, t]) => k + '@' + t.toFixed(0)).join(' '));
await browser.close();

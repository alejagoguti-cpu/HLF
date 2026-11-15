import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000, args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1200,1200'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!!window.__AERIAL_URL__', { timeout: 300000, polling: 500 });
await page.evaluate(() => { document.body.innerHTML = ''; const i = new Image(); i.src = window.__AERIAL_URL__; i.style.cssText = 'position:fixed;inset:0;width:1200px;height:1200px;z-index:99999'; document.body.appendChild(i); return new Promise((r) => (i.onload = r)); });
await page.screenshot({ path: 'shots/aerial.jpg', type: 'jpeg', quality: 85 });
await browser.close(); console.log('ok');

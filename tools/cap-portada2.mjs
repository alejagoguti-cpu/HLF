import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox', '--window-size=1600,900'] });
const page = await browser.newPage(); await page.setViewport({ width: 1600, height: 900 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
for (const [i, t] of [[1, 2500], [2, 4500]]) { await new Promise((r) => setTimeout(r, i === 1 ? t : 2000)); await page.screenshot({ path: `shots/pm${i}.jpg`, type: 'jpeg', quality: 80 }); }
await browser.close(); console.log('ok');

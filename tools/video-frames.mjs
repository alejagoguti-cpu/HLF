// Extrae cuadros de un video (sin ffmpeg): lo reproduce en Chrome y captura. Uso: node tools/video-frames.mjs <mp4> <n>
import puppeteer from 'puppeteer-core';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const file = resolve(process.argv[2]); const n = Number(process.argv[3] || 8);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox', '--allow-file-access-from-files', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto(pathToFileURL(file).href);
const dur = await page.evaluate(() => new Promise((r) => { const v = document.querySelector('video'); v.pause(); v.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;object-fit:contain;background:#000'; v.controls = false; if (v.readyState >= 1) r(v.duration); else v.onloadedmetadata = () => r(v.duration); }));
console.log('duración', dur.toFixed(1), 's');
for (let i = 0; i < n; i++) {
  const t = (dur * (i + 0.5)) / n;
  await page.evaluate((t) => new Promise((r) => { const v = document.querySelector('video'); v.onseeked = () => r(); v.currentTime = t; }), t);
  await new Promise((r) => setTimeout(r, 250));
  await page.screenshot({ path: `shots/ref_${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 80 });
}
await browser.close();

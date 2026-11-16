// Foto nocturna para la portada (sin interfaz). Uso: node tools/cap-portada.mjs out.jpg heading pitch range
import puppeteer from 'puppeteer-core';
const [out, h, p, r] = [process.argv[2] || 'public/portada.jpg', +(process.argv[3] ?? 0.45), +(process.argv[4] ?? -0.38), +(process.argv[5] ?? 620)];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__READY__ === true && !!window.__DBG__.getRevit()', { timeout: 300000, polling: 300 });
await new Promise((res) => setTimeout(res, 16000)); // termina la transición y el apilado
await page.evaluate((h, p, r) => {
  const d = window.__DBG__; d.lock = true;
  const rg = document.querySelector('.tiempo input'); rg.value = '19.65'; rg.dispatchEvent(new Event('input'));
  d.select(null);
  d.cam.flyTo({ pivot: d.enuToWorld(-232, 318, 14), heading: h, pitch: p, range: r }, 0);
  for (const s of ['.dock', '.brand', '.clock', '#hint', '#status', '.tiempo', '.pisos', '#card', '.look-toggle', '.cesium-widget-credits']) document.querySelectorAll(s).forEach((e) => (e.style.display = 'none'));
}, h, p, r);
await page.waitForFunction('window.__DBG__.getSite().tileset ? true : true');
await new Promise((res) => setTimeout(res, 14000));
await page.screenshot({ path: out, type: 'jpeg', quality: 88 });
await browser.close(); console.log('ok', out);

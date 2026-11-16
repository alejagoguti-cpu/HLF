import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

await page.goto(process.env.URL || 'http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 120000 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 14000));

// Vista cercana al acceso principal exactamente como en la foto del usuario
await page.evaluate(() => {
  const d = window.__DBG__;
  if (!d) return;
  if (typeof d.playRevit === 'function') d.playRevit();
  d.lock = true;
  // Vista clara y despejada del acceso sin ramas en el medio
  d.cam.flyTo({
    pivot: d.enuToWorld(-221, 276, 5.5),
    heading: 5.65,
    pitch: -0.26,
    range: 20,
  }, 0);
});

await new Promise((r) => setTimeout(r, 4000));
await page.screenshot({ path: 'shots/acceso_nuevo.jpg', type: 'jpeg', quality: 85 });
console.log('Captura guardada en shots/acceso_nuevo.jpg');
await browser.close();

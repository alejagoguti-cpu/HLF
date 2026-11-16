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

const msgs = [];
page.on('pageerror', (e) => msgs.push(e.message.slice(0, 200)));
page.on('console', (msg) => {
  if (msg.type() === 'error') msgs.push(msg.text().slice(0, 200));
});

await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });
await page.click('#btnEntrar');
await new Promise((r) => setTimeout(r, 14000));

const vista = async (n, c) => {
  await page.evaluate((c) => {
    const d = window.__DBG__;
    d.lock = true;
    d.cam.flyTo({ pivot: d.enuToWorld(c.e, c.n, c.u), heading: c.h, pitch: c.p, range: c.r }, 0);
  }, c);
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({ path: `shots/${n}.jpg`, type: 'jpeg', quality: 85 });
  console.log('Captura guardada:', `shots/${n}.jpg`);
};

// 1. Vista similar a la captura del usuario (ángulo elevado desde el norte)
await vista('clinica127_aerea', { e: -325, n: 210, u: 20, h: 3.3, p: -0.38, r: 85 });

// 2. Vista a nivel de calle (Street View) mirando hacia arriba la fachada principal
await vista('clinica127_calle', { e: -325, n: 215, u: 15, h: 3.25, p: -0.12, r: 48 });

// 3. Vista cercana del acceso y marquesina
await vista('clinica127_acceso', { e: -325, n: 214, u: 6, h: 3.2, p: -0.08, r: 25 });

console.log('Errores:', msgs);
await browser.close();

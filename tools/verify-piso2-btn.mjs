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

console.log('Navigating to http://127.0.0.1:4173/HLF/ ...');
await page.goto('http://127.0.0.1:4173/HLF/', { waitUntil: 'domcontentloaded' });

await page.waitForFunction('!document.getElementById("btnEntrar").disabled', { timeout: 300000, polling: 300 });

console.log('Clicking btnEntrar...');
await page.click('#btnEntrar');

// Esperar 12 segundos a que el autoplay inicial termine
await new Promise(r => setTimeout(r, 12000));

// Verificar que existe #btnPiso2
const btnExists = await page.evaluate(() => {
  const b = document.getElementById('btnPiso2');
  return b ? b.textContent : null;
});
console.log('Button text:', btnExists);

// Clic en #btnPiso2
console.log('Clicking btnPiso2...');
await page.click('#btnPiso2');

// Esperar a que la cámara vuele y se asiente
await new Promise(r => setTimeout(r, 4000));

const status = await page.evaluate(() => {
  const b = document.getElementById('btnPiso2');
  return {
    btnClass: b?.className,
  };
});
console.log('Button status after click:', status);

// Tomar captura de pantalla
const path = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/piso2_boton_encuadrado.jpg';
await page.screenshot({ path, quality: 90, type: 'jpeg' });
console.log('Screenshot saved to', path);

await browser.close();

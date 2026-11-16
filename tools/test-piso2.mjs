import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--use-gl=angle', '--use-angle=d3d11', '--window-size=1280,720'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:4173/HLF/', { waitUntil: 'networkidle2', timeout: 60000 });

  // Esperar a que el botón Entrar esté habilitado (disabled === false)
  await page.waitForFunction(() => {
    const b = document.getElementById('btnEntrar');
    return b && !b.disabled && b.textContent.includes('Entrar');
  }, { timeout: 60000 });
  console.log('Button Entrar is now enabled, clicking...');
  await page.click('#btnEntrar');

  // Esperar a que loadingEl desaparezca y se complete la transición fluida de entrada (4.5s)
  await page.waitForFunction(() => !document.getElementById('loading') || document.getElementById('loading').classList.contains('done'), { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 4500));
  await page.screenshot({ path: 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/test_hotel_arrived.jpg' });

  // Click btnPiso2
  await page.waitForSelector('#btnPiso2', { timeout: 10000 });
  await page.click('#btnPiso2');
  console.log('Clicked Piso 2 first time');

  // Capturar a los 0.9s para ver división en acción
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/test_piso2_dividing.jpg' });

  // Esperar a que se asiente la planta cenital
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/test_piso2_settled.jpg' });

  // Check if "Pisos · modelo Revit" exists in DOM
  const textFound = await page.evaluate(() => document.body.innerText.includes('Pisos · modelo Revit'));
  console.log("Contains text 'Pisos · modelo Revit':", textFound);

  // Click btnPiso2 a second time (TOGGLE)
  await page.click('#btnPiso2');
  console.log('Clicked Piso 2 second time (TOGGLE)');
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/test_piso2_toggled_back.jpg' });

  await browser.close();
  console.log('Done test successfully');
})();

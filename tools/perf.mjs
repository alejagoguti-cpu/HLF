// Mide FPS con distintas opciones encendidas/apagadas en la vista del hotel.
import puppeteer from 'puppeteer-core';
const url = process.env.URL || 'http://127.0.0.1:4173/HLF/';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 600000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900', ...(process.env.HIGH ? ['--force_high_performance_gpu'] : [])],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true', { timeout: 300000, polling: 500 });
await page.evaluate(() => {
  const d = window.__DBG__;
  d.setQuality(1); d.lock = true;
  d.cam.flyTo({ pivot: d.enuToWorld(-236, 330, 18), heading: 3.35, pitch: -0.3, range: 230 }, 0);
});
await new Promise((r) => setTimeout(r, 15000));
const fps = async (label, fn) => {
  await page.evaluate(fn);
  await new Promise((r) => setTimeout(r, 1500));
  const v = await page.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 > 4000) res(Math.round(n / 4)); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
  console.log(label.padEnd(34), v, 'fps');
};
const gpu = await page.evaluate(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl.getExtension('WEBGL_debug_renderer_info'); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); });
console.log(gpu);
await fps('todo (calidad 1)', () => { window.__DBG__.setQuality(1); });
await fps('sin oclusión ambiental', () => { window.__DBG__.viewer.scene.postProcessStages.ambientOcclusion.enabled = false; });
await fps('+ sin MSAA', () => { window.__DBG__.viewer.scene.msaaSamples = 1; });
await fps('+ sin FXAA', () => { window.__DBG__.viewer.scene.postProcessStages.fxaa.enabled = false; });
await fps('+ sin sombras', () => { window.__DBG__.viewer.shadows = false; });
await fps('+ sin árboles', () => { window.__DBG__.getSite().setTreesVisible(false); });
await fps('+ sin tiles Google', () => { window.__DBG__.getSite().tileset.show = false; });
await fps('+ sin HDR', () => { window.__DBG__.viewer.scene.highDynamicRange = false; });
await fps('+ resolución 0.6', () => { window.__DBG__.viewer.resolutionScale = 0.6; });
await fps('solo árboles de vuelta (res 1)', () => { window.__DBG__.viewer.resolutionScale = 1; window.__DBG__.getSite().setTreesVisible(true); });
await browser.close();

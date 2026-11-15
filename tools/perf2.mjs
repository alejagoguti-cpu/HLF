import puppeteer from 'puppeteer-core';
const url = process.env.URL || 'http://127.0.0.1:4173/HLF/';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', protocolTimeout: 600000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__ALL__ === true', { timeout: 300000, polling: 500 });
await page.evaluate(() => { const d = window.__DBG__; d.lock = true; d.setQuality(0.5);
  d.cam.flyTo({ pivot: d.enuToWorld(-236, 330, 18), heading: 3.35, pitch: -0.3, range: 230 }, 0); });
await new Promise((r) => setTimeout(r, 12000));
const probe = (label, fn) => page.evaluate(fn).then(() => new Promise((r) => setTimeout(r, 2500))).then(() => page.evaluate(() => {
  const s = window.__DBG__.viewer.scene; const gl = s.context._gl;
  let cpu = 0; const N = 20; const t0 = performance.now();
  for (let i = 0; i < N; i++) { const a = performance.now(); s.render(); cpu += performance.now() - a; }
  gl.finish(); const px = new Uint8Array(4); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const total = performance.now() - t0;
  const fs = s.frameState; return { cpuMs: +(cpu / N).toFixed(1), totalMs: +(total / N).toFixed(1), cmds: fs.commandList.length, w: s.canvas.width, h: s.canvas.height };
})).then((r) => console.log(label.padEnd(30), JSON.stringify(r)));
await probe('base q0.5', () => {});
await probe('sin sombras', () => { window.__DBG__.viewer.shadows = false; });
await probe('sin árboles', () => window.__DBG__.getSite().setTreesVisible(false));
await probe('sin google', () => { window.__DBG__.getSite().tileset.show = false; });
await probe('sin globo', () => { window.__DBG__.viewer.scene.globe.show = false; });
await probe('sin edificios', () => { const p = window.__DBG__.viewer.scene.primitives; for (let i = 0; i < p.length; i++) p.get(i).show = false; });
await probe('todo de vuelta', () => { const d = window.__DBG__; const p = d.viewer.scene.primitives; for (let i = 0; i < p.length; i++) p.get(i).show = true; d.viewer.scene.globe.show = true; });
await probe('res 1.0', () => { window.__DBG__.viewer.resolutionScale = 1; });
await browser.close();

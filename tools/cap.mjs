// Captura con GPU real. Uso: node tools/cap.mjs <out> [json camara] [modo] [espera ms]
import puppeteer from 'puppeteer-core';
const out = process.argv[2] || 'shots/cap.jpg';
const camArg = process.argv[3] && process.argv[3] !== '-' ? JSON.parse(process.argv[3]) : null;
const mode = process.argv[4] || '';
const wait = Number(process.argv[5] || 20000);
const url = process.env.URL || 'http://127.0.0.1:5173/HLF/';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new', protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--window-size=1600,900', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
const msgs = [];
page.on('console', (m) => { if (m.type() !== 'log') msgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 300)));
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
if (process.env.ALL) await page.waitForFunction("window.__ALL__ === true || window.__LOAD_ERROR__", { timeout: 300000, polling: 500 }).catch(() => msgs.push("timeout ALL"));
await page.waitForFunction('window.__READY__ === true || window.__LOAD_ERROR__', { timeout: 300000, polling: 500 }).catch(() => msgs.push('timeout READY'));
if (mode && mode !== '-') await page.evaluate((m) => document.querySelector(`[data-light="${m}"]`)?.click(), mode);
if (camArg) {
  await page.evaluate((c) => {
    const { Cesium, cam } = window.__DBG__;
    const pivot = c.e !== undefined ? window.__DBG__.enuToWorld(c.e, c.n, c.u) : Cesium.Cartesian3.fromDegrees(c.lon, c.lat, c.h);
    cam.flyTo({ pivot, heading: c.heading, pitch: c.pitch, range: c.range }, 0.01);
  }, camArg);
}
await new Promise((r) => setTimeout(r, wait));
const info = await page.evaluate(() => {
  const gl = document.createElement('canvas').getContext('webgl2');
  const ext = gl?.getExtension('WEBGL_debug_renderer_info');
  return { err: window.__LOAD_ERROR__ || null, gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '?', fps: window.__FPS__ ?? null, st: window.__STATS__ ?? null };
});
await page.screenshot({ path: out, type: 'jpeg', quality: 88 });
console.log(JSON.stringify({ info, msgs: msgs.slice(-10) }));
await browser.close();

import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://127.0.0.1:4173/HLF/';
const out = process.argv[3] || 'shots/diag.png';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: [
    '--no-sandbox',
    '--use-gl=angle',
    '--use-angle=gl',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
    '--window-size=1600,900',
    '--hide-scrollbars',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

const msgs = [];
const net = [];
page.on('console', (m) => msgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)));
page.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 300)));
page.on('response', (r) => {
  const u = r.url();
  if (/tile\.googleapis|api\.cesium|arcgis|\.glb/i.test(u)) {
    net.push(`${r.status()} ${u.slice(0, 150)}`);
  }
});
page.on('requestfailed', (r) => {
  const u = r.url();
  if (/tile\.googleapis|api\.cesium|arcgis|\.glb/i.test(u)) {
    net.push(`FAIL ${r.failure()?.errorText} ${u.slice(0, 150)}`);
  }
});

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page
  .waitForFunction('window.__READY__ === true || window.__LOAD_ERROR__', { timeout: 180000, polling: 500 })
  .catch(() => msgs.push('timeout esperando __READY__'));

await new Promise((r) => setTimeout(r, 12000));

const diag = await page.evaluate(() => {
  const C = window.Cesium;
  const dbg = window.__DBG__;
  if (!dbg) return { fatal: 'sin __DBG__', ready: !!window.__READY__, err: window.__LOAD_ERROR__ || null };
  const { viewer } = dbg;
  const scene = viewer.scene;
  const site = dbg.getSite?.();
  const out = { ready: !!window.__READY__, err: window.__LOAD_ERROR__ || null, prims: scene.primitives.length };

  const cam = viewer.camera;
  out.camera = {
    height: Math.round(cam.positionCartographic.height),
    lon: +C.Math.toDegrees(cam.positionCartographic.longitude).toFixed(6),
    lat: +C.Math.toDegrees(cam.positionCartographic.latitude).toFixed(6),
  };
  out.globeTiles = scene.globe.tilesLoaded;
  out.globeHeight = scene.globe.getHeight(cam.positionCartographic) ?? null;

  if (site?.tileset) {
    const t = site.tileset;
    out.tileset = {
      ready: t.ready,
      tilesLoaded: t.tilesLoaded,
      maxSSE: t.maximumScreenSpaceError,
      stats: t.statistics ? {
        visited: t.statistics.visited,
        selected: t.statistics.selected,
        numberOfTilesSelected: t.statistics.numberOfTilesSelected,
        numberOfPendingRequests: t.statistics.numberOfPendingRequests,
        numberOfTilesLoading: t.statistics.numberOfTilesLoading,
      } : null,
      bs: t.root ? {
        center: [
          +C.Math.toDegrees(t.root.boundingSphere.center.x).toFixed(2),
        ] : null,
      show: t.show,
      style: t.style ? t.style.style : null,
    };
    try {
      const s = t.root.boundingSphere;
      const carto = C.Cartographic.fromCartesian(s.center);
      out.tileset.center = {
        lon: +C.Math.toDegrees(carto.longitude).toFixed(5),
        lat: +C.Math.toDegrees(carto.latitude).toFixed(5),
        height: Math.round(carto.height),
        radius: Math.round(s.radius),
      };
    } catch (e) { out.tileset.bsErr = String(e); }
  }

  if (site?.model) {
    const m = site.model;
    out.model = {
      ready: m.ready,
      show: m.show,
      scale: m.scale,
      boundingSphere: m.boundingSphere
        ? {
            center: [
              Math.round(m.boundingSphere.center.x),
              Math.round(m.boundingSphere.center.y),
              Math.round(m.boundingSphere.center.z),
            ],
            radius: Math.round(m.boundingSphere.radius),
          }
        : null,
    };
    try {
      const carto = C.Cartographic.fromCartesian(m.boundingSphere.center);
      out.model.center = {
        lon: +C.Math.toDegrees(carto.longitude).toFixed(5),
        lat: +C.Math.toDegrees(carto.latitude).toFixed(5),
        height: Math.round(carto.height),
      };
      out.model.onGround = Math.round(carto.height - (scene.globe.getHeight(carto) ?? 0));
    } catch (e) { out.model.centerErr = String(e); }
  }

  const pixel = (x, y) => {
    const c = scene.canvas;
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return gl ? 'gl ok' : 'sin gl';
  };
  out.canvas = { w: scene.canvas.width, h: scene.canvas.height, gl: pixel() };
  return out;
});

await page.screenshot({ path: out });

console.log(JSON.stringify({ diag, net: net.slice(-25), msgs: msgs.slice(-14) }, null, 1));
await browser.close();

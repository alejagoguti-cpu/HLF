import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

const ROOT = 'C:/Users/aleja/Documents/planosfinales-repo';

const server = http.createServer((req, res) => {
  let u = req.url.split('?')[0];
  if (u === '/' || u === '') u = '/index.html';
  const filePath = path.join(ROOT, decodeURIComponent(u));
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not found: ' + u);
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(8766, resolve));

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,1000']
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });

await page.goto('http://localhost:8766/', { waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 6000));

// Scroll into .levels-panel
await page.evaluate(() => {
  const el = document.querySelector('.levels');
  if (el) el.scrollIntoView();
});
await new Promise(r => setTimeout(r, 2000));

// Tomar foto del elemento .viewer
const viewerEl = await page.$('[data-viewer]');
if (viewerEl) {
  const shotPath = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/pf_viewer_edificios.jpg';
  await viewerEl.screenshot({ path: shotPath, quality: 90, type: 'jpeg' });
  console.log('Saved viewer screenshot:', shotPath);
}

// Rotar cámara para ver la Clínica 127 y Torres vecinas
await page.evaluate(() => {
  const v = window.edificio3d;
  if (v && v.controls) {
    v.camera.position.set(-130, 75, 140);
    v.controls.target.set(-70, 15, 40);
    v.controls.update();
  }
});
await new Promise(r => setTimeout(r, 2000));

if (viewerEl) {
  const shotPath2 = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/pf_viewer_clinica.jpg';
  await viewerEl.screenshot({ path: shotPath2, quality: 90, type: 'jpeg' });
  console.log('Saved viewer clinica screenshot:', shotPath2);
}

await browser.close();
server.close();
console.log('Done!');

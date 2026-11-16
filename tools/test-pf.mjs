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

await new Promise((resolve) => server.listen(8765, resolve));
console.log('Test server listening on http://localhost:8765');

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  protocolTimeout: 300000,
  args: ['--no-sandbox', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-size=1600,900']
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900 });

page.on('console', msg => console.log('PAGE LOG:', msg.text()));
page.on('pageerror', err => console.error('PAGE ERROR:', err));

console.log('Navigating to http://localhost:8765/#plantas ...');
await page.goto('http://localhost:8765/#plantas', { waitUntil: 'domcontentloaded' });

// Esperar a que el visor 3D se inicialice
await new Promise(r => setTimeout(r, 8000));

const info = await page.evaluate(() => {
  const v = window.edificio3d;
  if (!v) return { ready: false };
  const customNames = [];
  v.scene.traverse(o => {
    if (o.name && o.name.includes('_PBR')) customNames.push(o.name);
  });
  return {
    ready: v.ready,
    customNames
  };
});
console.log('Scene info:', info);

// Rotar cámara para enfocar los edificios vecinos
await page.evaluate(() => {
  const v = window.edificio3d;
  if (v && v.controls) {
    // Alejar cámara y enfocar hacia el norte/oeste
    v.camera.position.set(-150, 90, 180);
    v.controls.target.set(-50, 15, 50);
    v.controls.update();
  }
});
await new Promise(r => setTimeout(r, 2000));

const shotPath1 = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/pf_clinica_torres.jpg';
await page.screenshot({ path: shotPath1, quality: 90, type: 'jpeg' });
console.log('Saved shot 1:', shotPath1);

// Rotar cámara hacia la esquina Pan Pa' Ya / Metro 127
await page.evaluate(() => {
  const v = window.edificio3d;
  if (v && v.controls) {
    v.camera.position.set(160, 80, -90);
    v.controls.target.set(80, 10, 40);
    v.controls.update();
  }
});
await new Promise(r => setTimeout(r, 2000));

const shotPath2 = 'C:/Users/aleja/.gemini/antigravity/brain/6e5b4a52-52f0-4c42-bd60-d445caf7329a/pf_esquina_metro.jpg';
await page.screenshot({ path: shotPath2, quality: 90, type: 'jpeg' });
console.log('Saved shot 2:', shotPath2);

await browser.close();
server.close();
console.log('Test completed successfully!');

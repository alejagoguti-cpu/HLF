import http from 'node:http';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const PORT = 8099;
mkdirSync('shots', { recursive: true });

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.writeHead(204).end();
    if (req.method !== 'POST') return res.writeHead(405).end('solo POST');

    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      try {
        const { dataUrl, name = 'captura' } = JSON.parse(body);
        const b64 = String(dataUrl).split(',')[1] || '';
        const file = join('shots', `${name}.jpg`);
        writeFileSync(file, Buffer.from(b64, 'base64'));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, file, bytes: b64.length }));
      } catch (e) {
        res.writeHead(400).end(JSON.stringify({ ok: false, error: String(e) }));
      }
    });
  })
  .listen(PORT, () => console.log(`capturador en http://127.0.0.1:${PORT}`));

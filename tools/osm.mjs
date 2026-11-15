// Descarga los ejes viales reales (OpenStreetMap / Overpass) a build/osm/vias.json usando el navegador.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';
const q = '[out:json][timeout:60];way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"](4.6935,-74.0505,4.7105,-74.0325);out geom;';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
let ok = false;
for (const host of ['https://overpass-api.de', 'https://overpass.kumi.systems', 'https://overpass.private.coffee']) {
  try {
    await page.goto(host + '/api/interpreter?data=' + encodeURIComponent(q), { waitUntil: 'networkidle0', timeout: 90000 });
    const txt = await page.evaluate(() => document.body.innerText);
    const d = JSON.parse(txt);
    writeFileSync('build/osm/vias.json', JSON.stringify(d));
    console.log(host, 'vías:', d.elements.length); ok = true; break;
  } catch (e) { console.log(host, 'falló', String(e.message).slice(0, 80)); }
}
await browser.close();
if (!ok) process.exit(1);

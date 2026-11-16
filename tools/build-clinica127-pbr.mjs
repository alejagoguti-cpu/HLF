/**
 * Modela en 3D UV+PBR ultra realista el complejo COLSUBSIDIO CLÍNICA 127
 * (Avenida Calle 127 # 16-45, frente al Hotel La Fontana):
 *   - Torre principal de 12 pisos con muro cortina en vidrio azul-gris reflectivo PBR
 *   - Aleros / lamas voladizas horizontales de protección solar en aluminio plateado PBR en CADA PISO
 *   - Parteluces verticales y perfilería en aluminio anodizado
 *   - Zócalo comercial en gres porcelánico carbón / placas ventiladas oscuras PBR
 *   - Acceso principal con marquesina suspendida de acero y vidrio con tensores
 *   - Letrero superior de cubierta: "COLSUBSIDIO CLÍNICA 127" con isotipo amarillo
 *   - Letreros de zócalo: "CLÍNICA 127" y "DROGUERÍA COLSUBSIDIO"
 *   - Ala occidental remetida de 7 pisos con terraza y barandas
 *   - Podio oriental con ventanales de droguería y vitrinas comerciales
 * -> public/secciones/clinica127.glb y docs/secciones/clinica127.glb
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { encodePng } from './pbr-textures.mjs';
import { makeMeshBuilder } from './arch-3d.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const TARGET_IDS = new Set([48, 193, 1090, 2384, 1088]);
const BLDS = DATA.edificios.filter((b) => TARGET_IDS.has(b.id));
if (!BLDS.length) throw new Error('No se encontraron edificios de Clínica 127 en edificios.json');

const GLYPHS = {
  A: ['01110','10001','10001','11111','10001','10001','10001'],
  B: ['11110','10001','10001','11110','10001','10001','11110'],
  C: ['01111','10000','10000','10000','10000','10000','01111'],
  D: ['11110','10001','10001','10001','10001','10001','11110'],
  E: ['11111','10000','10000','11110','10000','10000','11111'],
  G: ['01111','10000','10000','10111','10001','10001','01111'],
  I: ['11111','00100','00100','00100','00100','00100','11111'],
  L: ['10000','10000','10000','10000','10000','10000','11111'],
  M: ['10001','11011','10101','10001','10001','10001','10001'],
  N: ['10001','11001','10101','10011','10001','10001','10001'],
  O: ['01110','10001','10001','10001','10001','10001','01110'],
  P: ['11110','10001','10001','11110','10000','10000','10000'],
  R: ['11110','10001','10001','11110','10100','10010','10001'],
  S: ['01111','10000','10000','01110','00001','00001','11110'],
  T: ['11111','00100','00100','00100','00100','00100','00100'],
  U: ['10001','10001','10001','10001','10001','10001','01110'],
  '1': ['00100','01100','00100','00100','00100','00100','01110'],
  '2': ['01110','10001','00001','00110','01000','10000','11111'],
  '7': ['11111','00001','00010','00100','01000','01000','01000'],
  ' ': ['00000','00000','00000','00000','00000','00000','00000'],
  '.': ['00000','00000','00000','00000','00000','00110','00110'],
};

// Generador de mapas PBR
function makePbrSet(fn, S = 128, nStrength = 2.4) {
  const alb = Buffer.alloc(S * S * 4), nrm = Buffer.alloc(S * S * 4), mr = Buffer.alloc(S * S * 4);
  const h = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const [r, g, b, rough, metal, hv] = fn(x / S, y / S);
    const i = (y * S + x) * 4;
    alb[i] = Math.round(r * 255); alb[i + 1] = Math.round(g * 255); alb[i + 2] = Math.round(b * 255); alb[i + 3] = 255;
    mr[i] = 0; mr[i + 1] = Math.round(rough * 255); mr[i + 2] = Math.round(metal * 255); mr[i + 3] = 255;
    h[y * S + x] = hv;
  }
  for (let y = 0; y < S; y++) {
    const ym = (y - 1 + S) % S, yp = (y + 1) % S;
    for (let x = 0; x < S; x++) {
      const xm = (x - 1 + S) % S, xp = (x + 1) % S;
      const dx = (h[y * S + xp] - h[y * S + xm]) * nStrength;
      const dy = (h[yp * S + x] - h[ym * S + x]) * nStrength;
      let nx = -dx, ny = -dy, nz = 1;
      const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
      const i = (y * S + x) * 4;
      nrm[i] = Math.round((nx * 0.5 + 0.5) * 255);
      nrm[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      nrm[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      nrm[i + 3] = 255;
    }
  }
  return { alb: encodePng(S, S, alb), nrm: encodePng(S, S, nrm), mr: encodePng(S, S, mr) };
}

// 1. Vidrio Muro Cortina Azul-Gris Reflectivo
const pVidrio = makePbrSet((u, v) => {
  const pu = (u * 4) % 1, pv = (v * 1) % 1;
  const isJoint = pu < 0.03 || pv < 0.02;
  if (isJoint) return [0.10, 0.11, 0.13, 0.45, 0.85, 0.2];
  const sky = 0.05 + 0.03 * Math.sin(u * 12.0 + v * 8.0);
  return [0.08 + sky, 0.14 + sky, 0.22 + sky, 0.05, 0.94, 0.9];
});

// 2. Aluminio Anodizado Plateado para Lamas y Viseras
const pLamas = makePbrSet((u, v) => {
  const grain = Math.sin(u * 160) * 0.02 + Math.cos(v * 40) * 0.01;
  return [0.90 + grain, 0.92 + grain, 0.94 + grain, 0.18, 0.90, 0.8];
});

// 3. Gres Porcelánico Carbón / Zócalo Ventilado
const pZocalo = makePbrSet((u, v) => {
  const gu = (u * 3) % 1, gv = (v * 6) % 1;
  const isJoint = gu < 0.03 || gv < 0.03;
  if (isJoint) return [0.08, 0.08, 0.09, 0.90, 0.05, 0.1];
  const stone = Math.sin(u * 73 + v * 41) * 0.025;
  return [0.20 + stone, 0.21 + stone, 0.23 + stone, 0.65, 0.06, 0.8 + stone * 2];
});

// 4. Metal Negro Estructural (Marquesina y marcos)
const pMetalNegro = makePbrSet((u, v) => {
  const n = Math.sin(u * 30 + v * 30) * 0.015;
  return [0.12 + n, 0.12 + n, 0.13 + n, 0.38, 0.75, 0.6];
});

// 5. Concreto Cubierta
const pConcreto = makePbrSet((u, v) => {
  const n = (Math.sin(u * 50) + Math.cos(v * 50)) * 0.03;
  return [0.65 + n, 0.65 + n, 0.65 + n, 0.85, 0.02, 0.5 + n];
});

// Letreros gráficos personalizados
function makeRoofSignPng(w = 768, h = 96) {
  const buf = Buffer.alloc(w * h * 4);
  // Fondo oscuro carbón mate
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    buf[i] = 16; buf[i + 1] = 18; buf[i + 2] = 22; buf[i + 3] = 255;
  }

  // Dibujar Isotipo Colsubsidio (rombos geométricos amarillos)
  const drawDiamond = (cx, cy, r, col) => {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.abs(dx) + Math.abs(dy) <= r) {
          const px = Math.floor(cx + dx), py = Math.floor(cy + dy);
          if (px >= 0 && px < w && py >= 0 && py < h) {
            const i = (py * w + px) * 4;
            buf[i] = col[0]; buf[i + 1] = col[1]; buf[i + 2] = col[2];
          }
        }
      }
    }
  };
  drawDiamond(40, 48, 24, [252, 204, 18]);
  drawDiamond(40, 48, 14, [16, 18, 22]);
  drawDiamond(40, 48, 7, [252, 204, 18]);

  // Texto "COLSUBSIDIO" (amarillo) + "CLINICA 127" (blanco puro)
  const drawWord = (str, startX, startY, scale, col) => {
    for (let ci = 0; ci < str.length; ci++) {
      const g = GLYPHS[str[ci]] || GLYPHS[' '];
      for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
        if (g[r][c] !== '1') continue;
        for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
          const px = startX + ci * 6 * scale + c * scale + dx;
          const py = startY + r * scale + dy;
          if (px >= 0 && px < w && py >= 0 && py < h) {
            const i = (py * w + px) * 4;
            buf[i] = col[0]; buf[i + 1] = col[1]; buf[i + 2] = col[2];
          }
        }
      }
    }
  };

  drawWord('COLSUBSIDIO', 80, 30, 5, [252, 204, 18]);
  drawWord('CLINICA 127', 430, 30, 5, [255, 255, 255]);
  return encodePng(w, h, buf);
}

function makePodiumSignPng(text, w = 320, h = 64, withLogo = false) {
  const buf = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    buf[i] = 20; buf[i + 1] = 22; buf[i + 2] = 25; buf[i + 3] = 255;
  }
  let ox = 28;
  if (withLogo) {
    const cx = 28, cy = 32, r = 16;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (Math.abs(dx) + Math.abs(dy) <= r) {
        const px = Math.floor(cx + dx), py = Math.floor(cy + dy);
        if (px >= 0 && px < w && py >= 0 && py < h) {
          const i = (py * w + px) * 4;
          buf[i] = 252; buf[i + 1] = 204; buf[i + 2] = 18;
        }
      }
    }
    ox = 62;
  }
  const str = text.toUpperCase();
  const scale = 4;
  const totalW = str.length * 6 * scale - scale;
  if (!withLogo) {
    ox = Math.floor((w - totalW) * 0.5);
  }
  const oy = Math.floor((h - 7 * scale) * 0.5);
  for (let ci = 0; ci < str.length; ci++) {
    const g = GLYPHS[str[ci]] || GLYPHS[' '];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
      if (g[r][c] !== '1') continue;
      for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) {
        const px = ox + ci * 6 * scale + c * scale + dx;
        const py = oy + r * scale + dy;
        if (px >= 0 && px < w && py >= 0 && py < h) {
          const i = (py * w + px) * 4;
          buf[i] = 255; buf[i + 1] = 255; buf[i + 2] = 255;
        }
      }
    }
  }
  return encodePng(w, h, buf);
}

const g = new Glb();
const img = (p) => [g.image(p.alb, 'image/png'), g.image(p.nrm, 'image/png'), g.image(p.mr, 'image/png')];
const [tViB, tViN, tViM] = img(pVidrio);
const [tLaB, tLaN, tLaM] = img(pLamas);
const [tZoB, tZoN, tZoM] = img(pZocalo);
const [tNeB, tNeN, tNeM] = img(pMetalNegro);
const [tCoB, tCoN, tCoM] = img(pConcreto);

const tSignRoof = g.image(makeRoofSignPng(), 'image/png');
const tSignClinica = g.image(makePodiumSignPng('CLINICA 127', 320, 64, false), 'image/png');
const tSignDrogueria = g.image(makePodiumSignPng('DROGUERIA', 320, 64, true), 'image/png');

g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mkMat = (name, b, n, mr, met = 1.0, extra = {}) => ({
  P: [], N: [], UV: [], I: [], n: 0,
  def: {
    name, doubleSided: true,
    ...(n !== null ? { normalTexture: { index: n, scale: 1.0 } } : {}),
    pbrMetallicRoughness: {
      baseColorTexture: { index: b },
      baseColorFactor: [1, 1, 1, 1],
      ...(mr !== null ? { metallicRoughnessTexture: { index: mr } } : {}),
      metallicFactor: met,
      roughnessFactor: mr !== null ? 1.0 : 0.4,
    },
    ...extra,
  },
});

const mats = {
  vidrio: mkMat('VidrioClinicaPBR', tViB, tViN, tViM, 0.95, { emissiveFactor: [0.03, 0.05, 0.07] }),
  lamas: mkMat('AluminioLamasPBR', tLaB, tLaN, tLaM, 0.88),
  zocalo: mkMat('ZocaloCarbonPBR', tZoB, tZoN, tZoM, 0.05),
  negro: mkMat('MetalNegroPBR', tNeB, tNeN, tNeM, 0.75),
  concreto: mkMat('ConcretoPBR', tCoB, tCoN, tCoM, 0.02),
  signRoof: mkMat('SignRoofClinica', tSignRoof, null, null, 0.1, { emissiveTexture: { index: tSignRoof }, emissiveFactor: [1.3, 1.3, 1.3] }),
  signClinica: mkMat('SignPodiumClinica', tSignClinica, null, null, 0.1, { emissiveTexture: { index: tSignClinica }, emissiveFactor: [1.1, 1.1, 1.1] }),
  signDrogueria: mkMat('SignPodiumDrogueria', tSignDrogueria, null, null, 0.1, { emissiveTexture: { index: tSignDrogueria }, emissiveFactor: [1.1, 1.1, 1.1] }),
  lobbyInterior: {
    P: [], N: [], UV: [], I: [], n: 0,
    def: {
      name: 'LobbyInteriorWarm', doubleSided: true,
      pbrMetallicRoughness: { baseColorFactor: [0.95, 0.92, 0.85, 1], metallicFactor: 0.1, roughnessFactor: 0.3 },
      emissiveFactor: [0.38, 0.35, 0.28],
    },
  },
  canopyGlass: {
    P: [], N: [], UV: [], I: [], n: 0,
    def: {
      name: 'CanopyGlassPBR', doubleSided: true,
      pbrMetallicRoughness: { baseColorFactor: [0.25, 0.35, 0.42, 0.65], metallicFactor: 0.8, roughnessFactor: 0.08 },
    },
  },
};

const { addQuad: addQ, addLocalBox, add3DWindowBay } = makeMeshBuilder(mats);
function addQuad(mat, a, b, c, d, uva = [0, 0], uvb = [1, 0], uvc = [1, 1], uvd = [0, 1]) {
  addQ(mat, a, b, c, d, uva, uvb, uvc, uvd);
}

const area = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
};

// =========================================================================
// 1. TORRE PRINCIPAL DE 12 PISOS (ID 48)
// =========================================================================
const b48 = BLDS.find((b) => b.id === 48);
if (b48) {
  let ring = b48.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b48.b, zTop = b48.b + b48.h; // ~2.42 a ~38.72 (12 pisos)
  const zPodium = zBase + 6.6; // Pisos 1 y 2 en zócalo gres carbón

  // Cubierta de la torre principal
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const mTop = mats.concreto, tBase = mTop.n;
  for (const p of ring) {
    mTop.P.push(p[0], zTop, -p[1]); mTop.N.push(0, 1, 0); mTop.UV.push(p[0] * 0.2, p[1] * 0.2); mTop.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mTop.I.push(tBase + tris[i], tBase + tris[i + 1], tBase + tris[i + 2]);

  // Casetón técnico y ascensores sobre cubierta (zTop a zTop + 3.2m)
  let cx = 0, cy = 0;
  for (const p of ring) { cx += p[0]; cy += p[1]; }
  cx /= ring.length; cy /= ring.length;
  addLocalBox('negro', (s, d, z) => [cx - 5 + s, cy - 3 + d, z], 0, 10, 0, 6, zTop, zTop + 3.2, 0.4);

  // Recorrer las 4 fachadas de la torre
  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    // ¿Es la fachada Norte hacia la Calle 127? (ny > 0.8)
    const isNorth = ny > 0.7;

    if (isNorth) {
      // -------------------------------------------------------------
      // FACHADA NORTE PRINCIPAL (CALLE 127) - 20.12 m
      // -------------------------------------------------------------
      // A. Zócalo comercial carbón en planta baja con acceso vidriado abierto
      addLocalBox('zocalo', pt, 0.0, 3.5, -0.20, 0.15, zBase, zPodium, 0.35); // flanco izquierdo
      addLocalBox('zocalo', pt, 11.5, L, -0.20, 0.15, zBase, zPodium, 0.35); // flanco derecho
      addLocalBox('zocalo', pt, 3.5, 11.5, -0.20, 0.15, zBase + 3.8, zPodium, 0.35); // dintel superior

      // Entrada principal vidriada remetida (s = 3.5 a 11.5)
      addQuad('lobbyInterior', pt(3.5, -1.80, zBase), pt(11.5, -1.80, zBase), pt(11.5, 0.0, zBase), pt(3.5, 0.0, zBase)); // piso interior iluminado
      addQuad('lobbyInterior', pt(3.5, -1.80, zBase), pt(11.5, -1.80, zBase), pt(11.5, -1.80, zBase + 3.8), pt(3.5, -1.80, zBase + 3.8)); // fondo recepción
      addQuad('vidrio', pt(3.5, -0.35, zBase), pt(11.5, -0.35, zBase), pt(11.5, -0.35, zBase + 3.6), pt(3.5, -0.35, zBase + 3.6), [0, 0], [4, 0], [4, 1.5], [0, 1.5]);

      // Puertas automáticas y marco negro
      addLocalBox('negro', pt, 3.4, 11.6, -0.40, 0.10, zBase + 3.6, zBase + 3.8, 0.5);
      addLocalBox('negro', pt, 7.4, 7.6, -0.38, 0.05, zBase, zBase + 3.6, 0.5);

      // Marquesina / Dosel suspendido ultra realista sobre el acceso
      // Vuela 3.2 m sobre el andén en voladizo con estructura metálica y vidrio
      const cW0 = 3.2, cW1 = 11.8, cDepth = 3.2, cZ = zBase + 4.1;
      // Marco perimetral negro de la marquesina
      addLocalBox('negro', pt, cW0, cW1, 0.0, cDepth, cZ - 0.12, cZ, 0.4);
      // Panel de vidrio estructural traslúcido
      addQuad('canopyGlass', pt(cW0 + 0.1, 0.1, cZ - 0.02), pt(cW1 - 0.1, 0.1, cZ - 0.02), pt(cW1 - 0.1, cDepth - 0.1, cZ - 0.02), pt(cW0 + 0.1, cDepth - 0.1, cZ - 0.02));
      // Tirantes / tensores de acero en diagonal anclados a la fachada (a zBase + 6.2)
      for (const sx of [cW0 + 0.4, (cW0 + cW1) * 0.5, cW1 - 0.4]) {
        addQuad('negro', pt(sx - 0.03, 0.05, zBase + 6.2), pt(sx + 0.03, 0.05, zBase + 6.2), pt(sx + 0.03, cDepth - 0.2, cZ), pt(sx - 0.03, cDepth - 0.2, cZ));
      }

      // Letrero "CLÍNICA 127" sobre el acceso (orientado de izquierda a derecha)
      addQuad('signClinica', pt(4.2, 0.18, zPodium - 1.25), pt(10.8, 0.18, zPodium - 1.25), pt(10.8, 0.18, zPodium - 0.35), pt(4.2, 0.18, zPodium - 0.35), [0, 0], [1, 0], [1, 1], [0, 1]);

      // B. Pisos 3 a 12: Muro Cortina PBR de alta reflectividad
      const towerFloors = 10;
      const flH = (zTop - zPodium) / towerFloors;

      // Paño completo de vidrio continuo reflectivo
      addQuad('vidrio', pt(0, 0.0, zPodium), pt(L, 0.0, zPodium), pt(L, 0.0, zTop), pt(0, 0.0, zTop), [0, 0], [L * 0.4, 0], [L * 0.4, (zTop - zPodium) * 0.35], [0, (zTop - zPodium) * 0.35]);

      // Parteluces verticales en aluminio cada ~1.82 m (11 divisiones)
      const bays = 11;
      const bayW = L / bays;
      for (let b = 0; b <= bays; b++) {
        const mx = b * bayW;
        addLocalBox('lamas', pt, mx - 0.04, mx + 0.04, -0.05, 0.12, zPodium, zTop, 0.4);
      }

      // C. ALEROS / LAMAS HORIZONTALES VOLADIZAS DE PROTECCIÓN SOLAR (EN CADA PISO)
      // La firma visual exacta del edificio: viseras continuas de 0.45 m que sobresalen de la fachada
      for (let fl = 0; fl <= towerFloors; fl++) {
        const fz = zPodium + fl * flH;
        // Voladizo de aluminio: 0.65m de saliente horizontal continuo
        addLocalBox('lamas', pt, 0.0, L, 0.0, 0.65, fz - 0.08, fz + 0.04, 0.35);
        // Franja de antepecho / spandrel oscuro entre pisos
        if (fl < towerFloors) {
          addLocalBox('negro', pt, 0.0, L, -0.08, 0.04, fz, fz + 0.65, 0.35);
        }
      }

      // D. Letrero de Coronamiento / Valla de Cubierta: "COLSUBSIDIO CLÍNICA 127"
      // Ubicado en la parte superior central de la fachada norte (zTop - 0.8 a zTop + 1.8)
      const signW = 15.8;
      const signS0 = (L - signW) * 0.5, signS1 = signS0 + signW;
      addLocalBox('negro', pt, signS0 - 0.2, signS1 + 0.2, 0.10, 0.30, zTop - 0.2, zTop + 2.0, 0.35); // soporte
      addQuad('signRoof', pt(signS0, 0.32, zTop - 0.1), pt(signS1, 0.32, zTop - 0.1), pt(signS1, 0.32, zTop + 1.9), pt(signS0, 0.32, zTop + 1.9), [0, 0], [1, 0], [1, 1], [0, 1]);

      // Pretil superior de cubierta
      addLocalBox('lamas', pt, 0.0, L, -0.15, 0.15, zTop, zTop + 1.1, 0.35);
    } else {
      // Fachadas Este, Oeste y Sur: Vidrio muro cortina con franjas oscuras de entrepiso
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.10, zBase, zPodium, 0.35);
      addQuad('vidrio', pt(0, 0.0, zPodium), pt(L, 0.0, zPodium), pt(L, 0.0, zTop), pt(0, 0.0, zTop), [0, 0], [L * 0.3, 0], [L * 0.3, (zTop - zPodium) * 0.3], [0, (zTop - zPodium) * 0.3]);

      // Franjas horizontales de entrepiso
      const towerFloors = 10;
      const flH = (zTop - zPodium) / towerFloors;
      for (let fl = 0; fl <= towerFloors; fl++) {
        const fz = zPodium + fl * flH;
        addLocalBox('negro', pt, 0, L, -0.05, 0.12, fz - 0.05, fz + 0.45, 0.35);
      }
      // Pretil
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.10, zTop, zTop + 1.0, 0.35);
    }
  }
}

// =========================================================================
// 2. ALA OCCIDENTAL REMETIDA (ID 193 - 7 pisos, h = 21.3m)
// =========================================================================
const b193 = BLDS.find((b) => b.id === 193);
if (b193) {
  let ring = b193.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b193.b, zTop = b193.b + b193.h; // ~2.42 a ~23.72

  // Cubierta / Terraza de piso 7
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const mTop = mats.concreto, tBase = mTop.n;
  for (const p of ring) {
    mTop.P.push(p[0], zTop, -p[1]); mTop.N.push(0, 1, 0); mTop.UV.push(p[0] * 0.2, p[1] * 0.2); mTop.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mTop.I.push(tBase + tris[i], tBase + tris[i + 1], tBase + tris[i + 2]);

  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    const isNorth = ny > 0.7;
    if (isNorth) {
      // Fachada norte hacia Calle 127: Vidrio muro cortina con divisiones y baranda en terraza
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.12, zBase, zBase + 4.2, 0.35);
      addQuad('vidrio', pt(0, 0.0, zBase + 4.2), pt(L, 0.0, zBase + 4.2), pt(L, 0.0, zTop), pt(0, 0.0, zTop), [0, 0], [L * 0.35, 0], [L * 0.35, (zTop - (zBase + 4.2)) * 0.3], [0, (zTop - (zBase + 4.2)) * 0.3]);

      // Lamas de entrepiso en los 6 pisos superiores
      const floors = 6;
      const flH = (zTop - (zBase + 4.2)) / floors;
      for (let fl = 0; fl <= floors; fl++) {
        const fz = zBase + 4.2 + fl * flH;
        addLocalBox('lamas', pt, 0, L, 0.0, 0.35, fz - 0.06, fz + 0.02, 0.35);
      }
      // Baranda en terraza superior
      addLocalBox('lamas', pt, 0, L, -0.05, 0.05, zTop + 0.95, zTop + 1.05, 0.4);
      addQuad('vidrio', pt(0, 0, zTop), pt(L, 0, zTop), pt(L, 0, zTop + 0.95), pt(0, 0, zTop + 0.95), [0, 0], [L * 0.5, 0], [L * 0.5, 1], [0, 1]);
    } else {
      // Muros laterales / traseros en placas de zócalo carbón
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.10, zBase, zTop, 0.35);
      addLocalBox('negro', pt, 0, L, -0.15, 0.15, zTop, zTop + 0.85, 0.35);
    }
  }
}

// =========================================================================
// 3. PODIO ORIENTAL / DROGUERÍA Y LOCALES (IDs 1090, 2384, 1088)
// =========================================================================
for (const b of BLDS.filter((b) => b.id === 1090 || b.id === 2384 || b.id === 1088)) {
  let ring = b.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b.b, zTop = b.b + b.h;

  // Cubierta
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const mTop = mats.concreto, tBase = mTop.n;
  for (const p of ring) {
    mTop.P.push(p[0], zTop, -p[1]); mTop.N.push(0, 1, 0); mTop.UV.push(p[0] * 0.2, p[1] * 0.2); mTop.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mTop.I.push(tBase + tris[i], tBase + tris[i + 1], tBase + tris[i + 2]);

  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    const isNorth = ny > 0.7;
    if (isNorth) {
      // Fachada comercial sobre Calle 127
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.12, zBase, zTop, 0.35);

      // Vitrinas comerciales en planta baja (zBase a zBase + 3.4m)
      const bays = Math.max(1, Math.floor(L / 3.8));
      const bW = L / bays;
      for (let k = 0; k < bays; k++) {
        add3DWindowBay('zocalo', 'negro', 'vidrio', pt, k * bW, (k + 1) * bW, zBase, Math.min(zTop, zBase + 3.8), {
          sillH: 0.35, headH: 0.45, pierW: 0.30, recess: -0.35, mullions: 2,
        });
      }

      // Letrero "DROGUERÍA COLSUBSIDIO" sobre el módulo de farmacia (ID 1088)
      if (b.id === 1088) {
        addQuad('signDrogueria', pt(1.0, 0.15, zBase + 2.6), pt(8.5, 0.15, zBase + 2.6), pt(8.5, 0.15, zBase + 3.5), pt(1.0, 0.15, zBase + 3.5), [0, 0], [1, 0], [1, 1], [0, 1]);
      }

      // Ventanales corridos en pisos 2 y 3 si tiene altura > 5m
      if (b.h > 5) {
        const uFlH = (zTop - (zBase + 3.8)) / (b.p - 1);
        for (let fl = 0; fl < b.p - 1; fl++) {
          const fz0 = zBase + 3.8 + fl * uFlH, fz1 = fz0 + uFlH;
          for (let k = 0; k < bays; k++) {
            add3DWindowBay('zocalo', 'negro', 'vidrio', pt, k * bW, (k + 1) * bW, fz0, fz1, {
              sillH: 0.85, headH: 0.40, pierW: 0.35, recess: -0.30, mullions: 2,
            });
          }
        }
      }
      // Pretil
      addLocalBox('negro', pt, 0, L, -0.15, 0.15, zTop, zTop + 0.65, 0.35);
    } else {
      // Muros laterales y traseros
      addLocalBox('zocalo', pt, 0, L, -0.20, 0.10, zBase, zTop, 0.35);
      addLocalBox('negro', pt, 0, L, -0.15, 0.15, zTop, zTop + 0.60, 0.35);
    }
  }
}

// =========================================================================
// ENSAMBLAR GLB
// =========================================================================
const prims = [];
for (const [, m] of Object.entries(mats)) {
  if (!m.I.length) continue;
  const matIdx = g.j.materials.length;
  g.j.materials.push(m.def);
  prims.push({
    attributes: {
      POSITION: g.acc(new Float32Array(m.P), 'VEC3', { target: 34962, minmax: true }),
      NORMAL: g.acc(new Float32Array(m.N), 'VEC3', { target: 34962 }),
      TEXCOORD_0: g.acc(new Float32Array(m.UV), 'VEC2', { target: 34962 }),
    },
    indices: g.acc(m.n > 65535 ? new Uint32Array(m.I) : new Uint16Array(m.I), 'SCALAR', { target: 34963 }),
    material: matIdx,
  });
}
g.j.meshes.push({ name: 'Clinica_127_PBR', primitives: prims });
g.j.nodes.push({ name: 'Clinica_127_PBR', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/clinica127.glb');
copyFileSync('public/secciones/clinica127.glb', 'docs/secciones/clinica127.glb');
console.log('clinica127.glb UV+PBR generado:', (bytes / 1024).toFixed(1), 'KB');

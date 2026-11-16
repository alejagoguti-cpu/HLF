/**
 * Modela en 3D UV+PBR ultra realista las torres altas vecinas al Hotel La Fontana
 * (costado occidental sobre la Calle 127: IDs 7,8,9,10,11,12,14,15,50,51,54,94,96):
 *   - Fachadas en ladrillo terracota PBR (tex_ladrillo.webp + normal + roughness)
 *   - Muros y marcos en concreto arquitectónico gris claro con juntas de formaleta PBR
 *   - Ventanales horizontales con perfilería oscura y vidrio reflectivo PBR (roughness 0.05)
 *   - Balcones 3D en voladizo (frontales y laterales alternos) con barandas
 *   - Pérgola superior en concreto conectando las torres gemelas
 * -> public/secciones/torres_vecinas.glb y docs/secciones/torres_vecinas.glb
 */
import earcut from 'earcut';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { Glb } from './glb-writer.mjs';
import { encodePng } from './pbr-textures.mjs';
import { makeMeshBuilder } from './arch-3d.mjs';

const DATA = JSON.parse(readFileSync('public/secciones/edificios.json', 'utf8'));
const TARGET_IDS = new Set([7, 8, 9, 10, 11, 12, 14, 15, 50, 51, 54, 94, 96]);
const TOWERS = DATA.edificios.filter((b) => TARGET_IDS.has(b.id));
if (!TOWERS.length) throw new Error('No se encontraron torres vecinas en edificios.json');

const ladrilloBytes = readFileSync('public/secciones/tex_ladrillo.webp');

function makeTowerPbrMaps() {
  const S = 128;
  const make = (fn) => {
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
        const dx = (h[y * S + xp] - h[y * S + xm]) * 2.4;
        const dy = (h[yp * S + x] - h[ym * S + x]) * 2.4;
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
  };

  // 1. Ladrillo PBR (normal + mr)
  const lad = make((u, v) => {
    const row = Math.floor(v * 8), rv = (v * 8) % 1, ru = ((u * 4) + (row % 2) * 0.5) % 1;
    const m = (rv < 0.12 || rv > 0.94 || ru < 0.06 || ru > 0.97) ? 0 : 1;
    const g = Math.sin(u * 73 + v * 51) * 0.12;
    return [0.7, 0.4, 0.3, m ? 0.78 : 0.94, 0.0, m * (0.7 + g)];
  });
  // 2. Concreto arquitectónico gris claro con juntas horizontales de formaleta
  const con = make((u, v) => {
    const joint = ((v * 4) % 1) < 0.05 ? 0.80 : 1.0;
    const n = (Math.sin(u * 47) * Math.cos(v * 63)) * 0.03;
    const c = (0.73 + n) * joint;
    return [c, c * 1.01, c * 1.02, 0.78, 0.0, joint * 0.7 + n * 2];
  });
  // 3. Vidrio reflectivo real de torre con gradiente de cielo e interior cálido
  const vid = make((u, v) => {
    const pane = (u < 0.025 || u > 0.975 || Math.abs(u - 0.5) < 0.015 || v < 0.03 || v > 0.97);
    if (pane) return [0.16, 0.18, 0.20, 0.32, 0.80, 0.9];
    const skyGrad = Math.max(0, 1.0 - v * 1.15);
    const warmInt = (Math.sin(u * 12.56) * 0.5 + 0.5) * 0.14 * (1.0 - skyGrad);
    return [
      0.16 + skyGrad * 0.25 + warmInt * 1.2,
      0.24 + skyGrad * 0.30 + warmInt * 0.95,
      0.32 + skyGrad * 0.36 + warmInt * 0.55,
      0.04, 0.45, 0.2,
    ];
  });
  // 4. Aluminio/hierro oscuro
  const met = make((u, v) => {
    const s = Math.sin(u * 80 + v * 20) * 0.02;
    return [0.13 + s, 0.14 + s, 0.16 + s, 0.32, 0.85, 0.5 + s * 4];
  });
  return { lad, con, vid, met };
}

const maps = makeTowerPbrMaps();
const g = new Glb();
const tLadBase = g.image(ladrilloBytes, 'image/webp');
const tLadNorm = g.image(maps.lad.nrm, 'image/png');
const tLadMr = g.image(maps.lad.mr, 'image/png');
const tConBase = g.image(maps.con.alb, 'image/png');
const tConNorm = g.image(maps.con.nrm, 'image/png');
const tConMr = g.image(maps.con.mr, 'image/png');
const tVidBase = g.image(maps.vid.alb, 'image/png');
const tVidNorm = g.image(maps.vid.nrm, 'image/png');
const tVidMr = g.image(maps.vid.mr, 'image/png');
const tMetBase = g.image(maps.met.alb, 'image/png');
const tMetNorm = g.image(maps.met.nrm, 'image/png');
const tMetMr = g.image(maps.met.mr, 'image/png');
g.j.samplers[0].wrapS = 10497;
g.j.samplers[0].wrapT = 10497;

const mkMat = (name, b, n, mr, factor = [1, 1, 1, 1], met = 0.0, extra = {}) => ({
  P: [], N: [], UV: [], I: [], n: 0,
  def: {
    name,
    doubleSided: true,
    normalTexture: { index: n, scale: 1.0 },
    pbrMetallicRoughness: {
      baseColorTexture: { index: b },
      baseColorFactor: factor,
      metallicRoughnessTexture: { index: mr },
      metallicFactor: met,
      roughnessFactor: 1.0,
    },
    ...extra,
  },
});

const mats = {
  ladrillo: mkMat('LadrilloTorrePBR', tLadBase, tLadNorm, tLadMr, [0.95, 0.78, 0.68, 1], 0.0),
  concreto: mkMat('ConcretoTorrePBR', tConBase, tConNorm, tConMr, [1, 1, 1, 1], 0.0),
  vidrio: mkMat('VidrioTorrePBR', tVidBase, tVidNorm, tVidMr, [1, 1, 1, 1], 1.0, { emissiveFactor: [0.04, 0.05, 0.06] }),
  metal: mkMat('MarcoAluminioPBR', tMetBase, tMetNorm, tMetMr, [1, 1, 1, 1], 1.0),
};

const { addQuad, addBox, addLocalBox, add3DWindowBay } = makeMeshBuilder(mats);

const area = (r) => {
  let a = 0;
  for (let i = 0; i < r.length; i++) { const p = r[i], q = r[(i + 1) % r.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
};

for (const b of TOWERS) {
  let ring = b.r.slice();
  if (area(ring) < 0) ring.reverse();
  const zBase = b.b;
  const zTop = b.b + b.h;
  const floors = Math.max(1, Math.round(b.h / 3.0));
  const flH = b.h / floors;

  // Techo plano en concreto arquitectónico (remetido bajo el pretil)
  const flat = [];
  for (const p of ring) flat.push(p[0], p[1]);
  const tris = earcut(flat);
  const mCon = mats.concreto;
  const cBase = mCon.n;
  for (const p of ring) {
    mCon.P.push(p[0], zTop, -p[1]);
    mCon.N.push(0, 1, 0);
    mCon.UV.push(p[0] * 0.25, p[1] * 0.25);
    mCon.n++;
  }
  for (let i = 0; i < tris.length; i += 3) mCon.I.push(cBase + tris[i], cBase + tris[i + 1], cBase + tris[i + 2]);

  for (let eIdx = 0; eIdx < ring.length; eIdx++) {
    const p0 = ring[eIdx], p1 = ring[(eIdx + 1) % ring.length];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.8) continue;
    const ux = dx / L, uy = dy / L;
    const nx = uy, ny = -ux;
    const pt = (s, off, z) => [p0[0] + ux * s + nx * off, p0[1] + uy * s + ny * off, z];

    const wallMat = L > 12 ? 'ladrillo' : (eIdx % 2 === 0 ? 'concreto' : 'ladrillo');
    // Zócalo inferior en ladrillo (planta baja)
    addQuad('ladrillo', pt(0, 0, zBase), pt(L, 0, zBase), pt(L, 0, zBase + flH), pt(0, 0, zBase + flH), [0, 0], [L * 0.35, 0], [L * 0.35, flH * 0.35], [0, flH * 0.35]);

    // Pilastras laterales 3D salientes en concreto gris (+0.22 m)
    const pW = L >= 6.5 ? 0.90 : 0.0;
    if (pW > 0) {
      addLocalBox('concreto', pt, 0, pW, -0.35, 0.22, zBase, zTop + 0.75, 0.35);
      addLocalBox('concreto', pt, L - pW, L, -0.35, 0.22, zBase, zTop + 0.75, 0.35);
    }

    // Pisos 1..N con vanos profundos 3D reales (-0.45 m) y balcones en voladizo
    const innerL = L - 2 * pW;
    const bays = Math.max(1, Math.floor(innerL / 4.2));
    const bayW = innerL / bays;
    for (let fl = 1; fl < floors; fl++) {
      const fz0 = zBase + fl * flH;
      const fz1 = fz0 + flH;
      for (let k = 0; k < bays; k++) {
        const s0 = pW + k * bayW;
        const s1 = pW + (k + 1) * bayW;
        const hasBalc = (k % 2 === 1 && L > 8.5) || (L < 10.5 && fl % 3 === 0);
        add3DWindowBay(wallMat, 'metal', 'vidrio', pt, s0, s1, fz0, fz1, {
          sillH: hasBalc ? 0.22 : 0.85,
          headH: 0.32,
          pierW: 0.38,
          recess: -0.45,
          balcony: hasBalc,
          balconyDepth: L < 10.5 ? 1.15 : 0.95,
          slabMat: 'concreto',
          mullions: 2,
        });
      }
    }

    // Pretil 3D de cubierta (+0.75 m)
    addLocalBox('concreto', pt, pW, L - pW, -0.30, 0.24, zTop - 0.15, zTop + 0.75, 0.35);
  }
}

// Pérgolas superiores caladas en concreto conectando las 4 parejas de torres gemelas sobre Calle 127
for (const [e0, e1, nMid, zP] of [
  [-337, -322, 295.0, 45.4],
  [-353, -341, 297.0, 45.3],
  [-367, -355, 298.8, 45.1],
  [-385, -370, 300.7, 45.0],
]) {
  addBox('concreto', e0, nMid - 1.4, zP, e1, nMid - 0.9, zP + 0.65, 0.35);
  addBox('concreto', e0, nMid + 0.9, zP, e1, nMid + 1.4, zP + 0.65, 0.35);
  for (let bx = e0 + 1.0; bx < e1 - 0.5; bx += 1.8) {
    addBox('concreto', bx, nMid - 1.2, zP + 0.1, bx + 0.45, nMid + 1.2, zP + 0.55, 0.35);
  }
}

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
g.j.meshes.push({ name: 'Torres_Vecinas_PBR', primitives: prims });
g.j.nodes.push({ name: 'Torres_Vecinas_PBR', mesh: 0 });
g.j.scenes[0].nodes.push(0);

mkdirSync('public/secciones', { recursive: true });
mkdirSync('docs/secciones', { recursive: true });
const bytes = g.write('public/secciones/torres_vecinas.glb');
copyFileSync('public/secciones/torres_vecinas.glb', 'docs/secciones/torres_vecinas.glb');
console.log('torres_vecinas.glb UV+PBR generado:', (bytes / 1024).toFixed(1), 'KB');

import * as Cesium from 'cesium';
import { ASSETS } from './config';
import { createRealisticTrafficLight, buildRoadMarkingsAndSigns, type RealisticTrafficLight } from './road-props';

/**
 * Tráfico y peatones: vehículos suaves (sedán, SUV, taxi) sin colisiones,
 * semáforos reales en intersecciones y personas (con y sin perro) por los andenes.
 */

interface Campo { cell: number; x0: number; y0: number; w: number; h: number }
interface Carro {
  e: number;
  n: number;
  th: number;
  v: number;
  vActual: number;
  model: Cesium.Model | null;
  u: number;
  tipo: 'sedan' | 'suv' | 'taxi';
}
interface Peaton {
  e: number;
  n: number;
  th: number;
  v: number;
  model: Cesium.Model | null;
  u: number;
  conPerro: boolean;
}
interface Semaforo {
  e: number;
  n: number;
  u: number;
  faseOffset: number;
  rig: RealisticTrafficLight;
  nsEstado: 'green' | 'yellow' | 'red';
  ewEstado: 'green' | 'yellow' | 'red';
}

const COLORES = [
  '#e9e9e6', '#d8d9db', '#272a30', '#4b5563',
  '#8c9197', '#b8bcc0', '#7a1f1c', '#27405f',
  '#c9c2b4', '#3b4a3f', '#a33b2a',
];
const COLORES_ROPA = ['#2b4c7e', '#991b1b', '#1f2937', '#3f6212', '#7c2d12', '#475569', '#d97706', '#f3f4f6'];
const CARRIL = 3.2;

export interface Trafico {
  update(dt: number): void;
  setVisible(v: boolean): void;
  ready: Promise<void>;
  count: number;
  debug(): number[][];
}

export async function createTrafico(
  viewer: Cesium.Viewer,
  matrix: Cesium.Matrix4,
  total = 110,
): Promise<Trafico | null> {
  const base = ASSETS.secciones;
  let campo: Campo;
  let dist: Uint8Array;
  let cota: Uint8Array;
  try {
    campo = (await fetch(base + 'vias_campo.json').then((r) => r.json())) as Campo;
    const raw = new Uint8Array((await fetch(base + 'vias_campo.bin').then((r) => r.arrayBuffer())) as ArrayBuffer);
    dist = raw.subarray(0, campo.w * campo.h);
    cota = raw.subarray(campo.w * campo.h);
  } catch {
    return null;
  }
  const { cell, x0, y0, w, h } = campo;

  const d = (e: number, n: number): number => {
    const fx = (e - x0) / cell - 0.5;
    const fy = (n - y0) / cell - 0.5;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    if (ix < 0 || iy < 0 || ix >= w - 1 || iy >= h - 1) return 0;
    const tx = fx - ix;
    const ty = fy - iy;
    const i = iy * w + ix;
    return ((dist[i] * (1 - tx) + dist[i + 1] * tx) * (1 - ty) + (dist[i + w] * (1 - tx) + dist[i + w + 1] * tx) * ty) * 0.5;
  };

  const alt = (e: number, n: number): number => {
    const cx = Math.max(0, Math.min(w - 1, Math.floor((e - x0) / cell)));
    const cy = Math.max(0, Math.min(h - 1, Math.floor((n - y0) / cell)));
    const ci = cy * w + cx;
    if (dist[ci] > 0) return cota[ci] * 0.1 - 2;

    // Si la celda está fuera de la calzada (p. ej. andén o borde), promediar las celdas de vía cercanas
    let sumW = 0;
    let sumH = 0;
    for (let dy = -2; dy <= 2; dy++) {
      const yy = cy + dy;
      if (yy < 0 || yy >= h) continue;
      for (let dx = -2; dx <= 2; dx++) {
        const xx = cx + dx;
        if (xx < 0 || xx >= w) continue;
        const idx = yy * w + xx;
        if (dist[idx] === 0) continue;
        const wgt = 1 / (dx * dx + dy * dy + 0.5);
        sumW += wgt;
        sumH += (cota[idx] * 0.1 - 2) * wgt;
      }
    }
    return sumW > 0 ? sumH / sumW : 1.0;
  };

  // Celdas de calzada y celdas de andén (adyacentes a la vía)
  const libres: number[] = [];
  const andenes: number[] = [];
  const crucesCandidatos: Array<{ e: number; n: number; d: number }> = [];

  for (let iy = 2; iy < h - 2; iy++) {
    for (let ix = 2; ix < w - 2; ix++) {
      const i = iy * w + ix;
      const e = x0 + (ix + 0.5) * cell;
      const n = y0 + (iy + 0.5) * cell;
      const distCentro = Math.hypot(e + 180, n - 250);
      if (distCentro > 520) continue;

      const dm = dist[i] * 0.5;
      if (dm >= 2.6 && dm <= 5.0) libres.push(i);
      if (dm >= 6.0 && distCentro < 460) crucesCandidatos.push({ e, n, d: dm });

      // Andén: fuera de calzada (dist == 0) pero a 1-2 celdas de la vía
      if (dist[i] === 0 && distCentro < 430) {
        let cercaVia = false;
        for (let dy = -2; dy <= 2 && !cercaVia; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            if (dist[(iy + dy) * w + (ix + dx)] > 0) {
              cercaVia = true;
              break;
            }
          }
        }
        if (cercaVia) andenes.push(i);
      }
    }
  }
  if (!libres.length) return null;

  // Seleccionar hasta 6 intersecciones principales separadas por >= 90 m para semáforos y señalización
  crucesCandidatos.sort((a, b) => b.d - a.d);
  const semaforos: Semaforo[] = [];

  for (const c of crucesCandidatos) {
    if (semaforos.length >= 6) break;
    if (semaforos.some((s) => Math.hypot(s.e - c.e, s.n - c.n) < 90)) continue;
    const u = alt(c.e, c.n);
    const rig = createRealisticTrafficLight(viewer, matrix, c.e, c.n, alt);
    rig.ns.setState('green');
    rig.ew.setState('red');

    semaforos.push({
      e: c.e,
      n: c.n,
      u,
      faseOffset: semaforos.length * 4.5,
      rig,
      nsEstado: 'green',
      ewEstado: 'red',
    });
  }

  const senalizacion = buildRoadMarkingsAndSigns(viewer, matrix, semaforos, d, alt);

  const rnd = (() => {
    let s = 12345;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  })();

  /**
   * Sentido vial obligatorio según la geometría real de las vías (calzadas
   * separadas y sentidos únicos alrededor de Hotel La Fontana / Unicentro).
   * Devuelve un sesgo positivo si `th` coincide con el sentido permitido, o -1e6 si va en contravía.
   */
  const sentidoVial = (e: number, n: number, th: number): number => {
    const cx = Math.cos(th);
    const cy = Math.sin(th);

    // 1. Avenida N-S al oriente del hotel (e en [-168, -118]): izquierda ↓ (-N), derecha ↑ (+N)
    if (e >= -168 && e <= -118 && Math.abs(cy) > 0.35) {
      const eMed = -143;
      if (e < eMed) return cy < -0.2 ? 12 : -1e6;
      return cy > 0.2 ? 12 : -1e6;
    }

    // 2. Avenida E-O (Calle 127) al sur del hotel: calzada norte → (+E), calzada sur ← (-E)
    const nMed = 263 - (e + 420) * (51 / 380);
    if (Math.abs(n - nMed) < 26 && Math.abs(cx) > 0.35) {
      if (n > nMed) return cx > 0.2 ? 12 : -1e6;
      return cx < -0.2 ? 12 : -1e6;
    }

    // 3. Calle secundaria vertical al sur del hotel (e en [-255, -210], n < 222): ↓ (-N)
    if (e >= -255 && e <= -210 && n < 222 && Math.abs(cy) > 0.35) {
      return cy < -0.2 ? 10 : -1e6;
    }

    // 4. Calle horizontal inferior (n < 175, e < -215): → (+E)
    if (n < 175 && e < -215 && Math.abs(cx) > 0.35) {
      return cx > 0.2 ? 10 : -1e6;
    }

    // 5. Calle vertical izquierda (e < -385, n < 265): ↓ (-N)
    if (e < -385 && n < 265 && Math.abs(cy) > 0.35) {
      return cy < -0.2 ? 10 : -1e6;
    }

    return 0;
  };

  const carros: Carro[] = [];
  const demasiadoCerca = (e: number, n: number, excluir?: Carro) =>
    carros.some((o) => o !== excluir && Math.hypot(o.e - e, o.n - n) < 8.5);

  const spawn = (c: Carro): void => {
    for (let k = 0; k < 45; k++) {
      const i = libres[Math.floor(rnd() * libres.length)];
      const ce = x0 + ((i % w) + 0.5) * cell;
      const cn = y0 + (Math.floor(i / w) + 0.5) * cell;
      if (demasiadoCerca(ce, cn, c)) continue;

      let best = 0;
      let bestS = -1e9;
      for (let a = 0; a < 16; a++) {
        const th = (a / 16) * Math.PI * 2;
        const ax = ce + Math.cos(th) * 10;
        const ay = cn + Math.sin(th) * 10;
        const ahead = d(ax, ay);
        const dirScore = sentidoVial(ax, ay, th);
        if (dirScore < -1e4) continue;
        const right = d(ce + Math.sin(th) * 2.5, cn - Math.cos(th) * 2.5);
        const left = d(ce - Math.sin(th) * 2.5, cn + Math.cos(th) * 2.5);
        const s = -Math.abs(ahead - CARRIL) + (left > right ? 1.5 : 0) + dirScore;
        if (ahead > 1.5 && s > bestS) { bestS = s; best = th; }
      }
      if (bestS > -1e8) {
        c.e = ce;
        c.n = cn;
        c.th = best;
        c.vActual = c.v * 0.5;
        return;
      }
    }
  };

  for (let i = 0; i < total; i++) {
    const r = rnd();
    const tipo: Carro['tipo'] = r < 0.2 ? 'taxi' : r < 0.48 ? 'suv' : 'sedan';
    const c: Carro = { e: 0, n: 0, th: 0, v: 6.5 + rnd() * 5.0, vActual: 0, model: null, u: 0, tipo };
    spawn(c);
    carros.push(c);
  }

  // Peatones: ~35% paseando perro, ~65% caminando solos
  const peatones: Peaton[] = [];
  if (andenes.length > 0) {
    for (let i = 0; i < 42; i++) {
      const idx = andenes[Math.floor(rnd() * andenes.length)];
      const pe = x0 + ((idx % w) + 0.5) * cell;
      const pn = y0 + (Math.floor(idx / w) + 0.5) * cell;
      peatones.push({
        e: pe,
        n: pn,
        th: rnd() * Math.PI * 2,
        v: 1.15 + rnd() * 0.45,
        model: null,
        u: alt(pe, pn) + 0.16,
        conPerro: i % 3 === 0,
      });
    }
  }

  // Carros parqueados en los parqueaderos de Unicentro (Oriente, Occidente, Nororiente, Suroriente)
  interface Parqueado { e: number; n: number; u: number; th: number; tipo: Carro['tipo']; model: Cesium.Model | null }
  const parqueados: Parqueado[] = [];
  const addParkingBlock = (e0: number, e1: number, n0: number, n1: number, cols: number, rows: number, baseAngle: number, occ = 0.68) => {
    for (let cIdx = 0; cIdx < cols; cIdx++) {
      const e = cols === 1 ? (e0 + e1) * 0.5 : e0 + (cIdx / (cols - 1)) * (e1 - e0);
      for (let rIdx = 0; rIdx < rows; rIdx++) {
        if (rnd() > occ) continue;
        const n = rows === 1 ? (n0 + n1) * 0.5 : n0 + (rIdx / (rows - 1)) * (n1 - n0);
        if (d(e, n) > 0.3) continue; // no parquear encima de calzadas
        const r = rnd();
        const tipo: Carro['tipo'] = r < 0.08 ? 'taxi' : r < 0.42 ? 'suv' : 'sedan';
        const flip = rnd() < 0.5 ? 0 : Math.PI;
        const hEst = alt(e, n);
        parqueados.push({
          e: e + (rnd() - 0.5) * 0.25,
          n: n + (rnd() - 0.5) * 0.25,
          u: hEst > -1.5 ? hEst : 3.55,
          th: baseAngle + flip + (rnd() - 0.5) * 0.07,
          tipo,
          model: null,
        });
      }
    }
  };
  // Parqueadero Oriental (filas N-S, carros mirando E/O)
  addParkingBlock(92, 134, -22, 62, 4, 15, 0.05, 0.70);
  // Parqueadero Nororiental
  addParkingBlock(52, 108, 114, 146, 5, 4, 0.12, 0.62);
  // Parqueadero Suroriental
  addParkingBlock(58, 106, -104, -56, 4, 6, 0.10, 0.65);
  // Parqueadero Occidental
  addParkingBlock(-132, -98, -46, 32, 3, 12, 0.04, 0.68);

  const scratchT = new Cesium.Cartesian3();
  const scratchR = new Cesium.Matrix3();
  const scratchL = new Cesium.Matrix4();

  const place = (obj: { e: number; n: number; u: number; th: number; model: Cesium.Model | null }, zOff = 0.08): void => {
    if (!obj.model) return;
    Cesium.Cartesian3.fromElements(obj.e, obj.n, obj.u + zOff, scratchT);
    Cesium.Matrix3.fromRotationZ(obj.th, scratchR);
    Cesium.Matrix4.fromRotationTranslation(scratchR, scratchT, scratchL);
    obj.model.modelMatrix = Cesium.Matrix4.multiply(matrix, scratchL, new Cesium.Matrix4());
  };

  // Cargar vehículos suaves y personas (con y sin perro)
  const ready = (async () => {
    for (let i = 0; i < carros.length; i++) {
      const c = carros[i];
      const glb = c.tipo === 'taxi' ? 'carro_taxi.glb' : c.tipo === 'suv' ? 'carro_suv.glb' : 'carro.glb';
      try {
        const model = await Cesium.Model.fromGltfAsync({
          url: base + glb,
          upAxis: Cesium.Axis.Y,
          forwardAxis: Cesium.Axis.X,
          shadows: Cesium.ShadowMode.ENABLED,
          color: c.tipo === 'taxi' ? Cesium.Color.WHITE : Cesium.Color.fromCssColorString(COLORES[i % COLORES.length]),
          colorBlendMode: Cesium.ColorBlendMode.MIX,
          colorBlendAmount: c.tipo === 'taxi' ? 0 : 0.28,
        });
        viewer.scene.primitives.add(model);
        c.model = model;
        c.u = alt(c.e, c.n);
        place(c);
      } catch {
        /* sin carro */
      }
      if (i % 6 === 5) await new Promise((r) => setTimeout(r, 35));
    }

    for (let i = 0; i < peatones.length; i++) {
      const p = peatones[i];
      try {
        const model = await Cesium.Model.fromGltfAsync({
          url: base + (p.conPerro ? 'persona_perro.glb' : 'persona.glb'),
          upAxis: Cesium.Axis.Y,
          forwardAxis: Cesium.Axis.X,
          shadows: Cesium.ShadowMode.ENABLED,
          color: Cesium.Color.fromCssColorString(COLORES_ROPA[i % COLORES_ROPA.length]),
          colorBlendMode: Cesium.ColorBlendMode.MIX,
          colorBlendAmount: 0.25,
        });
        viewer.scene.primitives.add(model);
        p.model = model;
        place(p, 0.0);
      } catch {
        /* sin peatón */
      }
      if (i % 6 === 5) await new Promise((r) => setTimeout(r, 35));
    }

    for (let i = 0; i < parqueados.length; i++) {
      const pk = parqueados[i];
      const glb = pk.tipo === 'taxi' ? 'carro_taxi.glb' : pk.tipo === 'suv' ? 'carro_suv.glb' : 'carro.glb';
      try {
        const model = await Cesium.Model.fromGltfAsync({
          url: base + glb,
          upAxis: Cesium.Axis.Y,
          forwardAxis: Cesium.Axis.X,
          shadows: Cesium.ShadowMode.ENABLED,
          color: pk.tipo === 'taxi' ? Cesium.Color.WHITE : Cesium.Color.fromCssColorString(COLORES[(i * 3) % COLORES.length]),
          colorBlendMode: Cesium.ColorBlendMode.MIX,
          colorBlendAmount: pk.tipo === 'taxi' ? 0 : 0.28,
        });
        viewer.scene.primitives.add(model);
        pk.model = model;
        place(pk);
      } catch {
        /* sin carro parqueado */
      }
      if (i % 8 === 7) await new Promise((r) => setTimeout(r, 30));
    }
  })();

  let visible = true;
  let tiempo = 0;
  const esAnden = (e: number, n: number) => d(e, n) === 0 && d(e + 4, n) + d(e - 4, n) + d(e, n + 4) + d(e, n - 4) > 0.5;

  return {
    ready,
    count: total,
    debug: () => carros.map((c) => [Math.round(c.e), Math.round(c.n), +c.u.toFixed(1), c.model ? 1 : 0]),
    setVisible(v: boolean) {
      visible = v;
      for (const c of carros) if (c.model) c.model.show = v;
      for (const pk of parqueados) if (pk.model) pk.model.show = v;
      for (const p of peatones) if (p.model) p.model.show = v;
      for (const s of semaforos) s.rig.setVisible(v);
      senalizacion.setVisible(v);
    },
    update(dt: number) {
      if (!visible) return;
      const stepDt = Math.min(0.08, Math.max(0.001, dt));
      tiempo += stepDt;

      // Actualizar ciclo de semáforos (24 s: 10s verde, 2s amarillo, 12s rojo)
      for (const s of semaforos) {
        const cyc = (tiempo + s.faseOffset) % 24;
        const ns: Semaforo['nsEstado'] = cyc < 10 ? 'green' : cyc < 12 ? 'yellow' : 'red';
        const ew: Semaforo['ewEstado'] = cyc >= 12 && cyc < 22 ? 'green' : cyc >= 22 ? 'yellow' : 'red';
        if (ns !== s.nsEstado) {
          s.nsEstado = ns;
          s.rig.ns.setState(ns);
        }
        if (ew !== s.ewEstado) {
          s.ewEstado = ew;
          s.rig.ew.setState(ew);
        }
      }

      // Actualizar vehículos con seguimiento (sin choques) y respeto a semáforos
      for (let idx = 0; idx < carros.length; idx++) {
        const c = carros[idx];
        if (!c.model) continue;

        let best = 0;
        let bestS = -1e9;
        for (let k = -4; k <= 4; k++) {
          const dth = k * 0.13;
          const th = c.th + dth;
          const ax = c.e + Math.cos(th) * 9;
          const ay = c.n + Math.sin(th) * 9;
          const ahead = d(ax, ay);
          if (ahead < 1.1) continue;
          const mid = d(c.e + Math.cos(th) * 4.5, c.n + Math.sin(th) * 4.5);
          if (mid < 0.9) continue;
          const dirScore = sentidoVial(ax, ay, th);
          if (dirScore < -1e4) continue;
          const right = d(ax + Math.sin(th) * 2.5, ay - Math.cos(th) * 2.5);
          const left = d(ax - Math.sin(th) * 2.5, ay + Math.cos(th) * 2.5);
          const s = -Math.abs(Math.min(ahead, 6) - CARRIL) - Math.abs(dth) * 1.6 + (left >= right ? 0.6 : 0) + dirScore;
          if (s > bestS) { bestS = s; best = dth; }
        }

        if (bestS < -1e8 || Math.hypot(c.e + 180, c.n - 250) > 580) {
          spawn(c);
          c.u = alt(c.e, c.n);
          place(c);
          continue;
        }

        const cosTh = Math.cos(c.th);
        const sinTh = Math.sin(c.th);
        let factorVel = 1.0;

        // 1. Evitar choques con carros adelante
        for (let j = 0; j < carros.length; j++) {
          if (j === idx || !carros[j].model) continue;
          const o = carros[j];
          const dx = o.e - c.e;
          const dy = o.n - c.n;
          const distSq = dx * dx + dy * dy;
          if (distSq > 225) continue;
          const fwd = dx * cosTh + dy * sinTh;
          const lat = Math.abs(-dx * sinTh + dy * cosTh);
          if (fwd > 0 && fwd < 12.5 && lat < 2.35) {
            const f = fwd < 6.4 ? 0 : (fwd - 6.4) / 6.1;
            if (f < factorVel) factorVel = f;
          } else if (distSq < 22 && j < idx) {
            factorVel = 0;
          }
        }

        // 2. Frenar ante semáforo en rojo o amarillo
        const esEW = Math.abs(cosTh) > Math.abs(sinTh);
        for (const s of semaforos) {
          const estado = esEW ? s.ewEstado : s.nsEstado;
          if (estado === 'green') continue;
          const dx = s.e - c.e;
          const dy = s.n - c.n;
          const fwd = dx * cosTh + dy * sinTh;
          const lat = Math.abs(-dx * sinTh + dy * cosTh);
          if (fwd > 7.0 && fwd < 21.0 && lat < 9.0) {
            const f = fwd < 10.5 ? 0 : (fwd - 10.5) / 10.5;
            if (f < factorVel) factorVel = f;
          }
        }

        const slow = 1 - Math.min(0.55, Math.abs(best) * 1.4);
        const vObjetivo = c.v * slow * factorVel;
        c.vActual += (vObjetivo - c.vActual) * Math.min(1, stepDt * 4.5);

        if (c.vActual > 0.05) {
          c.th += Math.max(-1.4 * stepDt, Math.min(1.4 * stepDt, best));
          const nx = c.e + Math.cos(c.th) * c.vActual * stepDt;
          const ny = c.n + Math.sin(c.th) * c.vActual * stepDt;
          if (d(nx, ny) >= 0.7) {
            c.e = nx;
            c.n = ny;
          } else {
            c.th += 0.6;
          }
          const hTarget = Math.max(
            alt(c.e, c.n),
            alt(c.e + Math.cos(c.th) * 1.4, c.n + Math.sin(c.th) * 1.4),
            alt(c.e - Math.cos(c.th) * 1.4, c.n - Math.sin(c.th) * 1.4),
          );
          c.u += (hTarget - c.u) * Math.min(1, stepDt * 8);
        }
        place(c);
      }

      // Actualizar peatones (con y sin perro) sobre andenes
      for (const p of peatones) {
        if (!p.model) continue;
        const nx = p.e + Math.cos(p.th) * p.v * stepDt;
        const ny = p.n + Math.sin(p.th) * p.v * stepDt;
        if (esAnden(nx, ny) && Math.hypot(nx + 180, ny - 250) < 430) {
          p.e = nx;
          p.n = ny;
          p.u += (alt(p.e, p.n) + 0.16 - p.u) * Math.min(1, stepDt * 4);
        } else {
          p.th += 0.9 + rnd() * 1.2;
        }
        place(p, 0.0);
      }
    },
  };
}

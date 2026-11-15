import * as Cesium from 'cesium';
import { ASSETS } from './config';

/**
 * Tráfico: carros que recorren las vías modeladas.
 *
 * No hay ejes viales: cada carro se guía por un campo de distancia al borde de
 * calzada (secciones/vias_campo.bin, rasterizado de la malla de vías). Avanza
 * manteniéndose a un carril del borde derecho y, en los cruces, sigue por donde
 * la calzada continúa.
 */

interface Campo { cell: number; x0: number; y0: number; w: number; h: number }
interface Carro { e: number; n: number; th: number; v: number; model: Cesium.Model | null; u: number }

const COLORES = ['#e9e9e6', '#d8d9db', '#1f2124', '#2a2d33', '#8c9197', '#b8bcc0', '#7a1f1c', '#27405f', '#f1c40f', '#c9c2b4', '#3b4a3f', '#a33b2a'];
const CARRIL = 3.2;

export interface Trafico {
  update(dt: number): void;
  setVisible(v: boolean): void;
  count: number;
  debug(): number[][];
}

export async function createTrafico(viewer: Cesium.Viewer, matrix: Cesium.Matrix4, total = 150): Promise<Trafico | null> {
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

  /** distancia al borde de calzada en metros (0 fuera de la vía), con interpolación bilineal */
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
    const ix = Math.max(0, Math.min(w - 1, Math.floor((e - x0) / cell)));
    const iy = Math.max(0, Math.min(h - 1, Math.floor((n - y0) / cell)));
    return cota[iy * w + ix] * 0.1 - 2;
  };

  // celdas de calzada donde cabe un carro en su carril
  const libres: number[] = [];
  // el tráfico se concentra a 520 m del hotel, que es lo que se mira
  for (let i = 0; i < dist.length; i++) {
    if (dist[i] * 0.5 < 2.6 || dist[i] * 0.5 > 5) continue;
    const e = x0 + ((i % w) + 0.5) * cell;
    const n = y0 + (Math.floor(i / w) + 0.5) * cell;
    if (Math.hypot(e + 180, n - 250) < 520) libres.push(i);
  }
  if (!libres.length) return null;

  const rnd = (() => { let s = 12345; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); })();
  const spawn = (c: Carro): void => {
    for (let k = 0; k < 30; k++) {
      const i = libres[Math.floor(rnd() * libres.length)];
      c.e = x0 + ((i % w) + 0.5) * cell;
      c.n = y0 + (Math.floor(i / w) + 0.5) * cell;
      // orientación: a lo largo de la vía (donde la distancia al borde cambia menos), con el borde a la derecha
      let best = 0;
      let bestS = -1e9;
      for (let a = 0; a < 16; a++) {
        const th = (a / 16) * Math.PI * 2;
        const ahead = d(c.e + Math.cos(th) * 10, c.n + Math.sin(th) * 10);
        const right = d(c.e + Math.sin(th) * 2.5, c.n - Math.cos(th) * 2.5);
        const left = d(c.e - Math.sin(th) * 2.5, c.n + Math.cos(th) * 2.5);
        const s = -Math.abs(ahead - CARRIL) + (left > right ? 1.5 : 0);
        if (ahead > 1.5 && s > bestS) { bestS = s; best = th; }
      }
      if (bestS > -1e8) { c.th = best; return; }
    }
  };

  const carros: Carro[] = [];
  for (let i = 0; i < total; i++) {
    const c: Carro = { e: 0, n: 0, th: 0, v: 7 + rnd() * 6, model: null, u: 0 };
    spawn(c);
    carros.push(c);
  }

  const scratchT = new Cesium.Cartesian3();
  const scratchR = new Cesium.Matrix3();
  const scratchL = new Cesium.Matrix4();
  const place = (c: Carro): void => {
    if (!c.model) return;
    Cesium.Cartesian3.fromElements(c.e, c.n, c.u + 0.03, scratchT);
    Cesium.Matrix3.fromRotationZ(c.th, scratchR);
    Cesium.Matrix4.fromRotationTranslation(scratchR, scratchT, scratchL);
    c.model.modelMatrix = Cesium.Matrix4.multiply(matrix, scratchL, new Cesium.Matrix4());
  };

  // los modelos entran de a pocos para no frenar la carga
  (async () => {
    for (let i = 0; i < carros.length; i++) {
      try {
        const model = await Cesium.Model.fromGltfAsync({
          url: base + 'carro.glb',
          upAxis: Cesium.Axis.Y,
          forwardAxis: Cesium.Axis.X,
          shadows: Cesium.ShadowMode.ENABLED,
          color: Cesium.Color.fromCssColorString(COLORES[i % COLORES.length]),
          colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
        });
        viewer.scene.primitives.add(model);
        carros[i].model = model;
        carros[i].u = alt(carros[i].e, carros[i].n);
        place(carros[i]);
      } catch {
        /* sin carro */
      }
      if (i % 8 === 7) await new Promise((r) => setTimeout(r, 40));
    }
  })();

  let visible = true;
  return {
    count: total,
    debug: () => carros.map((c) => [Math.round(c.e), Math.round(c.n), +c.u.toFixed(1), c.model ? 1 : 0]),
    setVisible(v: boolean) {
      visible = v;
      for (const c of carros) if (c.model) c.model.show = v;
    },
    update(dt: number) {
      if (!visible) return;
      for (const c of carros) {
        if (!c.model) continue;
        // dirección: entre varias opciones, la que mantiene el carril y no se sale de la vía
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
          const right = d(ax + Math.sin(th) * 2.5, ay - Math.cos(th) * 2.5);
          const left = d(ax - Math.sin(th) * 2.5, ay + Math.cos(th) * 2.5);
          const s = -Math.abs(Math.min(ahead, 6) - CARRIL) - Math.abs(dth) * 1.6 + (left >= right ? 0.6 : 0);
          if (s > bestS) { bestS = s; best = dth; }
        }
        if (bestS < -1e8 || Math.hypot(c.e + 180, c.n - 250) > 600) {
          spawn(c); // callejón sin salida o borde del modelo: reaparece en otra vía
          c.u = alt(c.e, c.n);
          place(c);
          continue;
        }
        c.th += Math.max(-1.4 * dt, Math.min(1.4 * dt, best));
        const slow = 1 - Math.min(0.55, Math.abs(best) * 1.4);
        c.e += Math.cos(c.th) * c.v * slow * dt;
        c.n += Math.sin(c.th) * c.v * slow * dt;
        c.u += (alt(c.e, c.n) - c.u) * Math.min(1, dt * 6);
        place(c);
      }
    },
  };
}

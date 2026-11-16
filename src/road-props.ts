import * as Cesium from 'cesium';

export interface SignalHead {
  red: Cesium.Entity;
  yellow: Cesium.Entity;
  green: Cesium.Entity;
  setState(state: 'green' | 'yellow' | 'red'): void;
}

export interface RealisticTrafficLight {
  ns: SignalHead;
  ew: SignalHead;
  setVisible(v: boolean): void;
}

const ON_RED = Cesium.Color.fromCssColorString('#ff2b1a');
const ON_YELLOW = Cesium.Color.fromCssColorString('#ffc400');
const ON_GREEN = Cesium.Color.fromCssColorString('#00e862');
const OFF_LENS = Cesium.Color.fromCssColorString('#1a1d22');

function makeSignTexture(kind: 'pare' | 'peaton' | 'vel30'): string {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);

  if (kind === 'pare') {
    // Octágono rojo PARE
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = ((i + 0.5) * Math.PI) / 4;
      const x = 64 + Math.cos(a) * 58;
      const y = 64 + Math.sin(a) * 58;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#c81e1e';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 31px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PARE', 64, 66);
  } else if (kind === 'peaton') {
    // Rombo amarillo paso peatonal
    ctx.beginPath();
    ctx.moveTo(64, 6);
    ctx.lineTo(122, 64);
    ctx.lineTo(64, 122);
    ctx.lineTo(6, 64);
    ctx.closePath();
    ctx.fillStyle = '#f5b800';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#18181b';
    ctx.stroke();
    // Silueta peatón + cebra
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(64, 38, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(59, 47, 10, 22);
    ctx.fillRect(54, 69, 7, 20);
    ctx.fillRect(67, 69, 7, 20);
  } else {
    // Señal reglamentaria 30 km/h
    ctx.beginPath();
    ctx.arc(64, 64, 56, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 11;
    ctx.strokeStyle = '#c81e1e';
    ctx.stroke();
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 46px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('30', 64, 67);
  }
  return c.toDataURL('image/png');
}

export function createRealisticTrafficLight(
  viewer: Cesium.Viewer,
  matrix: Cesium.Matrix4,
  ce: number,
  cn: number,
  alt: (e: number, n: number) => number,
): RealisticTrafficLight {
  const localToWorld = (e: number, n: number, u: number) =>
    Cesium.Matrix4.multiplyByPoint(matrix, new Cesium.Cartesian3(e, n, u), new Cesium.Cartesian3());
  const entities: Cesium.Entity[] = [];

  const pe = ce + 7.2;
  const pn = cn + 7.2;
  const pu = alt(pe, pn);
  const poleCol = Cesium.Color.fromCssColorString('#2a303a');
  const headCol = Cesium.Color.fromCssColorString('#14171c');
  const bandCol = Cesium.Color.fromCssColorString('#eab308');

  const addHead = (hx: number, hy: number, hz: number, facingNS: boolean): SignalHead => {
    const bw = facingNS ? 0.42 : 0.30;
    const bd = facingNS ? 0.30 : 0.42;
    entities.push(
      viewer.entities.add({
        position: localToWorld(hx, hy, hz),
        box: { dimensions: new Cesium.Cartesian3(bw, bd, 1.18), material: headCol },
      }),
    );

    const makeLens = (dz: number, col: Cesium.Color) => {
      const ent = viewer.entities.add({
        position: localToWorld(hx, hy, hz + dz),
        box: {
          dimensions: new Cesium.Cartesian3(facingNS ? 0.24 : 0.33, facingNS ? 0.33 : 0.24, 0.24),
          material: col,
        },
      });
      entities.push(ent);
      return ent;
    };

    const red = makeLens(0.36, OFF_LENS);
    const yellow = makeLens(0.0, OFF_LENS);
    const green = makeLens(-0.36, OFF_LENS);

    const setState = (state: 'green' | 'yellow' | 'red') => {
      red.box!.material = new Cesium.ColorMaterialProperty(state === 'red' ? ON_RED : OFF_LENS);
      yellow.box!.material = new Cesium.ColorMaterialProperty(state === 'yellow' ? ON_YELLOW : OFF_LENS);
      green.box!.material = new Cesium.ColorMaterialProperty(state === 'green' ? ON_GREEN : OFF_LENS);
    };
    return { red, yellow, green, setState };
  };

  // En la intersección del puente sobre el Canal (Calle 127 x Cra 15, ~(-148.8, 216.3)),
  // ubicar los 5 semáforos exactos en las esquinas marcadas
  if (Math.abs(ce + 148.8) < 12 && Math.abs(cn - 216.3) < 12) {
    const specs: Array<{ px: number; py: number; dx: number; dy: number; isNS: boolean }> = [
      { px: -159.5, py: 232.0, dx: 4.2, dy: 0, isNS: true },   // Esquina NO calzada occidente
      { px: -163.5, py: 226.5, dx: 0, dy: -4.0, isNS: false }, // Esquina NO Calle 127 superior
      { px: -163.0, py: 203.0, dx: 0, dy: 4.0, isNS: false },  // Esquina SO calzada occidente
      { px: -133.5, py: 231.5, dx: 4.2, dy: 0, isNS: true },   // Esquina NE calzada oriente
      { px: -133.0, py: 202.5, dx: 0, dy: 4.0, isNS: false },  // Esquina SE calzada oriente
    ];
    const nsHeads: SignalHead[] = [];
    const ewHeads: SignalHead[] = [];
    for (const sp of specs) {
      const zu = alt(sp.px, sp.py);
      entities.push(
        viewer.entities.add({
          position: localToWorld(sp.px, sp.py, zu + 2.9),
          cylinder: { length: 5.8, topRadius: 0.09, bottomRadius: 0.13, material: poleCol },
        }),
        viewer.entities.add({
          position: localToWorld(sp.px, sp.py, zu + 1.2),
          cylinder: { length: 0.45, topRadius: 0.132, bottomRadius: 0.132, material: bandCol },
        }),
        viewer.entities.add({
          position: localToWorld(sp.px + sp.dx * 0.5, sp.py + sp.dy * 0.5, zu + 5.65),
          box: {
            dimensions: new Cesium.Cartesian3(Math.max(0.14, Math.abs(sp.dx)), Math.max(0.14, Math.abs(sp.dy)), 0.14),
            material: poleCol,
          },
        }),
      );
      const h = addHead(sp.px + sp.dx * 0.78, sp.py + sp.dy * 0.78, zu + 5.1, sp.isNS);
      (sp.isNS ? nsHeads : ewHeads).push(h);
    }
    const groupHead = (arr: SignalHead[]): SignalHead => ({
      red: arr[0].red,
      yellow: arr[0].yellow,
      green: arr[0].green,
      setState: (st) => { for (const h of arr) h.setState(st); },
    });
    return {
      ns: groupHead(nsHeads),
      ew: groupHead(ewHeads),
      setVisible(v: boolean) {
        for (const e of entities) e.show = v;
      },
    };
  }

  // Poste vertical + banda amarilla reflectiva en la base (intersecciones generales)
  entities.push(
    viewer.entities.add({
      position: localToWorld(pe, pn, pu + 2.9),
      cylinder: { length: 5.8, topRadius: 0.09, bottomRadius: 0.13, material: poleCol },
    }),
    viewer.entities.add({
      position: localToWorld(pe, pn, pu + 1.2),
      cylinder: { length: 0.45, topRadius: 0.132, bottomRadius: 0.132, material: bandCol },
    }),
  );

  const armLen = 4.6;
  entities.push(
    viewer.entities.add({
      position: localToWorld(pe - armLen * 0.5, pn, pu + 5.65),
      box: { dimensions: new Cesium.Cartesian3(armLen, 0.14, 0.14), material: poleCol },
    }),
    viewer.entities.add({
      position: localToWorld(pe, pn - armLen * 0.5, pu + 5.65),
      box: { dimensions: new Cesium.Cartesian3(0.14, armLen, 0.14), material: poleCol },
    }),
  );

  const ns = addHead(pe - 3.4, pn, pu + 5.1, true);
  const ew = addHead(pe, pn - 3.4, pu + 5.1, false);

  return {
    ns,
    ew,
    setVisible(v: boolean) {
      for (const e of entities) e.show = v;
    },
  };
}

export function buildRoadMarkingsAndSigns(
  viewer: Cesium.Viewer,
  matrix: Cesium.Matrix4,
  cruces: { e: number; n: number }[],
  d: (e: number, n: number) => number,
  alt: (e: number, n: number) => number,
): { setVisible(v: boolean): void } {
  const localToWorld = (e: number, n: number, u: number) =>
    Cesium.Matrix4.multiplyByPoint(matrix, new Cesium.Cartesian3(e, n, u), new Cesium.Cartesian3());

  const instances: Cesium.GeometryInstance[] = [];
  const WHITE = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('#f3f4f6').withAlpha(0.92));
  const YELLOW = Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('#f5b800').withAlpha(0.92));

  const addStripe = (ce: number, cn: number, lenE: number, lenN: number, angle: number, color: Cesium.ColorGeometryInstanceAttribute) => {
    if (d(ce, cn) < 0.8) return;
    const u = alt(ce, cn) + 0.07;
    const pos = localToWorld(ce, cn, u);
    const r = Cesium.Matrix3.fromRotationZ(angle);
    const localM = Cesium.Matrix4.fromRotationTranslation(r, new Cesium.Cartesian3(ce, cn, u));
    const worldM = Cesium.Matrix4.multiply(matrix, localM, new Cesium.Matrix4());
    void pos;
    instances.push(
      new Cesium.GeometryInstance({
        geometry: Cesium.BoxGeometry.fromDimensions({
          dimensions: new Cesium.Cartesian3(lenE, lenN, 0.04),
        }),
        modelMatrix: worldM,
        attributes: { color },
      }),
    );
  };

  // 1. Cebras peatonales y líneas de PARE en las intersecciones principales
  const ang127 = Math.atan2(-51, 380);
  for (const c of cruces) {
    if (Math.abs(c.e + 148.8) < 12 && Math.abs(c.n - 216.3) < 12) {
      // 7 cebras exactas marcadas en azul en la intersección del puente Calle 127 x Cra 15
      const zebras: Array<{ bx: number; by: number; horiz: boolean; ang: number }> = [
        { bx: -154.0, by: 230.0, horiz: true, ang: 0 },       // Norte calzada occidente (barras N-S)
        { bx: -164.5, by: 221.5, horiz: false, ang: ang127 }, // Calle 127 superior occidente (barras E-O)
        { bx: -164.5, by: 210.5, horiz: false, ang: ang127 }, // Calle 127 inferior occidente (barras E-O)
        { bx: -154.0, by: 202.5, horiz: true, ang: 0 },       // Sur calzada occidente (barras N-S)
        { bx: -129.0, by: 229.0, horiz: false, ang: ang127 }, // Norte calzada oriente (barras E-O)
        { bx: -128.5, by: 211.5, horiz: false, ang: ang127 }, // Calle 127 oriente (barras E-O)
        { bx: -136.5, by: 202.5, horiz: true, ang: 0 },       // Sur calzada oriente (barras N-S)
      ];
      for (const z of zebras) {
        for (let k = -3; k <= 3; k++) {
          const sx = z.horiz ? z.bx + k * 1.1 : z.bx;
          const sy = z.horiz ? z.by : z.by + k * 1.05;
          addStripe(sx, sy, z.horiz ? 0.52 : 2.8, z.horiz ? 2.8 : 0.52, z.ang, WHITE);
        }
      }
      continue;
    }
    // 4 aproximaciones (N, S, E, O) a 9.5 m del centro del cruce
    const approaches = [
      { de: 0, dn: 9.5, horiz: true },
      { de: 0, dn: -9.5, horiz: true },
      { de: 9.5, dn: 0, horiz: false },
      { de: -9.5, dn: 0, horiz: false },
    ];
    for (const ap of approaches) {
      const bx = c.e + ap.de;
      const by = c.n + ap.dn;
      if (d(bx, by) < 1.2) continue;
      // 7 franjas blancas de cebra
      for (let k = -3; k <= 3; k++) {
        const sx = ap.horiz ? bx + k * 1.15 : bx;
        const sy = ap.horiz ? by : by + k * 1.15;
        addStripe(sx, sy, ap.horiz ? 0.52 : 2.8, ap.horiz ? 2.8 : 0.52, 0, WHITE);
      }
      // Línea de PARE (1.9 m antes de la cebra)
      const lx = bx + (ap.de === 0 ? 0 : Math.sign(ap.de) * 2.1);
      const ly = by + (ap.dn === 0 ? 0 : Math.sign(ap.dn) * 2.1);
      addStripe(lx, ly, ap.horiz ? 6.8 : 0.42, ap.horiz ? 0.42 : 6.8, 0, WHITE);
    }
  }

  // 2. Líneas discontinuas de carril en vías principales (cada 8 m)
  // Avenida N-S al oriente del hotel (e ≈ -154 y -132)
  for (let n = -80; n <= 440; n += 8) {
    addStripe(-154, n, 0.18, 3.2, 0, WHITE);
    addStripe(-132, n, 0.18, 3.2, 0, WHITE);
  }
  // Avenida E-O (Calle 127) al sur del hotel
  for (let e = -420; e <= 160; e += 8) {
    const nMed = 263 - (e + 420) * (51 / 380);
    addStripe(e, nMed + 7.5, 3.2, 0.18, ang127, WHITE);
    addStripe(e, nMed - 7.5, 3.2, 0.18, ang127, WHITE);
    addStripe(e, nMed, 4.5, 0.18, ang127, YELLOW);
  }
  // Carrera 15 al oriente de Unicentro (e ≈ 158)
  for (let n = -160; n <= 360; n += 8) {
    addStripe(158, n, 0.18, 3.2, 0, WHITE);
  }

  let markingsPrim: Cesium.Primitive | null = null;
  if (instances.length > 0) {
    markingsPrim = new Cesium.Primitive({
      geometryInstances: instances,
      appearance: new Cesium.PerInstanceColorAppearance({ flat: true, translucent: true }),
      asynchronous: false,
    });
    viewer.scene.primitives.add(markingsPrim);
  }

  // 3. Señales verticales (PARE, Paso Peatonal, Límite 30) en esquinas de cruces
  const signEntities: Cesium.Entity[] = [];
  const texPare = makeSignTexture('pare');
  const texPeaton = makeSignTexture('peaton');
  const texVel30 = makeSignTexture('vel30');
  const postCol = Cesium.Color.fromCssColorString('#9ca3af');

  cruces.forEach((c, idx) => {
    const corners = [
      { e: c.e - 7.2, n: c.n - 7.2, tex: texPare },
      { e: c.e + 7.2, n: c.n - 7.2, tex: idx % 2 === 0 ? texPeaton : texVel30 },
    ];
    for (const s of corners) {
      const su = alt(s.e, s.n);
      signEntities.push(
        viewer.entities.add({
          position: localToWorld(s.e, s.n, su + 1.15),
          cylinder: { length: 2.3, topRadius: 0.035, bottomRadius: 0.035, material: postCol },
        }),
        viewer.entities.add({
          position: localToWorld(s.e, s.n, su + 2.45),
          billboard: {
            image: s.tex,
            width: 0.72,
            height: 0.72,
            sizeInMeters: true,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
          },
        }),
      );
    }
  });

  return {
    setVisible(v: boolean) {
      if (markingsPrim) markingsPrim.show = v;
      for (const e of signEntities) e.show = v;
    },
  };
}

/**
 * Fuente / cascada "La Fontana", marquesina de acceso y faroles de la plazoleta
 * frente a la fachada sur del Hotel Estelar La Fontana.
 */
export function createHotelFountain(
  viewer: Cesium.Viewer,
  matrix: Cesium.Matrix4,
): { update(t: number): void; setVisible(v: boolean): void } {
  const localToWorld = (e: number, n: number, u: number) =>
    Cesium.Matrix4.multiplyByPoint(matrix, new Cesium.Cartesian3(e, n, u), new Cesium.Cartesian3());
  const entities: Cesium.Entity[] = [];

  const fe = -225.0;
  const fn = 263.5;
  const fu = 4.17;

  const stone = Cesium.Color.fromCssColorString('#7a7771');
  const darkBronze = Cesium.Color.fromCssColorString('#3d3833');
  const planter = Cesium.Color.fromCssColorString('#24471b');
  const poolCol = Cesium.Color.fromCssColorString('#3d7f8f').withAlpha(0.88);
  const warmGlow = Cesium.Color.fromCssColorString('#ffbe55');

  // Basamento, anillo verde y espejo de agua
  entities.push(
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 0.32),
      cylinder: { length: 0.64, topRadius: 3.3, bottomRadius: 3.6, material: stone, slices: 12 },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 0.56),
      cylinder: { length: 0.24, topRadius: 3.45, bottomRadius: 3.55, material: planter, slices: 12 },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 0.66),
      cylinder: { length: 0.08, topRadius: 2.95, bottomRadius: 2.95, material: poolCol, slices: 24 },
    }),
    // Pedestal y dos platos de la cascada
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 1.35),
      cylinder: { length: 1.9, topRadius: 0.34, bottomRadius: 0.48, material: darkBronze },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 1.35),
      cylinder: { length: 0.18, topRadius: 1.95, bottomRadius: 1.55, material: darkBronze, slices: 24 },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 2.2),
      cylinder: { length: 0.16, topRadius: 1.15, bottomRadius: 0.85, material: darkBronze, slices: 24 },
    }),
  );

  // Cortinas de agua animadas (chorro central + dos caídas de cascada)
  let waterPhase = 0;
  const jetCol = new Cesium.ColorMaterialProperty(
    new Cesium.CallbackProperty(() => {
      const a = 0.62 + 0.18 * Math.sin(waterPhase * 7.0);
      return Cesium.Color.fromCssColorString('#d9f4ff').withAlpha(a);
    }, false),
  );
  const veilCol = new Cesium.ColorMaterialProperty(
    new Cesium.CallbackProperty(() => {
      const a = 0.46 + 0.16 * Math.cos(waterPhase * 5.5);
      return Cesium.Color.fromCssColorString('#bce8f7').withAlpha(a);
    }, false),
  );

  entities.push(
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 2.85),
      cylinder: { length: 1.25, topRadius: 0.08, bottomRadius: 0.36, material: jetCol, slices: 16 },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 1.78),
      cylinder: { length: 0.85, topRadius: 1.08, bottomRadius: 1.22, material: veilCol, slices: 24 },
    }),
    viewer.entities.add({
      position: localToWorld(fe, fn, fu + 1.02),
      cylinder: { length: 0.72, topRadius: 1.88, bottomRadius: 2.08, material: veilCol, slices: 24 },
    }),
  );

  // Faroles cálidos en la reja de la plazoleta y marquesina
  for (let e = -246; e <= -202; e += 8.5) {
    entities.push(
      viewer.entities.add({
        position: localToWorld(e, 255.8, fu + 1.1),
        cylinder: { length: 2.2, topRadius: 0.04, bottomRadius: 0.05, material: darkBronze },
      }),
      viewer.entities.add({
        position: localToWorld(e, 255.8, fu + 2.3),
        ellipsoid: { radii: new Cesium.Cartesian3(0.16, 0.16, 0.22), material: warmGlow },
      }),
    );
  }

  return {
    update(t: number) {
      waterPhase = t;
    },
    setVisible(v: boolean) {
      for (const e of entities) e.show = v;
    },
  };
}

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

  // Poste vertical + banda amarilla reflectiva en la base
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

  // Brazos en voladizo (ménsulas) hacia ambos sentidos de la intersección
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

  const addHead = (hx: number, hy: number, hz: number, facingNS: boolean): SignalHead => {
    const bw = facingNS ? 0.42 : 0.30;
    const bd = facingNS ? 0.30 : 0.42;
    // Carcasa negra del semáforo
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
  for (const c of cruces) {
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
  const ang127 = Math.atan2(-51, 380);
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

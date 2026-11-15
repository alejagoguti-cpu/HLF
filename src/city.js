import * as THREE from 'three';

/* ============================================================
   Contexto: ciudad de Bogotá + cordillera + suelo
   ============================================================ */

function noise2(seed) {
  const rnd = (() => { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; })();
  const perm = new Uint8Array(512), p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y) => ((h & 1) ? x : -x) + ((h & 2) ? y : -y);
  return (x, y) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = fade(xf), v = fade(yf);
    const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
    return lerp(lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u), lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u), v);
  };
}
const fbmN = (n, x, y, oct = 4) => {
  let a = 0.5, f = 1, s = 0;
  for (let i = 0; i < oct; i++) { s += a * n(x * f, y * f); f *= 2.03; a *= 0.5; }
  return s;
};

/* ---------- cordillera andina ---------- */
export function buildMountains(span, { night = false } = {}) {
  const group = new THREE.Group();
  const rings = [
    { r: span * 0.9, h: span * 0.055, col: 0x93a9bd, op: 0.95, seed: 11 },
    { r: span * 1.45, h: span * 0.075, col: 0x8ba2b8, op: 0.75, seed: 37 },
    { r: span * 2.1, h: span * 0.095, col: 0x8199b0, op: 0.55, seed: 71 },
  ];
  for (const { r, h, col, op, seed } of rings) {
    const n = noise2(seed);
    const segments = 420;
    const pos = [], colr = [], idx = [];
    const base = new THREE.Color(col);
    const top = new THREE.Color(0xf2f6fa);
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const ridge = Math.abs(fbmN(n, Math.cos(a) * 2.2 + 5, Math.sin(a) * 2.2 + 5, 5));
      const hh = h * (0.35 + 0.85 * ridge);
      const rr = r * (0.97 + 0.06 * n(Math.cos(a) * 6, Math.sin(a) * 6));
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      pos.push(x, -h * 0.25, z); colr.push(base.r * 0.72, base.g * 0.74, base.b * 0.8);
      pos.push(x, hh, z); colr.push(
        base.r + (top.r - base.r) * 0.25, base.g + (top.g - base.g) * 0.25, base.b + (top.b - base.b) * 0.25
      );
      if (i < segments) {
        const o = i * 2;
        idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: op, side: THREE.DoubleSide, fog: false, depthWrite: false });
    const mesh = new THREE.Mesh(g, m);
    mesh.renderOrder = -2;
    group.add(mesh);
  }
  group.userData.setNight = (v) => {
    group.children.forEach((m, i) => {
      m.material.color.setHex(v ? 0x25303f : 0xffffff);
      m.material.opacity = v ? 0.35 : rings[i].op;
    });
  };
  return group;
}

/* ---------- ciudad de fondo ---------- */
function cityMaterial(lib) {
  const facade = lib.facade;
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 0.92, metalness: 0,
    map: facade.map, normalMap: facade.normalMap, emissiveMap: facade.emissiveMap,
    emissive: new THREE.Color(0xffd9a0), emissiveIntensity: 0,
  });
  mat.normalScale.set(0.5, 0.5);
  // UV en espacio de mundo -> ventanas del mismo tamaño en todos los edificios
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        varying vec3 vWPos; varying vec3 vWNrm;`)
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
        vWPos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
        vWNrm = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vWPos; varying vec3 vWNrm;`)
      .replace('#include <map_fragment>', `
        vec3 an = abs(vWNrm);
        vec2 wuv = (an.y > 0.6) ? vWPos.xz * 0.055 : (an.x > an.z ? vec2(vWPos.z, vWPos.y) : vec2(vWPos.x, vWPos.y)) * 0.075;
        vec4 sampledDiffuseColor = texture2D(map, wuv);
        diffuseColor *= sampledDiffuseColor;`)
      .replace('#include <emissivemap_fragment>', `
        vec3 an2 = abs(vWNrm);
        vec2 wuv2 = (an2.y > 0.6) ? vWPos.xz * 0.055 : (an2.x > an2.z ? vec2(vWPos.z, vWPos.y) : vec2(vWPos.x, vWPos.y)) * 0.075;
        totalEmissiveRadiance *= texture2D(emissiveMap, wuv2).rgb;`);
  };
  return mat;
}

export function buildCity(lib, { extent = 7000, skip = { x: 1020, z: 960 } } = {}) {
  const group = new THREE.Group();
  const rnd = (() => { let s = 2024; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; })();
  const n = noise2(99);

  const boxes = [];
  const step = 108;
  const pad = 26;
  const cols = Math.ceil((extent * 2) / step);

  for (let ix = -cols / 2; ix < cols / 2; ix++) {
    for (let iz = -cols / 2; iz < cols / 2; iz++) {
      const bx = ix * step, bz = iz * step;
      const dist = Math.hypot(bx, bz);
      if (dist > extent) continue;
      // hueco para la zona modelada (Unicentro + hotel)
      if (Math.abs(bx) < skip.x && Math.abs(bz) < skip.z) continue;
      const rot = Math.floor(rnd() * 4) * (Math.PI / 2);
      const w = step - pad * (0.8 + rnd() * 0.9);
      const dpt = step - pad * (0.8 + rnd() * 0.9);
      const density = 0.28 + 0.5 * Math.abs(fbmN(n, bx / 900, bz / 900, 3));
      const tall = fbmN(n, bx / 1500 + 20, bz / 1500 + 20, 3);
      let h = 7 + density * 26;
      if (tall > 0.16) h += (tall - 0.16) * 190;
      if (rnd() > 0.6) h *= 0.55;
      h = Math.max(5, Math.min(95, h));

      // varias cajas por manzana para que no parezca una retícula perfecta
      const parts = rnd() > 0.55 ? 2 : 1;
      for (let p = 0; p < parts; p++) {
        const ox = parts === 1 ? 0 : (p === 0 ? -w * 0.26 : w * 0.26);
        const oz = parts === 1 ? 0 : (rnd() - 0.5) * dpt * 0.3;
        boxes.push({
          x: bx + ox + (rnd() - 0.5) * 6,
          z: bz + oz + (rnd() - 0.5) * 6,
          w: parts === 1 ? w : w * 0.48,
          d: parts === 1 ? dpt : dpt * (0.55 + rnd() * 0.4),
          h: parts === 1 ? h : h * (0.55 + rnd() * 0.6),
          rot,
          tint: 0.78 + rnd() * 0.42,
        });
      }
    }
  }

  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  const mat = cityMaterial(lib);
  const mesh = new THREE.InstancedMesh(geo, mat, boxes.length);
  mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(boxes.length * 3), 3);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), t = new THREE.Vector3();
  const c = new THREE.Color();
  boxes.forEach((b, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), b.rot);
    t.set(b.x, 0, b.z); s.set(b.w, b.h, b.d);
    m.compose(t, q, s);
    mesh.setMatrixAt(i, m);
    c.setRGB(b.tint, b.tint * 0.985, b.tint * 0.95);
    mesh.instanceColor.setXYZ(i, c.r, c.g, c.b);
  });
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  group.add(mesh);

  group.userData.setNight = (v) => { mat.emissiveIntensity = v ? 1.15 : 0; };
  group.userData.count = boxes.length;
  return group;
}

/* ---------- suelo ---------- */
export function buildGround(lib, size = 30000) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6d6f63, roughness: 0.98, metalness: 0,
    map: lib.grass.map, normalMap: lib.grass.normalMap,
  });
  mat.map = lib.grass.map.clone();
  mat.map.repeat.set(size / 24, size / 24);
  mat.map.needsUpdate = true;
  mat.normalMap = lib.grass.normalMap.clone();
  mat.normalMap.repeat.copy(mat.map.repeat);
  const g = new THREE.PlaneGeometry(size, size, 1, 1);
  g.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(g, mat);
  mesh.receiveShadow = true;
  mesh.position.y = -0.35;
  mesh.userData.mat = mat;
  return mesh;
}

/* ---------- luces de calle (noche) ---------- */
export function buildStreetLights(count = 260, radius = 1500) {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(0.55, 6, 5);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffcf8a, transparent: true, opacity: 0.9, fog: true });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const m = new THREE.Matrix4(), t = new THREE.Vector3();
  const rnd = (() => { let s = 777; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; })();
  for (let i = 0; i < count; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * radius;
    t.set(Math.cos(a) * r, 7 + rnd() * 2, Math.sin(a) * r);
    m.makeTranslation(t.x, t.y, t.z);
    mesh.setMatrixAt(i, m);
  }
  mesh.frustumCulled = false;
  group.add(mesh);
  group.visible = false;
  return group;
}

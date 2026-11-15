import * as THREE from 'three';

/* ============================================================
   Bosque instanciado con LOD
   - cerca  : malla original de Unreal (detalle real)
   - medio  : silueta de copa de bajo costo
   - lejos  : se descarta (la niebla lo tapa)
   ============================================================ */

const _m = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _z = new THREE.Vector3(0, 0, 1);

function makeProxy(bbox, leafColor) {
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const base = new THREE.Vector3((bbox.min.x + bbox.max.x) / 2, (bbox.min.y + bbox.max.y) / 2, bbox.min.z);
  const h = Math.max(2, size.z);
  const crown = Math.max(1.2, Math.max(size.x, size.y) * 0.52);

  const geos = [];
  const trunk = new THREE.CylinderGeometry(crown * 0.07, crown * 0.11, h * 0.5, 5, 1);
  trunk.translate(base.x, base.y, base.z + h * 0.25);
  geos.push(trunk);

  const blob = new THREE.IcosahedronGeometry(1, 1);
  const spots = [
    [0, 0, 0.62, 0.95], [0.35, 0.1, 0.5, 0.72], [-0.3, -0.25, 0.74, 0.68], [0.05, 0.3, 0.86, 0.55],
  ];
  for (const [ox, oy, hz, rs] of spots) {
    const g = blob.clone();
    g.scale(crown * rs, crown * rs, crown * rs * 0.85);
    g.translate(base.x + crown * ox, base.y + crown * oy, base.z + h * hz);
    geos.push(g);
  }

  // fusionamos a mano (evita depender de BufferGeometryUtils)
  let vcount = 0, icount = 0;
  for (const g of geos) { vcount += g.attributes.position.count; icount += g.index ? g.index.count : g.attributes.position.count; }
  const pos = new Float32Array(vcount * 3);
  const nrm = new Float32Array(vcount * 3);
  const idx = new Uint32Array(icount);
  let vo = 0, io = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, vo * 3);
    nrm.set(g.attributes.normal.array, vo * 3);
    const vn = g.attributes.position.count;
    if (g.index) {
      const gi = g.index.array;
      for (let i = 0; i < gi.length; i++) idx[io + i] = gi[i] + vo;
      io += gi.length;
    } else {
      for (let i = 0; i < vn; i++) idx[io + i] = i + vo;
      io += vn;
    }
    vo += vn;
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  merged.setIndex(new THREE.BufferAttribute(idx, 1));
  merged.computeBoundingSphere();

  const mat = new THREE.MeshStandardMaterial({
    color: leafColor, roughness: 0.86, metalness: 0, flatShading: false,
  });
  return new THREE.Mesh(merged, mat);
}

export class Forest {
  constructor(scene, data, meta, opts = {}) {
    this.scene = scene;
    this.nearDist = opts.near ?? 95;
    this.farDist = opts.far ?? 620;
    this.types = [];
    this.total = meta.count || data.length / 6;
    this.tick = 0;

    const count = meta.count;
    const typeCount = meta.types.length;
    const begins = new Int32Array(typeCount + 1);
    for (let i = 0; i < typeCount; i++) begins[i + 1] = begins[i] + meta.types[i].count;

    // ordenar instancias por tipo (el bin ya viene ordenado por tipo)
    this.data = data;
    this.byType = new Map();
    for (let t = 0; t < typeCount; t++) this.byType.set(t, { start: begins[t], end: begins[t + 1] });
    this.counts = meta.types.map((t) => t.count);
  }

  build(prototypes) {
    const { scene } = this;
    this.group = new THREE.Group();
    scene.add(this.group);

    let nearTotal = 0, farTotal = 0;
    for (const [typeIdx, proto] of prototypes) {
      const meshes = [];
      proto.traverse((o) => { if (o.isMesh) meshes.push(o); });
      if (!meshes.length) continue;
      proto.visible = false;

      const box = new THREE.Box3();
      const leafCol = new THREE.Color(0x3d6b30);
      for (const m of meshes) {
        m.geometry.computeBoundingBox();
        box.union(m.geometry.boundingBox);
        const mc = m.material?.color;
        if (mc && mc.g > mc.r && mc.g > 0.15) leafCol.copy(mc);
      }
      const center = box.getCenter(new THREE.Vector3());

      const n = this.counts[typeIdx] || 0;
      const nearSet = [], farSet = [];
      for (const m of meshes) {
        m.material.side = THREE.DoubleSide;
        m.material.roughness = 0.92;
        m.material.metalness = 0;
        m.material.envMapIntensity = 0.5;
        const near = new THREE.InstancedMesh(m.geometry, m.material, Math.max(8, Math.ceil(n * 0.06)));
        near.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        near.count = 0; near.castShadow = true; near.receiveShadow = true;
        near.frustumCulled = false;
        nearSet.push(near);
        this.group.add(near);
      }

      const proxy = makeProxy(box, leafCol);
      proxy.geometry.computeBoundingSphere();
      const far = new THREE.InstancedMesh(proxy.geometry, proxy.material, n);
      far.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      far.count = 0; far.castShadow = false; far.receiveShadow = true;
      far.frustumCulled = false;
      const farColor = new THREE.Color();
      far.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3), 3);
      far.instanceColor.setUsage(THREE.DynamicDrawUsage);
      this.group.add(far);

      this.types.push({ typeIdx, nearSet, far, center, n, nearCap: Math.max(8, Math.ceil(n * 0.06)) });
      nearTotal += n; farTotal += n;
    }
    console.log('[forest] tipos', this.types.length, 'árboles', nearTotal);
  }

  update(camLocal, now = 0) {
    if (now * 1000 - this.tick < 220) return;
    this.tick = now * 1000;

    const d = this.data;
    const near2 = this.nearDist * this.nearDist;
    const far2 = this.farDist * this.farDist;

    for (const t of this.types) {
      const { start } = this.byType.get(t.typeIdx);
      let nNear = 0, nFar = 0;
      const farCol = t.far.instanceColor.array;

      for (let i = 0; i < t.n; i++) {
        const o = (start + i) * 6;
        const type = d[o];
        const px = d[o + 1], py = d[o + 2], pz = d[o + 3];
        const yaw = d[o + 4], sc = d[o + 5];

        // posición real = matriz relativa aplicada al centro del prototipo
        _q.setFromAxisAngle(_z, yaw);
        _p.set(px, py, pz);
        _s.set(sc, sc, sc);
        _m.compose(_p, _q, _s);
        _p.set(t.center.x, t.center.y, t.center.z).applyMatrix4(_m);

        const dx = _p.x - camLocal.x, dy = _p.y - camLocal.y, dz = _p.z - camLocal.z;
        const dist2 = dx * dx + dy * dy + dz * dz;

        if (dist2 < near2 && nNear < t.nearCap) {
          for (const m of t.nearSet) m.setMatrixAt(nNear, _m);
          nNear++;
        } else if (dist2 < far2) {
          t.far.setMatrixAt(nFar, _m);
          const k = 0.72 + ((i * 2654435761) % 100) / 100 * 0.5;
          farCol[nFar * 3] = k; farCol[nFar * 3 + 1] = k * 1.03; farCol[nFar * 3 + 2] = k * 0.92;
          nFar++;
        }
      }

      for (const m of t.nearSet) {
        m.count = nNear;
        m.instanceMatrix.needsUpdate = true;
        // el sombreado por instancia del árbol real no existe: se usa el material base
      }
      t.far.count = nFar;
      t.far.instanceMatrix.needsUpdate = true;
      t.far.instanceColor.needsUpdate = true;
    }
  }
}

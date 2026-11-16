/**
 * Genera modelos 3D PBR suaves y detallados para el tráfico y peatones de Bogotá:
 *   - public/secciones/carro.glb          (sedán PBR)
 *   - public/secciones/carro_suv.glb      (SUV PBR)
 *   - public/secciones/carro_hatch.glb    (hatchback PBR)
 *   - public/secciones/carro_taxi.glb     (taxi Bogotá amarillo con letrero PBR)
 *   - public/secciones/carro_moto.glb     (moto urbana con conductor PBR)
 *   - public/secciones/sitp_azul.glb      (bus SITP Zonal Azul de Bogotá)
 *   - public/secciones/sitp_amarillo.glb  (bus SITP Urbano Amarillo de Bogotá)
 *   - public/secciones/persona_perro.glb  (peatón paseando perro con correa)
 *   - public/secciones/persona.glb        (peatón caminando sin perro)
 *
 * Convención de ejes: +X = frente, +Y = arriba (coincide con Cesium upAxis: Y, forwardAxis: X).
 */
import { writeFileSync, copyFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { NodeIO } from '@gltf-transform/core';
import {
  CONSTRUCTORES,
  crearMateriales,
} from '../../.gemini/antigravity/scratch/vehiculos-colombia/vehiculos.js';
import { encodePng } from './pbr-textures.mjs';

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      this.onloadend?.();
      this.onload?.({ target: this });
    });
  }
};

// Generar mapas PBR compactos (64x64) para carrocería metálica, llantas con labrado y rines
function makeVehicleTextures() {
  const S = 64;
  const make = (fn) => {
    const rgba = Buffer.alloc(S * S * 4);
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const [r, g, b, a = 255] = fn(x / S, y / S);
        const i = (y * S + x) * 4;
        rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = a;
      }
    }
    return encodePng(S, S, rgba);
  };
  // Normal mapa suave de pintura automotriz (micro-flake clearcoat)
  const paintNorm = make((u, v) => {
    const n = Math.sin(u * 48) * Math.cos(v * 48) * 6;
    return [128 + n, 128 - n, 255, 255];
  });
  const paintMr = make((u, v) => {
    const f = ((Math.sin(u * 62.8) * Math.cos(v * 62.8)) * 0.5 + 0.5) * 10;
    return [0, Math.round(36 + f), 182, 255]; // clearcoat brillante roughness ~0.14-0.18, metallic ~0.71
  });
  // Normal mapa de labrado de llanta
  const tireNorm = make((u, v) => {
    const tread = Math.sin(u * Math.PI * 16) * 0.5 + Math.sin(v * Math.PI * 12) * 0.5;
    return [Math.round(128 + tread * 45), Math.round(128 + tread * 25), 240, 255];
  });
  const tireMr = make(() => [0, 218, 0, 255]); // roughness 0.85, metallic 0
  // Rines aluminio cepillado
  const rimMr = make((u) => {
    const s = Math.sin(u * Math.PI * 24) * 12;
    return [0, Math.round(52 + s), 235, 255]; // roughness ~0.20, metallic ~0.92
  });
  return { paintNorm, paintMr, tireNorm, tireMr, rimMr };
}

const VEH_TEX = makeVehicleTextures();
const io = new NodeIO();
const exporter = new GLTFExporter();
const mats = crearMateriales();

async function injectVehiclePbr(glbBytes) {
  const doc = await io.readBinary(new Uint8Array(glbBytes));
  const texPaintN = doc.createTexture('paint_norm').setImage(VEH_TEX.paintNorm).setMimeType('image/png');
  const texPaintMR = doc.createTexture('paint_mr').setImage(VEH_TEX.paintMr).setMimeType('image/png');
  const texTireN = doc.createTexture('tire_norm').setImage(VEH_TEX.tireNorm).setMimeType('image/png');
  const texTireMR = doc.createTexture('tire_mr').setImage(VEH_TEX.tireMr).setMimeType('image/png');
  const texRimMR = doc.createTexture('rim_mr').setImage(VEH_TEX.rimMr).setMimeType('image/png');

  for (const m of doc.getRoot().listMaterials()) {
    const name = (m.getName() || '').toLowerCase();
    if (name.includes('body') || name.includes('paint') || name.includes('sitp')) {
      m.setNormalTexture(texPaintN).setNormalScale(0.35);
      m.setMetallicRoughnessTexture(texPaintMR);
      m.setRoughnessFactor(1.0);
      m.setMetallicFactor(1.0);
    } else if (name.includes('rubber') || name.includes('tire')) {
      m.setNormalTexture(texTireN).setNormalScale(1.1);
      m.setMetallicRoughnessTexture(texTireMR);
      m.setRoughnessFactor(1.0);
      m.setMetallicFactor(0.0);
    } else if (name.includes('rim') || name.includes('chrome')) {
      m.setMetallicRoughnessTexture(texRimMR);
      m.setRoughnessFactor(1.0);
      m.setMetallicFactor(1.0);
    }
  }
  return await io.writeBinary(doc);
}

async function exportGroup(group, outName, withPbr = true) {
  // Girar +Z (frente en vehiculos.js) -> +X (frente esperado por Cesium en vehiculos.ts)
  group.rotation.y = Math.PI / 2;
  group.updateMatrixWorld(true);
  const buf = await exporter.parseAsync(group, { binary: true });
  const bytes = withPbr ? await injectVehiclePbr(buf) : new Uint8Array(buf);
  writeFileSync(`public/secciones/${outName}`, bytes);
  copyFileSync(`public/secciones/${outName}`, `docs/secciones/${outName}`);
  console.log(outName, bytes.byteLength, 'bytes');
}

function tagMaterial(mat, key) {
  mat.name = key;
  return mat;
}

function buildVehicleGroup(tipo) {
  const geoms = CONSTRUCTORES[tipo](0);
  const group = new THREE.Group();
  for (const [matKey, geo] of Object.entries(geoms)) {
    const mat = tagMaterial(mats[matKey].clone(), matKey);
    if (matKey === 'body' && tipo === 'taxi') {
      mat.color.setHex(0xf5b800);
    }
    group.add(new THREE.Mesh(geo, mat));
  }
  return group;
}

/**
 * Construye un bus SITP de Bogotá (Zonal Azul o Urbano Amarillo)
 * Orientación local: +Z = frente, +Y = arriba, X = ancho (luego exportGroup lo gira +Z -> +X)
 */
function buildSitpBus(variant = 'azul') {
  const group = new THREE.Group();
  const isAzul = variant === 'azul';
  const mainHex = isAzul ? 0x0d4ca6 : 0xf4a800;
  const stripeHex = isAzul ? 0xf2f4f8 : 0x1b2028;

  const matBody = tagMaterial(new THREE.MeshStandardMaterial({ color: mainHex, metalness: 0.45, roughness: 0.24 }), 'sitp_body');
  const matRoof = tagMaterial(new THREE.MeshStandardMaterial({ color: 0xedeff2, metalness: 0.2, roughness: 0.45 }), 'roof');
  const matStripe = tagMaterial(new THREE.MeshStandardMaterial({ color: stripeHex, metalness: 0.25, roughness: 0.35 }), 'stripe');
  const matGlass = tagMaterial(new THREE.MeshStandardMaterial({ color: 0x121c24, metalness: 0.3, roughness: 0.06 }), 'glass');
  const matTire = tagMaterial(new THREE.MeshStandardMaterial({ color: 0x1b1d20, metalness: 0.0, roughness: 0.88 }), 'rubber_tire');
  const matRim = tagMaterial(new THREE.MeshStandardMaterial({ color: 0xc2c8d0, metalness: 0.9, roughness: 0.24 }), 'rim_alloy');
  const matBumper = tagMaterial(new THREE.MeshStandardMaterial({ color: 0x22252a, metalness: 0.2, roughness: 0.65 }), 'bumper');
  const matLed = tagMaterial(new THREE.MeshStandardMaterial({ color: 0xffa822, emissive: 0xff8800, emissiveIntensity: 1.6, roughness: 0.3 }), 'led_sign');
  const matHead = tagMaterial(new THREE.MeshStandardMaterial({ color: 0xfff6e0, emissive: 0xffe4a8, emissiveIntensity: 1.4, roughness: 0.1 }), 'headlight');
  const matTail = tagMaterial(new THREE.MeshStandardMaterial({ color: 0xd92020, emissive: 0xff1e1e, emissiveIntensity: 1.2, roughness: 0.2 }), 'taillight');

  const L = 9.4, W = 2.42, H = 2.95, yBase = 0.44;
  // Perfil lateral extruido con frente aerodinámico inclinado
  const shape = new THREE.Shape();
  shape.moveTo(-L * 0.5, yBase);
  shape.lineTo(L * 0.5 - 0.18, yBase);
  shape.lineTo(L * 0.5, yBase + 0.45);
  shape.lineTo(L * 0.5 - 0.22, yBase + H - 0.22);
  shape.lineTo(L * 0.5 - 0.55, yBase + H);
  shape.lineTo(-L * 0.5 + 0.15, yBase + H);
  shape.lineTo(-L * 0.5, yBase + H - 0.2);
  shape.closePath();

  const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: W, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 3 });
  bodyGeo.rotateY(Math.PI / 2);
  bodyGeo.translate(-W * 0.5, 0, 0);
  group.add(new THREE.Mesh(bodyGeo, matBody));

  // Techo blanco + 2 módulos de aire acondicionado
  const roof = new THREE.Mesh(new THREE.BoxGeometry(W - 0.14, 0.10, L - 0.7), matRoof);
  roof.position.set(0, yBase + H + 0.06, -0.15);
  group.add(roof);
  for (const az of [1.2, -1.8]) {
    const ac = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.22, 1.85), matRoof);
    ac.position.set(0, yBase + H + 0.20, az);
    group.add(ac);
  }

  // Franja lateral característica SITP (blanca en azul, negra/oscura en amarillo)
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(W + 0.15, 0.22, L - 0.35), matStripe);
  stripe.position.set(0, yBase + 0.88, -0.05);
  group.add(stripe);

  // Ventanales panorámicos laterales oscuros + parabrisas frontal y trasero
  const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(W + 0.15, 1.02, L - 1.15), matGlass);
  sideGlass.position.set(0, yBase + 1.88, -0.2);
  group.add(sideGlass);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(W - 0.22, 1.25, 0.08), matGlass);
  windshield.position.set(0, yBase + 1.78, L * 0.5 - 0.04);
  windshield.rotation.x = -0.10;
  group.add(windshield);

  // Letrero LED de ruta frontal ("SITP")
  const led = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.22, 0.06), matLed);
  led.position.set(0, yBase + 2.58, L * 0.5 - 0.12);
  group.add(led);

  // 2 puertas de pasajeros al costado derecho (-X tras rotación +Z->+X -> costado derecho = -X en local)
  for (const dz of [2.5, -1.1]) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.95, 1.05), matGlass);
    door.position.set(-W * 0.5 - 0.06, yBase + 1.12, dz);
    group.add(door);
  }

  // Parachoques delantero/trasero + faros + stops
  for (const bz of [L * 0.5 + 0.02, -L * 0.5 - 0.02]) {
    const bmp = new THREE.Mesh(new THREE.BoxGeometry(W + 0.08, 0.34, 0.16), matBumper);
    bmp.position.set(0, yBase + 0.16, bz);
    group.add(bmp);
  }
  for (const sx of [-0.88, 0.88]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.06), matHead);
    hl.position.set(sx, yBase + 0.52, L * 0.5 + 0.04);
    group.add(hl);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.06), matTail);
    tl.position.set(sx, yBase + 0.75, -L * 0.5 - 0.04);
    group.add(tl);
    // Espejos retrovisores
    const mir = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.10), matBumper);
    mir.position.set(sx * 1.48, yBase + 2.05, L * 0.5 - 0.05);
    group.add(mir);
  }

  // Ruedas (eje delantero simple, eje trasero doble)
  const wheelR = 0.48;
  for (const [wz, dual] of [[2.85, false], [-2.55, true]]) {
    for (const side of [-1, 1]) {
      const offsets = dual ? [0, -0.22] : [0];
      for (const off of offsets) {
        const wx = side * (W * 0.5 - 0.06 + off);
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelR, wheelR, 0.28, 18), matTire);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(wx, wheelR, wz);
        group.add(tire);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.30, 14), matRim);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(wx, wheelR, wz);
        group.add(rim);
      }
    }
  }
  return group;
}

function buildPersona({ conPerro = true } = {}) {
  const group = new THREE.Group();
  const matPiel = new THREE.MeshStandardMaterial({ color: 0xe0ac8b, roughness: 0.65 });
  const matChaqueta = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.72 });
  const matPantalon = new THREE.MeshStandardMaterial({ color: 0x1e242e, roughness: 0.8 });
  const matPelo = new THREE.MeshStandardMaterial({ color: 0x231b15, roughness: 0.85 });
  const matPerro = new THREE.MeshStandardMaterial({ color: 0xc28547, roughness: 0.78 });
  const matCorrea = new THREE.MeshStandardMaterial({ color: 0xd93829, roughness: 0.5 });

  const px = conPerro ? -0.22 : 0;
  for (const [lx, rz] of [[-0.08, 0.14], [0.08, -0.14]]) {
    const pierna = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.66, 6, 10), matPantalon);
    pierna.position.set(px + lx, 0.42, rz * 0.6);
    pierna.rotation.x = rz;
    group.add(pierna);
  }
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.42, 8, 12), matChaqueta);
  torso.position.set(px, 1.06, 0);
  torso.scale.set(1.15, 1, 0.72);
  group.add(torso);

  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), matPiel);
  cabeza.position.set(px, 1.48, 0.02);
  group.add(cabeza);
  const pelo = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.58), matPelo);
  pelo.position.set(px, 1.5, 0.0);
  group.add(pelo);

  const brazoIzq = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.42, 6, 8), matChaqueta);
  brazoIzq.position.set(px - 0.18, 1.04, -0.04);
  brazoIzq.rotation.x = -0.15;
  group.add(brazoIzq);

  const brazoDer = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.42, 6, 8), matChaqueta);
  if (conPerro) {
    brazoDer.position.set(px + 0.18, 0.98, 0.14);
    brazoDer.rotation.x = 0.55;
    brazoDer.rotation.z = -0.18;
  } else {
    brazoDer.position.set(px + 0.18, 1.04, 0.05);
    brazoDer.rotation.x = 0.15;
  }
  group.add(brazoDer);

  if (conPerro) {
    const dx = 0.34, dz = 0.42;
    const cuerpoPerro = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.36, 8, 12), matPerro);
    cuerpoPerro.rotation.x = Math.PI / 2;
    cuerpoPerro.position.set(dx, 0.34, dz);
    group.add(cuerpoPerro);
    const cabezaPerro = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 10), matPerro);
    cabezaPerro.position.set(dx, 0.48, dz + 0.24);
    group.add(cabezaPerro);
    const hocico = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.08, 6, 8), matPerro);
    hocico.rotation.x = Math.PI / 2;
    hocico.position.set(dx, 0.45, dz + 0.33);
    group.add(hocico);
    const cola = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.16, 4, 6), matPerro);
    cola.rotation.x = -0.7;
    cola.position.set(dx, 0.44, dz - 0.22);
    group.add(cola);
    for (const [pxp, pzp] of [[-0.06, 0.14], [0.06, 0.14], [-0.06, -0.14], [0.06, -0.14]]) {
      const pata = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.20, 4, 6), matPerro);
      pata.position.set(dx + pxp, 0.14, dz + pzp);
      group.add(pata);
    }
    const pMano = new THREE.Vector3(px + 0.20, 0.82, 0.28);
    const pCuello = new THREE.Vector3(dx, 0.44, dz + 0.16);
    const dir = new THREE.Vector3().subVectors(pCuello, pMano);
    const correa = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, dir.length(), 6), matCorrea);
    correa.position.copy(pMano).addScaledVector(dir, 0.5);
    correa.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    group.add(correa);
  }
  return group;
}

await exportGroup(buildVehicleGroup('sedan'), 'carro.glb', true);
await exportGroup(buildVehicleGroup('suv'), 'carro_suv.glb', true);
await exportGroup(buildVehicleGroup('hatch'), 'carro_hatch.glb', true);
await exportGroup(buildVehicleGroup('taxi'), 'carro_taxi.glb', true);
await exportGroup(buildVehicleGroup('moto'), 'carro_moto.glb', true);
await exportGroup(buildSitpBus('azul'), 'sitp_azul.glb', true);
await exportGroup(buildSitpBus('amarillo'), 'sitp_amarillo.glb', true);
await exportGroup(buildPersona({ conPerro: true }), 'persona_perro.glb', false);
await exportGroup(buildPersona({ conPerro: false }), 'persona.glb', false);

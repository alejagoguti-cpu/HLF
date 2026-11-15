/**
 * Genera modelos 3D procedurales suaves (sin bloques low-poly) para tráfico y peatones:
 *   - public/secciones/carro.glb         (sedán detallado)
 *   - public/secciones/carro_suv.glb     (SUV detallada)
 *   - public/secciones/carro_taxi.glb    (taxi Bogotá amarillo con letrero)
 *   - public/secciones/persona_perro.glb (peatón paseando perro con correa)
 *   - public/secciones/persona.glb       (peatón caminando sin perro)
 *
 * Convención de ejes: +X = frente, +Y = arriba (coincide con Cesium upAxis: Y, forwardAxis: X).
 */
import { writeFileSync, copyFileSync } from 'node:fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {
  CONSTRUCTORES,
  crearMateriales,
} from '../../.gemini/antigravity/scratch/vehiculos-colombia/vehiculos.js';

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      this.onloadend?.();
      this.onload?.({ target: this });
    });
  }
};

const exporter = new GLTFExporter();
const mats = crearMateriales();

async function exportGroup(group, outName) {
  // Girar +Z (frente en vehiculos.js) -> +X (frente esperado por Cesium en vehiculos.ts)
  group.rotation.y = Math.PI / 2;
  group.updateMatrixWorld(true);
  const buf = await exporter.parseAsync(group, { binary: true });
  const bytes = new Uint8Array(buf);
  writeFileSync(`public/secciones/${outName}`, bytes);
  copyFileSync(`public/secciones/${outName}`, `docs/secciones/${outName}`);
  console.log(outName, bytes.byteLength, 'bytes');
}

function buildVehicleGroup(tipo) {
  const geoms = CONSTRUCTORES[tipo](0);
  const group = new THREE.Group();
  for (const [matKey, geo] of Object.entries(geoms)) {
    const mat = mats[matKey].clone();
    if (matKey === 'body' && tipo === 'taxi') {
      mat.color.setHex(0xf5b800);
    }
    group.add(new THREE.Mesh(geo, mat));
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

  // Persona (centrada en X = -0.22 si lleva perro, o X = 0 si va sola, mirando hacia +Z)
  const px = conPerro ? -0.22 : 0;
  // Piernas
  for (const [lx, rz] of [[-0.08, 0.14], [0.08, -0.14]]) {
    const pierna = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.66, 6, 10), matPantalon);
    pierna.position.set(px + lx, 0.42, rz * 0.6);
    pierna.rotation.x = rz;
    group.add(pierna);
  }
  // Torso
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.42, 8, 12), matChaqueta);
  torso.position.set(px, 1.06, 0);
  torso.scale.set(1.15, 1, 0.72);
  group.add(torso);

  // Cabeza y cabello
  const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), matPiel);
  cabeza.position.set(px, 1.48, 0.02);
  group.add(cabeza);
  const pelo = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.58), matPelo);
  pelo.position.set(px, 1.5, 0.0);
  group.add(pelo);

  // Brazos
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
    const dx = 0.34;
    const dz = 0.42;
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

    for (const sx of [-0.07, 0.07]) {
      const oreja = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.07, 4, 6), matPelo);
      oreja.position.set(dx + sx, 0.51, dz + 0.22);
      oreja.rotation.z = sx * 4;
      group.add(oreja);
    }
    const cola = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.18, 4, 6), matPerro);
    cola.position.set(dx, 0.44, dz - 0.25);
    cola.rotation.x = -0.6;
    group.add(cola);

    for (const lx of [-0.06, 0.06]) {
      for (const lz of [-0.14, 0.14]) {
        const pata = new THREE.Mesh(new THREE.CapsuleGeometry(0.026, 0.22, 4, 8), matPerro);
        pata.position.set(dx + lx, 0.14, dz + lz);
        group.add(pata);
      }
    }

    const pMano = new THREE.Vector3(px + 0.2, 0.78, 0.28);
    const pCuello = new THREE.Vector3(dx, 0.44, dz + 0.18);
    const dir = new THREE.Vector3().subVectors(pCuello, pMano);
    const correa = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, dir.length(), 6), matCorrea);
    correa.position.copy(pMano).add(pCuello).multiplyScalar(0.5);
    correa.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    group.add(correa);
  }

  return group;
}

await exportGroup(buildVehicleGroup('sedan'), 'carro.glb');
await exportGroup(buildVehicleGroup('suv'), 'carro_suv.glb');
await exportGroup(buildVehicleGroup('taxi'), 'carro_taxi.glb');
await exportGroup(buildPersona({ conPerro: true }), 'persona_perro.glb');
await exportGroup(buildPersona({ conPerro: false }), 'persona.glb');

import * as Cesium from 'cesium';
import { enuToWorld } from './site';

export interface MasterplanPin {
  id: string;
  label: string;
  category?: string;
  enu: [number, number, number];
  camera: {
    heading: number;
    pitch: number;
    range: number;
    dur?: number;
  };
}

export const MASTERPLAN_PINS: MasterplanPin[] = [
  {
    id: 'hotel',
    label: 'HOTEL LA FONTANA',
    category: 'PROYECTO PRINCIPAL',
    enu: [-210, 352, 26],
    camera: { heading: 0.55, pitch: -0.42, range: 240, dur: 2.0 },
  },
  {
    id: 'piso2',
    label: 'REMODELACIÓN PISO 2',
    category: 'INTERVENCIÓN BIM',
    enu: [-256, 320, 12],
    camera: { heading: 0.19, pitch: -1.55, range: 68, dur: 2.0 },
  },
  {
    id: 'plazoleta',
    label: 'PLAZOLETA DE LA FUENTE',
    category: 'ESPACIO PÚBLICO',
    enu: [-232, 328, 5],
    camera: { heading: 0.45, pitch: -0.28, range: 110, dur: 1.8 },
  },
  {
    id: 'clinica127',
    label: 'CLÍNICA 127 COLSUBSIDIO',
    category: 'TORRE CORPORATIVA',
    enu: [-325, 207, 40],
    camera: { heading: 0.85, pitch: -0.32, range: 160, dur: 2.0 },
  },
  {
    id: 'torres',
    label: 'TORRES SANTA BÁRBARA',
    category: 'RESIDENCIAL',
    enu: [-320, 395, 45],
    camera: { heading: 0.35, pitch: -0.35, range: 210, dur: 2.0 },
  },
  {
    id: 'metro127',
    label: 'METRO 127 · SONESTA',
    category: 'HOTEL Y COMERCIO',
    enu: [-195, 145, 28],
    camera: { heading: 1.25, pitch: -0.34, range: 190, dur: 2.0 },
  },
  {
    id: 'panpaya',
    label: "PAN PA' YA · OLÍMPICA",
    category: 'ZONA COMERCIAL',
    enu: [-84, 300, 16],
    camera: { heading: 2.45, pitch: -0.30, range: 140, dur: 2.0 },
  },
  {
    id: 'unicentro',
    label: 'UNICENTRO BOGOTÁ',
    category: 'CENTRO COMERCIAL',
    enu: [10, 0, 20],
    camera: { heading: 0.65, pitch: -0.45, range: 420, dur: 2.2 },
  },
];

export interface MasterplanPinsManager {
  container: HTMLElement;
  visible: boolean;
  setVisible(v: boolean): void;
  update(): void;
  destroy(): void;
}

export function createMasterplanPins(
  viewer: Cesium.Viewer,
  onSelectPin?: (pin: MasterplanPin) => void
): MasterplanPinsManager {
  const container = document.createElement('div');
  container.className = 'mp-pins-overlay';
  viewer.container.appendChild(container);

  const items = MASTERPLAN_PINS.map((pin) => {
    const el = document.createElement('div');
    el.className = 'mp-pin';
    el.innerHTML = `
      <div class="mp-pin-card">
        <span class="mp-pin-flag"></span>
        <div class="mp-pin-content">
          ${pin.category ? `<span class="mp-pin-cat">${pin.category}</span>` : ''}
          <strong class="mp-pin-title">${pin.label}</strong>
        </div>
      </div>
      <div class="mp-pin-line"></div>
      <div class="mp-pin-anchor"></div>
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onSelectPin) {
        onSelectPin(pin);
      }
    });

    container.appendChild(el);

    const worldPos = enuToWorld(pin.enu[0], pin.enu[1], pin.enu[2]);
    return { pin, el, worldPos };
  });

  let isVisible = false;
  container.style.display = 'none';
  const scratchCoord = new Cesium.Cartesian2();

  function update(): void {
    if (!isVisible) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';

    const scene = viewer.scene;
    const camera = scene.camera;

    for (const item of items) {
      // Check if point is behind the camera
      const toPos = Cesium.Cartesian3.subtract(item.worldPos, camera.positionWC, new Cesium.Cartesian3());
      const dot = Cesium.Cartesian3.dot(toPos, camera.directionWC);
      if (dot <= 0) {
        item.el.style.display = 'none';
        continue;
      }

      const dist = Cesium.Cartesian3.distance(camera.positionWC, item.worldPos);
      if (dist > 3500) {
        item.el.style.display = 'none';
        continue;
      }

      const winPos = Cesium.SceneTransforms.worldToWindowCoordinates(scene, item.worldPos, scratchCoord);
      if (!winPos) {
        item.el.style.display = 'none';
        continue;
      }

      item.el.style.display = 'block';
      item.el.style.transform = `translate3d(${Math.round(winPos.x)}px, ${Math.round(winPos.y)}px, 0)`;

      // Dynamic scale and opacity depending on distance
      const scale = Math.max(0.75, Math.min(1.05, 1200 / (dist + 300)));
      const opacity = dist > 2600 ? Math.max(0, (3500 - dist) / 900) : 1;
      item.el.style.opacity = opacity.toFixed(2);
      (item.el.querySelector('.mp-pin-card') as HTMLElement).style.transform = `scale(${scale.toFixed(2)})`;
    }
  }

  const removePreRender = viewer.scene.preRender.addEventListener(update);

  return {
    container,
    get visible() {
      return isVisible;
    },
    setVisible(v: boolean) {
      isVisible = v;
      if (!v) container.style.display = 'none';
    },
    update,
    destroy() {
      removePreRender();
      container.remove();
    },
  };
}

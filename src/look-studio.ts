export type PresetId = 'dia' | 'tarde' | 'noche';

export interface LookParams {
  sunIntensity: number;
  sunColor: string;
  shadowDarkness: number;
  aoIntensity: number;
  skyFill: number;
  groundFill: number;
  exposure: number;
  contrast: number;
  saturation: number;
  tintColor: string;
  vignette: number;
  bloomBrightness: number;
  skyZenith: string;
  skyHorizon: string;
  cloudDensity: number;
  cloudSpeed: number;
  hazeAmount: number;
  hazeStart: number;
}

export const DEFAULT_LOOK: Record<PresetId, LookParams> = {
  dia: {
    sunIntensity: 5.75,
    sunColor: '#ffe3c4',
    shadowDarkness: 0.38,
    aoIntensity: 4,
    skyFill: 0.22,
    groundFill: 0.12,
    exposure: 1.08,
    contrast: 0.39,
    saturation: 0.52,
    tintColor: '#dedede',
    vignette: 0.5,
    bloomBrightness: -0.8,
    skyZenith: '#74777b',
    skyHorizon: '#c2c2d1',
    cloudDensity: 0.85,
    cloudSpeed: 1,
    hazeAmount: 0,
    hazeStart: 2500,
  },
  tarde: {
    sunIntensity: 5.75,
    sunColor: '#ffe3c4',
    shadowDarkness: 0.38,
    aoIntensity: 4,
    skyFill: 0.22,
    groundFill: 0.12,
    exposure: 1.08,
    contrast: 0.39,
    saturation: 0.52,
    tintColor: '#dedede',
    vignette: 0.5,
    bloomBrightness: -0.8,
    skyZenith: '#74777b',
    skyHorizon: '#c2c2d1',
    cloudDensity: 0.85,
    cloudSpeed: 1,
    hazeAmount: 0,
    hazeStart: 2500,
  },
  noche: {
    sunIntensity: 0.6,
    sunColor: '#6b8fd4',
    shadowDarkness: 0.85,
    aoIntensity: 2.7,
    skyFill: 0.38,
    groundFill: 0.1,
    exposure: 1.08,
    contrast: 0.41,
    saturation: 0.5,
    tintColor: '#bec7d5',
    vignette: 0.05,
    bloomBrightness: -0.6,
    skyZenith: '#040611',
    skyHorizon: '#0a0f1f',
    cloudDensity: 0.24,
    cloudSpeed: 0.8,
    hazeAmount: 0.33,
    hazeStart: 450,
  },
};

export function hexToRgbNorm(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [1, 1, 1];
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

interface ControlDef {
  key: keyof LookParams;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  type: 'range' | 'color';
}

const GROUPS: { title: string; items: ControlDef[] }[] = [
  {
    title: 'Sol y Sombras',
    items: [
      { key: 'sunIntensity', label: 'Intensidad sol', min: 0.2, max: 6.0, step: 0.05, type: 'range' },
      { key: 'sunColor', label: 'Color sol', type: 'color' },
      { key: 'shadowDarkness', label: 'Luz en sombra', min: 0.05, max: 0.85, step: 0.01, type: 'range' },
      { key: 'aoIntensity', label: 'Oclusión (AO)', min: 0, max: 4.0, step: 0.05, type: 'range' },
      { key: 'skyFill', label: 'Relleno fachadas', min: 0, max: 0.6, step: 0.01, type: 'range' },
      { key: 'groundFill', label: 'Relleno suelo', min: 0, max: 0.4, step: 0.01, type: 'range' },
    ],
  },
  {
    title: 'Color y Cámara',
    items: [
      { key: 'exposure', label: 'Exposición', min: 0.6, max: 1.6, step: 0.02, type: 'range' },
      { key: 'contrast', label: 'Contraste', min: 0, max: 0.6, step: 0.01, type: 'range' },
      { key: 'saturation', label: 'Saturación', min: 0.4, max: 1.6, step: 0.02, type: 'range' },
      { key: 'tintColor', label: 'Tinte color', type: 'color' },
      { key: 'vignette', label: 'Viñeta', min: 0, max: 0.5, step: 0.01, type: 'range' },
      { key: 'bloomBrightness', label: 'Bloom', min: -0.8, max: 0.2, step: 0.02, type: 'range' },
    ],
  },
  {
    title: 'Cielo, Nubes y Neblina',
    items: [
      { key: 'skyZenith', label: 'Cielo cenit', type: 'color' },
      { key: 'skyHorizon', label: 'Cielo horizonte', type: 'color' },
      { key: 'cloudDensity', label: 'Densidad nubes', min: 0, max: 1.0, step: 0.02, type: 'range' },
      { key: 'cloudSpeed', label: 'Velocidad nubes', min: 0, max: 3.0, step: 0.05, type: 'range' },
      { key: 'hazeAmount', label: 'Neblina', min: 0, max: 0.5, step: 0.01, type: 'range' },
      { key: 'hazeStart', label: 'Inicio neblina (m)', min: 200, max: 2500, step: 50, type: 'range' },
    ],
  },
];

export interface LookStudio {
  setActivePreset(id: PresetId): void;
  getPreset(id: PresetId): LookParams;
  toggle(): void;
}

export function createLookStudio(onChange: (id: PresetId, p: LookParams) => void): LookStudio {
  const state: Record<PresetId, LookParams> = {
    dia: { ...DEFAULT_LOOK.dia },
    tarde: { ...DEFAULT_LOOK.tarde },
    noche: { ...DEFAULT_LOOK.noche },
  };
  let active: PresetId = 'dia';

  // Botón visible arriba a la derecha (junto al reloj)
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'btnLookStudio';
  toggleBtn.className = 'look-toggle';
  toggleBtn.textContent = '⚙ Ajustar luz';
  toggleBtn.title = 'Abrir editor de iluminación y color (L)';
  document.body.appendChild(toggleBtn);

  // Panel flotante
  const panel = document.createElement('aside');
  panel.id = 'lookPanel';
  panel.className = 'look-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="lp-head">
      <div>
        <small>Editor de escena</small>
        <strong id="lpPresetName">Día · 10:10</strong>
      </div>
      <button id="lpClose" aria-label="Cerrar">×</button>
    </div>
    <div class="lp-body" id="lpBody"></div>
    <div class="lp-foot">
      <button id="lpCopy" class="lp-primary">Copiar JSON</button>
      <button id="lpReset">Restablecer</button>
    </div>
  `;
  document.body.appendChild(panel);

  const body = panel.querySelector('#lpBody') as HTMLElement;
  const inputs = new Map<keyof LookParams, { input: HTMLInputElement; val?: HTMLElement }>();

  for (const group of GROUPS) {
    const sec = document.createElement('section');
    sec.className = 'lp-sec';
    const h = document.createElement('h4');
    h.textContent = group.title;
    sec.appendChild(h);

    for (const item of group.items) {
      const row = document.createElement('label');
      row.className = 'lp-row';
      const lbl = document.createElement('span');
      lbl.className = 'lp-lbl';
      lbl.textContent = item.label;
      row.appendChild(lbl);

      const input = document.createElement('input');
      input.type = item.type;
      if (item.type === 'range') {
        input.min = String(item.min);
        input.max = String(item.max);
        input.step = String(item.step);
      }
      const valEl = item.type === 'range' ? document.createElement('span') : undefined;
      if (valEl) valEl.className = 'lp-val';

      input.addEventListener('input', () => {
        const p = state[active];
        if (item.type === 'range') {
          const num = parseFloat(input.value);
          (p[item.key] as number) = num;
          if (valEl) valEl.textContent = item.step && item.step >= 1 ? String(Math.round(num)) : num.toFixed(2);
        } else {
          (p[item.key] as string) = input.value;
        }
        onChange(active, p);
      });

      const ctrl = document.createElement('div');
      ctrl.className = 'lp-ctrl';
      ctrl.appendChild(input);
      if (valEl) ctrl.appendChild(valEl);
      row.appendChild(ctrl);
      sec.appendChild(row);
      inputs.set(item.key, { input, val: valEl });
    }
    body.appendChild(sec);
  }

  const LABELS: Record<PresetId, string> = { dia: 'Día · 10:10', tarde: 'Tarde · 16:50', noche: 'Noche · 19:35' };

  function syncUI(): void {
    const p = state[active];
    const titleEl = panel.querySelector('#lpPresetName');
    if (titleEl) titleEl.textContent = LABELS[active];
    for (const [key, { input, val }] of inputs) {
      const v = p[key];
      input.value = String(v);
      if (val && typeof v === 'number') {
        const step = parseFloat(input.step || '0.01');
        val.textContent = step >= 1 ? String(Math.round(v)) : v.toFixed(2);
      }
    }
  }

  const toggle = () => {
    panel.hidden = !panel.hidden;
    toggleBtn.classList.toggle('on', !panel.hidden);
  };
  toggleBtn.addEventListener('click', toggle);
  panel.querySelector('#lpClose')?.addEventListener('click', toggle);

  const copyBtn = panel.querySelector('#lpCopy') as HTMLButtonElement;
  copyBtn.addEventListener('click', async () => {
    const payload = JSON.stringify({ active, presets: state }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      copyBtn.textContent = '¡JSON copiado!';
      setTimeout(() => (copyBtn.textContent = 'Copiar JSON'), 1800);
    } catch {
      prompt('Copia este JSON:', payload);
    }
  });

  panel.querySelector('#lpReset')?.addEventListener('click', () => {
    state[active] = { ...DEFAULT_LOOK[active] };
    syncUI();
    onChange(active, state[active]);
  });

  addEventListener('keydown', (e) => {
    if (e.code === 'KeyL' && !e.ctrlKey && !e.metaKey && !e.altKey) toggle();
  });

  syncUI();

  return {
    setActivePreset(id: PresetId) {
      active = id;
      syncUI();
    },
    getPreset(id: PresetId) {
      return state[id];
    },
    toggle,
  };
}

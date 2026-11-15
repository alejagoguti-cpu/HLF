import * as Cesium from 'cesium';

/**
 * Cámara arquitectónica.
 *
 * Gira 360° alrededor de un pivote propio (no del centro geográfico), con
 * amortiguación en todos los ejes, paneo en el plano de pantalla, zoom
 * exponencial, pivote dinámico por clic y transiciones cinematográficas.
 */

type Ease = (t: number) => number;

const easeInOutCubic: Ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface Keyframe {
  pivot: Cesium.Cartesian3;
  heading: number;
  pitch: number;
  range: number;
}

const PITCH_MIN = -1.5533; // casi cenital
const PITCH_MAX = -0.002; // horizonte, sin cruzar el suelo
const MAX_RANGE = 4200;
const MIN_RANGE = 6;

export class ArchCamera {
  private viewer: Cesium.Viewer;
  private canvas: HTMLCanvasElement;

  private pivot = new Cesium.Cartesian3();
  private heading = 0.5;
  private pitch = -0.6;
  private range = 1200;

  private targetPivot = new Cesium.Cartesian3();
  private targetHeading = 0.5;
  private targetPitch = -0.6;
  private targetRange = 1200;

  /** velocidad de amortiguación (1/s) */
  private damping = 9;
  private motionScale = 1;

  private drag: {
    id: number;
    x: number;
    y: number;
    mode: 'orbit' | 'pan';
    moved: boolean;
  } | null = null;
  private pointers = new Map<number, { x: number; y: number }>();
  private pinch: { distance: number; range: number } | null = null;

  private keys = new Set<string>();
  private tween: { from: Keyframe; to: Keyframe; start: number; duration: number } | null = null;

  private onChange: (() => void)[] = [];
  private fov = Cesium.Math.toRadians(48);

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
    this.canvas = viewer.scene.canvas;
    viewer.scene.screenSpaceCameraController.enableInputs = false;
    this.bind();
  }

  /* ------------------------------------------------------------------ */

  get position(): Cesium.Cartesian3 {
    return Cesium.Cartesian3.clone(this.pivot);
  }

  onPivotChange(fn: () => void): void {
    this.onChange.push(fn);
  }

  /** Punto de interés actual en coordenadas cartográficas. */
  pivotCartographic(): Cesium.Cartographic {
    return Cesium.Cartographic.fromCartesian(this.targetPivot);
  }

  setPivot(p: Cesium.Cartesian3, keepView = true): void {
    if (keepView) {
      // compensa el pivote para que la cámara no salte
      const delta = Cesium.Cartesian3.subtract(p, this.targetPivot, new Cesium.Cartesian3());
      Cesium.Cartesian3.add(this.pivot, delta, this.pivot);
    }
    this.targetPivot = Cesium.Cartesian3.clone(p);
    this.tween = null;
    for (const fn of this.onChange) fn();
  }

  /* ------------------------------------------------------------------ */

  private bind(): void {
    const c = this.canvas;
    c.style.touchAction = 'none';

    c.addEventListener('pointerdown', (e) => {
      c.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), range: this.targetRange };
        this.drag = null;
        return;
      }
      if (e.button === 2 || e.shiftKey) {
        this.drag = { id: e.pointerId, x: e.offsetX, y: e.offsetY, mode: 'pan', moved: false };
      } else if (e.button === 0) {
        this.drag = { id: e.pointerId, x: e.offsetX, y: e.offsetY, mode: 'orbit', moved: false };
      }
      this.tween = null;
    });

    c.addEventListener('pointermove', (e) => {
      const prev = this.pointers.get(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      if (this.pointers.size === 2 && this.pinch) {
        const [a, b] = [...this.pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > 0 && this.pinch.distance > 0) {
          const ratio = this.pinch.distance / d;
          this.targetRange = this.clamp(this.pinch.range * ratio);
        }
        return;
      }

      if (!this.drag || e.pointerId !== this.drag.id) return;
      const dx = e.offsetX - this.drag.x;
      const dy = e.offsetY - this.drag.y;
      this.drag.x = e.offsetX;
      this.drag.y = e.offsetY;
      if (Math.abs(dx) + Math.abs(dy) > 1.5) this.drag.moved = true;
      this.tween = null;

      if (this.drag.mode === 'orbit') {
        this.targetHeading -= dx * 0.0042;
        this.targetPitch = this.clampPitch(this.targetPitch - dy * 0.0034);
      } else {
        this.pan(-dx, -dy);
      }
      void prev;
    });

    const endPointer = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinch = null;
      const wasDrag = this.drag && !this.drag.moved && this.drag.mode === 'orbit';
      if (this.drag && e.pointerId === this.drag.id) {
        const clickPos = new Cesium.Cartesian2(e.offsetX, e.offsetY);
        this.drag = null;
        if (wasDrag) this.pickPivot(clickPos);
      }
    };
    c.addEventListener('pointerup', endPointer);
    c.addEventListener('pointercancel', endPointer);
    c.addEventListener('contextmenu', (e) => e.preventDefault());

    c.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.tween = null;
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1;
        const delta = e.deltaY * unit;
        const factor = Math.exp(this.clamp(delta * 0.0016 * this.motionScale, -0.45, 0.45));

        // zoom hacia el punto bajo el cursor: desplaza el pivote hacia ese punto
        const c2 = new Cesium.Cartesian2(e.offsetX, e.offsetY);
        const hit = this.pickWorld(c2);
        const nextRange = this.clamp(this.targetRange * factor);
        if (hit && factor < 1) {
          const k = Math.min(0.45, (this.targetRange - nextRange) / this.targetRange) * 0.8;
          const dir = Cesium.Cartesian3.subtract(hit, this.targetPivot, new Cesium.Cartesian3());
          const len = Cesium.Cartesian3.magnitude(dir);
          if (len > 1) {
            Cesium.Cartesian3.divideByScalar(dir, len, dir);
            const step = Math.min(len, this.targetRange) * k;
            Cesium.Cartesian3.add(
              this.targetPivot,
              Cesium.Cartesian3.multiplyByScalar(dir, step, new Cesium.Cartesian3()),
              this.targetPivot,
            );
          }
        }
        this.targetRange = nextRange;
      },
      { passive: false },
    );

    c.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.focusAt(new Cesium.Cartesian2(e.offsetX, e.offsetY));
    });

    addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement) return;
      this.keys.add(e.code);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
      if (e.code === 'Escape') this.keys.clear();
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());
  }

  /* ------------------------------------------------------------------ */

  private clamp(v: number, min = MIN_RANGE, max = MAX_RANGE): number {
    return Math.max(min, Math.min(max, v));
  }

  private clampPitch(p: number): number {
    return Math.max(PITCH_MIN, Math.min(PITCH_MAX, p));
  }

  /** Paneo en el plano de la pantalla (metros por píxel). */
  private pan(dxPx: number, dyPx: number): void {
    const scene = this.viewer.scene;
    const h = scene.canvas.clientHeight || 1;
    const metersPerPx = (2 * this.range * Math.tan(this.fov / 2)) / h;

    const camera = scene.camera;
    const right = Cesium.Cartesian3.clone(camera.right, new Cesium.Cartesian3());
    const up = Cesium.Cartesian3.clone(camera.up, new Cesium.Cartesian3());

    const move = new Cesium.Cartesian3();
    Cesium.Cartesian3.multiplyByScalar(right, dxPx * metersPerPx, right);
    Cesium.Cartesian3.multiplyByScalar(up, dyPx * metersPerPx, up);
    Cesium.Cartesian3.add(right, up, move);
    Cesium.Cartesian3.add(this.targetPivot, move, this.targetPivot);
    this.tween = null;
  }

  /* ------------------------------------------------------------------ */

  private pickWorld(pos: Cesium.Cartesian2): Cesium.Cartesian3 | null {
    const scene = this.viewer.scene;
    let p: Cesium.Cartesian3 | undefined;
    if (scene.pickPositionSupported) {
      const picked = scene.pick(pos, 4, 3);
      if (picked) p = scene.pickPosition(pos);
    }
    if (!p) {
      const ray = scene.camera.getPickRay(pos);
      if (ray) p = scene.globe.pick(ray, scene) ?? undefined;
    }
    return p ?? null;
  }

  private pickPivot(pos: Cesium.Cartesian2): void {
    const hit = this.pickWorld(pos);
    if (!hit) return;
    this.setPivot(hit, true);
  }

  focusAt(pos: Cesium.Cartesian2): void {
    const hit = this.pickWorld(pos);
    if (!hit) return;
    this.flyTo(
      {
        pivot: hit,
        heading: this.targetHeading,
        pitch: Math.min(this.targetPitch, -0.28),
        range: this.clamp(Math.max(90, this.targetRange * 0.42), 60, 420),
      },
      1.7,
    );
  }

  /* ------------------------------------------------------------------ */

  flyTo(k: Partial<Keyframe>, duration = 2.0): void {
    const to: Keyframe = {
      pivot: k.pivot ?? Cesium.Cartesian3.clone(this.targetPivot),
      heading: k.heading ?? this.targetHeading,
      pitch: k.pitch ?? this.targetPitch,
      range: k.range ?? this.targetRange,
    };
    // elige el sentido de giro más corto
    let h = to.heading;
    while (h - this.targetHeading > Math.PI) h -= Math.PI * 2;
    while (h - this.targetHeading < -Math.PI) h += Math.PI * 2;
    to.heading = h;

    this.tween = {
      from: {
        pivot: Cesium.Cartesian3.clone(this.targetPivot),
        heading: this.targetHeading,
        pitch: this.targetPitch,
        range: this.targetRange,
      },
      to,
      start: performance.now(),
      duration: duration * 1000,
    };
  }

  /* ------------------------------------------------------------------ */

  private updateKeys(dt: number): void {
    if (!this.keys.size) return;
    const k = this.keys;
    const speed = Math.max(6, this.range * 0.55) * dt;
    let rot = 0;
    if (k.has('KeyQ')) rot += 1;
    if (k.has('KeyE')) rot -= 1;
    if (rot) {
      this.targetHeading += rot * 0.9 * dt;
      this.tween = null;
    }
    let f = 0;
    let s = 0;
    if (k.has('KeyW') || k.has('ArrowUp')) f += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) f -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) s += 1;
    if (k.has('KeyA') || k.has('ArrowLeft')) s -= 1;
    if (k.has('PageUp')) this.targetRange = this.clamp(this.targetRange * (1 - 0.6 * dt));
    if (k.has('PageDown')) this.targetRange = this.clamp(this.targetRange * (1 + 0.6 * dt));
    if (!f && !s) return;

    const camera = this.viewer.scene.camera;
    const right = Cesium.Cartesian3.clone(camera.right, new Cesium.Cartesian3());
    const fwd = Cesium.Cartesian3.clone(camera.direction, new Cesium.Cartesian3());
    const move = new Cesium.Cartesian3();
    Cesium.Cartesian3.multiplyByScalar(right, s * speed, right);
    Cesium.Cartesian3.multiplyByScalar(fwd, f * speed, fwd);
    Cesium.Cartesian3.add(right, fwd, move);
    Cesium.Cartesian3.add(this.targetPivot, move, this.targetPivot);
    this.tween = null;
  }

  update(dt: number): void {
    this.updateKeys(dt);

    if (this.tween) {
      const t = Math.min(1, (performance.now() - this.tween.start) / this.tween.duration);
      const e = easeInOutCubic(t);
      const { from, to } = this.tween;
      Cesium.Cartesian3.lerp(from.pivot, to.pivot, e, this.targetPivot);
      this.targetHeading = from.heading + (to.heading - from.heading) * e;
      this.targetPitch = from.pitch + (to.pitch - from.pitch) * e;
      // rango: interpolación geométrica, se siente lineal en zoom
      this.targetRange = Math.exp(Math.log(from.range) + (Math.log(to.range) - Math.log(from.range)) * e);
      if (t >= 1) this.tween = null;
    }

    const a = 1 - Math.exp(-this.damping * dt);

    this.heading += (this.targetHeading - this.heading) * a;
    this.pitch += (this.targetPitch - this.pitch) * a;
    this.range = Math.exp(Math.log(this.range) + (Math.log(this.targetRange) - Math.log(this.range)) * a);
    Cesium.Cartesian3.lerp(this.pivot, this.targetPivot, a, this.pivot);

    this.viewer.camera.lookAt(
      this.pivot,
      new Cesium.HeadingPitchRange(this.heading, this.pitch, this.range),
    );
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }
}

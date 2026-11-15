import * as Cesium from 'cesium';

/**
 * Cámara arquitectónica.
 *
 * Modo órbita: gira 360° alrededor de un pivote propio, con amortiguación en
 * todos los ejes, paneo, zoom exponencial hacia el cursor, pivote dinámico por
 * clic, doble clic para enfocar y transiciones cinematográficas.
 * Modo peatonal: ojo a 1,70 m del suelo, se mira arrastrando y se camina con
 * WASD / flechas / rueda / dos dedos.
 * Entradas: mouse, teclado y pantalla táctil.
 */

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export interface Keyframe {
  pivot: Cesium.Cartesian3;
  heading: number;
  pitch: number;
  range: number;
}

const PITCH_MIN = -1.5533; // casi cenital
const PITCH_MAX = -0.012; // horizonte, sin cruzar el suelo
const MAX_RANGE = 4200;
const MIN_RANGE = 6;
const EYE = 1.7;

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

  private damping = 9;

  private drag: { id: number; x: number; y: number; mode: 'orbit' | 'pan'; moved: boolean } | null = null;
  private pointers = new Map<number, { x: number; y: number }>();
  private pinch: { distance: number; range: number; cx: number; cy: number } | null = null;
  private lastTap = 0;

  private keys = new Set<string>();
  private tween: { from: Keyframe; to: Keyframe; start: number; duration: number } | null = null;
  private fov = Cesium.Math.toRadians(48);

  /* peatonal */
  private walking = false;
  private eye = new Cesium.Cartesian3();
  private eyeTarget = new Cesium.Cartesian3();
  private wHeading = 0;
  private wPitch = 0;
  private wHeadingT = 0;
  private wPitchT = 0;

  /** clic sin arrastre: recibe el punto del mundo (o null si no tocó nada) */
  onPick: ((world: Cesium.Cartesian3 | null) => void) | null = null;
  onModeChange: ((walking: boolean) => void) | null = null;
  /** altura elipsoidal del suelo bajo un punto (para caminar) */
  groundHeight: ((c: Cesium.Cartographic) => number | undefined) | null = null;

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer;
    this.canvas = viewer.scene.canvas;
    viewer.scene.screenSpaceCameraController.enableInputs = false;
    this.bind();
  }

  get isWalking(): boolean {
    return this.walking;
  }

  get state(): { heading: number; pitch: number; range: number; pivot: Cesium.Cartesian3 } {
    return { heading: this.targetHeading, pitch: this.targetPitch, range: this.targetRange, pivot: Cesium.Cartesian3.clone(this.targetPivot) };
  }

  setPivot(p: Cesium.Cartesian3, keepView = true): void {
    if (keepView) {
      // conserva la posición de la cámara: solo cambia el centro de giro
      const camPos = Cesium.Cartesian3.clone(this.viewer.camera.positionWC);
      const toCam = Cesium.Cartesian3.subtract(camPos, p, new Cesium.Cartesian3());
      const dist = Cesium.Cartesian3.magnitude(toCam);
      const enu = Cesium.Transforms.eastNorthUpToFixedFrame(p);
      const inv = Cesium.Matrix4.inverseTransformation(enu, new Cesium.Matrix4());
      const l = Cesium.Matrix4.multiplyByPointAsVector(inv, toCam, new Cesium.Cartesian3());
      if (dist > 1) {
        const pitch = -Math.asin(Math.max(-1, Math.min(1, l.z / dist)));
        if (pitch < PITCH_MAX && pitch > PITCH_MIN) {
          let h = Math.atan2(-l.x, -l.y);
          while (h - this.heading > Math.PI) h -= Math.PI * 2;
          while (h - this.heading < -Math.PI) h += Math.PI * 2;
          this.heading = this.targetHeading = h;
          this.pitch = this.targetPitch = pitch;
          this.range = this.targetRange = this.clamp(dist);
          Cesium.Cartesian3.clone(p, this.pivot);
        }
      }
    }
    this.targetPivot = Cesium.Cartesian3.clone(p);
    this.tween = null;
  }

  /* ------------------------------------------------------------------ entradas */

  private bind(): void {
    const c = this.canvas;
    c.style.touchAction = 'none';

    c.addEventListener('pointerdown', (e) => {
      c.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), range: this.targetRange, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
        this.drag = null;
        return;
      }
      if (e.button === 2 || e.button === 1 || e.shiftKey) {
        this.drag = { id: e.pointerId, x: e.offsetX, y: e.offsetY, mode: 'pan', moved: false };
      } else if (e.button === 0) {
        this.drag = { id: e.pointerId, x: e.offsetX, y: e.offsetY, mode: 'orbit', moved: false };
      }
      this.tween = null;
    });

    c.addEventListener('pointermove', (e) => {
      if (!this.pointers.has(e.pointerId)) return;
      this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });

      if (this.pointers.size === 2 && this.pinch) {
        const [a, b] = [...this.pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        if (this.walking) {
          this.walk((this.pinch.cy - cy) * 0.06, 0);
        } else {
          if (d > 0 && this.pinch.distance > 0) this.targetRange = this.clamp((this.pinch.range * this.pinch.distance) / d);
          this.pan(this.pinch.cx - cx, cy - this.pinch.cy);
        }
        this.pinch.cx = cx;
        this.pinch.cy = cy;
        return;
      }

      if (!this.drag || e.pointerId !== this.drag.id) return;
      const dx = e.offsetX - this.drag.x;
      const dy = e.offsetY - this.drag.y;
      this.drag.x = e.offsetX;
      this.drag.y = e.offsetY;
      if (Math.abs(dx) + Math.abs(dy) > 1.5) this.drag.moved = true;
      this.tween = null;

      if (this.walking) {
        if (this.drag.mode === 'orbit') {
          this.wHeadingT -= dx * 0.0032;
          this.wPitchT = Math.max(-1.2, Math.min(1.2, this.wPitchT + dy * 0.0028));
        } else this.walk(dy * 0.05, -dx * 0.05);
      } else if (this.drag.mode === 'orbit') {
        this.targetHeading -= dx * 0.0042;
        this.targetPitch = this.clampPitch(this.targetPitch - dy * 0.0034);
      } else {
        this.pan(-dx, dy);
      }
    });

    const endPointer = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinch = null;
      if (this.drag && e.pointerId === this.drag.id) {
        const click = !this.drag.moved && this.drag.mode === 'orbit';
        this.drag = null;
        if (click && e.type === 'pointerup') {
          const pos = new Cesium.Cartesian2(e.offsetX, e.offsetY);
          // doble toque en pantallas táctiles
          const now = performance.now();
          if (e.pointerType !== 'mouse' && now - this.lastTap < 320) {
            this.lastTap = 0;
            this.focusAt(pos);
            return;
          }
          this.lastTap = now;
          const hit = this.pickWorld(pos);
          if (hit && !this.walking) this.setPivot(hit, true);
          this.onPick?.(hit);
        }
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
        if (this.walking) {
          this.walk(-delta * 0.02, 0);
          return;
        }
        const factor = Math.exp(Math.max(-0.45, Math.min(0.45, delta * 0.0016)));

        // zoom hacia el punto bajo el cursor
        const hit = this.pickWorld(new Cesium.Cartesian2(e.offsetX, e.offsetY));
        const nextRange = this.clamp(this.targetRange * factor);
        if (hit && factor < 1) {
          const k = Math.min(0.45, (this.targetRange - nextRange) / this.targetRange) * 0.8;
          const dir = Cesium.Cartesian3.subtract(hit, this.targetPivot, new Cesium.Cartesian3());
          const len = Cesium.Cartesian3.magnitude(dir);
          if (len > 1) {
            const step = (Math.min(len, this.targetRange) * k) / len;
            Cesium.Cartesian3.add(this.targetPivot, Cesium.Cartesian3.multiplyByScalar(dir, step, dir), this.targetPivot);
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
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown'].includes(e.code)) e.preventDefault();
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());
  }

  /* ------------------------------------------------------------------ utilidades */

  private clamp(v: number, min = MIN_RANGE, max = MAX_RANGE): number {
    return Math.max(min, Math.min(max, v));
  }

  private clampPitch(p: number): number {
    return Math.max(PITCH_MIN, Math.min(PITCH_MAX, p));
  }

  /** Desplaza un punto en su plano horizontal local: adelante/derecha según un rumbo. */
  private moveHorizontal(p: Cesium.Cartesian3, heading: number, fwd: number, right: number): void {
    const enu = Cesium.Transforms.eastNorthUpToFixedFrame(p);
    const local = new Cesium.Cartesian3(
      Math.sin(heading) * fwd + Math.cos(heading) * right,
      Math.cos(heading) * fwd - Math.sin(heading) * right,
      0,
    );
    Cesium.Matrix4.multiplyByPoint(enu, local, p);
  }

  /** Paneo: el suelo sigue al cursor (metros por píxel a la distancia del pivote). */
  private pan(dxPx: number, dyPx: number): void {
    const h = this.canvas.clientHeight || 1;
    const mpp = (2 * this.range * Math.tan(this.fov / 2)) / h;
    const slope = Math.max(0.35, Math.sin(-this.pitch));
    this.moveHorizontal(this.targetPivot, this.heading, (dyPx * mpp) / slope, dxPx * mpp);
    this.tween = null;
  }

  private walk(fwd: number, right: number): void {
    this.moveHorizontal(this.eyeTarget, this.wHeading, fwd, right);
    this.snapEye();
  }

  private snapEye(): void {
    const c = Cesium.Cartographic.fromCartesian(this.eyeTarget);
    const g = this.groundHeight?.(c);
    if (g !== undefined && Number.isFinite(g)) {
      c.height = g + EYE;
      Cesium.Cartographic.toCartesian(c, undefined, this.eyeTarget);
    }
  }

  pickWorld(pos: Cesium.Cartesian2): Cesium.Cartesian3 | null {
    const scene = this.viewer.scene;
    let p: Cesium.Cartesian3 | undefined;
    if (scene.pickPositionSupported) {
      const picked = scene.pick(pos, 4, 4);
      if (picked) p = scene.pickPosition(pos);
    }
    if (!p) {
      const ray = scene.camera.getPickRay(pos);
      if (ray) p = scene.globe.pick(ray, scene) ?? undefined;
    }
    return p ?? null;
  }

  focusAt(pos: Cesium.Cartesian2): void {
    const hit = this.pickWorld(pos);
    if (!hit) return;
    if (this.walking) {
      // en peatonal: camina hasta el punto
      Cesium.Cartesian3.clone(hit, this.eyeTarget);
      this.snapEye();
      return;
    }
    this.flyTo(
      {
        pivot: hit,
        heading: this.targetHeading,
        pitch: Math.min(this.targetPitch, -0.3),
        range: this.clamp(Math.max(70, this.targetRange * 0.42), 50, 420),
      },
      1.6,
    );
  }

  /* ------------------------------------------------------------------ transiciones */

  flyTo(k: Partial<Keyframe>, duration = 2.0): void {
    if (this.walking) this.exitWalk(false);
    const to: Keyframe = {
      pivot: k.pivot ?? Cesium.Cartesian3.clone(this.targetPivot),
      heading: k.heading ?? this.targetHeading,
      pitch: k.pitch ?? this.targetPitch,
      range: k.range ?? this.targetRange,
    };
    let h = to.heading;
    while (h - this.targetHeading > Math.PI) h -= Math.PI * 2;
    while (h - this.targetHeading < -Math.PI) h += Math.PI * 2;
    to.heading = h;
    if (duration <= 0.02) {
      this.tween = null;
      this.targetPivot = Cesium.Cartesian3.clone(to.pivot);
      this.pivot = Cesium.Cartesian3.clone(to.pivot);
      this.heading = this.targetHeading = to.heading;
      this.pitch = this.targetPitch = to.pitch;
      this.range = this.targetRange = to.range;
      return;
    }
    this.tween = {
      from: { pivot: Cesium.Cartesian3.clone(this.targetPivot), heading: this.targetHeading, pitch: this.targetPitch, range: this.targetRange },
      to,
      start: performance.now(),
      duration: duration * 1000,
    };
  }

  /** Baja a la calle en el punto dado (o en el pivote actual). */
  enterWalk(at?: Cesium.Cartesian3): void {
    Cesium.Cartesian3.clone(at ?? this.targetPivot, this.eyeTarget);
    this.snapEye();
    Cesium.Cartesian3.clone(this.viewer.camera.positionWC, this.eye);
    this.wHeading = this.wHeadingT = this.heading;
    this.wPitch = this.pitch;
    this.wPitchT = 0;
    this.walking = true;
    this.tween = null;
    this.onModeChange?.(true);
  }

  exitWalk(notify = true): void {
    if (!this.walking) return;
    this.walking = false;
    // la órbita retoma desde donde está la persona
    const c = Cesium.Cartographic.fromCartesian(this.eyeTarget);
    c.height -= EYE - 1;
    const p = Cesium.Cartographic.toCartesian(c);
    this.pivot = Cesium.Cartesian3.clone(p);
    this.targetPivot = p;
    this.heading = this.targetHeading = this.wHeading;
    this.pitch = -0.05;
    this.range = 8;
    if (notify) this.onModeChange?.(false);
    else this.onModeChange?.(false);
  }

  /* ------------------------------------------------------------------ bucle */

  private updateKeys(dt: number): void {
    if (!this.keys.size) return;
    const k = this.keys;
    const turbo = k.has('ShiftLeft') || k.has('ShiftRight') ? 3 : 1;
    let f = 0;
    let s = 0;
    if (k.has('KeyW') || k.has('ArrowUp')) f += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) f -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) s += 1;
    if (k.has('KeyA') || k.has('ArrowLeft')) s -= 1;
    let rot = 0;
    if (k.has('KeyQ')) rot += 1;
    if (k.has('KeyE')) rot -= 1;

    if (this.walking) {
      if (rot) this.wHeadingT -= rot * 1.2 * dt;
      if (f || s) this.walk(f * 4.2 * turbo * dt, s * 3.4 * turbo * dt);
      return;
    }
    if (rot) { this.targetHeading += rot * 0.9 * dt; this.tween = null; }
    if (k.has('PageUp') || k.has('Equal') || k.has('NumpadAdd')) this.targetRange = this.clamp(this.targetRange * (1 - 0.9 * dt));
    if (k.has('PageDown') || k.has('Minus') || k.has('NumpadSubtract')) this.targetRange = this.clamp(this.targetRange * (1 + 0.9 * dt));
    if (k.has('KeyR')) this.targetPitch = this.clampPitch(this.targetPitch - 0.7 * dt);
    if (k.has('KeyF')) this.targetPitch = this.clampPitch(this.targetPitch + 0.7 * dt);
    if (!f && !s) return;
    const speed = Math.max(8, this.range * 0.6) * turbo * dt;
    this.moveHorizontal(this.targetPivot, this.heading, f * speed, s * speed);
    this.tween = null;
  }

  update(dt: number): void {
    this.updateKeys(dt);
    const a = 1 - Math.exp(-this.damping * dt);

    if (this.walking) {
      Cesium.Cartesian3.lerp(this.eye, this.eyeTarget, 1 - Math.exp(-5 * dt), this.eye);
      this.wHeading += (this.wHeadingT - this.wHeading) * a;
      this.wPitch += (this.wPitchT - this.wPitch) * a;
      this.viewer.camera.setView({
        destination: this.eye,
        orientation: { heading: this.wHeading, pitch: this.wPitch, roll: 0 },
      });
      return;
    }

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

    this.heading += (this.targetHeading - this.heading) * a;
    this.pitch += (this.targetPitch - this.pitch) * a;
    this.range = Math.exp(Math.log(this.range) + (Math.log(this.targetRange) - Math.log(this.range)) * a);
    Cesium.Cartesian3.lerp(this.pivot, this.targetPivot, a, this.pivot);

    this.viewer.camera.lookAt(this.pivot, new Cesium.HeadingPitchRange(this.heading, this.pitch, this.range));
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }
}

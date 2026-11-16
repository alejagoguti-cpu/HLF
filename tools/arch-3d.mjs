/**
 * Primitivas arquitectónicas 3D reales (sin cajas planas ni ventanas pegadas):
 *   - Vanos profundos 3D con alféizar, dintel, derrames y vidrio remetido (-0.38 m)
 *   - Perfilería 3D de aluminio (parteluces verticales y horizontales)
 *   - Ventanas trapezoidales en voladizo (bay windows en ladrillo + vidrio)
 *   - Balcones 3D en voladizo con losa y baranda en vidrio/metal
 *   - Marcos entrelazados 3D + fachaleta + celosías metálicas 3D reales
 */

export function makeMeshBuilder(mats) {
  function addQuad(mat, a, b, c, d, uva = [0, 0], uvb = [1, 0], uvc = [1, 1], uvd = [0, 1]) {
    const m = mats[mat];
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.hypot(nx, ny, nz) || 1; nx /= L; ny /= L; nz /= L;
    const base = m.n;
    const pts = [a, b, c, d], uvs = [uva, uvb, uvc, uvd];
    for (let i = 0; i < 4; i++) {
      m.P.push(pts[i][0], pts[i][2], -pts[i][1]);
      m.N.push(nx, nz, -ny);
      m.UV.push(uvs[i][0], uvs[i][1]);
      m.n++;
    }
    m.I.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  function addBox(mat, e0, n0, z0, e1, n1, z1, uvScale = 0.25) {
    const w = Math.abs(e1 - e0) * uvScale, d = Math.abs(n1 - n0) * uvScale, h = Math.abs(z1 - z0) * uvScale;
    addQuad(mat, [e0, n0, z1], [e1, n0, z1], [e1, n1, z1], [e0, n1, z1], [0, 0], [w, 0], [w, d], [0, d]);
    addQuad(mat, [e0, n0, z0], [e1, n0, z0], [e1, n0, z1], [e0, n0, z1], [0, 0], [w, 0], [w, h], [0, h]);
    addQuad(mat, [e1, n0, z0], [e1, n1, z0], [e1, n1, z1], [e1, n0, z1], [0, 0], [d, 0], [d, h], [0, h]);
    addQuad(mat, [e1, n1, z0], [e0, n1, z0], [e0, n1, z1], [e1, n1, z1], [0, 0], [w, 0], [w, h], [0, h]);
    addQuad(mat, [e0, n1, z0], [e0, n0, z0], [e0, n0, z1], [e0, n1, z1], [0, 0], [d, 0], [d, h], [0, h]);
  }

  // Caja orientada en coordenadas locales de fachada (s0..s1 a lo largo, d0..d1 profundidad, z0..z1 altura)
  function addLocalBox(mat, pt, s0, s1, d0, d1, z0, z1, uvScale = 0.35) {
    const w = Math.abs(s1 - s0) * uvScale, d = Math.abs(d1 - d0) * uvScale, h = Math.abs(z1 - z0) * uvScale;
    addQuad(mat, pt(s0, d1, z0), pt(s1, d1, z0), pt(s1, d1, z1), pt(s0, d1, z1), [0, 0], [w, 0], [w, h], [0, h]); // frente
    addQuad(mat, pt(s1, d0, z0), pt(s0, d0, z0), pt(s0, d0, z1), pt(s1, d0, z1), [0, 0], [w, 0], [w, h], [0, h]); // atrás
    addQuad(mat, pt(s0, d0, z0), pt(s0, d1, z0), pt(s0, d1, z1), pt(s0, d0, z1), [0, 0], [d, 0], [d, h], [0, h]); // izq
    addQuad(mat, pt(s1, d1, z0), pt(s1, d0, z0), pt(s1, d0, z1), pt(s1, d1, z1), [0, 0], [d, 0], [d, h], [0, h]); // der
    addQuad(mat, pt(s0, d1, z1), pt(s1, d1, z1), pt(s1, d0, z1), pt(s0, d0, z1), [0, 0], [w, 0], [w, d], [0, d]); // arriba
    addQuad(mat, pt(s0, d0, z0), pt(s1, d0, z0), pt(s1, d1, z0), pt(s0, d1, z0), [0, 0], [w, 0], [w, d], [0, d]); // abajo
  }

  /**
   * Módulos de fachada con VANO PROFUNDO 3D REAL (sin muro plano detrás del vidrio)
   */
  function add3DWindowBay(wallMat, frameMat, glassMat, pt, s0, s1, z0, z1, opts = {}) {
    const {
      sillH = 0.85,
      headH = 0.35,
      pierW = 0.40,
      recess = -0.45,
      uvS = 0.35,
      balcony = false,
      balconyDepth = 1.05,
      slabMat = wallMat,
      mullions = 2,
    } = opts;
    const w0 = s0 + pierW, w1 = s1 - pierW;
    const zSill = z0 + sillH, zHead = z1 - headH;
    if (w1 - w0 < 0.8 || zHead - zSill < 0.8) {
      addQuad(wallMat, pt(s0, 0, z0), pt(s1, 0, z0), pt(s1, 0, z1), pt(s0, 0, z1), [0, 0], [(s1 - s0) * uvS, 0], [(s1 - s0) * uvS, (z1 - z0) * uvS], [0, (z1 - z0) * uvS]);
      return;
    }

    // 1. Antepecho inferior, dintel superior y machones laterales (dejan el hueco 100% abierto)
    addQuad(wallMat, pt(s0, 0, z0), pt(s1, 0, z0), pt(s1, 0, zSill), pt(s0, 0, zSill), [0, 0], [(s1 - s0) * uvS, 0], [(s1 - s0) * uvS, sillH * uvS], [0, sillH * uvS]);
    addQuad(wallMat, pt(s0, 0, zHead), pt(s1, 0, zHead), pt(s1, 0, z1), pt(s0, 0, z1), [0, 0], [(s1 - s0) * uvS, 0], [(s1 - s0) * uvS, headH * uvS], [0, headH * uvS]);
    addQuad(wallMat, pt(s0, 0, zSill), pt(w0, 0, zSill), pt(w0, 0, zHead), pt(s0, 0, zHead), [0, 0], [pierW * uvS, 0], [pierW * uvS, (zHead - zSill) * uvS], [0, (zHead - zSill) * uvS]);
    addQuad(wallMat, pt(w1, 0, zSill), pt(s1, 0, zSill), pt(s1, 0, zHead), pt(w1, 0, zHead), [0, 0], [pierW * uvS, 0], [pierW * uvS, (zHead - zSill) * uvS], [0, (zHead - zSill) * uvS]);

    // 2. Derrames 3D (profundidad real de la abertura) + alféizar saliente
    addQuad(wallMat, pt(w0, recess, zSill), pt(w0, 0, zSill), pt(w0, 0, zHead), pt(w0, recess, zHead), [0, 0], [0.2, 0], [0.2, 0.8], [0, 0.8]); // derrame izq
    addQuad(wallMat, pt(w1, 0, zSill), pt(w1, recess, zSill), pt(w1, recess, zHead), pt(w1, 0, zHead), [0, 0], [0.2, 0], [0.2, 0.8], [0, 0.8]); // derrame der
    addQuad(wallMat, pt(w0, recess, zHead), pt(w1, recess, zHead), pt(w1, 0, zHead), pt(w0, 0, zHead), [0, 0], [0.8, 0], [0.8, 0.2], [0, 0.2]); // dintel abajo
    addLocalBox(frameMat, pt, w0 - 0.04, w1 + 0.04, recess, 0.08, zSill - 0.06, zSill + 0.02, 0.5); // alféizar 3D

    // 3. Vidrio remetido + parteluces 3D reales
    const gz = recess + 0.05;
    addQuad(glassMat, pt(w0, gz, zSill), pt(w1, gz, zSill), pt(w1, gz, zHead), pt(w0, gz, zHead), [0, 0], [2, 0], [2, 1], [0, 1]);
    for (let m = 1; m < mullions; m++) {
      const mx = w0 + ((w1 - w0) * m) / mullions;
      addLocalBox(frameMat, pt, mx - 0.03, mx + 0.03, gz - 0.02, gz + 0.04, zSill, zHead, 0.5);
    }
    addLocalBox(frameMat, pt, w0, w1, gz - 0.02, gz + 0.04, zHead - 0.06, zHead, 0.5);

    // 4. Balcón 3D en voladizo opcional
    if (balcony) {
      addLocalBox(slabMat, pt, w0 - 0.15, w1 + 0.15, 0, balconyDepth, z0, z0 + 0.22, 0.35);
      addLocalBox(frameMat, pt, w0 - 0.12, w1 + 0.12, balconyDepth - 0.06, balconyDepth, z0 + 0.96, z0 + 1.04, 0.5);
      addQuad(glassMat, pt(w0 - 0.10, balconyDepth - 0.03, z0 + 0.22), pt(w1 + 0.10, balconyDepth - 0.03, z0 + 0.22), pt(w1 + 0.10, balconyDepth - 0.03, z0 + 0.96), pt(w0 - 0.10, balconyDepth - 0.03, z0 + 0.96), [0, 0], [2, 0], [2, 0.6], [0, 0.6]);
    }
  }

  /**
   * Ventana trapezoidal 3D en voladizo (bow-window de ladrillo y vidrio, como 12746 Ak 15)
   */
  function add3DBayWindow(wallMat, frameMat, glassMat, pt, s0, s1, z0, z1, uvS = 0.35) {
    const w0 = s0 + 0.35, w1 = s1 - 0.35;
    const wm = (w0 + w1) * 0.5, hw = (w1 - w0) * 0.32;
    const out = 0.72, zSill = z0 + 0.85, zHead = z1 - 0.25;
    // Machones laterales en muro
    addQuad(wallMat, pt(s0, 0, z0), pt(w0, 0, z0), pt(w0, 0, z1), pt(s0, 0, z1), [0, 0], [0.15, 0], [0.15, 1], [0, 1]);
    addQuad(wallMat, pt(w1, 0, z0), pt(s1, 0, z0), pt(s1, 0, z1), pt(w1, 0, z1), [0, 0], [0.15, 0], [0.15, 1], [0, 1]);
    // Antepecho saliente trapezoidal en ladrillo
    addQuad(wallMat, pt(w0, 0, z0), pt(wm - hw, out, z0), pt(wm - hw, out, zSill), pt(w0, 0, zSill), [0, 0], [0.4, 0], [0.4, 0.3], [0, 0.3]);
    addQuad(wallMat, pt(wm - hw, out, z0), pt(wm + hw, out, z0), pt(wm + hw, out, zSill), pt(wm - hw, out, zSill), [0, 0], [0.8, 0], [0.8, 0.3], [0, 0.3]);
    addQuad(wallMat, pt(wm + hw, out, z0), pt(w1, 0, z0), pt(w1, 0, zSill), pt(wm + hw, out, zSill), [0, 0], [0.4, 0], [0.4, 0.3], [0, 0.3]);
    // Paños de vidrio 3D trapezoidales
    addQuad(glassMat, pt(w0, 0.04, zSill), pt(wm - hw, out - 0.04, zSill), pt(wm - hw, out - 0.04, zHead), pt(w0, 0.04, zHead), [0, 0], [1, 0], [1, 1], [0, 1]);
    addQuad(glassMat, pt(wm - hw, out - 0.04, zSill), pt(wm + hw, out - 0.04, zSill), pt(wm + hw, out - 0.04, zHead), pt(wm - hw, out - 0.04, zHead), [0, 0], [2, 0], [2, 1], [0, 1]);
    addQuad(glassMat, pt(wm + hw, out - 0.04, zSill), pt(w1, 0.04, zSill), pt(w1, 0.04, zHead), pt(wm + hw, out - 0.04, zHead), [0, 0], [1, 0], [1, 1], [0, 1]);
    // Tapa superior en ladrillo/dintel
    addQuad(wallMat, pt(w0, 0, zHead), pt(wm - hw, out, zHead), pt(wm + hw, out, zHead), pt(w1, 0, zHead), [0, 0], [0.3, 0.3], [0.7, 0.3], [1, 0]);
    addQuad(wallMat, pt(w0, 0, zHead), pt(s1, 0, zHead), pt(s1, 0, z1), pt(w0, 0, z1), [0, 0], [(s1 - w0) * uvS, 0], [(s1 - w0) * uvS, 0.15], [0, 0.15]);
  }

  return { addQuad, addBox, addLocalBox, add3DWindowBay, add3DBayWindow };
}

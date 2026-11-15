import * as Cesium from 'cesium';

/**
 * Fachadas, cubiertas y tejas.
 *
 * Cada vértice trae:
 *   texCoord_0  muros: (vano, piso)   cubiertas: metros
 *   color_0     r = aleatorio del edificio, g = pisos/32, b = tipo, a = segundo aleatorio
 * tipo: 0 muro · 1 cubierta plana · 0.5 teja de barro · 0.78 alero
 */
export function facadeShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    varyings: {
      vPosM: Cesium.VaryingType.VEC3,
      vNrmM: Cesium.VaryingType.VEC3,
    },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
        vNrmM = vsInput.attributes.normalMC;
      }
    `,
    fragmentShaderText: `
      float h11(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) { return 0.55 * vnoise(p) + 0.3 * vnoise(p * 2.3) + 0.15 * vnoise(p * 5.1); }
      // rectángulo suavizado en una celda 0..1
      float box(vec2 f, vec2 lo, vec2 hi, vec2 aa) {
        vec2 a = smoothstep(lo - aa, lo + aa, f);
        vec2 b = 1.0 - smoothstep(hi - aa, hi + aa, f);
        return a.x * a.y * b.x * b.y;
      }

      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec4 vc = fsInput.attributes.color_0;
        vec2 uv = fsInput.attributes.texCoord_0;
        float rnd = vc.r;
        float rnd2 = vc.a;
        float pisos = max(1.0, floor(vc.g * 32.0 + 0.5));
        float tipo = vc.b;

        vec3 viewDir = normalize(-fsInput.attributes.positionEC);
        vec3 nEC = normalize(material.normalEC);
        float ndv = clamp(abs(dot(nEC, viewDir)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 5.0);

        vec3 col;
        float rough = 0.86;
        vec3 spec = vec3(0.04);
        vec3 emis = vec3(0.0);
        float occ = 1.0;

        if (tipo > 0.9) {
          /* ---------- cubierta plana ---------- */
          float n = fbm(uv * 0.35);
          float fine = vnoise(uv * 3.1);
          vec3 concreto = mix(vec3(0.36, 0.36, 0.35), vec3(0.50, 0.49, 0.47), rnd2);
          vec3 manto = mix(vec3(0.30, 0.30, 0.31), vec3(0.42, 0.40, 0.38), rnd);
          vec3 barro = mix(vec3(0.52, 0.25, 0.16), vec3(0.62, 0.33, 0.21), rnd2);
          col = mix(concreto, manto, step(0.5, fract(rnd * 7.31)));
          // casas bajas: buena parte con teja de barro, como el sector real
          float esTeja = step(pisos, 2.5) * step(0.42, fract(rnd * 3.17));
          float hilada = 0.82 + 0.18 * smoothstep(0.0, 0.5, abs(fract((uv.x * (0.3 + rnd2) + uv.y) * 3.2) - 0.5));
          col = mix(col, barro * hilada, esTeja);
          col *= 0.80 + 0.32 * n;
          col *= 0.94 + 0.10 * fine;
          // manchas de agua y juntas de impermeabilización
          float junta = smoothstep(0.03, 0.0, abs(fract(uv.x / 6.0 + rnd) - 0.5) - 0.47) * (1.0 - esTeja);
          col *= 1.0 - 0.14 * junta;
          rough = mix(0.9, 0.78, esTeja);
        } else if (tipo > 0.65) {
          /* ---------- alero ---------- */
          col = vec3(0.72, 0.68, 0.61) * (0.9 + 0.12 * vnoise(vPosM.xz * 1.5));
          rough = 0.8;
        } else if (tipo > 0.3) {
          /* ---------- teja de barro del hotel ---------- */
          vec2 t = uv * vec2(3.0, 2.6);                 // ~33 cm de canal, ~38 cm de hilada
          float canal = abs(fract(t.x) - 0.5) * 2.0;    // 0 lomo, 1 canal
          float hil = fract(t.y);
          float id = h21(floor(t));
          vec3 a = vec3(0.60, 0.29, 0.18), b = vec3(0.71, 0.39, 0.24), c = vec3(0.47, 0.22, 0.15);
          col = mix(a, b, id);
          col = mix(col, c, smoothstep(0.75, 1.0, h21(floor(t) + 7.3)));
          col *= 0.62 + 0.38 * (1.0 - canal * canal);   // sombra en el canal
          col *= 0.86 + 0.14 * smoothstep(0.0, 0.12, hil); // borde de cada teja
          col *= 0.86 + 0.26 * fbm(vPosM.xz * 0.22);    // pátina
          rough = 0.84;
          // relieve: inclina la normal según el lomo
          float bump = (fract(t.x) - 0.5) * 1.1;
          vec3 tx = normalize(cross(nEC, vec3(0.0, 1.0, 0.0)) + 1e-4);
          material.normalEC = normalize(nEC + tx * bump * (1.0 - canal));
        } else {
          /* ---------- muro ---------- */
          float torre = step(8.5, pisos);
          float sel = fract(rnd * 5.37);
          // paleta del sector: ladrillo a la vista, pañete claro, concreto, piedra
          vec3 ladrillo = mix(vec3(0.50, 0.24, 0.15), vec3(0.63, 0.34, 0.21), rnd2);
          vec3 ladrOsc = mix(vec3(0.36, 0.19, 0.14), vec3(0.45, 0.24, 0.17), rnd2);
          vec3 panete = mix(vec3(0.80, 0.78, 0.72), vec3(0.90, 0.88, 0.84), rnd2);
          vec3 concreto = mix(vec3(0.52, 0.52, 0.50), vec3(0.66, 0.65, 0.62), rnd2);
          vec3 arena = mix(vec3(0.70, 0.62, 0.50), vec3(0.78, 0.71, 0.60), rnd2);
          vec3 wall = ladrillo;
          float esLadrillo = 1.0;
          if (sel > 0.52) { wall = panete; esLadrillo = 0.0; }
          if (sel > 0.72) { wall = concreto; esLadrillo = 0.0; }
          if (sel > 0.84) { wall = arena; esLadrillo = 0.0; }
          if (sel > 0.93) { wall = ladrOsc; esLadrillo = 1.0; }
          float cortina = torre * step(0.62, rnd2);     // torres con muro cortina

          float v = uv.y;
          float piso = floor(v);
          vec2 f = vec2(fract(uv.x), fract(v));
          vec2 aa = clamp(fwidth(vec2(uv.x, v)) * 1.2, vec2(0.004), vec2(0.5));
          float lejos = clamp(max(aa.x, aa.y) * 3.0, 0.0, 1.0);   // 1 = muy lejos: se promedia

          float enCuerpo = step(0.0, v) * (1.0 - step(pisos, v));
          float bajo = step(0.0, v) * (1.0 - step(1.0, v));       // primer piso
          float zocalo = 1.0 - step(0.0, v);
          float remate = step(pisos, v);

          // proporciones de vano por edificio
          float ww = mix(0.50, 0.78, fract(rnd * 9.7));
          float wh0 = mix(0.26, 0.36, fract(rnd * 3.3));
          float wh1 = mix(0.80, 0.90, fract(rnd * 6.1));
          ww = mix(ww, 0.94, cortina); wh0 = mix(wh0, 0.06, cortina); wh1 = mix(wh1, 0.97, cortina);
          // locales en primer piso de los edificios altos
          float local = bajo * step(3.5, pisos);
          ww = mix(ww, 0.88, local); wh0 = mix(wh0, 0.05, local); wh1 = mix(wh1, 0.84, local);

          vec2 lo = vec2(0.5 - ww * 0.5, wh0), hi = vec2(0.5 + ww * 0.5, wh1);
          float vano = box(f, lo, hi, aa) * enCuerpo;
          float marco = box(f, lo - vec2(0.022, 0.03), hi + vec2(0.022, 0.03), aa) * enCuerpo - vano;
          // parteluces
          float parte = (1.0 - smoothstep(0.0, 0.012 + aa.x, abs(f.x - 0.5))) * step(0.6, ww);
          parte = max(parte, (1.0 - smoothstep(0.0, 0.012 + aa.y, abs(f.y - mix(wh0, wh1, 0.68)))) * (1.0 - cortina));
          parte *= vano * (1.0 - lejos);

          // ---- muro ----
          vec2 wp = vec2(uv.x * 3.3, v * 3.0);          // metros aproximados sobre el paño
          float grano = fbm(wp * 0.6 + rnd * 40.0);
          col = wall * (0.86 + 0.26 * grano);
          // hiladas de ladrillo (se desvanecen con la distancia para no hacer muaré)
          float hil = fract(wp.y / 0.075);
          float trab = fract(wp.x / 0.25 + step(1.0, mod(floor(wp.y / 0.075), 2.0)) * 0.5);
          float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
          float cerca = 1.0 - smoothstep(0.004, 0.022, fwidth(wp.y));
          col = mix(col, col * vec3(0.80, 0.78, 0.76), junta * esLadrillo * cerca * 0.85);
          col *= mix(1.0, 0.90 + 0.2 * h21(floor(vec2(wp.x / 0.25, wp.y / 0.075))), esLadrillo * cerca);
          // placas de entrepiso y dinteles
          float placa = (1.0 - smoothstep(0.0, 0.035 + aa.y, f.y)) * enCuerpo * step(0.5, v);
          col = mix(col, mix(concreto, panete, 0.4) * 0.92, placa * mix(0.75, 0.25, esLadrillo * (1.0 - torre)));
          // escurrimientos bajo los vanos y suciedad en la base
          float chorreo = smoothstep(wh0, wh0 - 0.22, f.y) * box(f, vec2(lo.x, -1.0), vec2(hi.x, 2.0), aa) * enCuerpo;
          col *= 1.0 - 0.10 * chorreo * vnoise(vec2(uv.x * 9.0, 0.0));
          col *= mix(1.0, 0.80, smoothstep(0.9, 0.0, v) * (1.0 - zocalo));
          // zócalo y remate
          col = mix(col, vec3(0.30, 0.30, 0.30) * (0.85 + 0.3 * grano), zocalo);
          col = mix(col, mix(wall, concreto, 0.55) * 1.04, remate * 0.8);
          col = mix(col, col * 0.72, remate * (1.0 - smoothstep(0.0, 0.05, v - pisos)));
          rough = mix(0.9, 0.82, esLadrillo);

          // ---- marco ----
          vec3 cMarco = mix(vec3(0.16, 0.16, 0.17), vec3(0.86, 0.86, 0.84), step(0.55, fract(rnd * 13.7)));
          col = mix(col, cMarco, clamp(marco, 0.0, 1.0) * (1.0 - cortina * 0.6));

          // ---- vidrio ----
          vec2 celda = vec2(floor(uv.x), piso);
          float wid = h21(celda + rnd * 91.0);
          vec3 cielo = mix(vec3(0.62, 0.72, 0.84), vec3(0.30, 0.47, 0.72), clamp(reflect(-viewDir, nEC).y * 0.5 + 0.5, 0.0, 1.0));
          cielo = mix(cielo, vec3(0.02, 0.03, 0.06), uNight);
          vec3 tinte = mix(vec3(0.045, 0.065, 0.085), vec3(0.03, 0.075, 0.07), fract(rnd * 2.9));
          tinte = mix(tinte, vec3(0.08, 0.10, 0.13), cortina);
          // interior: cortinas y persianas distintas por ventana
          float cortinaTela = step(0.55, wid) * (1.0 - cortina) * (1.0 - local);
          float baja = mix(0.25, 0.95, h21(celda + 3.1));
          float tela = cortinaTela * step((f.y - wh0) / max(0.01, wh1 - wh0), baja);
          vec3 interior = mix(tinte, mix(vec3(0.42, 0.40, 0.36), vec3(0.62, 0.60, 0.55), h21(celda + 9.4)), tela * 0.8);
          // vitrina iluminada de los locales
          interior = mix(interior, vec3(0.34, 0.30, 0.24) * (0.6 + 0.8 * h21(celda + 1.7)), local * 0.75);
          vec3 vidrio = mix(interior, cielo, clamp(0.10 + 0.72 * fres, 0.0, 1.0));
          vidrio = mix(vidrio, cMarco * 0.9, parte);
          // lejos: el paño se resuelve como promedio de muro y vidrio, sin parpadeo
          col = mix(col, vidrio, vano);
          rough = mix(rough, 0.07, vano * (1.0 - parte));
          spec = mix(spec, vec3(0.06), vano);

          // ---- noche: ventanas encendidas ----
          float on = step(0.52, h21(celda + 17.0 + rnd * 53.0));
          on = mix(on, step(0.25, wid), local);
          vec3 luz = mix(vec3(1.0, 0.66, 0.34), vec3(1.0, 0.90, 0.74), h21(celda + 5.5));
          luz = mix(luz, vec3(0.82, 0.90, 1.0), step(0.82, wid) * torre);
          emis = luz * on * vano * (1.0 - parte) * (0.55 + 0.5 * (1.0 - tela)) * uNight * 1.25;
          // oclusión de esquina con la rasante
          occ = mix(0.72, 1.0, smoothstep(-0.4, 0.9, v));
        }

        material.diffuse = col * mix(1.0, 0.42, uNight);
        material.roughness = rough;
        material.specular = spec;
        material.occlusion = occ;
        material.emissive = emis;
      }
    `,
  });
}

/** Vegetación: impostores fotográficos con luz envolvente y oclusión hacia el interior de la copa. */
export function treeShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    varyings: {
      vTreeP: Cesium.VaryingType.VEC3,
      vTreeW: Cesium.VaryingType.VEC3,
    },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vTreeP = vsInput.attributes.positionMC;
        vTreeW = (czm_model * vec4(vsOutput.positionMC, 1.0)).xyz;
      }
    `,
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // variación de tono por árbol (posición en el mundo)
        float id = fract(sin(dot(floor(vTreeW.xy * 0.13) + floor(vTreeW.z * 0.13), vec2(12.9898, 78.233))) * 43758.5453);
        c *= mix(vec3(0.84, 0.92, 0.80), vec3(1.06, 1.08, 0.92), id);
        // más oscuro abajo y hacia el tronco, más claro en la copa exterior
        float r = length(vTreeP.xz);
        float copa = smoothstep(0.0, 4.0, r + vTreeP.y * 0.35);
        c *= mix(0.62, 1.08, copa);
        material.diffuse = c * mix(1.0, 0.30, uNight);
        material.roughness = 0.9;
        material.specular = vec3(0.02);
        // algo de luz atraviesa la hoja: evita copas negras a contraluz
        material.emissive = c * 0.10 * (1.0 - uNight);
        material.occlusion = mix(0.75, 1.0, copa);
      }
    `,
  });
}

/** La ciudad real de Google: de día se deja como es; de noche se apaga sin volverse un bloque negro. */
export function cityShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    lightingModel: Cesium.LightingModel.UNLIT,
    varyings: {
      vCityPos: Cesium.VaryingType.VEC3,
    },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vCityPos = vsInput.attributes.positionMC;
      }
    `,
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float grain = fract(sin(dot(floor(vCityPos.xz * 0.35), vec2(12.9898, 78.233))) * 43758.5453);
        vec3 c = material.diffuse;
        vec3 night = c * vec3(0.15, 0.18, 0.25);
        night += vec3(1.0, 0.72, 0.40) * step(0.968, grain) * 0.30;
        material.diffuse = mix(c, night, uNight);
      }
    `,
  });
}

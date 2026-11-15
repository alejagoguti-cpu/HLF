import * as Cesium from 'cesium';

/** Bruma por distancia (misma atmósfera para modelo, vegetación y ciudad). */
/** Textura 1x1 mientras llega la foto aérea. */
export function blankTexture(): Cesium.TextureUniform {
  return new Cesium.TextureUniform({ typedArray: new Uint8Array([128, 128, 128, 255]), width: 1, height: 1 });
}
const AERIAL_UNIFORMS = () => ({
  uAerial: { type: Cesium.UniformType.SAMPLER_2D, value: blankTexture() },
  /** rectángulo ENU que cubre la foto: este0, norte0, este1, norte1 */
  uAerialRect: { type: Cesium.UniformType.VEC4, value: new Cesium.Cartesian4(-1000, -1000, 1000, 1000) },
  uAerialOn: { type: Cesium.UniformType.FLOAT, value: 0 },
});
const AERIAL_GLSL = `
  vec3 hlfAerial(vec2 en) {
    vec2 uv = (en - uAerialRect.xy) / (uAerialRect.zw - uAerialRect.xy);
    return czm_srgbToLinear(texture(uAerial, clamp(uv, 0.001, 0.999)).rgb);
  }
`;
const HAZE_GLSL = `
  vec3 hlfHazeColor(float night) { return mix(vec3(0.70, 0.72, 0.74), vec3(0.03, 0.04, 0.07), night); }
  float hlfHaze(float d) { return 0.0; }   // sin neblina
`;

/**
 * Fachadas, cubiertas y tejas.
 *
 * Cada vértice trae:
 *   texCoord_0  muros: (vano, piso)   cubiertas: metros
 *   color_0     r = aleatorio del edificio, g = pisos/32, b = tipo, a = segundo aleatorio
 * tipo: 0 muro · 1 cubierta plana · 0.5 teja de barro · 0.78 alero
 *
 * Paleta sobria (referencia: render Kennedy de Unreal): ladrillo pálido, pañete
 * claro, cubiertas gris claro. El detalle fino (hiladas, parteluces, cortinas)
 * solo se calcula cerca de la cámara.
 */
export function facadeShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
      /** desplazamiento de la foto por metro de altura (la foto aérea no es perfectamente cenital) */
      uLean: { type: Cesium.UniformType.VEC2, value: new Cesium.Cartesian2(0, 0) },
      ...AERIAL_UNIFORMS(),
    },
    varyings: {
      vPosM: Cesium.VaryingType.VEC3,
    },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vPosM = vsInput.attributes.positionMC;
      }
    `,
    fragmentShaderText: HAZE_GLSL + AERIAL_GLSL + `
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
      }
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
        float dist = length(fsInput.attributes.positionEC);
        float near = 1.0 - smoothstep(120.0, 420.0, dist);     // 1 cerca, 0 lejos

        vec3 col;
        float rough = 0.88;
        vec3 spec = vec3(0.04);
        vec3 emis = vec3(0.0);
        float occ = 1.0;

        if (tipo > 0.9) {
          /* ---------- cubierta plana: gris claro, como la losa real vista desde el aire ---------- */
          vec3 losa = mix(vec3(0.66, 0.64, 0.59), vec3(0.78, 0.76, 0.71), rnd2);
          vec3 manto = mix(vec3(0.56, 0.55, 0.52), vec3(0.66, 0.64, 0.60), rnd);
          vec3 barro = mix(vec3(0.62, 0.42, 0.33), vec3(0.70, 0.49, 0.38), rnd2);
          col = mix(losa, manto, step(0.62, fract(rnd * 7.31)));
          float esTeja = step(pisos, 2.5) * step(0.55, fract(rnd * 3.17));
          col = mix(col, barro, esTeja);
          col *= 0.90 + 0.16 * vnoise(uv * 0.3);
          if (near > 0.0) {
            float junta = smoothstep(0.03, 0.0, abs(fract(uv.x / 6.0 + rnd) - 0.5) - 0.47) * (1.0 - esTeja);
            float hilada = smoothstep(0.0, 0.5, abs(fract((uv.x * (0.3 + rnd2) + uv.y) * 3.2) - 0.5));
            col *= 1.0 - near * (0.10 * junta + 0.14 * esTeja * (1.0 - hilada));
            col *= 1.0 - near * 0.06 * (vnoise(uv * 3.1) - 0.5);
          }
          // cubierta real: la foto aérea, corrida según la altura del edificio
          if (uAerialOn > 0.5) {
            vec3 foto = hlfAerial(uv + uLean * pisos * 3.0);
            col = mix(col, foto, 0.94);
          }
        } else if (tipo > 0.65) {
          /* ---------- alero ---------- */
          col = vec3(0.74, 0.71, 0.66);
        } else if (tipo > 0.3) {
          /* ---------- teja de barro del hotel ---------- */
          vec2 t = uv * vec2(3.0, 2.6);                 // ~33 cm de canal, ~38 cm de hilada
          vec3 a = vec3(0.63, 0.40, 0.30), b = vec3(0.72, 0.49, 0.37), c = vec3(0.54, 0.34, 0.27);
          col = mix(a, b, vnoise(vPosM.xz * 0.35));
          if (near > 0.0) {
            float canal = abs(fract(t.x) - 0.5) * 2.0;
            float id = h21(floor(t));
            vec3 fino = mix(a, b, id);
            fino = mix(fino, c, smoothstep(0.78, 1.0, h21(floor(t) + 7.3)));
            fino *= 0.70 + 0.30 * (1.0 - canal * canal);
            fino *= 0.88 + 0.12 * smoothstep(0.0, 0.12, fract(t.y));
            col = mix(col * 0.9, fino, near);
          } else col *= 0.9;
          if (uAerialOn > 0.5) {
            // el color lo pone la cubierta real fotografiada; la teja modelada aporta el relieve
            vec3 foto = hlfAerial(vec2(vPosM.x, -vPosM.z) + uLean * 21.0);
            float lum = dot(col, vec3(0.3333)) / 0.42;
            col = mix(col, foto * mix(1.0, lum, 0.55 * near), 0.9);
          }
          rough = 0.86;
        } else {
          /* ---------- muro ---------- */
          float torre = step(8.5, pisos);
          float sel = fract(rnd * 5.37);
          float hotel = step(0.06, tipo);
          vec3 ladrillo = mix(vec3(0.56, 0.31, 0.22), vec3(0.65, 0.39, 0.28), rnd2);
          vec3 ladrOsc = mix(vec3(0.44, 0.26, 0.20), vec3(0.51, 0.31, 0.24), rnd2);
          vec3 panete = mix(vec3(0.80, 0.79, 0.75), vec3(0.89, 0.88, 0.85), rnd2);
          vec3 concreto = mix(vec3(0.62, 0.62, 0.60), vec3(0.72, 0.71, 0.69), rnd2);
          vec3 arena = mix(vec3(0.74, 0.69, 0.60), vec3(0.80, 0.76, 0.68), rnd2);
          vec3 wall = ladrillo;
          float esLadrillo = 1.0;
          if (sel > 0.46) { wall = panete; esLadrillo = 0.0; }
          if (sel > 0.74) { wall = concreto; esLadrillo = 0.0; }
          if (sel > 0.86) { wall = arena; esLadrillo = 0.0; }
          if (sel > 0.94) { wall = ladrOsc; esLadrillo = 1.0; }
          if (hotel > 0.5) { wall = vec3(0.60, 0.34, 0.24); esLadrillo = 1.0; }   // Hotel La Fontana: ladrillo a la vista
          float cortina = torre * step(0.72, rnd2) * (1.0 - hotel);     // algunas torres con muro cortina

          float v = uv.y;
          vec2 f = vec2(fract(uv.x), fract(v));
          vec2 aa = clamp(fwidth(vec2(uv.x, v)) * 1.2, vec2(0.004), vec2(0.5));

          float enCuerpo = step(0.0, v) * (1.0 - step(pisos, v));
          float bajo = step(0.0, v) * (1.0 - step(1.0, v));
          float zocalo = 1.0 - step(0.0, v);
          float remate = step(pisos, v);

          float ww = mix(0.46, 0.72, fract(rnd * 9.7));
          float wh0 = mix(0.28, 0.38, fract(rnd * 3.3));
          float wh1 = mix(0.80, 0.90, fract(rnd * 6.1));
          ww = mix(ww, 0.92, cortina); wh0 = mix(wh0, 0.08, cortina); wh1 = mix(wh1, 0.96, cortina);
          if (hotel > 0.5) { ww = 0.52; wh0 = 0.30; wh1 = 0.86; }
          float local = bajo * step(3.5, pisos) * (1.0 - hotel);
          ww = mix(ww, 0.86, local); wh0 = mix(wh0, 0.06, local); wh1 = mix(wh1, 0.84, local);

          vec2 lo = vec2(0.5 - ww * 0.5, wh0), hi = vec2(0.5 + ww * 0.5, wh1);
          float vano = box(f, lo, hi, aa) * enCuerpo;

          col = wall * (0.93 + 0.12 * vnoise(vec2(uv.x * 1.7, v * 1.5) + rnd * 40.0));
          // placa de entrepiso
          float placa = (1.0 - smoothstep(0.0, 0.035 + aa.y, f.y)) * enCuerpo * step(0.5, v);
          col = mix(col, mix(concreto, panete, 0.5), placa * mix(0.7, 0.2, esLadrillo * (1.0 - torre)));
          col = mix(col, vec3(0.46, 0.46, 0.45), zocalo);
          col = mix(col, mix(wall, concreto, 0.5) * 1.03, remate * 0.7);

          vec3 cMarco = mix(vec3(0.30, 0.31, 0.32), vec3(0.88, 0.88, 0.86), max(hotel, step(0.5, fract(rnd * 13.7))));
          // vidrio: gris azulado suave, sin contraste duro
          vec3 tinte = mix(vec3(0.30, 0.32, 0.33), vec3(0.27, 0.30, 0.30), fract(rnd * 2.9));
          tinte = mix(tinte, vec3(0.40, 0.44, 0.47), cortina);
          vec3 vidrio = tinte;
          vec2 celda = vec2(floor(uv.x), floor(v));
          float wid = h21(celda + rnd * 91.0);
          float parte = 0.0;
          float tela = 0.0;

          if (near > 0.0) {
            vec3 viewDir = normalize(-fsInput.attributes.positionEC);
            vec3 nEC = normalize(material.normalEC);
            float fres = pow(1.0 - clamp(abs(dot(nEC, viewDir)), 0.0, 1.0), 5.0);
            // hiladas de ladrillo
            vec2 wp = vec2(uv.x * 3.3, v * 3.0);
            float cerca = (1.0 - smoothstep(0.004, 0.022, fwidth(wp.y))) * esLadrillo;
            if (cerca > 0.0) {
              float hil = fract(wp.y / 0.075);
              float trab = fract(wp.x / 0.25 + step(1.0, mod(floor(wp.y / 0.075), 2.0)) * 0.5);
              float junta = max(1.0 - smoothstep(0.0, 0.16, hil), 1.0 - smoothstep(0.0, 0.06, trab));
              col = mix(col, col * vec3(0.86, 0.85, 0.84), junta * cerca * 0.8);
              col *= mix(1.0, 0.93 + 0.14 * h21(floor(vec2(wp.x / 0.25, wp.y / 0.075))), cerca);
            }
            // marco y parteluces
            float marco = box(f, lo - vec2(0.022, 0.03), hi + vec2(0.022, 0.03), aa) * enCuerpo - vano;
            col = mix(col, cMarco, clamp(marco, 0.0, 1.0) * near * (1.0 - cortina * 0.6));
            parte = (1.0 - smoothstep(0.0, 0.012 + aa.x, abs(f.x - 0.5))) * step(0.6, ww);
            parte = max(parte, (1.0 - smoothstep(0.0, 0.012 + aa.y, abs(f.y - mix(wh0, wh1, 0.68)))) * (1.0 - cortina));
            parte *= near;
            // cortinas distintas por ventana, vitrinas en los locales
            float baja = mix(0.25, 0.95, h21(celda + 3.1));
            tela = step(0.55, wid) * (1.0 - cortina) * (1.0 - local) * step((f.y - wh0) / max(0.01, wh1 - wh0), baja);
            vec3 interior = mix(tinte * 0.8, mix(vec3(0.60, 0.58, 0.54), vec3(0.74, 0.72, 0.68), h21(celda + 9.4)), tela * 0.8 * near);
            interior = mix(interior, vec3(0.50, 0.46, 0.40), local * 0.6);
            vec3 cielo = mix(vec3(0.74, 0.79, 0.84), vec3(0.52, 0.63, 0.76), clamp(reflect(-viewDir, nEC).y * 0.5 + 0.5, 0.0, 1.0));
            cielo = mix(cielo, vec3(0.03, 0.04, 0.07), uNight);
            vidrio = mix(tinte, mix(interior, cielo, clamp(0.16 + 0.7 * fres, 0.0, 1.0)), near);
            vidrio = mix(vidrio, cMarco, parte);
            rough = mix(rough, 0.12, vano * near * (1.0 - parte));
            // suciedad en la base
            col *= mix(1.0, 0.88, smoothstep(0.9, 0.0, v) * (1.0 - zocalo) * near);
          }
          col = mix(col, vidrio, vano);

          // noche: ventanas encendidas
          if (uNight > 0.01) {
            float on = step(0.52, h21(celda + 17.0 + rnd * 53.0));
            on = mix(on, step(0.25, wid), local);
            vec3 luz = mix(vec3(1.0, 0.66, 0.34), vec3(1.0, 0.90, 0.74), h21(celda + 5.5));
            emis = luz * on * vano * (1.0 - parte) * (0.55 + 0.5 * (1.0 - tela)) * uNight * 1.25;
          }
          occ = mix(0.8, 1.0, smoothstep(-0.4, 0.9, v));
        }

        float hz = hlfHaze(dist);
        material.diffuse = col * mix(1.0, 0.42, uNight) * (1.0 - hz);
        material.roughness = rough;
        material.specular = spec * (1.0 - hz);
        material.occlusion = occ;
        // relleno de cielo: las caras en sombra no se van a negro azulado
        material.emissive = (emis + col * 0.22 * (1.0 - uNight)) * (1.0 - hz) + hlfHazeColor(uNight) * hz;
      }
    `,
  });
}

/**
 * Vegetación: un plano por árbol que siempre mira a la cámara.
 *
 * El plano muestra la fotografía del escaneo real que corresponde al ángulo desde
 * el que se mira el árbol (4 vistas laterales cada 45°, reflejadas para los otros
 * 180°, mezcladas entre sí) y pasa a la vista superior cuando la cámara sube.
 * La normal se abomba como una copa para que el sol la modele con volumen.
 */
export function treeShader(atlasUrl: string, frame: number, topFrame: number): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
      uFrame: { type: Cesium.UniformType.FLOAT, value: frame },
      uTop: { type: Cesium.UniformType.FLOAT, value: topFrame },
      uAtlas: {
        type: Cesium.UniformType.SAMPLER_2D,
        value: new Cesium.TextureUniform({
          url: atlasUrl,
          repeat: false,
          minificationFilter: Cesium.TextureMinificationFilter.LINEAR_MIPMAP_LINEAR,
          magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
        }),
      },
    },
    varyings: {
      vUV: Cesium.VaryingType.VEC2,
      vView: Cesium.VaryingType.VEC3, // x = ángulo/45°, y = elevación (seno), z = semilla
      vRightT: Cesium.VaryingType.VEC2,
      vUpT: Cesium.VaryingType.VEC2,
    },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vec3 base = vsInput.attributes.positionMC;
        vec2 corner = vsInput.attributes.texCoord_0;
        vec2 sc = vsInput.attributes.texCoord_1;
        vec4 col = vsInput.attributes.color_0;
        float W = uFrame * sc.x;
        float H = uFrame * sc.y;
        vec3 C = base + vec3(0.0, 0.5 * H, 0.0);
        vec3 cam = (czm_inverseModelView * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        vec3 toCam = normalize(cam - C);
        vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCam) + vec3(1.0e-4, 0.0, 0.0));
        vec3 up = cross(toCam, right);
        vsOutput.positionMC = C + right * (corner.x * 0.5 * W) + up * ((corner.y - 0.5) * H);

        float yaw = col.r * 6.2831853;
        float cy = cos(yaw);
        float sy = sin(yaw);
        // al marco propio del árbol (deshace su giro alrededor de +Y)
        vec2 t = vec2(toCam.x * cy - toCam.z * sy, toCam.x * sy + toCam.z * cy);
        float ang = atan(-t.x, t.y);
        if (ang < 0.0) ang += 6.2831853;
        vView = vec3(ang / 0.78539816, toCam.y, col.g);
        vUV = vec2(corner.x * 0.5 + 0.5, corner.y);
        vRightT = vec2(right.x * cy - right.z * sy, right.x * sy + right.z * cy);
        vUpT = vec2(up.x * cy - up.z * sy, up.x * sy + up.z * cy);
      }
    `,
    fragmentShaderText: HAZE_GLSL + `
      vec4 lado(float i, vec2 uv) {
        float flip = step(3.5, i);
        float cell = i - 4.0 * flip;
        float u = clamp(mix(uv.x, 1.0 - uv.x, flip), 0.004, 0.996);
        float v = clamp(uv.y, 0.004, 0.996);
        return texture(uAtlas, vec2((cell + u) * 0.25, 0.5 + 0.5 * v));
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float a8 = mod(vView.x, 8.0);
        float i0 = floor(a8);
        float w = smoothstep(0.3, 0.7, a8 - i0);
        vec4 c = mix(lado(i0, vUV), lado(mod(i0 + 1.0, 8.0), vUV), w);

        float k = smoothstep(0.60, 0.90, vView.y);
        if (k > 0.0) {
          vec2 p = (vRightT * (vUV.x - 0.5) + vUpT * (vUV.y - 0.5)) * (uFrame / uTop);
          vec2 q = clamp(p + 0.5, 0.004, 0.996);
          float dentro = step(abs(p.x), 0.5) * step(abs(p.y), 0.5);
          vec4 sup = texture(uAtlas, vec2(q.x * 0.25, 0.5 - 0.5 * q.y)) * dentro;
          c = mix(c, sup, k);
        }

        vec3 rgb = czm_srgbToLinear(c.rgb);
        // verde natural, apagado; cada árbol con un tono algo distinto
        float l = dot(rgb, vec3(0.3, 0.59, 0.11));
        rgb = mix(vec3(l), rgb, 0.74) * mix(vec3(0.74, 0.86, 0.68), vec3(0.94, 1.0, 0.78), vView.z);
        // copa: más densa y oscura hacia el centro y la base
        vec2 d = (vUV - vec2(0.5, 0.55)) * 2.0;
        float borde = clamp(length(d), 0.0, 1.0);
        rgb *= mix(0.72, 1.06, borde * borde) * mix(0.80, 1.0, smoothstep(0.05, 0.6, vUV.y));

        float hz = hlfHaze(length(fsInput.attributes.positionEC));
        material.diffuse = rgb * mix(1.0, 0.28, uNight) * (1.0 - hz);
        material.alpha = clamp(c.a * 1.3, 0.0, 1.0);
        // normal abombada (en coordenadas de ojo): el sol modela la copa
        vec3 n = normalize(vec3(d.x * 0.9, d.y * 0.9 + 0.25, 0.85));
        material.normalEC = n;
        material.roughness = 0.94;
        material.specular = vec3(0.02);
        material.occlusion = 1.0;
        material.emissive = rgb * 0.20 * (1.0 - uNight) * (1.0 - hz) + hlfHazeColor(uNight) * hz;
      }
    `,
  });
}

/** La ciudad real de Google: algo desaturada para convivir con el modelo; de noche se apaga. */
export function cityShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: HAZE_GLSL + `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 c = material.diffuse;
        // el verde y el rojo de la foto aérea se bajan un poco para que no compitan con el modelo
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 0.78);
        c = mix(c, c * vec3(0.15, 0.18, 0.25), uNight);
        material.diffuse = mix(c, hlfHazeColor(uNight), hlfHaze(length(fsInput.attributes.positionEC)));
      }
    `,
  });
}

/**
 * Etalonaje final + bruma por profundidad sobre todo lo que se ve
 * (globo, ciudad de Google y modelo): la misma atmósfera suave del render de Unreal.
 */
export function gradeStage(): Cesium.PostProcessStage {
  return new Cesium.PostProcessStage({
    name: 'hlf_grade',
    uniforms: {
      uNight: 0.0,
    },
    fragmentShader: `
      uniform sampler2D colorTexture;
      uniform float uNight;
      in vec2 v_textureCoordinates;
      void main() {
        vec4 src = texture(colorTexture, v_textureCoordinates);
        vec3 c = src.rgb;
        // color sobrio: menos saturación, sombras levantadas, luces contenidas
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = mix(vec3(l), c, 0.84);
        c = mix(c, c * c * (3.0 - 2.0 * c), 0.10);
        c = c * 0.97 + 0.022 * (1.0 - uNight);
        out_FragColor = vec4(c, src.a);
      }
    `,
  });
}

/**
 * Suelo modelado, con materiales reales:
 *   terreno (capa 0): la foto aérea real del sector (parqueaderos, canchas, prados tal como son)
 *   vías, andenes, separadores y ciclorrutas: texturas fotográficas (las del proyecto Unreal)
 * La capa llega por vértice (color_0.r * 8): 0 terreno · 1 vía · 2 andén · 3 separador · 4 ciclorruta · 5 agua · 6 canal · 7 puente
 */
export function groundShader(base: string): Cesium.CustomShader {
  const tex = (name: string) => ({
    type: Cesium.UniformType.SAMPLER_2D,
    value: new Cesium.TextureUniform({
      url: base + name,
      repeat: true,
      minificationFilter: Cesium.TextureMinificationFilter.LINEAR_MIPMAP_LINEAR,
      magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
    }),
  });
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
      uAsfalto: tex('tex_asfalto.webp'),
      uAnden: tex('tex_anden.webp'),
      uPrado: tex('tex_prado.webp'),
      uCiclo: tex('tex_ciclo.webp'),
      ...AERIAL_UNIFORMS(),
    },
    varyings: { vG: Cesium.VaryingType.VEC3 },
    vertexShaderText: `
      void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
        vG = vsInput.attributes.positionMC;
      }
    `,
    fragmentShaderText: HAZE_GLSL + AERIAL_GLSL + `
      float gh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float gn(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(gh(i), gh(i + vec2(1.0, 0.0)), f.x), mix(gh(i + vec2(0.0, 1.0)), gh(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float capa = floor(fsInput.attributes.color_0.r * 8.0 + 0.5);
        vec2 p = vG.xz;
        vec2 en = vec2(vG.x, -vG.z);
        float big = gn(p * 0.03);
        vec3 foto = uAerialOn > 0.5 ? hlfAerial(en) : vec3(0.36, 0.40, 0.30);
        vec3 col;
        float rough = 0.95;
        if (capa < 0.5) {             // terreno: tal cual es en la realidad
          col = foto;
        } else if (capa < 1.5) {      // vía: asfalto real, con el desgaste que muestra la foto
          col = czm_srgbToLinear(texture(uAsfalto, p / 5.0).rgb) * (0.86 + 0.28 * big);
          col = mix(col, foto, 0.22 * uAerialOn);
          rough = 0.88;
        } else if (capa < 2.5) {      // andén: adoquín de concreto
          col = czm_srgbToLinear(texture(uAnden, p / 2.4).rgb) * (0.92 + 0.16 * big);
          col = mix(col, foto, 0.18 * uAerialOn);
        } else if (capa < 3.5) {      // separador: prado
          col = czm_srgbToLinear(texture(uPrado, p / 3.0).rgb) * (0.80 + 0.30 * big);
        } else if (capa < 4.5) {      // ciclorruta
          col = czm_srgbToLinear(texture(uCiclo, p / 4.0).rgb) * (0.92 + 0.16 * big);
        } else if (capa < 5.5) {      // agua del canal
          col = mix(vec3(0.10, 0.15, 0.15), vec3(0.15, 0.20, 0.19), gn(p * 0.4));
          rough = 0.15;
        } else {                      // canal y puentes: concreto
          col = mix(vec3(0.42, 0.41, 0.39), vec3(0.50, 0.49, 0.47), big);
        }
        material.diffuse = col * mix(1.0, 0.35, uNight);
        material.roughness = rough;
        material.specular = vec3(0.03);
        material.emissive = col * 0.14 * (1.0 - uNight);
      }
    `,
  });
}

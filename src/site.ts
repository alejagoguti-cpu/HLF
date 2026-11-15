import * as Cesium from 'cesium';
import { SITE, ASSETS } from './config';

/** Matriz del modelo: marco ENU en el sitio + giro de alineación. */
export function siteModelMatrix(height: number): Cesium.Matrix4 {
  const enu = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(SITE.longitude, SITE.latitude, height),
  );
  const rot = Cesium.Matrix4.fromRotationTranslation(
    Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(SITE.headingOffset)),
  );
  return Cesium.Matrix4.multiply(enu, rot, new Cesium.Matrix4());
}

/**
 * Ventanas encendidas al caer la noche.
 * Solo actúa sobre paramentos verticales y dibuja una retícula de pisos con
 * encendido aleatorio estable, así no parece una textura repetida.
 */
function facadeNightShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    fragmentShaderText: /* glsl */ `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 nrm = normalize(fsInput.attributes.normalMC);
        float vertical = 1.0 - smoothstep(0.40, 0.75, abs(nrm.y));
        vec3 p = fsInput.attributes.positionMC;

        float w = 3.1;
        float fh = 3.6;
        float wx = fract(p.x / w);
        float wz = fract(p.z / w);
        float wy = fract(p.y / fh);
        float glassX = smoothstep(0.18, 0.30, min(wx, 1.0 - wx));
        float glassZ = smoothstep(0.18, 0.30, min(wz, 1.0 - wz));
        float glass = max(glassX, glassZ) * smoothstep(0.24, 0.36, min(wy, 1.0 - wy));

        vec2 cell = floor(vec2((p.x + p.z) / w, p.y / fh));
        float seed = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
        float on = step(0.34, seed);
        float warm = fract(seed * 7.13);
        vec3 tint = mix(vec3(1.0, 0.70, 0.38), vec3(1.0, 0.94, 0.80), warm);

        float base = clamp(dot(material.diffuse.rgb, vec3(0.3333)), 0.0, 1.0);
        material.emissive += tint * on * glass * vertical * (0.55 + 0.45 * base) * uNight;
        material.diffuse *= mix(1.0, 0.30, uNight);
      }
    `,
  });
}

/** La ciudad real se apaga de noche sin volverse un bloque negro. */
function cityNightShader(): Cesium.CustomShader {
  return new Cesium.CustomShader({
    uniforms: {
      uNight: { type: Cesium.UniformType.FLOAT, value: 0 },
    },
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: /* glsl */ `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 p = fsInput.attributes.positionMC;
        float grain = fract(sin(dot(floor(p.xz * 0.35), vec2(12.9898, 78.233))) * 43758.5453);
        vec3 c = material.diffuse.rgb;
        vec3 night = c * vec3(0.16, 0.19, 0.26);
        night += vec3(1.0, 0.72, 0.40) * step(0.965, grain) * 0.35;
        material.diffuse = mix(c, night, uNight);
      }
    `,
  });
}

export interface Site {
  model: Cesium.Model;
  tileset: Cesium.Cesium3DTileset;
  setNight(night: number): void;
  dispose(): void;
}

export async function loadSite(
  viewer: Cesium.Viewer,
  onProgress?: (label: string, ratio: number) => void,
): Promise<Site> {
  const scene = viewer.scene;

  let groundHeight = SITE.height;
  try {
    const carto = Cesium.Cartographic.fromDegrees(SITE.longitude, SITE.latitude);
    const [sampled] = await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [carto]);
    if (sampled && Number.isFinite(sampled.height)) groundHeight = sampled.height;
  } catch {
    /* sin terreno: se usa la altura de referencia del proyecto */
  }

  onProgress?.('Contexto urbano', 0.18);

  /* ---------------- ciudad y vegetación reales ---------------- */
  const cityShader = cityNightShader();
  const tileset = await Cesium.Cesium3DTileset.fromUrl(ASSETS.googleTiles, {
    maximumScreenSpaceError: 12,
    shadows: Cesium.ShadowMode.ENABLED,
    dynamicScreenSpaceError: true,
    dynamicScreenSpaceErrorDensity: 0.0022,
    dynamicScreenSpaceErrorFactor: 4,
    showCreditsOnScreen: true,
    cullWithChildrenBounds: true,
  });
  tileset.customShader = cityShader;
  viewer.scene.primitives.add(tileset);

  onProgress?.('Arquitectura del proyecto', 0.6);

  /* ---------------- arquitectura propia ---------------- */
  const facadeShader = facadeNightShader();
  const model = await Cesium.Model.fromGltfAsync({
    url: ASSETS.model,
    modelMatrix: siteModelMatrix(groundHeight + SITE.verticalOffset),
    shadows: Cesium.ShadowMode.ENABLED,
    show: true,
  });
  model.customShader = facadeShader;
  scene.primitives.add(model);

  onProgress?.('Vegetación y entorno', 0.9);

  const setNight = (v: number) => {
    cityShader.setUniform('uNight', v);
    facadeShader.setUniform('uNight', Math.max(0, (v - 0.2) / 0.8));
  };

  return {
    model,
    tileset,
    setNight,
    dispose() {
      scene.primitives.remove(model);
      scene.primitives.remove(tileset);
    },
  };
}

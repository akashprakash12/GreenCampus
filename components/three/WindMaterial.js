import * as THREE from "three";

export const foliageNames = [
  "ivy_2_lambert7_0",
  "ivy_1_lambert6_0",
  "grass_lambert9_0",
  "plant_lambert2_0",
];

export const windSettings = {
  strength: 0.08,
  speed: 0.75,
  direction: new THREE.Vector2(1, 0.25),
  gustStrength: 0.09,
  gustFrequency: 0.18,
};

const vertexDeformation = `
  uniform float uTime;
  uniform float uWindStrength;
  uniform float uWindSpeed;
  uniform vec2 uWindDirection;
  uniform float uGustStrength;
  uniform float uGustFrequency;
  uniform vec3 uTouchPosition;
  uniform vec3 uTouchDirection;
  uniform float uTouchStrength;
  uniform float uTouchRadius;
  uniform float uTouchActive;
  uniform float uPhase;
  attribute float aFlexibility;
`;

function installWindShader(material, options = {}) {
  const uniforms = {
    uTime: { value: 0 },
    uWindStrength: { value: options.strength ?? windSettings.strength },
    uWindSpeed: { value: options.speed ?? windSettings.speed },
    uWindDirection: { value: windSettings.direction.clone() },
    uGustStrength: { value: options.gustStrength ?? windSettings.gustStrength },
    uGustFrequency: { value: options.gustFrequency ?? windSettings.gustFrequency },
    uTouchPosition: { value: new THREE.Vector3() },
    uTouchDirection: { value: new THREE.Vector3() },
    uTouchStrength: { value: 0 },
    uTouchRadius: { value: options.touchRadius ?? 0.45 },
    uTouchActive: { value: 0 },
    uPhase: { value: options.phase ?? 0 },
  };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>\n${vertexDeformation}`,
      )
      .replace(
        "#include <begin_vertex>",
        `
          vec3 transformed = vec3(position);
          vec4 windWorldPosition = modelMatrix * vec4(transformed, 1.0);
          float windPhase = uTime * uWindSpeed + windWorldPosition.x * 1.4 +
            windWorldPosition.z * 0.9 + uPhase;
          float mainWave = sin(windPhase) * uWindStrength;
          float secondaryWave = sin(
            uTime * uWindSpeed * 1.7 + windWorldPosition.z * 2.1 +
            windWorldPosition.y * 0.8 + uPhase * 1.7
          ) * uWindStrength * 0.35;
          float flutter = sin(
            uTime * 3.2 + windWorldPosition.x * 4.0 +
            windWorldPosition.z * 3.0 + uPhase
          ) * uWindStrength * 0.08;
          float gust = sin(uTime * uGustFrequency + uPhase * 2.0);
          gust = smoothstep(-0.25, 0.95, gust) * uGustStrength;
          vec2 windVector = normalize(uWindDirection);
          vec3 windOffset = vec3(
            windVector.x * (mainWave + secondaryWave + flutter + gust),
            (mainWave + flutter) * 0.08,
            windVector.y * (mainWave + secondaryWave + flutter + gust)
          );
          float touchDistance = distance(windWorldPosition.xyz, uTouchPosition);
          float touchFalloff = 1.0 - smoothstep(0.0, uTouchRadius, touchDistance);
          vec3 touchOffset = uTouchDirection * touchFalloff * uTouchStrength * uTouchActive;
          transformed += (windOffset + touchOffset) * aFlexibility;
        `,
      )
      .replace(
        "#include <defaultnormal_vertex>",
        `
          #include <defaultnormal_vertex>
          vec4 normalWorldPosition = modelMatrix * vec4(position, 1.0);
          float normalWave = sin(
            uTime * uWindSpeed + normalWorldPosition.x * 1.4 +
            normalWorldPosition.z * 0.9 + uPhase
          ) * uWindStrength;
          vec2 normalWindVector = normalize(uWindDirection);
          objectNormal = normalize(objectNormal - vec3(
            normalWindVector.x * normalWave,
            0.0,
            normalWindVector.y * normalWave
          ) * aFlexibility * 0.18);
        `,
      );
    material.userData.windShader = shader;
  };

  material.customProgramCacheKey = () => "green-campus-pothos-wind-v1";
  material.userData.windUniforms = uniforms;
  material.needsUpdate = true;

  return uniforms;
}

export default installWindShader;

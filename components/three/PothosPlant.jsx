"use client";

import { useFrame } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import installWindShader, { foliageNames } from "./WindMaterial";

function preparePothos(sourceScene, shaderOptions) {
  const clonedScene = cloneSkeleton(sourceScene);
  const shaderUniforms = [];
  let foliageIndex = 0;
  const initialBounds = new THREE.Box3().setFromObject(clonedScene);
  const initialSize = initialBounds.getSize(new THREE.Vector3());
  const initialCenter = initialBounds.getCenter(new THREE.Vector3());
  const normalizedScale = shaderOptions.targetHeight / Math.max(initialSize.y, 0.001);

  clonedScene.scale.setScalar(normalizedScale);
  clonedScene.position.set(
    -initialCenter.x * normalizedScale,
    shaderOptions.shelfTop - initialBounds.min.y * normalizedScale,
    -initialCenter.z * normalizedScale,
  );

  clonedScene.traverse((object) => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    if (!foliageNames.includes(object.name)) return;

    const geometry = object.geometry.clone();
    geometry.computeBoundingBox();
    const bounds = geometry.boundingBox;
    const position = geometry.getAttribute("position");
    const flexibility = new Float32Array(position.count);
    const height = Math.max(bounds.max.y - bounds.min.y, 0.0001);

    for (let vertexIndex = 0; vertexIndex < position.count; vertexIndex += 1) {
      const normalizedHeight = (position.getY(vertexIndex) - bounds.min.y) / height;
      flexibility[vertexIndex] = THREE.MathUtils.smoothstep(normalizedHeight, 0.05, 1);
    }

    geometry.setAttribute("aFlexibility", new THREE.Float32BufferAttribute(flexibility, 1));
    object.geometry = geometry;
    object.material = Array.isArray(object.material)
      ? object.material.map((material, materialIndex) => {
          const clonedMaterial = material.clone();
          shaderUniforms.push(installWindShader(clonedMaterial, {
            ...shaderOptions,
            phase: foliageIndex * 0.73 + materialIndex * 0.21,
          }));
          return clonedMaterial;
        })
      : object.material.clone();

    if (!Array.isArray(object.material)) {
      shaderUniforms.push(installWindShader(object.material, {
        ...shaderOptions,
        phase: foliageIndex * 0.73,
      }));
    }
    foliageIndex += 1;
  });

  return { scene: clonedScene, shaderUniforms };
}

export default function PothosPlant({
  modelPath = "/models/pothos_plant.glb",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetHeight = 2.4,
  shelfTop = 0.06,
  windStrength = 0.12,
  windSpeed = 0.8,
  windDirection = [1, 0.25],
  gustStrength = 0.09,
  gustFrequency = 0.18,
  touchStrength = 0.3,
  touchRadius = 0.45,
  springDamping = 7,
  motionEnabled = true,
  debugTouch = false,
}) {
  const { scene: sourceScene } = useGLTF(modelPath);
  const touchRef = useRef({ active: false, targetStrength: 0, currentStrength: 0, lastPoint: new THREE.Vector3(), lastTime: 0, direction: new THREE.Vector3(), position: new THREE.Vector3() });
  const debugRef = useRef(null);
  const prepared = useMemo(() => preparePothos(sourceScene, { targetHeight, shelfTop }), [sourceScene, targetHeight, shelfTop]);

  const updateTouch = (event) => {
    const now = performance.now();
    const touch = touchRef.current;
    const movement = event.point.clone().sub(touch.lastPoint);
    const velocity = (movement.length() / Math.max(now - touch.lastTime, 8)) * 16;
    if (touch.lastTime > 0 && movement.lengthSq() > 0) touch.direction.lerp(movement.normalize(), 0.35);
    touch.position.copy(event.point);
    touch.lastPoint.copy(event.point);
    touch.lastTime = now;
    touch.active = true;
    touch.targetStrength = THREE.MathUtils.clamp(Math.max(0.05, velocity) * touchStrength, 0.05, touchStrength);
    document.body.style.cursor = "grab";
  };

  const stopTouch = () => {
    touchRef.current.active = false;
    touchRef.current.targetStrength = 0;
    touchRef.current.lastTime = 0;
    document.body.style.cursor = "";
  };

  useFrame((state, delta) => {
    const touch = touchRef.current;
    touch.currentStrength = THREE.MathUtils.damp(touch.currentStrength, motionEnabled ? touch.targetStrength : 0, springDamping, delta);
    prepared.shaderUniforms.forEach((uniforms) => {
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uWindStrength.value = motionEnabled ? windStrength : 0;
      uniforms.uWindSpeed.value = windSpeed;
      uniforms.uWindDirection.value.set(windDirection[0], windDirection[1]);
      uniforms.uGustStrength.value = motionEnabled ? gustStrength : 0;
      uniforms.uGustFrequency.value = gustFrequency;
      uniforms.uTouchPosition.value.copy(touch.position);
      uniforms.uTouchDirection.value.copy(touch.direction);
      uniforms.uTouchStrength.value = touch.currentStrength;
      uniforms.uTouchRadius.value = touchRadius;
      uniforms.uTouchActive.value = touch.active ? 1 : 0;
    });
    if (debugRef.current) debugRef.current.position.copy(touch.position);
  });

  return (
    <group position={position} rotation={rotation} onPointerMove={updateTouch} onPointerOver={updateTouch} onPointerOut={stopTouch} onPointerDown={updateTouch} onPointerUp={stopTouch}>
      <Clone object={prepared.scene} />
      {debugTouch && <mesh ref={debugRef}><sphereGeometry args={[0.07, 16, 16]} /><meshBasicMaterial color="#d7e8b8" transparent opacity={0.75} /></mesh>}
    </group>
  );
}

useGLTF.preload("/models/pothos_plant.glb");

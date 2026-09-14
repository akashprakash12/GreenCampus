"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Clone, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function prepareModel(sourceScene, targetHeight, shelfTop) {
  const scene = sourceScene.clone(true);
  const initialBounds = new THREE.Box3().setFromObject(scene);
  const initialSize = initialBounds.getSize(new THREE.Vector3());
  const initialCenter = initialBounds.getCenter(new THREE.Vector3());
  const height = Math.max(initialSize.y, 0.001);
  const normalizedScale = targetHeight / height;

  scene.scale.setScalar(normalizedScale);
  scene.position.set(
    -initialCenter.x * normalizedScale,
    shelfTop - initialBounds.min.y * normalizedScale,
    -initialCenter.z * normalizedScale,
  );

  const finalBounds = new THREE.Box3().setFromObject(scene);

  scene.traverse((object) => {
    if (!object.isMesh) return;

    object.castShadow = true;
    object.receiveShadow = true;
  });

  return { scene, bounds: finalBounds, normalizedScale };
}

export default function PlantModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetHeight = 2,
  shelfTop = 0.06,
  floatIntensity = 0.05,
  floatSpeed = 1.2,
  autoRotate = false,
  motionEnabled = true,
  debug = false,
}) {
  const { scene: sourceScene } = useGLTF(modelPath);
  const plantRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startRotation: rotation[1],
    targetRotation: rotation[1],
  });
  const prepared = useMemo(
    () => prepareModel(sourceScene, targetHeight, shelfTop),
    [sourceScene, shelfTop, targetHeight],
  );

  const modelRotation = rotation;

  useFrame((state, delta) => {
    if (!plantRef.current) return;

    const dragRotation = dragRef.current.active
      ? dragRef.current.targetRotation
      : rotation[1];
    const targetRotation = autoRotate && motionEnabled
      ? dragRotation + state.clock.elapsedTime * 0.025
      : dragRotation;

    plantRef.current.rotation.y = THREE.MathUtils.damp(
      plantRef.current.rotation.y,
      targetRotation,
      5,
      delta,
    );

    const targetY = motionEnabled
      ? Math.sin(state.clock.elapsedTime * floatSpeed) * floatIntensity * 0.12
      : 0;
    plantRef.current.position.y = THREE.MathUtils.damp(
      plantRef.current.position.y,
      targetY,
      4,
      delta,
    );
  });

  const startDrag = (event) => {
    event.stopPropagation();
    dragRef.current = {
      active: true,
      startX: event.pointer.x,
      startRotation: plantRef.current?.rotation.y ?? rotation[1],
      targetRotation: plantRef.current?.rotation.y ?? rotation[1],
    };
    event.target.setPointerCapture?.(event.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const moveDrag = (event) => {
    if (!dragRef.current.active) return;

    dragRef.current.targetRotation =
      dragRef.current.startRotation +
      (event.pointer.x - dragRef.current.startX) * 0.45;
  };

  const stopDrag = () => {
    dragRef.current.active = false;
    document.body.style.cursor = "";
  };

  return (
    <group
      position={position}
    >
      <group
        ref={plantRef}
        rotation={modelRotation}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <Clone object={prepared.scene} />

        {debug && <PlantBoundsDebug bounds={prepared.bounds} />}

        {debug && (
          <Html position={[0, targetHeight + 0.15, 0]} center>
            <div className="pointer-events-none whitespace-nowrap rounded bg-black/70 px-2 py-1 text-[10px] text-white">
              {modelPath.split("/").pop()} - {targetHeight.toFixed(1)}m
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

export function PlantBoundsDebug({ bounds }) {
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  return (
    <mesh position={center}>
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshBasicMaterial color="#f5c86b" wireframe />
    </mesh>
  );
}
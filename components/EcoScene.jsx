"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  canUseWebGL,
  isLowPowerDevice,
  SceneErrorBoundary,
  SceneUnavailable,
} from "./SceneFallback";

function CampusPlant() {
  const { scene: sourceScene } = useGLTF("/models/potted_plant.glb");
  const plantRef = useRef(null);
  const plant = useMemo(() => {
    const scene = sourceScene.clone(true);
    const bounds = new THREE.Box3().setFromObject(scene);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3.4 / Math.max(size.y, 0.001);

    scene.scale.setScalar(scale);
    scene.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    );
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return scene;
  }, [sourceScene]);

  useFrame((state, delta) => {
    if (!plantRef.current) return;

    plantRef.current.rotation.y = THREE.MathUtils.damp(
      plantRef.current.rotation.y,
      state.pointer.x * 0.18 - 0.45,
      4,
      delta,
    );
    plantRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.04;
  });

  return (
    <group ref={plantRef} position={[0, -0.35, 0]}>
      <primitive object={plant} />
    </group>
  );
}

export default function EcoScene() {
  const webglReady = canUseWebGL();
  const lowPower = isLowPowerDevice();

  if (!webglReady) {
    return <SceneUnavailable label="3D view unavailable on this browser" />;
  }

  return (
    <SceneErrorBoundary>
      <Canvas
        className="eco-canvas absolute inset-0 !h-full !w-full"
        dpr={lowPower ? 1 : [1, 1.5]}
        camera={{ position: [0, 1, 5.8], fov: 34 }}
        gl={{
          antialias: !lowPower,
          alpha: false,
          powerPreference: lowPower ? "default" : "high-performance",
        }}
      >
        <color attach="background" args={["#0d3b2a"]} />
        <ambientLight intensity={1.4} color="#d7e8d2" />
        <directionalLight position={[4, 6, 5]} intensity={2.8} color="#ffe5b5" />
        <pointLight position={[-3, 1, 4]} intensity={1.4} color="#8bc49a" />

        <Suspense fallback={null}>
          <CampusPlant />
          {!lowPower && <Environment preset="forest" />}
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}

useGLTF.preload("/models/potted_plant.glb");

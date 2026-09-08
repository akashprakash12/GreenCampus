"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  Float,
  Html,
  useGLTF,
} from "@react-three/drei";
import {
  canUseWebGL,
  isLowPowerDevice,
  SceneErrorBoundary,
  SceneUnavailable,
} from "./SceneFallback";

function PlantModel() {
  const plantRef = useRef(null);
  const { scene } = useGLTF("/models/pothos_plant.glb");

  useFrame((state, delta) => {
    if (!plantRef.current) return;

    plantRef.current.rotation.y += delta * 0.08;

    plantRef.current.rotation.x +=
      (state.pointer.y * 0.08 - plantRef.current.rotation.x) * 0.025;

    plantRef.current.rotation.z +=
      (-state.pointer.x * 0.05 - plantRef.current.rotation.z) * 0.025;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.08}
      floatIntensity={0.35}
    >
      <group ref={plantRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function LoadingPlant() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#a8bd8f]/20 border-t-[#a8bd8f]" />

        <p className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-[#a8bd8f]">
          Loading plant
        </p>
      </div>
    </Html>
  );
}

export default function HeroPlantScene() {
  const [webglReady] = useState(canUseWebGL);
  const [lowPower] = useState(isLowPowerDevice);

  if (webglReady === null) {
    return <SceneUnavailable label="Preparing 3D view" />;
  }

  if (!webglReady) {
    return <SceneUnavailable label="3D view unavailable on this browser" />;
  }

  return (
    <SceneErrorBoundary>
      <Canvas
        dpr={lowPower ? 1 : [1, 1.25]}
        camera={{
          position: [0, 1.2, 6],
          fov: 40,
        }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance",
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={3}
          color="#fff3d0"
        />

        {!lowPower && (
          <directionalLight
            position={[-4, 2, -3]}
            intensity={1.5}
            color="#8eb89b"
          />
        )}

        <Suspense fallback={<LoadingPlant />}>
          <Bounds fit clip observe margin={1.25}>
            <PlantModel />
          </Bounds>

          {!lowPower && (
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.3}
              scale={7}
              blur={2.5}
              far={4}
              resolution={128}
              color="#02150f"
            />
          )}

          {!lowPower && <Environment preset="forest" />}
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}

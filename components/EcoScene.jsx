"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import {
  canUseWebGL,
  isLowPowerDevice,
  SceneErrorBoundary,
  SceneUnavailable,
} from "./SceneFallback";

function CampusPlant({ controls }) {
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
      controls.rotationY + state.pointer.x * 0.12,
      4,
      delta,
    );
    plantRef.current.rotation.x = controls.rotationX;
    plantRef.current.rotation.z = controls.rotationZ;
  });

  return (
    <group
      ref={plantRef}
      position={[controls.xPosition, controls.yPosition, controls.zPosition]}
      scale={controls.scale}
    >
      <primitive object={plant} />
    </group>
  );
}

export default function EcoScene() {
  const webglReady = canUseWebGL();
  const lowPower = isLowPowerDevice();
  const controls = useControls("Eco Plant", {
    scale: { value: 0.85, min: 0.5, max: 2, step: 0.05 },
    xPosition: { value: 0.1, min: -2, max: 2, step: 0.05 },
    yPosition: { value: -0.1, min: -2, max: 1, step: 0.05 },
    zPosition: { value: 0, min: -2, max: 2, step: 0.05 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.05 },
    rotationY: { value: -0.45, min: -Math.PI, max: Math.PI, step: 0.05 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.05 },
  });
  const lighting = useControls("Eco Lighting", {
    ambientIntensity: { value: 0.75, min: 0, max: 2, step: 0.05 },
    keyIntensity: { value: 3, min: 0, max: 5, step: 0.1 },
    fillIntensity: { value: 0.35, min: 0, max: 2, step: 0.05 },
    environmentIntensity: { value: 0.45, min: 0, max: 2, step: 0.05 },
    shadowOpacity: { value: 0.66, min: 0, max: 1, step: 0.02 },
    shadowBlur: { value: 5.7, min: 0.5, max: 8, step: 0.1 },
  });

  if (!webglReady) {
    return <SceneUnavailable label="3D view unavailable on this browser" />;
  }

  return (
    <SceneErrorBoundary>
      <Leva
        hidden={process.env.NODE_ENV === "production"}
        collapsed={false}
        titleBar={{ title: "Eco Plant Controls" }}
      />
      <Canvas
        className="eco-canvas absolute inset-0 !h-full !w-full"
        shadows={lowPower ? false : "soft"}
        dpr={lowPower ? 1 : [1, 1.5]}
        camera={{ position: [0, 1, 5.8], fov: 34 }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <hemisphereLight
          args={["#f4f8f0", "#29483a", lighting.ambientIntensity]}
        />
        <directionalLight
          position={[4, 6, 3]}
          intensity={lighting.keyIntensity}
          color="#fff0d6"
          castShadow={!lowPower}
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.00015}
        />
        <directionalLight
          position={[-4, 2, -2]}
          intensity={lighting.fillIntensity}
          color="#c9e3ff"
        />

        <Suspense fallback={null}>
          <CampusPlant controls={controls} />
          <ContactShadows
            position={[
              controls.xPosition,
              controls.yPosition - 1.715 * controls.scale,
              controls.zPosition + 0.05,
            ]}
            scale={3.6}
            opacity={lighting.shadowOpacity}
            blur={lighting.shadowBlur}
            far={3.5}
            resolution={lowPower ? 128 : 256}
            color="#10241b"
          />
          {!lowPower && (
            <Environment
              files="/models/valley_of_desolation_4k.hdr"
              background={false}
              environmentIntensity={lighting.environmentIntensity}
            />
          )}
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}

useGLTF.preload("/models/potted_plant.glb");

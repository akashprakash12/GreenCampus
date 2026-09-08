"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  Sphere,
} from "@react-three/drei";
import {
  canUseWebGL,
  isLowPowerDevice,
  SceneErrorBoundary,
  SceneUnavailable,
} from "./SceneFallback";

function EcoGlobe({ lowPower }) {
  const groupRef = useRef(null);
  const ringRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.1;
    }

    const mouseX = state.pointer.x * 0.15;
    const mouseY = state.pointer.y * 0.1;

    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (mouseY - groupRef.current.rotation.x) * 0.03;

      groupRef.current.rotation.y +=
        (mouseX - groupRef.current.rotation.y) * 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Main green globe */}

        <Sphere args={[1.35, lowPower ? 24 : 40, lowPower ? 24 : 40]}>
          <meshStandardMaterial
            color="#4f7f55"
            roughness={0.55}
            metalness={0.05}
          />
        </Sphere>

        {/* Light green land shapes */}

        <mesh position={[-0.7, 0.5, 1.12]} rotation={[0.2, 0.1, -0.4]}>
          <sphereGeometry args={[0.38, lowPower ? 12 : 20, lowPower ? 12 : 20]} />
          <meshStandardMaterial color="#a8bd8f" roughness={0.7} />
        </mesh>

        <mesh position={[0.55, -0.25, 1.2]} scale={[1, 1.6, 0.6]}>
          <sphereGeometry args={[0.3, lowPower ? 12 : 20, lowPower ? 12 : 20]} />
          <meshStandardMaterial color="#a8bd8f" roughness={0.7} />
        </mesh>

        <mesh position={[0.3, 0.7, 1.15]} scale={[1.5, 0.8, 0.5]}>
          <sphereGeometry args={[0.27, lowPower ? 12 : 20, lowPower ? 12 : 20]} />
          <meshStandardMaterial color="#8fa979" roughness={0.7} />
        </mesh>

        {/* Orbiting ring */}

        <mesh ref={ringRef} rotation={[1.15, 0.2, 0]}>
          <torusGeometry args={[1.85, 0.018, 8, lowPower ? 48 : 80]} />
          <meshStandardMaterial color="#f1ead4" transparent opacity={0.55} />
        </mesh>

        {/* Orbiting leaf */}

        <group position={[1.75, 0.25, 0.2]} rotation={[0, 0, -0.5]}>
          <mesh scale={[0.25, 0.5, 0.08]}>
            <sphereGeometry args={[1, lowPower ? 12 : 16, lowPower ? 12 : 16]} />
            <meshStandardMaterial color="#d3dfbd" roughness={0.6} />
          </mesh>

          <mesh position={[0, -0.45, 0]} rotation={[0, 0, -0.1]}>
            <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
            <meshStandardMaterial color="#d3dfbd" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function EcoScene() {
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
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance",
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[4, 5, 4]}
          intensity={2.5}
          color="#fff4d6"
        />

        {!lowPower && (
          <pointLight
            position={[-4, -2, 3]}
            intensity={1.2}
            color="#7eb797"
          />
        )}

        <EcoGlobe lowPower={lowPower} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!lowPower}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.8}
        />

        {!lowPower && <Environment preset="forest" />}
      </Canvas>
    </SceneErrorBoundary>
  );
}
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";
import { Leva, folder, useControls } from "leva";
import InteractivePlantScene from "./three/InteractivePlantScene";
import {
  desktopPlants,
  mobilePlants,
  tabletPlants,
} from "./three/plantConfig";
import {
  canUseWebGL,
  isLowPowerDevice,
  SceneErrorBoundary,
  SceneUnavailable,
} from "./SceneFallback";

function getLayout() {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1280) return "tablet";
  return "desktop";
}

function Shelf({ width, lowPower }) {
  return (
    <>
      <RoundedBox
        args={[width, 0.1, 0.58]}
        radius={0.045}
        smoothness={4}
        castShadow={!lowPower}
        receiveShadow
      >
        <meshStandardMaterial
          color="#315d49"
          roughness={0.78}
          metalness={0.04}
        />
      </RoundedBox>

      <mesh position={[0, -0.16, 0]} castShadow={!lowPower} receiveShadow>
        <boxGeometry args={[0.07, 0.3, 0.12]} />
        <meshStandardMaterial color="#214534" roughness={0.9} />
      </mesh>
    </>
  );
}

function PlantSlot({ config, active, lowPower, debug, shadowOpacity, controls }) {
  const isInteractivePlant =
    config.modelPath.endsWith("pothos_plant.glb") ||
    config.modelPath.endsWith("rhyzome_plant.glb");

  return (
    <group position={config.position}>
      <Shelf width={config.shelfWidth} lowPower={lowPower} />

      {isInteractivePlant ? (
        <InteractivePlantScene
          modelPath={config.modelPath}
          rotation={config.rotation}
          targetHeight={config.targetHeight}
          windStrength={controls.windStrength}
          windSpeed={controls.windSpeed}
          windDirection={[controls.windDirectionX, controls.windDirectionZ]}
          gustStrength={controls.gustStrength}
          gustFrequency={controls.gustFrequency}
          touchStrength={controls.touchStrength}
          touchRadius={controls.touchRadius}
          springDamping={controls.springDamping}
          motionEnabled={active && !lowPower}
          debugTouch={debug && controls.debugTouch}
        />
      ) : null}

      {!lowPower && (
        <ContactShadows
          position={[0, -0.055, 0.08]}
          scale={config.shelfWidth}
          opacity={shadowOpacity}
          blur={1.8}
          far={1.5}
          resolution={128}
          color="#061b12"
        />
      )}
    </group>
  );
}

function useSceneControls() {
  return useControls("3D Hero Scene", {
    center: folder({
      centerX: { value: desktopPlants.center.position[0], min: -6, max: 6, step: 0.05 },
      centerY: { value: desktopPlants.center.position[1], min: -2, max: 3, step: 0.05 },
      centerZ: { value: desktopPlants.center.position[2], min: -3, max: 3, step: 0.05 },
      centerHeight: { value: desktopPlants.center.targetHeight, min: 0.5, max: 5, step: 0.05 },
      centerRotation: { value: desktopPlants.center.rotation[1], min: -Math.PI, max: Math.PI, step: 0.01 },
      centerShelf: { value: desktopPlants.center.shelfWidth, min: 0.8, max: 4, step: 0.05 },
    }),
    right: folder({
      rightX: { value: desktopPlants.right.position[0], min: -6, max: 6, step: 0.05 },
      rightY: { value: desktopPlants.right.position[1], min: -2, max: 3, step: 0.05 },
      rightZ: { value: desktopPlants.right.position[2], min: -3, max: 3, step: 0.05 },
      rightHeight: { value: desktopPlants.right.targetHeight, min: 0.5, max: 5, step: 0.05 },
      rightRotation: { value: desktopPlants.right.rotation[1], min: -Math.PI, max: Math.PI, step: 0.01 },
      rightShelf: { value: desktopPlants.right.shelfWidth, min: 0.8, max: 4, step: 0.05 },
    }),
    camera: folder({
      cameraY: { value: 1.55, min: -2, max: 5, step: 0.05 },
      cameraZ: { value: 9, min: 4, max: 14, step: 0.1 },
      cameraFov: { value: 38, min: 20, max: 60, step: 1 },
    }),
    lighting: folder({
      ambient: { value: 0.05, min: 0, max: 2, step: 0.05 },
      key: { value: 0, min: 0, max: 5, step: 0.05 },
      fill: { value: 0.1, min: 0, max: 3, step: 0.05 },
      rim: { value: 1.25, min: 0, max: 3, step: 0.05 },
      environment: { value: 0.35, min: 0, max: 1, step: 0.05 },
      shadows: { value: 0.38, min: 0, max: 1, step: 0.02 },
    }),
    wind: folder({
      windStrength: { value: 0.08, min: 0, max: 0.5, step: 0.01 },
      windSpeed: { value: 0.75, min: 0, max: 3, step: 0.05 },
      windDirectionX: { value: 1, min: -1, max: 1, step: 0.05 },
      windDirectionZ: { value: 0.25, min: -1, max: 1, step: 0.05 },
      gustStrength: { value: 0.09, min: 0, max: 0.4, step: 0.01 },
      gustFrequency: { value: 0.18, min: 0, max: 1, step: 0.01 },
      touchStrength: { value: 0.3, min: 0, max: 0.6, step: 0.01 },
      touchRadius: { value: 0.45, min: 0.1, max: 1.5, step: 0.05 },
      springDamping: { value: 7, min: 1, max: 20, step: 0.5 },
      debugTouch: { value: false },
    }),
  });
}

function applyControls(config, controls, slot) {
  const desktopDefault = desktopPlants[slot];
  const positionDelta = desktopDefault.position.map(
    (value, index) => controls[`${slot}${["X", "Y", "Z"][index]}`] - value,
  );

  return {
    ...config,
    position: config.position.map((value, index) => value + positionDelta[index]),
    rotation: [
      config.rotation[0],
      config.rotation[1] +
        controls[`${slot}Rotation`] - desktopDefault.rotation[1],
      config.rotation[2],
    ],
    targetHeight:
      config.targetHeight *
      (controls[`${slot}Height`] / desktopDefault.targetHeight),
    shelfWidth:
      config.shelfWidth * (controls[`${slot}Shelf`] / desktopDefault.shelfWidth),
  };
}

function LoadingPlant() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#a8bd8f]/20 border-t-[#d7e8b8] shadow-[0_0_24px_rgba(168,189,143,0.28)]" />
        <p className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-[#d7e8b8]">
          Growing the scene
        </p>
      </div>
    </Html>
  );
}

function DebugHelpers({ plants }) {
  return (
    <>
      <axesHelper args={[4]} />
      <gridHelper args={[12, 12, "#85aa91", "#315d49"]} position={[0, 0.06, 0]} />
      {plants.length > 0 && (
        <Html position={[0, 3.8, 0]} center>
          <div className="pointer-events-none rounded bg-black/75 px-3 py-2 text-[10px] leading-5 text-white">
            {plants.map(({ slot, targetHeight, position }) => (
              <div key={slot}>
                {slot}: x {position[0]} / y {position[1]} / h {targetHeight}
              </div>
            ))}
          </div>
        </Html>
      )}
    </>
  );
}

function PlantComposition({ active, lowPower, layout, debug, controls }) {
  const plants = useMemo(() => {
    if (layout === "mobile") {
      return [{
        slot: "center",
        ...applyControls(mobilePlants.center, controls, "center"),
      }];
    }
    if (layout === "tablet") {
      return Object.entries(tabletPlants).map(([slot, config]) => ({
        slot,
        ...applyControls(config, controls, slot),
      }));
    }
    return Object.entries(desktopPlants).map(([slot, config]) => ({
      slot,
      ...applyControls(config, controls, slot),
    }));
  }, [controls, layout]);

  return (
    <>
      {plants.map((config) => (
        <PlantSlot
          key={config.slot}
          config={config}
          active={active}
          lowPower={lowPower}
          debug={debug}
          shadowOpacity={controls.shadows}
          controls={controls}
        />
      ))}
      {debug && <DebugHelpers plants={plants} />}
    </>
  );
}

export default function HeroPlantScene({ active = true }) {
  const [webglReady] = useState(canUseWebGL);
  const [lowPower] = useState(isLowPowerDevice);
  const [layout, setLayout] = useState(getLayout);
  const controls = useSceneControls();
  const debug =
    process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("debug3d");

  useEffect(() => {
    const handleResize = () => setLayout(getLayout());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!webglReady) {
    return <SceneUnavailable label="3D view unavailable on this browser" />;
  }

  const camera =
    layout === "mobile"
      ? { position: [0, 1.1, 5.3], fov: 34, near: 0.1, far: 100 }
      : layout === "tablet"
        ? { position: [0, controls.cameraY - 0.1, controls.cameraZ - 0.5], fov: controls.cameraFov, near: 0.1, far: 100 }
        : { position: [0, controls.cameraY, controls.cameraZ], fov: controls.cameraFov, near: 0.1, far: 100 };

  return (
    <SceneErrorBoundary>
      <Leva
        hidden={process.env.NODE_ENV === "production"}
        collapsed={false}
        titleBar={{ title: "3D Hero Controls" }}
      />
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows={!lowPower}
        dpr={lowPower ? 1 : [1, 1.5]}
        camera={camera}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance",
        }}
      >
        <ambientLight intensity={controls.ambient} color="#d7e8d2" />
        <directionalLight
          position={[-4, 7, 5]}
          intensity={controls.key}
          color="#ffe5b5"
          castShadow={!lowPower}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.1}
          shadow-camera-far={18}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={6}
          shadow-camera-bottom={-4}
        />
        <directionalLight
          position={[5, 3, 2]}
          intensity={controls.fill}
          color="#a9d7d0"
        />
        <spotLight
          position={[0, 6, -3]}
          intensity={controls.rim}
          angle={0.5}
          penumbra={0.8}
          distance={14}
          color="#d9f0d0"
        />

        <Suspense fallback={<LoadingPlant />}>
          <PlantComposition
            active={active}
            lowPower={lowPower}
            layout={layout}
            debug={debug}
            controls={controls}
          />
          <Environment preset="studio" environmentIntensity={controls.environment} />
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  );
}

[
  ...Object.values(desktopPlants),
  ...Object.values(mobilePlants),
].forEach(({ modelPath }) => useGLTF.preload(modelPath));
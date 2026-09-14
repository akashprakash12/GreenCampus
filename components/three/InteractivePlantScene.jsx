"use client";

import PothosPlant from "./PothosPlant";

export default function InteractivePlantScene({
  modelPath = "/models/pothos_plant.glb",
  ...props
}) {
  return <PothosPlant modelPath={modelPath} {...props} />;
}

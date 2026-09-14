export const plantConfig = {
  center: {
    modelPath: "/models/rhyzome_plant.glb",
    position: [3.35, -2, -0.2],
    rotation: [0, -1.25, 0],
    targetHeight: 4.95,
    shelfWidth: 2.15,
    floatIntensity: 0.04,
    floatSpeed: 1,
  },
  right: {
    modelPath: "/models/pothos_plant.glb",
    position: [2.35, -2, 0.15],
    rotation: [0, -0.44, 0],
    targetHeight: 2.15,
    shelfWidth: 4,
    floatIntensity: 0.06,
    floatSpeed: 1.3,
  },
};

export const desktopPlants = plantConfig;

export const tabletPlantConfig = {
  center: { ...plantConfig.center, position: [0, 0.72, 0], targetHeight: 2.8 },
  right: { ...plantConfig.right, position: [2.4, 0.22, 0], targetHeight: 2 },
};

export const tabletPlants = tabletPlantConfig;

export const mobilePlantConfig = {
  center: {
    ...plantConfig.center,
    position: [0, 0.1, 0],
    targetHeight: 2.55,
  },
};

export const mobilePlants = mobilePlantConfig;

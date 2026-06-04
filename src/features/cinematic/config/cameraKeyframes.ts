export type CameraKeyframe = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
};

/** Camera path sampled as scroll progress goes 0 → 1 */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    position: [0, 0.95, 10],
    target: [0, 0.15, 0.5],
    fov: 38,
  },
  {
    position: [5.5, 2.2, -4],
    target: [0, 0.8, -12],
    fov: 38,
  },
  // Helicopter View
  {
    position: [0, 15, -48],
    target: [0, 0, -48],
    fov: 44,
  },
  // Fly Down
  {
    position: [8, 1.8, -48],
    target: [0, 1, -48],
    fov: 44,
  },
  // Pan around ring (Couch scene)
  {
    position: [-8, 1.8, -48],
    target: [0, 1, -48],
    fov: 44,
  },
  // Enter Cinema
  {
    position: [0, 6, -85],
    target: [0, 2, -100],
    fov: 40,
  },
  // Seated in Cinema
  {
    position: [0, 1.2, -92],
    target: [0, 2, -100],
    fov: 44,
  },
];

export const SCENE_Z_POSITIONS = [0, -12, -48, -100] as const;

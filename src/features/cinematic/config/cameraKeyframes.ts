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
  {
    position: [-4.8, 1.8, -14],
    target: [0, 0.5, -24],
    fov: 40,
  },
  {
    position: [0.6, 3.2, -22],
    target: [0, 1.2, -36],
    fov: 36,
  },
  {
    position: [0, 1.2, -30],
    target: [0, 0.8, -48],
    fov: 44,
  },
];

export const SCENE_Z_POSITIONS = [0, -12, -24, -36, -48] as const;

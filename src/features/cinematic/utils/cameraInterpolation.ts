import * as THREE from "three";
import type { CameraKeyframe } from "../config/cameraKeyframes";

const _position = new THREE.Vector3();
const _target = new THREE.Vector3();

export function sampleCameraAtProgress(
  keyframes: CameraKeyframe[],
  progress: number,
): { position: THREE.Vector3; target: THREE.Vector3; fov: number } {
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  const segments = keyframes.length - 1;
  const scaled = clamped * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;

  const from = keyframes[index];
  const to = keyframes[index + 1];

  _position.set(...from.position).lerp(new THREE.Vector3(...to.position), localT);
  _target.set(...from.target).lerp(new THREE.Vector3(...to.target), localT);
  const fov = THREE.MathUtils.lerp(from.fov, to.fov, localT);

  return {
    position: _position.clone(),
    target: _target.clone(),
    fov,
  };
}

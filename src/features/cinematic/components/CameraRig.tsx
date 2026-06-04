import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CAMERA_KEYFRAMES } from "../config/cameraKeyframes";
import { useCinematicScrollContext } from "../context/CinematicScrollContext";
import { sampleCameraAtProgress } from "../utils/cameraInterpolation";

const damp = 4.5;
const lookAt = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const { scrollStateRef } = useCinematicScrollContext();
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  useFrame((_, delta) => {
    targetProgress.current = scrollStateRef.current.progress;
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      targetProgress.current,
      damp,
      delta,
    );

    const sampled = sampleCameraAtProgress(
      CAMERA_KEYFRAMES,
      smoothProgress.current,
    );

    camera.position.lerp(sampled.position, 1 - Math.exp(-damp * delta));
    lookAt.copy(sampled.target);
    camera.lookAt(lookAt);

    if ("fov" in camera && camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(
        camera.fov,
        sampled.fov,
        1 - Math.exp(-damp * delta),
      );
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

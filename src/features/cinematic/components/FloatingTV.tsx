import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import tvModelUrl from "@/assets/models/TV.glb?url";
import flatTvModelUrl from "@/assets/models/Flat-screen TV.glb?url";
import { TvScreenLogo } from "./TvScreenLogo";
import { TvScreenPoster } from "./TvScreenPoster";
import { extractTvScreenPlacement } from "../utils/tvScreenPlacement";

type FloatingTVProps = {
  variant?: "crt" | "flat";
  position?: [number, number, number];
  scale?: number;
  /** Normalize GLB height to this many world units */
  fitHeight?: number;
  rotation?: [number, number, number];
  floatIntensity?: number;
  /** Genie logo on the screen (hero) */
  screenLogo?: boolean;
  /** Movie poster on flat TV screen */
  screenPoster?: string;
};

export function FloatingTV({
  variant = "crt",
  position = [0, 0, 0],
  scale = 1,
  fitHeight,
  rotation = [0, 0, 0],
  floatIntensity = 1,
  screenLogo = false,
  screenPoster,
}: FloatingTVProps) {
  const groupRef = useRef<THREE.Group>(null);
  const url = variant === "crt" ? tvModelUrl : flatTvModelUrl;
  const { scene } = useGLTF(url);

  const { cloned, modelScale, screenPlacement } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const mat = child.material.clone();
          child.material = mat;
          mat.envMapIntensity = 1.2;
          mat.metalness = Math.min(mat.metalness + 0.1, 1);
          mat.roughness = Math.max(mat.roughness - 0.05, 0.2);
          if (screenLogo || screenPoster) {
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    clone.updateMatrixWorld(true);
    const placement =
      screenPoster && variant === "flat"
        ? extractTvScreenPlacement(clone)
        : null;

    const height = Math.max(size.y, 0.001);
    const normalizedScale = fitHeight ? fitHeight / height : 1;

    return {
      cloned: clone,
      modelScale: normalizedScale,
      screenPlacement: placement,
    };
  }, [scene, fitHeight, screenLogo, screenPoster, variant]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.9) * 0.12 * floatIntensity;
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.03;
  });

  const totalScale = scale * modelScale;

  return (
    <group ref={groupRef} position={position} scale={totalScale} rotation={rotation}>
      <primitive object={cloned} />
      {screenLogo && variant === "crt" ? <TvScreenLogo /> : null}
      {screenPoster && screenPlacement ? (
        <TvScreenPoster imageSrc={screenPoster} placement={screenPlacement} />
      ) : null}
    </group>
  );
}

useGLTF.preload(tvModelUrl);
useGLTF.preload(flatTvModelUrl);

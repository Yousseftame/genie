import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import cinemaModelUrl from "@/assets/models/Cinema.glb?url";

type CinemaModelProps = {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

export function CinemaModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: CinemaModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(cinemaModelUrl);

  const { cloned, modelScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const mat = child.material.clone();
          child.material = mat;
          // Dim the environment slightly for a theatrical feel
          mat.color.multiplyScalar(0.4);
          mat.envMapIntensity = 0.5;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    clone.position.sub(center);
    clone.position.y += size.y / 2;

    const targetWidth = 30; // Cinema is huge
    const normalizedScale = targetWidth / Math.max(size.x, 0.001);

    return { cloned: clone, modelScale: normalizedScale };
  }, [scene]);

  const totalScale = scale * modelScale;

  return (
    <group ref={groupRef} position={position} scale={totalScale} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(cinemaModelUrl);

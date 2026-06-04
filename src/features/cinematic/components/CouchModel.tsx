import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import couchModelUrl from "@/assets/models/Couch.glb?url";

type CouchModelProps = {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  floatIntensity?: number;
};

export function CouchModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  floatIntensity = 1,
}: CouchModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(couchModelUrl);

  const { cloned, modelScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const mat = child.material.clone();
          child.material = mat;
          mat.envMapIntensity = 1.2;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Center the model so it rotates cleanly
    clone.position.sub(center);
    // Keep it on the floor
    clone.position.y += size.y / 2;

    const targetWidth = 3.5;
    const normalizedScale = targetWidth / Math.max(size.x, 0.001);

    return { cloned: clone, modelScale: normalizedScale };
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.9) * 0.12 * floatIntensity;
    groupRef.current.rotation.y = rotation[1] + t * 0.1; // slowly spin the couch
  });

  const totalScale = scale * modelScale;

  return (
    <group ref={groupRef} position={position} scale={totalScale} rotation={rotation}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(couchModelUrl);

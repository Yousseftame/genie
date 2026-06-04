import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Image } from "@react-three/drei";
import type { PosterConfig } from "../config/posters";
import { createPosterTexture } from "../utils/createPosterTexture";

type PosterPlaneProps = {
  config: PosterConfig;
  scrollFactor?: number;
};

export function PosterPlane({ config, scrollFactor = 1 }: PosterPlaneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const fallbackMap = useMemo(
    () => createPosterTexture(config.title, config.accent),
    [config.title, config.accent],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y =
      config.position[1] +
      Math.sin(t * 0.7 + config.position[0]) * 0.08 * scrollFactor;
    groupRef.current.rotation.y =
      config.rotation[1] + Math.sin(t * 0.4) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      {config.image ? (
        <Image
          url={config.image}
          scale={[1.35, 2]}
          toneMapped={false}
          transparent
        />
      ) : (
        <mesh castShadow>
          <planeGeometry args={[1.35, 2]} />
          <meshBasicMaterial
            map={fallbackMap}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[1.42, 2.08, 0.06]} />
        <meshStandardMaterial
          color="#0c0814"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

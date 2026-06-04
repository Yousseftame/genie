import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { PosterConfig } from "../config/posters";
import { createPosterTexture } from "../utils/createPosterTexture";

type PosterPlaneProps = {
  config: PosterConfig;
  scrollFactor?: number;
};

export function PosterPlane({ config, scrollFactor = 1 }: PosterPlaneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [remoteMap, setRemoteMap] = useState<THREE.Texture | null>(null);

  const fallbackMap = useMemo(
    () => createPosterTexture(config.title, config.accent),
    [config.title, config.accent],
  );

  const map = remoteMap ?? fallbackMap;

  useEffect(() => {
    if (!config.image) return;

    let disposed = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      config.image,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        setRemoteMap(texture);
      },
      undefined,
      () => {
        if (!disposed) setRemoteMap(null);
      },
    );

    return () => {
      disposed = true;
    };
  }, [config.image]);

  useEffect(() => {
    return () => {
      if (remoteMap) remoteMap.dispose();
    };
  }, [remoteMap]);

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
      <mesh castShadow>
        <planeGeometry args={[1.35, 2]} />
        {config.image ? (
          <meshBasicMaterial
            map={map}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial
            map={map}
            roughness={0.35}
            metalness={0.05}
            envMapIntensity={0.8}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
      <mesh position={[0, 0, -0.02]} castShadow>
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

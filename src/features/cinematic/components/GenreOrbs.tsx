import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const GENRES = [
  { label: "Sci-Fi", color: "#1a3d7a", position: [-3.5, 1.2, 1] as const },
  { label: "Drama", color: "#fdbf3f", position: [0, 2.4, -1] as const },
  { label: "Comedy", color: "#f5d078", position: [3.8, 1, 0.5] as const },
  { label: "Thriller", color: "#0c2866", position: [-1.2, -0.4, -2.5] as const },
];

export function GenreOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {GENRES.map((genre, i) => (
        <Float
          key={genre.label}
          speed={1.2 + i * 0.15}
          rotationIntensity={0.35}
          floatIntensity={0.6}
          position={genre.position}
        >
          <mesh castShadow>
            <icosahedronGeometry args={[0.55 + (i % 2) * 0.12, 1]} />
            <MeshDistortMaterial
              color={genre.color}
              emissive={genre.color}
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.4}
              distort={0.28}
              speed={1.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

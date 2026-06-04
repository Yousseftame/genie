import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useCinematicScrollContext } from "../context/CinematicScrollContext";

const COUNT = 420;

export function FilmParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollStateRef } = useCinematicScrollContext();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -Math.random() * 55;
      spd[i] = 0.15 + Math.random() * 0.55;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const attr = geom.getAttribute("position") as THREE.BufferAttribute;
    const progress = scrollStateRef.current.progress;

    for (let i = 0; i < COUNT; i++) {
      attr.setZ(i, attr.getZ(i) + speeds[i] * delta * (0.6 + progress));
      if (attr.getZ(i) > 4) {
        attr.setZ(i, -52 - Math.random() * 8);
      }
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y = progress * 0.35;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#fdbf3f"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

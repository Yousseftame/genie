import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CINEMATIC_THEME } from "../config/cinematicTheme";
import { useCinematicScrollContext } from "../context/CinematicScrollContext";

export function SceneLights() {
  const { scrollStateRef } = useCinematicScrollContext();
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const progress = scrollStateRef.current.progress;

    if (keyRef.current) {
      keyRef.current.position.x = Math.sin(t * 0.25) * 2 + progress * 4;
      keyRef.current.intensity = 1.4 + Math.sin(t * 0.5) * 0.15;
    }
    if (rimRef.current) {
      rimRef.current.position.z = -12 - progress * 40;
      rimRef.current.intensity = 2.2 + progress * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.24} color={CINEMATIC_THEME.navyMid} />
      <hemisphereLight
        args={[CINEMATIC_THEME.navyGlow, CINEMATIC_THEME.navyDeep, 0.55]}
        position={[0, 12, 0]}
      />
      <directionalLight
        ref={keyRef}
        position={[4, 8, 6]}
        intensity={1.5}
        color={CINEMATIC_THEME.goldSoft}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={80}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <spotLight
        ref={rimRef}
        position={[-6, 5, -8]}
        angle={0.45}
        penumbra={0.85}
        intensity={2.4}
        color={CINEMATIC_THEME.gold}
        distance={55}
        castShadow
      />
      <pointLight
        position={[0, 2, -24]}
        intensity={1.1}
        color={CINEMATIC_THEME.gold}
        distance={18}
      />
      <pointLight
        position={[3, 1, -36]}
        intensity={0.85}
        color={CINEMATIC_THEME.navyGlow}
        distance={14}
      />
    </>
  );
}

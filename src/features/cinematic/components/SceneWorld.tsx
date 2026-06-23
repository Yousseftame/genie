import {
  Cloud,
  Environment,
  Stars,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import {
  TRENDING_POSTERS,
  RING_POSTERS,
} from "../config/posters";
import { SCENE_Z_POSITIONS } from "../config/cameraKeyframes";
import { CINEMATIC_THEME } from "../config/cinematicTheme";
import { FilmParticles } from "./FilmParticles";
import { FloatingTV } from "./FloatingTV";
import { CouchModel } from "./CouchModel";
import { CinemaModel } from "./CinemaModel";
import { HeroReflector, HeroTV } from "./HeroTV";
import { PosterPlane } from "./PosterPlane";
import { SceneBootstrapped } from "./SceneBootstrapped";
import { SceneLights } from "./SceneLights";
import * as THREE from "three";

/** A stable Object3D for the projector spotlight target — must not be created inline in JSX */
function ProjectorTarget() {
  const obj = useRef(new THREE.Object3D()).current;
  return <primitive object={obj} position={[0, 4, -15]} />;
}

export function SceneWorld() {
  return (
    <>
      <SceneBootstrapped />
      <fog attach="fog" args={[CINEMATIC_THEME.navyDeep, 8, 58]} />

      <SceneLights />
      <Environment preset="night" />
      <Stars radius={80} depth={40} count={2800} factor={3.2} fade speed={0.6} />

      <FilmParticles />

      {/* Scene 1 — Hero */}
      <group position={[0, 0, SCENE_Z_POSITIONS[0]]}>
        <Suspense fallback={null}>
          <HeroTV />
        </Suspense>
        <HeroReflector />
      </group>

      {/* Scene 2 — Trending posters */}
      <group position={[0, 0, SCENE_Z_POSITIONS[1]]}>
        <Suspense fallback={null}>
          {TRENDING_POSTERS.map((poster) => (
            <PosterPlane key={poster.title} config={poster} />
          ))}
        </Suspense>
        <Cloud
          opacity={0.22}
          speed={0.12}
          bounds={[14, 2, 6]}
          segments={18}
          position={[0, 3.5, 0]}
          color={CINEMATIC_THEME.navyMid}
        />
      </group>

      {/* Scene 3 — CTA */}
      <group position={[0, 0, SCENE_Z_POSITIONS[2]]}>
        <Suspense fallback={null}>
          <CouchModel position={[0, -1.8, 0]} scale={0.7} />
        </Suspense>
        <Suspense fallback={null}>
          {RING_POSTERS.map((poster) => (
            <PosterPlane key={poster.title} config={poster} scrollFactor={0} />
          ))}
        </Suspense>
        <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[2.2, 3.8, 64]} />
          <meshStandardMaterial
            color={CINEMATIC_THEME.gold}
            emissive={CINEMATIC_THEME.navyMid}
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.25}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Scene 4 — The Premiere (Finale) */}
      <group position={[0, 0, SCENE_Z_POSITIONS[3]]}>
        <Suspense fallback={null}>
          <CinemaModel position={[0, -2.5, 0]} />
        </Suspense>
        {/* Projector Light */}
        <spotLight
          position={[0, 8, 15]}
          angle={0.6}
          penumbra={0.8}
          intensity={800}
          color="#ffffff"
          castShadow
          target-position={[0, 4, -15]}
        />
        <ProjectorTarget />
      </group>
    </>
  );
}

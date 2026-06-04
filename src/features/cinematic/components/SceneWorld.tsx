import {
  Cloud,
  Environment,
  MeshReflectorMaterial,
  Stars,
} from "@react-three/drei";
import {
  FEATURED_POSTERS,
  GENRE_TV_POSTER,
  TRENDING_POSTERS,
} from "../config/posters";
import { SCENE_Z_POSITIONS } from "../config/cameraKeyframes";
import { CINEMATIC_THEME } from "../config/cinematicTheme";
import { FilmParticles } from "./FilmParticles";
import { FloatingTV } from "./FloatingTV";
import { HeroReflector, HeroTV } from "./HeroTV";
import { GenreOrbs } from "./GenreOrbs";
import { PosterPlane } from "./PosterPlane";
import { SceneBootstrapped } from "./SceneBootstrapped";
import { SceneLights } from "./SceneLights";

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
        <HeroTV />
        <HeroReflector />
      </group>

      {/* Scene 2 — Trending posters */}
      <group position={[0, 0, SCENE_Z_POSITIONS[1]]}>
        {TRENDING_POSTERS.map((poster) => (
          <PosterPlane key={poster.title} config={poster} />
        ))}
        <Cloud
          opacity={0.22}
          speed={0.12}
          bounds={[14, 2, 6]}
          segments={18}
          position={[0, 3.5, -12]}
          color={CINEMATIC_THEME.navyMid}
        />
      </group>

      {/* Scene 3 — Genres */}
      <group position={[0, 0, SCENE_Z_POSITIONS[2]]}>
        <GenreOrbs />
        <FloatingTV
          variant="flat"
          position={[4.2, 0.2, -1.5]}
          scale={1.6}
          floatIntensity={0.7}
          screenPoster={GENRE_TV_POSTER}
        />
      </group>

      {/* Scene 4 — Featured */}
      <group position={[0, 0, SCENE_Z_POSITIONS[3]]}>
        {FEATURED_POSTERS.map((poster) => (
          <PosterPlane key={poster.title} config={poster} scrollFactor={0.6} />
        ))}
        <spotLight
          position={[0, 6, -34]}
          angle={0.35}
          penumbra={1}
          intensity={3}
          color="#fff0dd"
          castShadow
          distance={22}
        />
      </group>

      {/* Scene 5 — CTA */}
      <group position={[0, 0, SCENE_Z_POSITIONS[4]]}>
        <FloatingTV variant="flat" position={[0, 0.3, 0]} scale={2.4} />
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
    </>
  );
}

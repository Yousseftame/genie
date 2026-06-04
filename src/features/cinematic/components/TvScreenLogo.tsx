import { Image, useTexture } from "@react-three/drei";
import { BRAND } from "../config/brand";
import { GENRE_TV_POSTER } from "../config/posters";

/** Logo plane aligned to the CRT screen (model is Y-rotated π in the parent) */
const SCREEN_BG: [number, number] = [1.22, 0.72];
const LOGO_SCALE: [number, number] = [0.92, 0.34];
const SCREEN_OFFSET: [number, number, number] = [0, 0.16, -0.43];

export function TvScreenLogo() {
  const posterTex = useTexture(GENRE_TV_POSTER);
  const logoTex = useTexture(BRAND.logoSrc);

  return (
    <group position={SCREEN_OFFSET}>
      {/* Background Poster */}
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={SCREEN_BG} />
        <meshBasicMaterial map={posterTex} toneMapped={false} />
      </mesh>
      
      {/* Logo Overlay */}
      <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={LOGO_SCALE} />
        <meshBasicMaterial map={logoTex} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

useTexture.preload(GENRE_TV_POSTER);
useTexture.preload(BRAND.logoSrc);

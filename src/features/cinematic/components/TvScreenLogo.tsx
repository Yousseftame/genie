import { Image, useTexture } from "@react-three/drei";
import { BRAND } from "../config/brand";
import { CINEMATIC_THEME } from "../config/cinematicTheme";

/** Logo plane aligned to the CRT screen (model is Y-rotated π in the parent) */
const SCREEN_BG: [number, number] = [1.22, 0.72];
const LOGO_SCALE: [number, number] = [0.92, 0.34];
const SCREEN_OFFSET: [number, number, number] = [0, 0.2, 0.4];

export function TvScreenLogo() {
  useTexture(BRAND.logoSrc);

  return (
    <group position={SCREEN_OFFSET}>
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={SCREEN_BG} />
        <meshBasicMaterial color={CINEMATIC_THEME.navyDeep} toneMapped={false} />
      </mesh>
      <Image
        url={BRAND.logoSrc}
        position={[0, 0, 0.008]}
        rotation={[0, Math.PI, 0]}
        scale={LOGO_SCALE}
        transparent
        toneMapped={false}
      />
    </group>
  );
}

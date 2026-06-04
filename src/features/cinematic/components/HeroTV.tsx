import { MeshReflectorMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { CINEMATIC_THEME } from "../config/cinematicTheme";
import { FloatingTV } from "./FloatingTV";

function getHeroLayout(aspect: number) {
  if (aspect >= 1.2) {
    return { fitHeight: 3, scale: 1.08, reflectorRadius: 4.6 };
  }
  if (aspect >= 0.85) {
    return { fitHeight: 2.65, scale: 1.02, reflectorRadius: 4 };
  }
  return { fitHeight: 2.25, scale: 0.95, reflectorRadius: 3.5 };
}

export function HeroTV() {
  const { size } = useThree();
  const layout = getHeroLayout(size.width / size.height);

  return (
    <FloatingTV
      variant="crt"
      position={[0, -0.25, 0.6]}
      scale={layout.scale}
      fitHeight={layout.fitHeight}
      rotation={[0, Math.PI, 0]}
      floatIntensity={0.7}
      screenLogo
    />
  );
}

export function useHeroLayout() {
  const { size } = useThree();
  return getHeroLayout(size.width / size.height);
}

export function HeroReflector() {
  const { reflectorRadius } = useHeroLayout();

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0.6]} receiveShadow>
      <circleGeometry args={[reflectorRadius, 64]} />
      <MeshReflectorMaterial
        blur={[280, 120]}
        resolution={512}
        mixBlur={0.85}
        mixStrength={0.65}
        roughness={0.92}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.25}
        color={CINEMATIC_THEME.navyMid}
        metalness={0.35}
        mirror={0.45}
      />
    </mesh>
  );
}

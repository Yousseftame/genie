import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CINEMATIC_THEME } from "../config/cinematicTheme";
import { CameraRig } from "./CameraRig";
import { SceneWorld } from "./SceneWorld";

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color={CINEMATIC_THEME.gold} wireframe />
    </mesh>
  );
}

export function CinematicCanvas() {
  return (
    <div className="cinematic-canvas" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x050f2e, 0);
          scene.background = null;
        }}
        style={{ background: "transparent" }}
        camera={{ position: [0, 0.95, 10], fov: 38, near: 0.1, far: 120 }}
      >
        <Suspense fallback={<Loader />}>
          <SceneWorld />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}

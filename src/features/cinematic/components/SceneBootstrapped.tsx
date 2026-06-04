import { useEffect } from "react";
import { useExperienceReady } from "../context/ExperienceReadyContext";

/** Signals that the R3F scene has mounted (Suspense resolved) */
export function SceneBootstrapped() {
  const { markSceneReady } = useExperienceReady();

  useEffect(() => {
    markSceneReady();
  }, [markSceneReady]);

  return null;
}

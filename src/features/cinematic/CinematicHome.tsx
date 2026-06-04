import { useCallback, useEffect, useState } from "react";
import { SCROLL_HEIGHT_VH } from "./config/scrollSections";
import { CinematicCanvas } from "./components/CinematicCanvas";
import { ScrollOverlay } from "./components/ScrollOverlay";
import { SplashScreen } from "./components/SplashScreen";
import {
  CinematicScrollProvider,
  useCinematicScrollContext,
} from "./context/CinematicScrollContext";
import {
  ExperienceReadyProvider,
  useExperienceReady,
} from "./context/ExperienceReadyContext";
import { useCinematicScroll } from "./hooks/useCinematicScroll";
import { usePreloadBrandAssets } from "./hooks/usePreloadBrandAssets";
import "./cinematic.css";
import "./section-display.css";

const MAX_SPLASH_MS = 8000;

function CinematicScrollDriver({ enabled }: { enabled: boolean }) {
  useCinematicScroll(enabled);
  return null;
}

function CinematicScrollTrack({ enabled }: { enabled: boolean }) {
  const { scrollContainerRef } = useCinematicScrollContext();
  if (!enabled) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="cinematic-scroll-track"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    />
  );
}

function CinematicExperience({ uiEnabled }: { uiEnabled: boolean }) {
  return (
    <main className="cinematic-root cinematic-root--ready">
      <CinematicCanvas />
      {uiEnabled && <ScrollOverlay />}
      <CinematicScrollTrack enabled={uiEnabled} />
      <CinematicScrollDriver enabled={uiEnabled} />
    </main>
  );
}

function SplashGate() {
  const { sceneReady, markSceneReady } = useExperienceReady();
  usePreloadBrandAssets();
  const [animDone, setAnimDone] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const handleAnimComplete = useCallback(() => {
    setAnimDone(true);
  }, []);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      markSceneReady();
      setAnimDone(true);
    }, MAX_SPLASH_MS);
    return () => clearTimeout(fallback);
  }, [markSceneReady]);

  useEffect(() => {
    if (animDone && sceneReady) {
      setSplashDone(true);
    }
  }, [animDone, sceneReady]);

  useEffect(() => {
    document.body.style.overflow = splashDone ? "" : "hidden";
    document.body.style.backgroundColor = splashDone ? "" : "#050f2e";
    return () => {
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
    };
  }, [splashDone]);

  return (
    <div
      className={`cinematic-theme ${splashDone ? "" : "cinematic-theme--splash"}`}
    >
      <CinematicExperience uiEnabled={splashDone} />
      {!splashDone && <SplashScreen onComplete={handleAnimComplete} />}
    </div>
  );
}

export default function CinematicHome() {
  return (
    <ExperienceReadyProvider>
      <CinematicScrollProvider>
        <SplashGate />
      </CinematicScrollProvider>
    </ExperienceReadyProvider>
  );
}

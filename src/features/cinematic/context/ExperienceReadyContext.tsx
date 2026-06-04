import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ExperienceReadyContextValue = {
  sceneReady: boolean;
  markSceneReady: () => void;
};

const ExperienceReadyContext =
  createContext<ExperienceReadyContextValue | null>(null);

export function ExperienceReadyProvider({ children }: { children: ReactNode }) {
  const [sceneReady, setSceneReady] = useState(false);
  const called = useRef(false);

  const markSceneReady = useCallback(() => {
    if (called.current) return;
    called.current = true;
    setSceneReady(true);
  }, []);

  const value = useMemo(
    () => ({ sceneReady, markSceneReady }),
    [sceneReady, markSceneReady],
  );

  return (
    <ExperienceReadyContext.Provider value={value}>
      {children}
    </ExperienceReadyContext.Provider>
  );
}

export function useExperienceReady() {
  const ctx = useContext(ExperienceReadyContext);
  if (!ctx) {
    throw new Error(
      "useExperienceReady must be used within ExperienceReadyProvider",
    );
  }
  return ctx;
}

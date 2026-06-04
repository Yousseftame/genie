import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

export type ScrollState = {
  progress: number;
  activeSectionIndex: number;
};

type CinematicScrollContextValue = {
  scrollState: ScrollState;
  scrollStateRef: RefObject<ScrollState>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  setScrollState: (state: ScrollState) => void;
};

const CinematicScrollContext = createContext<CinematicScrollContextValue | null>(
  null,
);

export function CinematicScrollProvider({ children }: { children: ReactNode }) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    activeSectionIndex: 0,
  });
  const scrollStateRef = useRef<ScrollState>(scrollState);
  scrollStateRef.current = scrollState;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const value = useMemo(
    () => ({ scrollState, scrollStateRef, scrollContainerRef, setScrollState }),
    [scrollState],
  );

  return (
    <CinematicScrollContext.Provider value={value}>
      {children}
    </CinematicScrollContext.Provider>
  );
}

export function useCinematicScrollContext() {
  const ctx = useContext(CinematicScrollContext);
  if (!ctx) {
    throw new Error(
      "useCinematicScrollContext must be used within CinematicScrollProvider",
    );
  }
  return ctx;
}

export function useCinematicScrollState() {
  const { scrollState } = useCinematicScrollContext();
  return scrollState;
}

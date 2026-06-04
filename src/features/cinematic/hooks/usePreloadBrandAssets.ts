import { useEffect, useState } from "react";
import { BRAND } from "../config/brand";
import { GENRE_TV_POSTER, TRENDING_POSTERS } from "../config/posters";

const POSTER_SRCS = [
  ...TRENDING_POSTERS.map((p) => p.image).filter(Boolean),
  GENRE_TV_POSTER,
] as string[];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
}

/** Preload logo and poster art during splash */
export function usePreloadBrandAssets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([preloadImage(BRAND.logoSrc), ...POSTER_SRCS.map(preloadImage)]).then(
      () => {
        if (!cancelled) setReady(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}

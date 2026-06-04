import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useCinematicScrollContext } from "../context/CinematicScrollContext";
import { getActiveSectionIndex } from "../utils/getActiveSectionIndex";

gsap.registerPlugin(ScrollTrigger);

export function useCinematicScroll(enabled = true) {
  const { scrollStateRef, scrollContainerRef, setScrollState } =
    useCinematicScrollContext();

  useEffect(() => {
    if (!enabled) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    const publish = (progress: number) => {
      const p = Math.min(Math.max(progress, 0), 1);
      const activeSectionIndex = getActiveSectionIndex(p);
      const prev = scrollStateRef.current;

      scrollStateRef.current = { progress: p, activeSectionIndex };

      if (
        prev.activeSectionIndex !== activeSectionIndex ||
        Math.abs(prev.progress - p) > 0.002
      ) {
        setScrollState({ progress: p, activeSectionIndex });
      }
    };

    const onLenisScroll = () => {
      publish(lenis.progress);
      ScrollTrigger.update();
    };

    lenis.on("scroll", onLenisScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => publish(self.progress),
    });

    const refresh = () => {
      ScrollTrigger.refresh();
      publish(lenis.progress);
    };

    window.addEventListener("resize", refresh);
    refresh();

    return () => {
      window.removeEventListener("resize", refresh);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      scrollTrigger.kill();
    };
  }, [enabled, scrollStateRef, scrollContainerRef, setScrollState]);
}

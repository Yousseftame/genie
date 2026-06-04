import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "../config/brand";
import { SCROLL_SECTIONS } from "../config/scrollSections";
import { useCinematicScrollState } from "../context/CinematicScrollContext";
import { SectionStage } from "./SectionStage";

export function ScrollOverlay() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { activeSectionIndex, progress } = useCinematicScrollState();
  const stageRef = useRef<HTMLDivElement>(null);

  const section = SCROLL_SECTIONS[activeSectionIndex];
  const isHero = activeSectionIndex === 0;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.28, ease: "power2.out", overwrite: true },
    );
  }, [activeSectionIndex]);

  return (
    <div className="cinematic-overlay" data-section={section.id}>
      <header className="cinematic-nav">
        <a href="/" className="cinematic-logo-link" aria-label={`${BRAND.name} home`}>
          <img
            src={BRAND.logoSrc}
            alt={BRAND.logoAlt}
            className={`cinematic-logo-img ${logoLoaded ? "is-loaded" : ""}`}
            width={120}
            height={40}
            decoding="async"
            onLoad={() => setLogoLoaded(true)}
          />
        </a>
        <nav className="cinematic-nav-links" aria-label="Primary">
          <a href="#shows">Shows</a>
          <a href="#movies">Movies</a>
          <a href="#genres">Genres</a>
        </nav>
      </header>

      <div ref={stageRef} className="cinematic-stage">
        <SectionStage key={section.id} section={section} />
      </div>

      <div className="cinematic-footer">
        <div className="cinematic-progress" aria-hidden>
          <div
            className="cinematic-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <div className="cinematic-dots" role="tablist" aria-label="Story sections">
          {SCROLL_SECTIONS.map((s, i) => (
            <span
              key={s.id}
              className={`cinematic-dot ${i === activeSectionIndex ? "is-active" : ""}`}
              aria-current={i === activeSectionIndex ? "step" : undefined}
            />
          ))}
        </div>
        <p className="cinematic-hint">
          {isHero ? "Scroll to explore" : `${section.index} — ${section.kicker}`}
        </p>
      </div>
    </div>
  );
}

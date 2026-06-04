import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ScrollSection } from "../config/scrollSections";
import { SplitChars } from "./SplitChars";

type SectionStageProps = {
  section: ScrollSection;
};

function useCharReveal(trigger: string) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chars = root.querySelectorAll(".cinematic-char");
    const tween = gsap.fromTo(
      chars,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.35,
        stagger: 0.012,
        ease: "power3.out",
      },
    );

    return () => {
      tween.kill();
    };
  }, [trigger]);

  return rootRef;
}

function EditorialStage({ section }: SectionStageProps) {
  const rootRef = useCharReveal(section.id);

  return (
    <div ref={rootRef} className="section-stage section-stage--editorial">
      <span className="section-index" aria-hidden>
        {section.index}
      </span>
      <div className="section-body">
        <p className="section-kicker">{section.kicker}</p>
        <h1 className="section-title">
          <span className="section-title-main">
            <SplitChars text={section.title} />
          </span>
          {section.titleAccent ? (
            <span className="section-title-accent">
              <SplitChars text={section.titleAccent} />
            </span>
          ) : null}
        </h1>
        <p className="section-detail">{section.detail}</p>
      </div>
    </div>
  );
}

function CompactStage({ section }: SectionStageProps) {
  const rootRef = useCharReveal(section.id);

  return (
    <div ref={rootRef} className="section-stage section-stage--compact">
      <p className="section-kicker">{section.kicker}</p>
      <h1 className="section-title section-title--stacked">
        <SplitChars text={section.title} />
        {section.titleAccent ? (
          <span className="section-title-accent">
            <SplitChars text={section.titleAccent} />
          </span>
        ) : null}
      </h1>
      <p className="section-detail">{section.detail}</p>
    </div>
  );
}

function SignalStage({ section }: SectionStageProps) {
  const rootRef = useCharReveal(section.id);

  return (
    <div ref={rootRef} className="section-stage section-stage--signal">
      <div className="section-signal-meta">
        <span className="section-signal-live">Live</span>
        <span className="section-index">{section.index}</span>
      </div>
      <h1 className="section-title">
        <SplitChars text={section.title} />
        {section.titleAccent ? (
          <span className="section-title-accent">
            <SplitChars text={section.titleAccent} />
          </span>
        ) : null}
      </h1>
      <p className="section-detail">{section.detail}</p>
    </div>
  );
}

export function SectionStage({ section }: SectionStageProps) {
  switch (section.layout) {
    case "compact":
      return <CompactStage section={section} />;
    case "signal":
      return <SignalStage section={section} />;
    case "editorial":
    default:
      return <EditorialStage section={section} />;
  }
}

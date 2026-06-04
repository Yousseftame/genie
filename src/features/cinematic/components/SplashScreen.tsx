import { useEffect, useRef, useState } from "react";
import { BRAND } from "../config/brand";

const COUNT_MS = 2200;
const MESSAGE_MS = 700;
const HOLD_MS = 450;
const FADE_MS = 500;

type SplashScreenProps = {
  onComplete: () => void;
};

type Phase = "counting" | "message" | "fading";

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    doneRef.current = false;
    const start = performance.now();
    let raf = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / COUNT_MS) * 100));
      setProgress(pct);

      if (elapsed < COUNT_MS) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setPhase("message");
      timeouts.push(
        window.setTimeout(() => {
          setPhase("fading");
          timeouts.push(
            window.setTimeout(() => {
              if (doneRef.current) return;
              doneRef.current = true;
              setVisible(false);
              onCompleteRef.current();
            }, FADE_MS),
          );
        }, MESSAGE_MS + HOLD_MS),
      );
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  if (!visible) return null;

  const showMessage = phase === "message" || phase === "fading";

  return (
    <div
      className={`splash-screen ${phase === "fading" ? "splash-screen--fading" : ""}`}
      aria-live="polite"
      aria-busy={phase !== "fading"}
    >
      <div className="splash-center">
        <p className="splash-eyebrow">System</p>

        <div className="splash-logo-block" aria-label="Loading">
          <img
            className="splash-logo"
            src={BRAND.logoSrc}
            alt={BRAND.logoAlt}
            width={220}
            height={80}
            decoding="async"
          />
        </div>

        <div className="splash-bar" aria-hidden>
          <div
            className="splash-bar-fill"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <p
          className={`splash-message ${showMessage ? "splash-message--visible" : ""}`}
        >
          Initial buffer
        </p>
        <p className={`splash-sub ${showMessage ? "splash-sub--visible" : ""}`}>
          Preparing your cinematic experience
        </p>
      </div>
    </div>
  );
}

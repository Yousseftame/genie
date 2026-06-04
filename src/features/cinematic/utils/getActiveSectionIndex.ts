import { SCROLL_SECTIONS } from "../config/scrollSections";

/** Index from scroll progress using each section's range start */
export function getActiveSectionIndex(progress: number) {
  const p = Math.min(Math.max(progress, 0), 1);
  for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
    if (p >= SCROLL_SECTIONS[i].range[0]) return i;
  }
  return 0;
}

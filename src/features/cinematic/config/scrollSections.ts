export type SectionLayout = "editorial" | "compact" | "signal";

export type ScrollSection = {
  id: string;
  index: string;
  layout: SectionLayout;
  kicker: string;
  title: string;
  titleAccent?: string;
  detail: string;
  range: [number, number];
};

/** Ranges align with camera keyframe segments (3 scenes → 2 scroll segments) */
export const SCROLL_SECTIONS: ScrollSection[] = [
  {
    id: "hero",
    index: "01",
    layout: "editorial",
    kicker: "Welcome",
    title: "Press",
    titleAccent: "play",
    detail: "Your screen is live. Scroll when you're ready to move.",
    range: [0, 0.16],
  },
  {
    id: "trending",
    index: "02",
    layout: "editorial",
    kicker: "Trending",
    title: "What's",
    titleAccent: "hot",
    detail: "Posters in orbit — follow the light, not the list.",
    range: [0.16, 0.33],
  },
  {
    id: "cta",
    index: "03",
    layout: "compact",
    kicker: "Start",
    title: "Open",
    titleAccent: "catalog",
    detail: "The signal is clear. Step in when you want.",
    range: [0.33, 0.83],
  },
  {
    id: "finale",
    index: "04",
    layout: "compact",
    kicker: "The Premiere",
    title: "Take Your",
    titleAccent: "seat",
    detail: "Sit back and enjoy the show.",
    range: [0.83, 1],
  },
];

export const SCROLL_HEIGHT_VH = 900;

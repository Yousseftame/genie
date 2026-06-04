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

/** Ranges align with camera keyframe segments (5 scenes → 4 scroll segments) */
export const SCROLL_SECTIONS: ScrollSection[] = [
  {
    id: "hero",
    index: "01",
    layout: "editorial",
    kicker: "Welcome",
    title: "Press",
    titleAccent: "play",
    detail: "Your screen is live. Scroll when you're ready to move.",
    range: [0, 0.2],
  },
  {
    id: "trending",
    index: "02",
    layout: "editorial",
    kicker: "Trending",
    title: "What's",
    titleAccent: "hot",
    detail: "Posters in orbit — follow the light, not the list.",
    range: [0.2, 0.4],
  },
  {
    id: "genres",
    index: "03",
    layout: "compact",
    kicker: "Genres",
    title: "Every",
    titleAccent: "mood",
    detail: "Drama, sci-fi, horror — drift between gravity wells.",
    range: [0.4, 0.6],
  },
  {
    id: "featured",
    index: "04",
    layout: "signal",
    kicker: "Featured",
    title: "Tonight's",
    titleAccent: "pick",
    detail: "One premiere under spotlight — built for a single sitting.",
    range: [0.6, 0.8],
  },
  {
    id: "cta",
    index: "05",
    layout: "compact",
    kicker: "Start",
    title: "Open",
    titleAccent: "catalog",
    detail: "The signal is clear. Step in when you want.",
    range: [0.8, 1],
  },
];

export const SCROLL_HEIGHT_VH = 520;

export type PosterConfig = {
  title: string;
  /** Accent color for procedural poster art (no external fetch) */
  accent: string;
  /** Optional remote poster; falls back to procedural art if load fails */
  image?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

export const TRENDING_POSTERS: PosterConfig[] = [
  {
    title: "Inception",
    accent: "#5b3fd4",
    image: "/posters/inception.jpg",
    position: [-3.2, 1.4, -10],
    rotation: [0, 0.35, 0.04],
    scale: 1.15,
  },
  {
    title: "Interstellar",
    accent: "#c43d6b",
    image: "/posters/interstellar.jpg",
    position: [0.2, 2.1, -11.5],
    rotation: [0, 0, -0.02],
    scale: 1.35,
  },
  {
    title: "The Dark Knight",
    accent: "#2f6fd4",
    image: "/posters/dark-knight.jpg",
    position: [3.4, 1.2, -10.2],
    rotation: [0, -0.4, -0.03],
    scale: 1.1,
  },
  {
    title: "Pulp Fiction",
    accent: "#1f9e8c",
    image: "/posters/pulp-fiction.jpg",
    position: [-1.8, -0.6, -12.8],
    rotation: [0, 0.15, 0.06],
    scale: 0.95,
  },
];

/** Poster on the flat TV in the genres scene (right screen) */
export const GENRE_TV_POSTER = "/posters/stranger-things.jpg";

export const FEATURED_POSTERS: PosterConfig[] = [
  {
    title: "The Last Frame",
    accent: "#8b5cf6",
    position: [-2.4, 1.8, -34],
    rotation: [0, 0.25, 0],
    scale: 1.25,
  },
  {
    title: "Static Dreams",
    accent: "#e879a8",
    position: [2.6, 1.5, -35.5],
    rotation: [0, -0.3, 0],
    scale: 1.2,
  },
];

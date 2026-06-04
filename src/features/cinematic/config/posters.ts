import ambtionImg from "@/assets/ambtion.png";
import heartImg from "@/assets/AmbitionScreenshot.png";
import kidImg from "@/assets/kid.png";
import thanksImg from "@/assets/thanks.png";

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
    title: "Ambition",
    accent: "#5b3fd4",
    image: ambtionImg,
    position: [-3.2, 1.4, 2],
    rotation: [0, 0.35, 0.04],
    scale: 1.15,
  },
  {
    title: "Heart",
    accent: "#c43d6b",
    image: heartImg,
    position: [0.2, 2.1, 0.5],
    rotation: [0, 0, -0.02],
    scale: 1.35,
  },
  {
    title: "Kid",
    accent: "#2f6fd4",
    image: kidImg,
    position: [3.4, 1.2, 1.8],
    rotation: [0, -0.4, -0.03],
    scale: 1.1,
  },
  {
    title: "Thanks",
    accent: "#1f9e8c",
    image: thanksImg,
    position: [-1.8, -0.6, -0.8],
    rotation: [0, 0.15, 0.06],
    scale: 0.95,
  },
];

/** Poster on the flat TV in the genres scene (right screen) */
export const GENRE_TV_POSTER = ambtionImg;

export const FEATURED_POSTERS: PosterConfig[] = [
  {
    title: "The Last Frame",
    accent: "#8b5cf6",
    position: [-2.4, 1.8, 2],
    rotation: [0, 0.25, 0],
    scale: 1.25,
  },
  {
    title: "Static Dreams",
    accent: "#e879a8",
    position: [2.6, 1.5, 0.5],
    rotation: [0, -0.3, 0],
    scale: 1.2,
  },
];

const ALL_IMAGES = [
  ambtionImg,
  heartImg,
  kidImg,
  thanksImg,
  ambtionImg,
  heartImg,
  kidImg,
  thanksImg,
];

const RADIUS = 6;
export const RING_POSTERS: PosterConfig[] = ALL_IMAGES.map((img, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const x = Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;
  
  // They face inward, so rotate by angle + PI
  const rotationY = angle + Math.PI;

  return {
    title: `Ring Movie ${i}`,
    accent: "#ffffff",
    image: img,
    position: [x, 1.5, z],
    rotation: [0, rotationY, 0],
    scale: 1.2,
  };
});

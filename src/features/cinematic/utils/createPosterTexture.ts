import * as THREE from "three";

const textureCache = new Map<string, THREE.CanvasTexture>();

export function createPosterTexture(title: string, accent: string) {
  const key = `${title}-${accent}`;
  const cached = textureCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Texture();
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(0.55, "#0c2866");
  gradient.addColorStop(1, "#050f2e");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let y = 0; y < canvas.height; y += 6) {
    ctx.fillRect(0, y, canvas.width, 2);
  }

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "bold 42px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  ctx.fillText(line1, canvas.width / 2, canvas.height * 0.72);
  if (line2) {
    ctx.fillText(line2, canvas.width / 2, canvas.height * 0.78);
  }

  ctx.fillStyle = "rgba(196,181,255,0.9)";
  ctx.font = "600 18px system-ui, sans-serif";
  ctx.fillText("GENINE", canvas.width / 2, canvas.height * 0.9);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache.set(key, texture);
  return texture;
}

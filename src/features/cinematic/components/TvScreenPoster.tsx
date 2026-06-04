import { Image, useTexture } from "@react-three/drei";
import type { TvScreenPlacement } from "../utils/tvScreenPlacement";

type TvScreenPosterProps = {
  imageSrc: string;
  placement: TvScreenPlacement;
};

export function TvScreenPoster({ imageSrc, placement }: TvScreenPosterProps) {
  useTexture(imageSrc);

  return (
    <group position={placement.position} rotation={placement.rotation}>
      <Image
        url={imageSrc}
        scale={placement.size}
        toneMapped={false}
        transparent
      />
    </group>
  );
}

import Image from "next/image";

import type { PaletteRoom } from "@/content/residences";
import type { PaletteId } from "@/content/schemas/palette";
import { cx } from "@/lib/cx";

type PaletteFigureProps = {
  room: PaletteRoom;
  palette: PaletteId;
  paletteName: string;
};

export function PaletteFigure({
  room,
  palette,
  paletteName,
}: PaletteFigureProps) {
  return (
    <figure>
      <div className="relative overflow-hidden">
        {room.images.map(({ palette: shownIn, image }, index) => {
          const shown = shownIn === palette;
          return (
            <Image
              key={shownIn}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={shown ? image.alt : ""}
              aria-hidden={!shown}
              sizes="(min-width: 64rem) 28vw, 50vw"
              className={cx(
                "w-full transition-opacity duration-slow ease-out",
                index === 0
                  ? "h-auto"
                  : "absolute inset-0 size-full object-cover",
                shown ? "opacity-100" : "opacity-0",
              )}
            />
          );
        })}
      </div>
      <figcaption className="mt-3 text-caption text-muted">
        {room.name}, {paletteName}
      </figcaption>
    </figure>
  );
}

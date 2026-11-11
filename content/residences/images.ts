import { image } from "../media";
import { palettes } from "../palettes";

type GalleryAlt = { exterior: string; interior: string; detail: string };

type PaletteRoom = { room: string; label: string };

function residencePath(slug: string, name: string): string {
  return `/images/residences/${slug}/${name}.webp`;
}

export function residenceGallery(slug: string, alt: GalleryAlt) {
  return [
    image(residencePath(slug, "exterior"), alt.exterior, "landscape"),
    image(residencePath(slug, "interior"), alt.interior, "portrait"),
    image(residencePath(slug, "detail"), alt.detail, "square"),
  ];
}

export function residencePalettes(slug: string, rooms: readonly PaletteRoom[]) {
  return palettes.map((palette) => ({
    palette: palette.id,
    rooms: rooms.map(({ room, label }) => ({
      room,
      image: image(
        residencePath(slug, `${palette.id}-${room}`),
        `${label} in the ${palette.name} palette`,
        "portrait",
      ),
    })),
  }));
}

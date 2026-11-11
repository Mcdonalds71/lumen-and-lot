import { type ImageFormat, image } from "../media";

export function projectImage(
  slug: string,
  name: string,
  alt: string,
  format: ImageFormat,
) {
  return image(`/images/projects/${slug}/${name}.webp`, alt, format);
}

export const studioCredits = [
  { role: "Architecture and interiors", name: "Lumen & Lot" },
  { role: "Construction", name: "Lumen & Lot" },
  { role: "Photography", name: "Placeholder images" },
];

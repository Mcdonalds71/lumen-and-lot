import { home } from "./home";
import { journalMedia } from "./journal/media";
import { lookbooks } from "./lookbooks";
import { projects } from "./projects";
import { residences } from "./residences";
import type { ImageAsset } from "./schemas/common";
import { systemImages } from "./system";

function isImage(value: object): value is ImageAsset {
  return "src" in value && "width" in value && "height" in value;
}

function collectImages(value: unknown): ImageAsset[] {
  if (typeof value !== "object" || value === null) return [];
  if (isImage(value)) return [value];
  return Object.values(value).flatMap(collectImages);
}

export const contentImages: readonly ImageAsset[] = collectImages([
  home.hero,
  residences,
  projects,
  lookbooks,
  journalMedia,
  systemImages,
]);

export function findContentImage(src: string): ImageAsset | undefined {
  return contentImages.find((image) => image.src === src);
}

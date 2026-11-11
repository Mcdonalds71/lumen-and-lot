import { fileURLToPath } from "node:url";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { lookbooks } from "@/content/lookbooks";
import { projects } from "@/content/projects";
import { residences } from "@/content/residences";

type ImageReference = { src: string; width: number; height: number };

const publicDirectory = new URL("../../public/", import.meta.url);

function isImageReference(value: object): value is ImageReference {
  return "src" in value && "width" in value && "height" in value;
}

function collectImages(value: unknown): ImageReference[] {
  if (typeof value !== "object" || value === null) return [];
  if (isImageReference(value)) return [value];
  return Object.values(value).flatMap(collectImages);
}

const images = collectImages([residences, projects, lookbooks]);

describe("content images", () => {
  it("gives every image slot its own file", () => {
    const sources = images.map((image) => image.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it.each(images.map((image) => [image.src, image] as const))(
    "%s exists at the size the content states",
    async (_, image) => {
      const file = fileURLToPath(new URL(`.${image.src}`, publicDirectory));
      const { width, height } = await sharp(file).metadata();
      expect({ width, height }).toEqual({
        width: image.width,
        height: image.height,
      });
    },
  );
});

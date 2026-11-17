import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

import sharp from "sharp";

import { findContentImage } from "@/content/images";

import { render } from "./drawings/pen";
import { plates } from "./drawings/plates";

const publicDirectory = join(import.meta.dirname, "..", "public");

for (const [src, plate] of Object.entries(plates)) {
  const image = findContentImage(src);
  if (!image) throw new Error(`No content image uses "${src}".`);
  const file = join(publicDirectory, src);
  await mkdir(dirname(file), { recursive: true });
  await sharp(Buffer.from(render(plate, image)))
    .webp({ quality: 90 })
    .toFile(file);
}

console.log(`Drew ${Object.keys(plates).length} drawings.`);

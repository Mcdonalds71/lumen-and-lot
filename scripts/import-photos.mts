import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

import sharp from "sharp";

import { photos } from "@/content/photos";
import { coverRegion, coverScale } from "@/lib/crop";
import { downloadUrl, sourceWidth } from "@/lib/photo-sources";

type Photo = (typeof photos)[number];

const publicDirectory = join(import.meta.dirname, "..", "public");
const concurrency = 4;
const filters = process.argv.slice(2);

const selected = photos.filter(
  (photo) =>
    filters.length === 0 || filters.some((term) => photo.src.includes(term)),
);

const attempts = 4;
const timeout = 120_000;
const enlargementLimit = 0.98;

async function download(url: string, attempt = 1): Promise<Buffer> {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    if (!response.ok) throw new Error(`${url} answered ${response.status}.`);
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    if (attempt >= attempts) throw error;
    return download(url, attempt + 1);
  }
}

async function decode(photo: Photo, width: number) {
  const url = downloadUrl(photo.source, width);
  const { data, info } = await sharp(await download(url))
    .rotate()
    .toBuffer({ resolveWithObject: true });
  return { data, size: { width: info.width, height: info.height } };
}

async function original(photo: Photo) {
  const first = await decode(photo, sourceWidth(photo));
  const scale = coverScale(first.size, photo);
  if (scale >= 1) return first;
  return decode(photo, Math.ceil(first.size.width / scale));
}

async function importPhoto(photo: Photo): Promise<string | undefined> {
  const { data, size } = await original(photo);
  const file = join(publicDirectory, photo.src);
  await mkdir(dirname(file), { recursive: true });
  await sharp(data)
    .extract(coverRegion(size, photo, photo.focus))
    .resize(photo.width, photo.height)
    .webp({ quality: 80 })
    .toFile(file);
  const scale = coverScale(size, photo);
  return scale < enlargementLimit
    ? `${photo.src} was enlarged ${(1 / scale).toFixed(2)}×, from ${size.width}×${size.height}.`
    : undefined;
}

const queue = [...selected];
const warnings: string[] = [];

async function worker() {
  for (let photo = queue.shift(); photo; photo = queue.shift()) {
    const warning = await importPhoto(photo);
    if (warning) warnings.push(warning);
    console.log(`${photo.src}  ${photo.credit.name}, ${photo.credit.site}`);
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));

console.log(`Imported ${selected.length} of ${photos.length} photographs.`);
for (const warning of warnings) console.warn(warning);

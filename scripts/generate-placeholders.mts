import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

import sharp from "sharp";

import { lookbooks } from "@/content/lookbooks";
import { findPalette } from "@/content/palettes";
import { projects } from "@/content/projects";
import { residences } from "@/content/residences";
import {
  type PaletteId,
  paletteIds,
  type SwatchRole,
} from "@/content/schemas/palette";

import {
  before,
  detail,
  drawing,
  exterior,
  room,
  type Scene,
  type Size,
  type Tones,
} from "./placeholders/scenes";

type Job = { target: Size & { src: string }; render: (size: Size) => string };

const sequence: readonly [Scene, ...Scene[]] = [exterior, room, detail];

function cyclic<T>(items: readonly [T, ...T[]], index: number): T {
  return items[index % items.length] ?? items[0];
}

function tonesOf(id: PaletteId): Tones {
  const { swatches } = findPalette(id);
  const color = (role: SwatchRole) => {
    const swatch = swatches.find((candidate) => candidate.role === role);
    if (!swatch) throw new Error(`Palette "${id}" has no ${role} swatch.`);
    return swatch.color;
  };
  return {
    wall: color("wall"),
    floor: color("floor"),
    stone: color("stone"),
    metal: color("metal"),
  };
}

const systemJobs: Job[] = [
  {
    target: {
      src: "/images/placeholders/north-light.webp",
      width: 1600,
      height: 2000,
    },
    render: (size) => room(size, tonesOf("limewash")),
  },
  {
    target: {
      src: "/images/placeholders/courtyard.webp",
      width: 2400,
      height: 1600,
    },
    render: (size) => exterior(size, tonesOf("umber")),
  },
];

const residenceJobs = residences.flatMap((residence, index): Job[] => {
  const tones = tonesOf(cyclic(paletteIds, index));
  return [
    ...residence.gallery.map((target, position) => ({
      target,
      render: (size: Size) => cyclic(sequence, position)(size, tones),
    })),
    ...residence.palettes.flatMap(({ palette, rooms }) =>
      rooms.map(({ image: target }) => ({
        target,
        render: (size: Size) => room(size, tonesOf(palette)),
      })),
    ),
  ];
});

const projectJobs = projects.flatMap((project, index): Job[] => {
  const tones = tonesOf(cyclic(paletteIds, index + 1));
  return [
    { target: project.cover, render: (size) => exterior(size, tones) },
    ...project.sections.map(({ image: target }, position) => ({
      target,
      render: (size: Size) => cyclic(sequence, position)(size, tones),
    })),
    ...project.drawings.map(({ image: target }) => ({
      target,
      render: drawing,
    })),
    { target: project.beforeAfter.before, render: before },
    { target: project.beforeAfter.after, render: (size) => room(size, tones) },
  ];
});

const lookbookJobs = lookbooks.map((lookbook): Job => ({
  target: lookbook.image,
  render: (size) => room(size, tonesOf(lookbook.palette), lookbook.hotspots),
}));

const jobs = [...systemJobs, ...residenceJobs, ...projectJobs, ...lookbookJobs];
const publicDirectory = join(import.meta.dirname, "..", "public");
let created = 0;

for (const { target, render } of jobs) {
  const file = join(publicDirectory, target.src);
  if (existsSync(file)) continue;
  await mkdir(dirname(file), { recursive: true });
  await sharp(Buffer.from(render(target)))
    .webp({ quality: 82 })
    .toFile(file);
  created += 1;
}

console.log(
  `Created ${created} placeholder images. ${jobs.length - created} already existed.`,
);

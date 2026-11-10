import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

type Shape =
  | {
      kind: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      fill: string;
    }
  | { kind: "polygon"; points: string; fill: string };

type Placeholder = {
  name: string;
  width: number;
  height: number;
  background: string;
  shapes: Shape[];
};

const placeholders: Placeholder[] = [
  {
    name: "north-light",
    width: 1600,
    height: 2000,
    background: "#d9d1c4",
    shapes: [
      {
        kind: "rect",
        x: 0,
        y: 1480,
        width: 1600,
        height: 520,
        fill: "#a98d6c",
      },
      {
        kind: "rect",
        x: 880,
        y: 280,
        width: 420,
        height: 1040,
        fill: "#efe9dd",
      },
      {
        kind: "rect",
        x: 1084,
        y: 280,
        width: 12,
        height: 1040,
        fill: "#d9d1c4",
      },
      {
        kind: "polygon",
        points: "840,1540 1300,1540 1150,1930 690,1930",
        fill: "#c7a582",
      },
    ],
  },
  {
    name: "courtyard",
    width: 2400,
    height: 1600,
    background: "#e7e1d6",
    shapes: [
      { kind: "rect", x: 0, y: 0, width: 960, height: 1600, fill: "#cbc2b3" },
      {
        kind: "rect",
        x: 0,
        y: 1180,
        width: 2400,
        height: 420,
        fill: "#b5aa98",
      },
      {
        kind: "rect",
        x: 1480,
        y: 470,
        width: 330,
        height: 710,
        fill: "#3b3833",
      },
      {
        kind: "polygon",
        points: "960,1180 2400,1180 2400,1600 1500,1600",
        fill: "#c4b9a6",
      },
    ],
  },
];

function toSvg({ width, height, background, shapes }: Placeholder): string {
  const elements = shapes.map((shape) =>
    shape.kind === "rect"
      ? `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" fill="${shape.fill}"/>`
      : `<polygon points="${shape.points}" fill="${shape.fill}"/>`,
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${background}"/>${elements.join("")}</svg>`;
}

const outputDirectory = join(
  import.meta.dirname,
  "..",
  "public",
  "images",
  "placeholders",
);

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  placeholders.map((placeholder) =>
    sharp(Buffer.from(toSvg(placeholder)))
      .webp({ quality: 82 })
      .toFile(join(outputDirectory, `${placeholder.name}.webp`)),
  ),
);

export type Tones = {
  wall: string;
  floor: string;
  stone: string;
  metal: string;
};

export type Size = { width: number; height: number };

export type Spot = { x: number; y: number };

export type Scene = (size: Size, tones: Tones) => string;

const daylight = "#f5f1e8";
const opening = "#2d2a26";
const sky = "#e8e4dc";
const paper = "#f4f1ea";
const ink = "#161513";

const weathered: Tones = {
  wall: "#8e887d",
  floor: "#6d655a",
  stone: "#a49c8f",
  metal: "#57534c",
};

function canvas({ width, height }: Size, shapes: readonly string[]): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 100 100" preserveAspectRatio="none">${shapes.join("")}</svg>`;
}

function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  opacity = 1,
): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" fill-opacity="${opacity}"/>`;
}

function polygon(points: string, fill: string, opacity = 1): string {
  return `<polygon points="${points}" fill="${fill}" fill-opacity="${opacity}"/>`;
}

function line(path: string): string {
  return `<path d="${path}" fill="none" stroke="${ink}" stroke-width="6" vector-effect="non-scaling-stroke"/>`;
}

export function room(
  size: Size,
  tones: Tones,
  objects: readonly Spot[] = [{ x: 30, y: 80 }],
): string {
  return canvas(size, [
    rect(0, 0, 100, 100, tones.wall),
    rect(0, 74, 100, 26, tones.floor),
    rect(58, 12, 24, 50, daylight),
    rect(69.6, 12, 0.8, 50, tones.wall),
    polygon("55,79 82,79 74,97 47,97", daylight, 0.35),
    ...objects.map(({ x, y }, index) =>
      rect(x - 8, y - 6, 16, 12, index % 2 === 0 ? tones.stone : tones.metal),
    ),
  ]);
}

export function exterior(size: Size, tones: Tones): string {
  const windows = [14, 30, 46, 62].flatMap((x) =>
    [24, 48].map((y) => rect(x, y, 9, 14, opening)),
  );
  return canvas(size, [
    rect(0, 0, 100, 100, sky),
    rect(8, 14, 70, 66, tones.wall),
    ...windows,
    rect(78, 40, 22, 40, tones.stone),
    rect(0, 80, 100, 20, tones.floor),
  ]);
}

export function detail(size: Size, tones: Tones): string {
  return canvas(size, [
    rect(0, 0, 100, 100, tones.wall),
    polygon("0,62 100,38 100,100 0,100", tones.floor),
    polygon("0,84 100,60 100,72 0,96", tones.stone),
    rect(70, 0, 2, 100, tones.metal),
  ]);
}

export function drawing(size: Size): string {
  return canvas(size, [
    rect(0, 0, 100, 100, paper),
    line("M12 14 H88 V86 H12 Z"),
    line("M12 50 H44 M52 14 V40 M52 48 V86 M52 62 H88"),
    line("M60 22 H82 M60 28 H82 M60 34 H82 M60 40 H82"),
    line("M24 14 V10 M36 14 V10 M88 70 H92 M88 78 H92"),
  ]);
}

export function before(size: Size): string {
  return canvas(size, [
    rect(0, 0, 100, 100, weathered.wall),
    rect(0, 74, 100, 26, weathered.floor),
    rect(58, 12, 24, 50, opening),
    rect(20, 62, 22, 14, weathered.stone),
  ]);
}

import { colors } from "@/lib/colors";

export type Point = readonly [x: number, y: number];

export type Plate = {
  width: number;
  height: number;
  marks: readonly string[];
};

const weights = { party: 1.8, wall: 1, thin: 0.3, hair: 0.2 } as const;

type Weight = keyof typeof weights;

function points(list: readonly Point[]): string {
  return list.map(([x, y]) => `${x},${y}`).join(" ");
}

function stroke(weight: Weight, color: string = colors.ink): string {
  return `fill="none" stroke="${color}" stroke-width="${weights[weight]}" stroke-linecap="square" stroke-linejoin="miter"`;
}

export function polyline(weight: Weight, ...list: Point[]): string {
  return `<polyline points="${points(list)}" ${stroke(weight)}/>`;
}

export function wall(...list: Point[]): string {
  return polyline("wall", ...list);
}

export function partyWall(...list: Point[]): string {
  return polyline("party", ...list);
}

export function thin(...list: Point[]): string {
  return polyline("thin", ...list);
}

export function dashed(...list: Point[]): string {
  return `<polyline points="${points(list)}" ${stroke("thin")} stroke-dasharray="2 1.4"/>`;
}

export function outline(x: number, y: number, width: number, height: number) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" ${stroke("thin")}/>`;
}

export function dashedBox(x: number, y: number, width: number, height: number) {
  return dashed(
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y],
  );
}

export function hatch(x: number, y: number, width: number, height: number) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="url(#hatch)"/>`;
}

export function slab(fromX: number, toX: number, y: number, depth = 1.6) {
  return `<rect x="${fromX}" y="${y - depth / 2}" width="${toX - fromX}" height="${depth}" fill="${colors.ink}"/>`;
}

export function ground(fromX: number, toX: number, y: number): string[] {
  return [
    hatch(fromX, y, toX - fromX, 5),
    polyline("wall", [fromX, y], [toX, y]),
  ];
}

function erase(x: number, y: number, width: number, height: number) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${colors.paper}"/>`;
}

export function windowAcross(fromX: number, toX: number, y: number): string[] {
  return [
    erase(fromX, y - 1.2, toX - fromX, 2.4),
    ...[-0.5, 0, 0.5].map((offset) =>
      polyline("hair", [fromX, y + offset], [toX, y + offset]),
    ),
    thin([fromX, y - 0.6], [fromX, y + 0.6]),
    thin([toX, y - 0.6], [toX, y + 0.6]),
  ];
}

export function windowDown(x: number, fromY: number, toY: number): string[] {
  return [
    erase(x - 1.2, fromY, 2.4, toY - fromY),
    ...[-0.5, 0, 0.5].map((offset) =>
      polyline("hair", [x + offset, fromY], [x + offset, toY]),
    ),
    thin([x - 0.6, fromY], [x + 0.6, fromY]),
    thin([x - 0.6, toY], [x + 0.6, toY]),
  ];
}

export function door(hinge: Point, open: Point, closed: Point, sweep: 0 | 1) {
  const radius = Math.hypot(open[0] - hinge[0], open[1] - hinge[1]);
  return [
    thin(hinge, open),
    `<path d="M${open[0]},${open[1]} A${radius},${radius} 0 0 ${sweep} ${closed[0]},${closed[1]}" ${stroke("hair")}/>`,
  ];
}

export function stairs(
  x: number,
  y: number,
  width: number,
  height: number,
  treads: number,
  axis: "x" | "y",
): string[] {
  const along = axis === "x" ? width : height;
  const lines = Array.from({ length: treads - 1 }, (_, index) => {
    const offset = (along / treads) * (index + 1);
    return axis === "x"
      ? thin([x + offset, y], [x + offset, y + height])
      : thin([x, y + offset], [x + width, y + offset]);
  });
  const arrow =
    axis === "x"
      ? polyline(
          "hair",
          [x + 2, y + height / 2],
          [x + width - 2, y + height / 2],
        )
      : polyline(
          "hair",
          [x + width / 2, y + height - 2],
          [x + width / 2, y + 2],
        );
  return [outline(x, y, width, height), ...lines, arrow];
}

export function flight(from: Point, to: Point, steps: number): string {
  const [fromX, fromY] = from;
  const run = (to[0] - fromX) / steps;
  const rise = (to[1] - fromY) / steps;
  const path: Point[] = [from];
  for (let step = 0; step < steps; step += 1) {
    path.push([fromX + run * step, fromY + rise * (step + 1)]);
    path.push([fromX + run * (step + 1), fromY + rise * (step + 1)]);
  }
  return polyline("thin", ...path);
}

export function column(x: number, y: number) {
  return `<rect x="${x - 0.9}" y="${y - 0.9}" width="1.8" height="1.8" fill="${colors.ink}"/>`;
}

export function tree(x: number, y: number, radius: number) {
  return `<circle cx="${x}" cy="${y}" r="${radius}" ${stroke("thin")}/><circle cx="${x}" cy="${y}" r="0.6" fill="${colors.ink}"/>`;
}

export function ray(
  from: Point,
  to: Point,
  pattern: "solid" | "dashed" = "solid",
) {
  const dash = pattern === "dashed" ? ' stroke-dasharray="2.4 1.6"' : "";
  return `<polyline points="${points([from, to])}" ${stroke("thin", colors.clay)}${dash}/>`;
}

export function render(
  plate: Plate,
  pixels: { width: number; height: number },
) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pixels.width}" height="${pixels.height}" viewBox="0 0 ${plate.width} ${plate.height}">
<defs><pattern id="hatch" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="1.6" stroke="${colors.ink}" stroke-width="0.18"/></pattern></defs>
<rect width="${plate.width}" height="${plate.height}" fill="${colors.paper}"/>
${plate.marks.join("\n")}
</svg>`;
}

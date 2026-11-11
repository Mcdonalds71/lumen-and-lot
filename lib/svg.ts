import type { Point } from "./geometry";

const precision = 1000;

export function svgNumber(value: number): number {
  return Math.round(value * precision) / precision;
}

export function svgPoints(polygon: readonly Point[]): string {
  return polygon.map(([x, y]) => `${svgNumber(x)},${svgNumber(y)}`).join(" ");
}

import { numberFormat } from "./number-format";

export const squareFeetPerSquareMeter = 10.7639;

export const areaUnits = ["m2", "ft2"] as const;

export type AreaUnit = (typeof areaUnits)[number];

const symbols: Record<AreaUnit, string> = { m2: "m²", ft2: "ft²" };

const wholeNumber = { maximumFractionDigits: 0 } as const;

export function toSquareFeet(squareMeters: number): number {
  return squareMeters * squareFeetPerSquareMeter;
}

export function formatArea(squareMeters: number, unit: AreaUnit): string {
  const value = unit === "m2" ? squareMeters : toSquareFeet(squareMeters);
  return `${numberFormat(wholeNumber).format(value)}\u00a0${symbols[unit]}`;
}

export const centimetersPerInch = 2.54;

export type Measurements = { width: number; depth: number; height: number };

const upToOneDecimal = { maximumFractionDigits: 1 } as const;

export function formatDimensions(
  { width, depth, height }: Measurements,
  unit: AreaUnit,
): string {
  const [scale, symbol] =
    unit === "m2" ? [1, "cm"] : [1 / centimetersPerInch, "in"];
  const value = (centimeters: number) =>
    numberFormat(upToOneDecimal).format(centimeters * scale);
  return `W\u00a0${value(width)} × D\u00a0${value(depth)} × H\u00a0${value(height)}\u00a0${symbol}`;
}

export function formatAreaRange(
  min: number,
  max: number | undefined,
  unit: AreaUnit,
): string {
  const value = (squareMeters: number) =>
    numberFormat(wholeNumber).format(
      unit === "m2" ? squareMeters : toSquareFeet(squareMeters),
    );
  const symbol = `\u00a0${symbols[unit]}`;
  if (max === undefined) return `Over ${value(min)}${symbol}`;
  if (min === 0) return `Up to ${value(max)}${symbol}`;
  return `${value(min)}–${value(max)}${symbol}`;
}

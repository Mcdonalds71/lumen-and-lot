export const squareFeetPerSquareMeter = 10.7639;

export const areaUnits = ["m2", "ft2"] as const;

export type AreaUnit = (typeof areaUnits)[number];

const symbols: Record<AreaUnit, string> = { m2: "m²", ft2: "ft²" };

const wholeNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function toSquareFeet(squareMeters: number): number {
  return squareMeters * squareFeetPerSquareMeter;
}

export function formatArea(squareMeters: number, unit: AreaUnit): string {
  const value = unit === "m2" ? squareMeters : toSquareFeet(squareMeters);
  return `${wholeNumber.format(value)} ${symbols[unit]}`;
}

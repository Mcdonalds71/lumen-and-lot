export const marketIds = [
  "toronto",
  "hudson-valley",
  "copenhagen",
  "lisbon",
] as const;

export type MarketId = (typeof marketIds)[number];

export const paletteIds = ["limewash", "umber", "slate"] as const;

export type PaletteId = (typeof paletteIds)[number];

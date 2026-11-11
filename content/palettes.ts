import { z } from "zod";

import { uniqueBy } from "./schemas/common";
import {
  type Palette,
  type PaletteId,
  paletteIds,
  paletteSchema,
} from "./schemas/palette";

export const palettes: readonly Palette[] = z
  .array(paletteSchema)
  .length(paletteIds.length)
  .check(uniqueBy("palette", (palette) => palette.id))
  .parse([
    {
      id: "limewash",
      name: "Limewash",
      summary:
        "Pale and quiet. Limewashed plaster, white oak and honed limestone, with linen and brushed nickel.",
      swatches: [
        { role: "wall", name: "Limewash", color: "#e9e3d6" },
        { role: "floor", name: "White oak", color: "#cdb590" },
        { role: "stone", name: "Limestone", color: "#d6cfc1" },
        { role: "metal", name: "Brushed nickel", color: "#a9a79f" },
      ],
      materials: [
        { name: "Limewashed plaster", use: "Walls" },
        { name: "Oiled white oak", use: "Floors" },
        { name: "Honed limestone", use: "Kitchen counters" },
        { name: "Undyed linen", use: "Curtains" },
        { name: "Brushed nickel", use: "Hardware" },
      ],
    },
    {
      id: "umber",
      name: "Umber",
      summary:
        "Warm and grounded. Clay plaster, smoked oak and travertine, with walnut and aged brass.",
      swatches: [
        { role: "wall", name: "Clay plaster", color: "#c9a88a" },
        { role: "floor", name: "Smoked oak", color: "#8a6a4d" },
        { role: "stone", name: "Travertine", color: "#d9c7ae" },
        { role: "metal", name: "Aged brass", color: "#a6884f" },
      ],
      materials: [
        { name: "Clay plaster", use: "Walls" },
        { name: "Smoked oak", use: "Floors" },
        { name: "Honed travertine", use: "Kitchen counters" },
        { name: "Walnut", use: "Cabinets" },
        { name: "Aged brass", use: "Hardware" },
      ],
    },
    {
      id: "slate",
      name: "Slate",
      summary:
        "Cool and calm. Mineral paint, ash and slate, with boiled wool and blackened steel.",
      swatches: [
        { role: "wall", name: "Mineral gray", color: "#a8ada6" },
        { role: "floor", name: "Ash", color: "#c9bea8" },
        { role: "stone", name: "Slate", color: "#5e6460" },
        { role: "metal", name: "Blackened steel", color: "#3b3d3c" },
      ],
      materials: [
        { name: "Mineral paint", use: "Walls" },
        { name: "Oiled ash", use: "Floors" },
        { name: "Riven slate", use: "Bathrooms" },
        { name: "Boiled wool", use: "Upholstery" },
        { name: "Blackened steel", use: "Hardware" },
      ],
    },
  ]);

export function findPalette(id: PaletteId): Palette {
  const palette = palettes.find((candidate) => candidate.id === id);
  if (!palette) throw new Error(`Unknown palette "${id}".`);
  return palette;
}

export const defaultPaletteId: PaletteId = paletteIds[0];

export function paletteFromParam(
  value: string | string[] | undefined,
): PaletteId {
  return paletteIds.find((id) => id === value) ?? defaultPaletteId;
}

import { z } from "zod";

import { uniqueBy } from "./common";

export const paletteIds = ["limewash", "umber", "slate"] as const;

export type PaletteId = (typeof paletteIds)[number];

export const swatchRoles = ["wall", "floor", "stone", "metal"] as const;

export type SwatchRole = (typeof swatchRoles)[number];

const swatchSchema = z.object({
  role: z.enum(swatchRoles),
  name: z.string().min(1),
  color: z.string().regex(/^#[\da-f]{6}$/i, "Use a six-digit hex color."),
});

export const paletteSchema = z.object({
  id: z.enum(paletteIds),
  name: z.string().min(1),
  summary: z.string().min(1),
  swatches: z
    .array(swatchSchema)
    .length(swatchRoles.length)
    .check(uniqueBy("swatch role", (swatch) => swatch.role)),
  materials: z
    .array(z.object({ name: z.string().min(1), use: z.string().min(1) }))
    .min(3),
});

export type Palette = z.infer<typeof paletteSchema>;

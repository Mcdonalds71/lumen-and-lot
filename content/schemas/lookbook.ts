import { z } from "zod";

import { imageSchema, moneySchema, slugSchema, uniqueBy } from "./common";
import { paletteIds } from "./palette";

const percentage = z.number().min(0).max(100);

const hotspotSchema = z.object({
  id: slugSchema,
  x: percentage,
  y: percentage,
  item: z.string().min(1),
  maker: z.string().min(1),
  material: z.string().min(1),
  dimensionsCm: z.object({
    width: z.number().positive(),
    depth: z.number().positive(),
    height: z.number().positive(),
  }),
  price: moneySchema,
});

export const lookbookSchema = z.object({
  slug: slugSchema,
  palette: z.enum(paletteIds),
  title: z.string().min(1),
  room: z.string().min(1),
  intro: z.string().min(1),
  image: imageSchema,
  hotspots: z
    .array(hotspotSchema)
    .min(3)
    .check(uniqueBy("hotspot", (hotspot) => hotspot.id)),
});

export type Lookbook = z.infer<typeof lookbookSchema>;

export type Hotspot = Lookbook["hotspots"][number];

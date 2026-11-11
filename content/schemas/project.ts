import { z } from "zod";

import { markets } from "../markets";
import { imageSchema, slugSchema } from "./common";
import { marketIds } from "./market";

export const projectTypes = ["New build", "Renovation", "Conversion"] as const;

const paragraphs = z.array(z.string().min(1)).min(1);

export const projectSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    market: z.enum(marketIds),
    locality: z.string().min(1),
    year: z.number().int().min(2000).max(2026),
    type: z.enum(projectTypes),
    areaM2: z.number().positive(),
    homes: z.number().int().positive(),
    summary: z.string().min(1),
    cover: imageSchema,
    sections: z
      .array(
        z.object({
          title: z.string().min(1),
          body: paragraphs,
          image: imageSchema,
        }),
      )
      .min(2),
    drawings: z
      .array(z.object({ title: z.string().min(1), image: imageSchema }))
      .min(1),
    beforeAfter: z
      .object({
        before: imageSchema,
        after: imageSchema,
        caption: z.string().min(1),
      })
      .refine(
        ({ before, after }) =>
          before.width === after.width && before.height === after.height,
        "Before and after images share one size so they can be compared.",
      ),
    credits: z
      .array(z.object({ role: z.string().min(1), name: z.string().min(1) }))
      .min(1),
  })
  .transform(({ market, ...project }) => ({
    ...project,
    market: { id: market, ...markets[market] },
  }));

export type ProjectInput = z.input<typeof projectSchema>;

export type Project = z.output<typeof projectSchema>;

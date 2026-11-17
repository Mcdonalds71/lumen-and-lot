import { z } from "zod";

import { markets } from "../markets";
import { marketIds } from "./market";

const passage = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const studioSchema = z.object({
  statement: z.string().min(1),
  principles: z.array(passage).min(1),
  process: z.array(passage.extend({ duration: z.string().min(1) })).min(1),
  team: z
    .array(
      z
        .object({
          name: z.string().min(1),
          role: z.string().min(1),
          market: z.enum(marketIds),
        })
        .transform(({ market, ...person }) => ({
          ...person,
          city: markets[market].name,
        })),
    )
    .min(1),
});

export type Studio = z.output<typeof studioSchema>;

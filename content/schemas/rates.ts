import { z } from "zod";

import { currencies } from "@/lib/currency";

export const ratesSchema = z
  .object({
    source: z.string().min(1),
    asOf: z.iso.date(),
    base: z.enum(currencies),
    perBase: z.record(z.enum(currencies), z.number().positive()),
  })
  .refine(
    ({ base, perBase }) => perBase[base] === 1,
    "The base currency trades at exactly 1.",
  );

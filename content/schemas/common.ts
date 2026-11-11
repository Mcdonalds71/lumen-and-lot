import { z } from "zod";

import { currencies } from "@/lib/currency";

export const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase words joined by hyphens.",
  );

export const moneySchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(currencies),
});

export const imageSchema = z.object({
  src: z
    .string()
    .regex(
      /^\/images\/[\w/.-]+\.(?:avif|webp|jpg|png)$/,
      "Images live under /images/ as AVIF, WebP, JPEG or PNG.",
    ),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  credit: z
    .object({ name: z.string().min(1), url: z.url().optional() })
    .optional(),
});

export type ImageAsset = z.infer<typeof imageSchema>;

export function uniqueBy<T>(label: string, key: (item: T) => string) {
  return z.superRefine<T[]>((items, ctx) => {
    const seen = new Set<string>();
    items.forEach((item, index) => {
      const value = key(item);
      if (seen.has(value)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate ${label} "${value}".`,
          path: [index],
        });
      }
      seen.add(value);
    });
  });
}

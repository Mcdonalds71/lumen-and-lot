import { z } from "zod";

import { type PhotoSource, profileUrl } from "@/lib/photo-sources";

const photographerSchema = z.object({
  name: z.string().min(1),
  handle: z
    .string()
    .regex(/^[\w-]+$/, "Use the handle from the photographer's profile URL."),
});

const sourceSchema = z.discriminatedUnion("site", [
  z.object({
    site: z.literal("Unsplash"),
    id: z
      .string()
      .regex(/^photo-\d+-[0-9a-f]+$/, "Use the photo- id from the image URL."),
    photographer: photographerSchema,
  }),
  z.object({
    site: z.literal("Pexels"),
    id: z.number().int().positive(),
    photographer: photographerSchema,
  }),
]);

const fractionSchema = z.number().min(0).max(1);

export const photoSchema = z
  .object({
    src: z.string().startsWith("/images/"),
    source: sourceSchema,
    focus: z.tuple([fractionSchema, fractionSchema]).default([0.5, 0.5]),
  })
  .transform(({ src, focus, source: { photographer, ...origin } }) => {
    const source: PhotoSource = { ...origin, handle: photographer.handle };
    return {
      src,
      focus,
      source,
      credit: {
        name: photographer.name,
        url: profileUrl(source),
        site: source.site,
      },
    };
  });

export type Photo = z.output<typeof photoSchema>;

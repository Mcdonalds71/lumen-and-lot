import { z } from "zod";

import { imageSchema } from "./common";

export const articleMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  topic: z.string().min(1),
  publishedOn: z.iso.date(),
  cover: imageSchema,
});

export const articleModuleSchema = z.object({
  metadata: articleMetadataSchema,
  readingMinutes: z.number().int().positive(),
});

export type ArticleMetadata = z.infer<typeof articleMetadataSchema>;

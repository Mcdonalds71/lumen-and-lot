import { z } from "zod";

export const articleMetadataSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    topic: z.string().min(1),
    status: z.enum(["draft", "published"]),
    publishedOn: z.iso.date().optional(),
  })
  .refine(
    ({ status, publishedOn }) => status === "draft" || publishedOn,
    "A published article needs a publishedOn date.",
  );

export type ArticleMetadata = z.infer<typeof articleMetadataSchema>;

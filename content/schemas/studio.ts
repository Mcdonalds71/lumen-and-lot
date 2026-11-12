import { z } from "zod";

import { markets } from "../markets";
import { findProject } from "../projects";
import { slugSchema } from "./common";
import { marketIds } from "./market";

export const awardResults = [
  "Winner",
  "Finalist",
  "Shortlist",
  "Commended",
] as const;

const passage = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const projectReference = slugSchema.transform((slug, ctx) => {
  const project = findProject(slug);
  if (!project) {
    ctx.addIssue({ code: "custom", message: `No project "${slug}".` });
    return z.NEVER;
  }
  return { slug: project.slug, name: project.name };
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
  awards: z
    .array(
      z.object({
        year: z.number().int().min(2000).max(2026),
        name: z.string().min(1),
        result: z.enum(awardResults),
        project: projectReference,
      }),
    )
    .min(1),
});

export type Studio = z.output<typeof studioSchema>;

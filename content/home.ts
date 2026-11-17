import { z } from "zod";

import { findLookbook } from "./lookbooks";
import { image } from "./media";
import { findResidence } from "./residences";
import { imageSchema, slugSchema } from "./schemas/common";

const homeSchema = z.object({
  hero: z.object({
    lines: z.array(z.string().min(1)).min(2),
    image: imageSchema,
    focus: z
      .string()
      .regex(/^\d{1,3}% \d{1,3}%$/, "Give the focus as x% y%.")
      .default("50% 50%"),
  }),
  featuredResidence: slugSchema.transform((slug, ctx) => {
    const residence = findResidence(slug);
    if (!residence) {
      ctx.addIssue({ code: "custom", message: `No residence "${slug}".` });
      return z.NEVER;
    }
    return residence;
  }),
  lookbook: slugSchema.transform((slug, ctx) => {
    const lookbook = findLookbook(slug);
    if (!lookbook) {
      ctx.addIssue({ code: "custom", message: `No lookbook "${slug}".` });
      return z.NEVER;
    }
    return lookbook;
  }),
  statement: z.string().min(1),
});

export const home = homeSchema.parse({
  hero: {
    lines: ["Homes built", "for the light", "we have"],
    image: image(
      "/images/home/hero.webp",
      "An apartment building at dusk, its windows lit against a deep blue sky",
      "wide",
    ),
    focus: "75% 50%",
  },
  featuredResidence: "harbor-room",
  lookbook: "limewash-living-room",
  statement:
    "We design, build and furnish small homes in five cities. Each one starts with the same question: where does the light fall, and when?",
});

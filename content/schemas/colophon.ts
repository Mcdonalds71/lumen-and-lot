import { z } from "zod";

import { releaseLine } from "@/lib/format";

import manifest from "../../package.json";

const installed: ReadonlyMap<string, string> = new Map(
  Object.entries({ ...manifest.dependencies, ...manifest.devDependencies }),
);

export const fontFaces = ["display", "sans", "mono"] as const;

const toolSchema = z
  .object({
    name: z.string().min(1),
    role: z.string().min(1),
    package: z.string().min(1),
  })
  .transform(({ package: name, ...tool }, ctx) => {
    const range = installed.get(name);
    if (!range) {
      ctx.addIssue({
        code: "custom",
        message: `"${name}" is not in package.json.`,
      });
      return z.NEVER;
    }
    return { ...tool, version: releaseLine(range) };
  });

export const colophonSchema = z.object({
  fonts: z
    .array(
      z.object({
        name: z.string().min(1),
        face: z.enum(fontFaces),
        use: z.string().min(1),
        designer: z.string().min(1),
      }),
    )
    .min(1),
  tools: z.array(toolSchema).min(1),
});

export type Colophon = z.output<typeof colophonSchema>;

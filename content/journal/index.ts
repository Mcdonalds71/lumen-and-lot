import type { MDXContent } from "mdx/types";
import { z } from "zod";

import * as buyingANewHomeFromAbroad from "./buying-a-new-home-from-abroad.mdx";
import * as designingForDaylight from "./designing-for-daylight.mdx";
import * as howToReadAnEnergyCertificate from "./how-to-read-an-energy-certificate.mdx";
import { articleModuleSchema } from "../schemas/article";

type ArticleModule = {
  default: MDXContent;
  metadata: unknown;
  readingMinutes: unknown;
};

const modules: Record<string, ArticleModule> = {
  "designing-for-daylight": designingForDaylight,
  "how-to-read-an-energy-certificate": howToReadAnEnergyCertificate,
  "buying-a-new-home-from-abroad": buyingANewHomeFromAbroad,
};

function parseArticle(slug: string, module: ArticleModule) {
  const parsed = articleModuleSchema.safeParse(module);
  if (!parsed.success) {
    throw new Error(
      `Invalid article ${slug}.mdx:\n${z.prettifyError(parsed.error)}`,
    );
  }
  const { metadata, readingMinutes } = parsed.data;
  return { slug, Content: module.default, ...metadata, readingMinutes };
}

export type Article = ReturnType<typeof parseArticle>;

export const articles: readonly Article[] = Object.entries(modules)
  .map(([slug, module]) => parseArticle(slug, module))
  .toSorted((a, b) => b.publishedOn.localeCompare(a.publishedOn));

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function nextArticle(slug: string): Article | undefined {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return undefined;
  return articles[(index + 1) % articles.length];
}

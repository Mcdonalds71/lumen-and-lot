import type { MDXComponents } from "mdx/types";

import { ArticleFigure } from "@/components/journal/article-figure";
import { Note } from "@/components/journal/note";
import { prose } from "@/components/journal/prose";
import { PullQuote } from "@/components/journal/pull-quote";

const components: MDXComponents = {
  ...prose,
  Figure: ArticleFigure,
  Note,
  PullQuote,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

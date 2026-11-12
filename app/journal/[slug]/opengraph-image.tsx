import { articles, findArticle } from "@/content/journal";
import { formatLongDate, formatReadingTime } from "@/lib/time";

import { ogContentType, ogImage, ogSize } from "../../_seo/og-image";

export const alt = "An article from the Lumen & Lot journal.";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = findArticle((await params).slug);
  return ogImage({
    kicker: article ? `Journal · ${article.topic}` : "Journal",
    title: article?.title ?? "Notes from the studio",
    detail: article
      ? `${formatLongDate(article.publishedOn)} · ${formatReadingTime(article.readingMinutes)}`
      : "Daylight, energy and buying a home",
  });
}

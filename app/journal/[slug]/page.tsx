import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/shell/page-fallback";
import { PageInProgress } from "@/components/shell/page-in-progress";
import { articles, findArticle } from "@/content/journal";

type Params = PageProps<"/journal/[slug]">["params"];

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const article = findArticle((await params).slug);
  return article
    ? { title: article.title, description: article.description }
    : {};
}

export default function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: Params }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();

  return (
    <PageInProgress
      label={article.topic}
      title={article.title}
      summary={article.description}
    />
  );
}

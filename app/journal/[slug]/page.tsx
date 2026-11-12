import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NextUp } from "@/components/shell/next-up";
import { PageFallback } from "@/components/shell/page-fallback";
import { Container } from "@/components/ui/container";
import { articles, findArticle, nextArticle } from "@/content/journal";
import { formatReadingTime } from "@/lib/time";

import { ArticleHeader } from "./_sections/article-header";

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
  const next = nextArticle(article.slug);
  const { Content } = article;

  return (
    <>
      <article>
        <ArticleHeader article={article} />
        <Container className="mt-16 md:mt-24">
          <div className="article-flow">
            <Content />
          </div>
        </Container>
      </article>
      {next && next.slug !== article.slug && (
        <Container className="mt-32 md:mt-48">
          <NextUp
            label="Next article"
            title={next.title}
            detail={`${next.topic} · ${formatReadingTime(next.readingMinutes)}`}
            href={`/journal/${next.slug}`}
            all={{ href: "/journal", label: "All articles" }}
          />
        </Container>
      )}
    </>
  );
}

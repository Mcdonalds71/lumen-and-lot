import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/_seo/json-ld";
import { pageMetadata } from "@/app/_seo/page-metadata";
import { absoluteUrl } from "@/app/_seo/site-url";
import { articleData, breadcrumbData } from "@/app/_seo/structured-data";
import { NextUp } from "@/components/shell/next-up";
import { Container } from "@/components/ui/container";
import { articles, findArticle, nextArticle } from "@/content/journal";
import { site } from "@/content/site";
import { formatReadingTime } from "@/lib/time";

import { ArticleHeader } from "./_sections/article-header";

export const instant = false;

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const article = findArticle((await params).slug);
  return article
    ? pageMetadata({
        title: article.title,
        description: article.description,
        path: `/journal/${article.slug}`,
        type: "article",
      })
    : {};
}

export default async function ArticlePage({
  params,
}: PageProps<"/journal/[slug]">) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const next = nextArticle(article.slug);
  const { Content } = article;
  const url = absoluteUrl(`/journal/${article.slug}`);

  return (
    <>
      <JsonLd
        data={articleData({
          headline: article.title,
          description: article.description,
          url,
          image: absoluteUrl(article.cover.src),
          datePublished: article.publishedOn,
          author: site.author,
        })}
      />
      <JsonLd
        data={breadcrumbData([
          { name: "Journal", url: absoluteUrl("/journal") },
          { name: article.title, url },
        ])}
      />
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

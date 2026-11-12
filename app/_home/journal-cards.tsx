import Link from "next/link";

import { ArticleMeta } from "@/components/journal/article-meta";
import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { articles } from "@/content/journal";

export function JournalCards() {
  return (
    <Section index={4} label="Journal">
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-display-lg">From the journal</h2>
        <ButtonLink href="/journal" variant="text">
          All articles
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-x-gutter gap-y-12 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug} className="border-t border-rule pt-6">
            <Label as="p">{article.topic}</Label>
            <h3 className="mt-4 font-display text-display-sm">
              <Link href={`/journal/${article.slug}`} className="link-reveal">
                {article.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-md text-small text-muted">
              {article.description}
            </p>
            <ArticleMeta
              publishedOn={article.publishedOn}
              readingMinutes={article.readingMinutes}
              className="mt-6"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}

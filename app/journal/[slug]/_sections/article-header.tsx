import Image from "next/image";

import { ArticleMeta } from "@/components/journal/article-meta";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import type { Article } from "@/content/journal";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <Container className="pt-16 md:pt-24">
        <Breadcrumb
          parent={{ href: "/journal", label: "Journal" }}
          current={article.title}
        />
        <Label as="p" className="mt-10 md:mt-16">
          {article.topic}
        </Label>
        <h1 className="mt-4 max-w-6xl font-display text-display-lg text-balance">
          {article.title}
        </h1>
        <Grid className="mt-10 gap-y-6 md:mt-14">
          <p className="col-span-12 font-display text-display-sm md:col-span-10 lg:col-span-8">
            {article.description}
          </p>
          <ArticleMeta
            publishedOn={article.publishedOn}
            readingMinutes={article.readingMinutes}
            className="col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end lg:text-right"
          />
        </Grid>
      </Container>
      <Container className="mt-12 md:mt-16">
        <Image
          src={article.cover.src}
          width={article.cover.width}
          height={article.cover.height}
          alt={article.cover.alt}
          sizes="100vw"
          preload
          className="h-auto w-full"
        />
      </Container>
    </header>
  );
}

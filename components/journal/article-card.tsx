import Link from "next/link";

import { Label } from "@/components/ui/label";
import { RevealImage } from "@/components/ui/reveal-image";
import type { Article } from "@/content/journal";
import { cx } from "@/lib/cx";

import { ArticleMeta } from "./article-meta";

const layouts = {
  featured: {
    root: "grid grid-cols-12 items-end gap-x-gutter gap-y-8",
    image: "col-span-12 lg:col-span-7",
    body: "col-span-12 lg:col-span-4 lg:col-start-9",
    title: "text-display-md",
    sizes: "(min-width: 64rem) 58vw, 100vw",
  },
  standard: {
    root: "flex flex-col gap-8",
    image: "",
    body: "",
    title: "text-display-sm",
    sizes: "(min-width: 48rem) 45vw, 100vw",
  },
} as const;

type ArticleCardProps = {
  article: Article;
  layout?: keyof typeof layouts;
};

export function ArticleCard({
  article,
  layout = "standard",
}: ArticleCardProps) {
  const styles = layouts[layout];

  return (
    <article className={cx("relative", styles.root)}>
      <RevealImage
        src={article.cover.src}
        width={article.cover.width}
        height={article.cover.height}
        alt={article.cover.alt}
        sizes={styles.sizes}
        className={styles.image}
      />
      <div className={styles.body}>
        <Label as="p">{article.topic}</Label>
        <h2 className={cx("mt-4 font-display text-balance", styles.title)}>
          <Link
            href={`/journal/${article.slug}`}
            className="link-reveal after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-xl text-muted">{article.description}</p>
        <ArticleMeta
          publishedOn={article.publishedOn}
          readingMinutes={article.readingMinutes}
          className="mt-6"
        />
      </div>
    </article>
  );
}

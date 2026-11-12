import type { Metadata } from "next";

import { ArticleCard } from "@/components/journal/article-card";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { articles } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on daylight, energy labels and buying a home abroad.",
};

export default function JournalPage() {
  const [latest, ...earlier] = articles;

  return (
    <Container className="pt-16 md:pt-24">
      <Label as="p">Journal</Label>
      <Grid className="mt-6 gap-y-8">
        <h1 className="col-span-12 font-display text-display-xl lg:col-span-8">
          Notes from the studio
        </h1>
        <p className="col-span-12 text-lead md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          Short, practical pieces on daylight, energy labels and buying a home
          from far away.
        </p>
      </Grid>

      {latest && (
        <div className="mt-16 border-t border-ink pt-8 md:mt-24">
          <ArticleCard article={latest} layout="featured" />
        </div>
      )}

      <ul className="mt-20 grid gap-x-gutter gap-y-20 border-t border-rule pt-8 md:mt-32 md:grid-cols-2">
        {earlier.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

import type { ReactNode } from "react";

import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import type { TokenMap } from "@/lib/design-tokens";

export type ChapterMeta = { index: number; id: string; label: string };

export type ChapterProps = { meta: ChapterMeta; tokens: TokenMap };

type ChapterLayoutProps = {
  meta: ChapterMeta;
  title: string;
  intro: string;
  children: ReactNode;
};

export function Chapter({ meta, title, intro, children }: ChapterLayoutProps) {
  return (
    <Section
      id={meta.id}
      index={meta.index}
      label={meta.label}
      className="scroll-mt-10 pb-28 md:pb-40"
    >
      <Grid className="mt-10 gap-y-12 md:mt-16">
        <header className="col-span-12 lg:col-span-3">
          <h2 className="font-display text-display-md">{title}</h2>
          <p className="mt-6 max-w-sm text-small text-muted">{intro}</p>
        </header>
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </Grid>
    </Section>
  );
}

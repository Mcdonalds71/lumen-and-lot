import type { Metadata } from "next";

import { pageMetadata } from "@/app/_seo/page-metadata";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { site } from "@/content/site";
import { formatIndex } from "@/lib/format";

import { ColorChapter } from "./_components/color-chapter";
import { ComponentsChapter } from "./_components/components-chapter";
import { LayoutChapter } from "./_components/layout-chapter";
import { MotionChapter } from "./_components/motion-chapter";
import { TypeChapter } from "./_components/type-chapter";
import { readTokens } from "./_lib/read-tokens";

export const metadata: Metadata = pageMetadata({
  title: "System",
  description:
    "The colors, type, layout, motion and components that Lumen & Lot is built from.",
  path: "/system",
});

const chapters = [
  { id: "color", label: "Color", Chapter: ColorChapter },
  { id: "type", label: "Type", Chapter: TypeChapter },
  { id: "layout", label: "Layout", Chapter: LayoutChapter },
  { id: "motion", label: "Motion", Chapter: MotionChapter },
  { id: "components", label: "Components", Chapter: ComponentsChapter },
] as const;

export default function SystemPage() {
  const tokens = readTokens();

  return (
    <div>
      <Container as="header" className="pt-24 pb-20 md:pt-36 md:pb-28">
        <Label as="p">{site.name} — Design system</Label>
        <h1 className="mt-8 font-display text-display-xl">The system</h1>
        <p className="mt-10 max-w-2xl text-lead">
          Every page on this site is built from the same small set of parts.
          Color, type, space and motion are tokens, so one change carries
          through everywhere.
        </p>
        <nav aria-label="Chapters" className="mt-16">
          <ol className="grid grid-cols-2 border-t border-rule sm:grid-cols-3 lg:grid-cols-5">
            {chapters.map(({ id, label }, position) => (
              <li key={id} className="border-b border-rule">
                <a
                  href={`#${id}`}
                  className="flex items-baseline gap-3 py-4 font-mono text-label uppercase"
                >
                  <span className="text-muted">
                    {formatIndex(position + 1)}
                  </span>
                  <span className="link-underline">{label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
      <Container>
        {chapters.map(({ id, label, Chapter }, position) => (
          <Chapter
            key={id}
            meta={{ index: position + 1, id, label }}
            tokens={tokens}
          />
        ))}
      </Container>
    </div>
  );
}

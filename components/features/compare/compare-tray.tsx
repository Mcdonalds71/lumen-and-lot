"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import type { ImageAsset } from "@/content/schemas/common";
import { useCompareList } from "@/hooks/use-compare-list";
import { compareHref, compareLimit } from "@/lib/compare";
import { formatCount } from "@/lib/format";

export type TrayHome = { slug: string; name: string; image: ImageAsset };

export function CompareTray({ homes }: { homes: readonly TrayHome[] }) {
  const pathname = usePathname();
  const { slugs, remove, clear } = useCompareList();
  const chosen = slugs.flatMap((slug) =>
    homes.filter((home) => home.slug === slug),
  );
  if (chosen.length === 0 || pathname.startsWith("/compare")) return null;

  return (
    <>
      <div aria-hidden className="h-20" />
      <aside
        aria-label="Homes to compare"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink bg-paper transition-[translate] duration-base ease-out starting:translate-y-full"
      >
        <Container className="flex h-20 items-center gap-4 md:gap-8">
          <Label as="p" className="hidden md:block">
            Compare · {chosen.length} of {compareLimit}
          </Label>
          <p className="flex-1 text-small md:hidden">
            {formatCount(chosen.length, "home")} to compare
          </p>
          <ul className="hidden min-w-0 flex-1 gap-6 md:flex">
            {chosen.map((home) => (
              <li key={home.slug} className="flex min-w-0 items-center gap-3">
                <Image
                  src={home.image.src}
                  width={home.image.width}
                  height={home.image.height}
                  alt=""
                  sizes="3rem"
                  className="size-12 shrink-0 object-cover"
                />
                <span className="hidden truncate text-small lg:block">
                  {home.name}
                </span>
                <button
                  type="button"
                  onClick={() => remove(home.slug)}
                  className="grid size-6 shrink-0 place-items-center text-muted transition-colors duration-fast hover:text-ink"
                >
                  <span className="sr-only">
                    Remove {home.name} from compare
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 10 10"
                    className="size-2.5 stroke-current"
                  >
                    <path d="M1 1l8 8M9 1l-8 8" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <Button variant="text" onClick={clear}>
            Clear
          </Button>
          <ButtonLink href={compareHref(slugs)}>Compare</ButtonLink>
        </Container>
      </aside>
    </>
  );
}

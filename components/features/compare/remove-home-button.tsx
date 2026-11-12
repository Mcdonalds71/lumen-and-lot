"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { announce } from "@/hooks/use-announcement";
import { useCompareList } from "@/hooks/use-compare-list";
import { compareHref } from "@/lib/compare";

type RemoveHomeButtonProps = {
  slug: string;
  name: string;
  slugs: readonly string[];
};

export function RemoveHomeButton({ slug, name, slugs }: RemoveHomeButtonProps) {
  const router = useRouter();
  const { remove } = useCompareList();

  const removeHome = () => {
    const index = slugs.indexOf(slug);
    const neighbor = slugs[index + 1] ?? slugs[index - 1];
    remove(slug);
    const rest = slugs.filter((candidate) => candidate !== slug);
    router.replace(rest.length > 0 ? compareHref(rest) : "/compare", {
      scroll: false,
    });
    announce(`${name} removed from compare.`);
    const next = neighbor
      ? document.querySelector<HTMLElement>(`[data-remove-home="${neighbor}"]`)
      : document.querySelector<HTMLElement>("main h1");
    next?.focus();
  };

  return (
    <Button variant="text" data-remove-home={slug} onClick={removeHome}>
      Remove<span className="sr-only"> {name}</span>
    </Button>
  );
}

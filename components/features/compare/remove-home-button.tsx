"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
    remove(slug);
    const rest = slugs.filter((candidate) => candidate !== slug);
    router.replace(rest.length > 0 ? compareHref(rest) : "/compare", {
      scroll: false,
    });
  };

  return (
    <Button variant="text" onClick={removeHome}>
      Remove<span className="sr-only"> {name}</span>
    </Button>
  );
}

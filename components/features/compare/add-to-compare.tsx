"use client";

import { useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { useCompareList } from "@/hooks/use-compare-list";
import { compareLimit, isCompareFull } from "@/lib/compare";

type AddToCompareProps = { slug: string; name: string };

export function AddToCompare({ slug, name }: AddToCompareProps) {
  const { slugs, add, remove } = useCompareList();
  const [announcement, setAnnouncement] = useState("");
  const added = slugs.includes(slug);
  const full = !added && isCompareFull(slugs);

  const toggle = () => {
    if (added) {
      remove(slug);
      setAnnouncement(`${name} removed from compare.`);
    } else {
      add(slug);
      setAnnouncement(`${name} added to compare.`);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button variant="outline" disabled={full} onClick={toggle}>
          {added ? "Remove from compare" : "Add to compare"}
        </Button>
        {slugs.length > 0 && (
          <ButtonLink href="/compare" variant="text">
            View compare ({slugs.length} of {compareLimit})
          </ButtonLink>
        )}
      </div>
      {full && (
        <p className="mt-3 text-small text-muted">
          Compare holds {compareLimit} homes. Remove one to add this home.
        </p>
      )}
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

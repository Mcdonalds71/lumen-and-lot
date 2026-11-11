"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCompareList } from "@/hooks/use-compare-list";
import { compareHref } from "@/lib/compare";

export function CompareSync({ hasHomes }: { hasHomes: boolean }) {
  const router = useRouter();
  const { slugs } = useCompareList();
  const saved = slugs.join(",");

  useEffect(() => {
    if (!hasHomes && saved) router.replace(compareHref(saved.split(",")));
  }, [hasHomes, saved, router]);

  return null;
}

"use client";

import { useCompareList } from "@/hooks/use-compare-list";
import { isCompareFull } from "@/lib/compare";
import { cx } from "@/lib/cx";

type CompareCheckboxProps = { slug: string; name: string; className?: string };

export function CompareCheckbox({
  slug,
  name,
  className,
}: CompareCheckboxProps) {
  const { slugs, add, remove } = useCompareList();
  const checked = slugs.includes(slug);
  const disabled = !checked && isCompareFull(slugs);

  return (
    <label
      className={cx(
        "relative z-10 inline-flex items-center gap-2 text-small",
        disabled ? "cursor-not-allowed text-muted" : "cursor-pointer",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => (checked ? remove(slug) : add(slug))}
        className="size-4 cursor-[inherit] accent-ink"
      />
      Compare
      <span className="sr-only">
        {` ${name}`}
        {disabled && ", compare already holds three homes"}
      </span>
    </label>
  );
}

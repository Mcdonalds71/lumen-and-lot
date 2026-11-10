import type { ElementType } from "react";

import { cx } from "@/lib/cx";

import type { PolymorphicProps } from "./polymorphic";

const tones = {
  muted: "text-muted",
  ink: "text-ink",
} as const;

type LabelProps<E extends ElementType> = PolymorphicProps<
  E,
  { tone?: keyof typeof tones; className?: string }
>;

export function Label<E extends ElementType = "span">({
  as,
  tone = "muted",
  className,
  ...props
}: LabelProps<E>) {
  const Component: ElementType = as ?? "span";
  return (
    <Component
      className={cx("font-mono text-label uppercase", tones[tone], className)}
      {...props}
    />
  );
}

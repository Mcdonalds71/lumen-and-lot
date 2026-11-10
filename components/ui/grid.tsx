import type { ElementType } from "react";

import { cx } from "@/lib/cx";

import type { PolymorphicProps } from "./polymorphic";

type GridProps<E extends ElementType> = PolymorphicProps<
  E,
  { className?: string }
>;

export function Grid<E extends ElementType = "div">({
  as,
  className,
  ...props
}: GridProps<E>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cx("grid grid-cols-12 gap-x-gutter", className)}
      {...props}
    />
  );
}

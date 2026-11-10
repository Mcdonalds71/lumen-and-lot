import type { ElementType } from "react";

import { cx } from "@/lib/cx";

import type { PolymorphicProps } from "./polymorphic";

type ContainerProps<E extends ElementType> = PolymorphicProps<
  E,
  { className?: string }
>;

export function Container<E extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<E>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cx("mx-auto w-full max-w-page px-margin", className)}
      {...props}
    />
  );
}

import type { ComponentPropsWithoutRef, ElementType } from "react";

export type PolymorphicProps<E extends ElementType, Props = object> = Props & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof Props | "as">;

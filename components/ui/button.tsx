import type { Route } from "next";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

const variants = {
  solid:
    "bg-ink px-6 py-3.5 text-paper transition-colors duration-fast hover:bg-moss",
  outline:
    "border border-ink px-6 py-3.5 text-ink transition-colors duration-fast hover:bg-ink hover:text-paper",
  text: "link-underline text-ink",
} as const;

type Variant = keyof typeof variants;

function buttonClassName(variant: Variant, className?: string): string {
  return cx(
    "inline-flex items-center gap-3 text-small font-medium disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    className,
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant };

export function Button({
  variant = "solid",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: Route;
  variant?: Variant;
};

export function ButtonLink({
  href,
  variant = "solid",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}

import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

type FieldErrorProps = { id: string; children: ReactNode; className?: string };

export function FieldError({ id, children, className }: FieldErrorProps) {
  return (
    <p id={id} className={cx("flex items-start gap-2 text-small", className)}>
      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-clay" />
      {children}
    </p>
  );
}

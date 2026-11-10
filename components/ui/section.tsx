import { type ComponentPropsWithoutRef, useId } from "react";

import { cx } from "@/lib/cx";
import { formatIndex } from "@/lib/format";

import { Label } from "./label";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  index: number;
  label: string;
};

export function Section({
  index,
  label,
  className,
  children,
  ...props
}: SectionProps) {
  const labelId = useId();

  return (
    <section
      aria-labelledby={labelId}
      className={cx("border-t border-rule pt-5", className)}
      {...props}
    >
      <Label as="p" id={labelId}>
        {formatIndex(index)} — {label}
      </Label>
      {children}
    </section>
  );
}

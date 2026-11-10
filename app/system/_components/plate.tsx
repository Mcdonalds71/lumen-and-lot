import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cx } from "@/lib/cx";

import { specimenRow } from "../_lib/layout";

type PlateProps = {
  number: number;
  title: string;
  caption: string;
  children: ReactNode;
};

export function Plate({ number, title, caption, children }: PlateProps) {
  return (
    <figure className="border-t border-rule pt-8">
      {children}
      <figcaption className={cx(specimenRow, "mt-8")}>
        <Label tone="ink">
          Plate {number} — {title}
        </Label>
        <span className="text-caption text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}

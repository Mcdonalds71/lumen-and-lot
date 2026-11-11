import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/lib/cx";

type SliderProps = Omit<ComponentPropsWithoutRef<"input">, "type">;

export function Slider({ className, ...props }: SliderProps) {
  return <input type="range" className={cx("slider", className)} {...props} />;
}

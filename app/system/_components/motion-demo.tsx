"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cx } from "@/lib/cx";
import { type DurationName, durations } from "@/lib/motion";

import { specimenRow } from "../_lib/layout";

const speeds: ReadonlyArray<{
  name: DurationName;
  use: string;
  className: string;
}> = [
  { name: "fast", use: "Color and hover changes", className: "duration-fast" },
  {
    name: "base",
    use: "Drawers, toggles and underlines",
    className: "duration-base",
  },
  {
    name: "slow",
    use: "Image reveals and the slow scale on hover",
    className: "duration-slow",
  },
];

export function MotionDemo({ className }: { className?: string }) {
  const [played, setPlayed] = useState(false);

  return (
    <div className={className}>
      <ol className="border-t border-rule">
        {speeds.map((speed) => (
          <li
            key={speed.name}
            className={cx(
              specimenRow,
              "border-b border-rule py-6 md:items-center",
            )}
          >
            <div>
              <Label as="p" tone="ink">
                {speed.name}
              </Label>
              <p className="mt-2 text-caption text-muted">
                {Math.round(durations[speed.name] * 1000)} ms · {speed.use}
              </p>
            </div>
            <div aria-hidden className="relative h-3">
              <span className="absolute inset-x-0 top-1/2 h-(--hairline) bg-rule" />
              <span
                className={cx(
                  "absolute top-0 size-3 bg-clay transition-[left] ease-out",
                  speed.className,
                  played ? "left-[calc(100%-0.75rem)]" : "left-0",
                )}
              />
            </div>
          </li>
        ))}
      </ol>
      <Button
        variant="outline"
        className="mt-8"
        onClick={() => setPlayed((value) => !value)}
      >
        {played ? "Reset" : "Play the three speeds"}
      </Button>
    </div>
  );
}

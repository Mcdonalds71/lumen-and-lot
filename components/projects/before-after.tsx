"use client";

import Image from "next/image";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import type { ImageAsset } from "@/content/schemas/common";

type BeforeAfterProps = { before: ImageAsset; after: ImageAsset };

const sizes = "(min-width: 110rem) 100rem, 100vw";

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [split, setSplit] = useState(50);

  return (
    <div className="relative overflow-hidden select-none">
      <Image
        src={after.src}
        width={after.width}
        height={after.height}
        alt={after.alt}
        sizes={sizes}
        className="h-auto w-full"
      />
      <Image
        src={before.src}
        width={before.width}
        height={before.height}
        alt={before.alt}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={split}
        aria-label="Before and after"
        aria-valuetext={`${split} percent before, ${100 - split} percent after`}
        onChange={(event) => setSplit(event.currentTarget.valueAsNumber)}
        className="peer absolute inset-0 z-10 size-full cursor-ew-resize appearance-none opacity-0"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-paper"
        style={{ left: `${split}%` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 grid size-10 -translate-1/2 place-items-center border border-ink bg-paper text-ink peer-focus-visible:focus-ring"
        style={{ left: `${split}%` }}
      >
        <svg viewBox="0 0 16 10" className="w-4 fill-none stroke-current">
          <path d="M5 1L1 5l4 4M11 1l4 4-4 4" />
        </svg>
      </span>
      <Label
        aria-hidden
        tone="paper"
        className="pointer-events-none absolute top-4 left-4 bg-ink px-2 py-1"
      >
        Before
      </Label>
      <Label
        aria-hidden
        tone="paper"
        className="pointer-events-none absolute top-4 right-4 bg-ink px-2 py-1"
      >
        After
      </Label>
    </div>
  );
}

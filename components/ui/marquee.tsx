"use client";

import { type ReactNode, useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cx } from "@/lib/cx";

type MarqueeProps = {
  children: ReactNode;
  label: string;
  duration?: number;
  className?: string;
};

export function Marquee({
  children,
  label,
  duration = 40,
  className,
}: MarqueeProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const running = inView && !paused && !held;

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <div
        ref={frameRef}
        className="overflow-hidden"
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
      >
        <div
          className="flex w-max animate-marquee motion-reduce:animate-none"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: running ? "running" : "paused",
          }}
        >
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden inert>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className="self-end link-underline font-mono text-label uppercase motion-reduce:hidden"
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> {label}</span>
      </button>
    </div>
  );
}

"use client";

import { type ReactNode, useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cx } from "@/lib/cx";

type MarqueeProps = {
  children: ReactNode;
  label: string;
  duration?: number;
  repeat?: number;
  className?: string;
  controlsClassName?: string;
};

function Copies({
  children,
  repeat,
  hidden,
}: {
  children: ReactNode;
  repeat: number;
  hidden: boolean;
}) {
  return (
    <div
      className={cx(
        "flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap",
        hidden && "motion-reduce:hidden",
      )}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      {Array.from({ length: repeat }, (_, copy) => (
        <div
          key={copy}
          className={cx(
            "flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap",
            copy > 0 && "motion-reduce:hidden",
          )}
          aria-hidden={(!hidden && copy > 0) || undefined}
          inert={(!hidden && copy > 0) || undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export function Marquee({
  children,
  label,
  duration = 40,
  repeat = 1,
  className,
  controlsClassName,
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
          className="flex w-max animate-marquee motion-reduce:w-auto motion-reduce:animate-none"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: running ? "running" : "paused",
          }}
        >
          <Copies repeat={repeat} hidden={false}>
            {children}
          </Copies>
          <Copies repeat={repeat} hidden>
            {children}
          </Copies>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className={cx(
          "self-end link-underline font-mono text-label uppercase motion-reduce:hidden",
          controlsClassName,
        )}
      >
        {paused ? "Play" : "Pause"}
        <span className="sr-only"> {label}</span>
      </button>
    </div>
  );
}

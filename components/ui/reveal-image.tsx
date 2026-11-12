"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

import { cx } from "@/lib/cx";
import { reducedMotionQuery } from "@/lib/motion";

type RevealImageProps = Omit<ImageProps, "className"> & { className?: string };

export function RevealImage({ alt, className, ...image }: RevealImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || matchMedia(reducedMotionQuery).matches) return;

    let placed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (!placed) {
          placed = true;
          if (entry.boundingClientRect.top > innerHeight) {
            frame.dataset.reveal = "hidden";
          } else {
            observer.disconnect();
          }
          return;
        }
        if (!entry.isIntersecting) return;
        frame.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0% 0% -12% 0%" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className={cx(
        "group/reveal overflow-hidden transition-[clip-path] duration-slow ease-out data-[reveal=hidden]:transition-none data-[reveal=hidden]:[clip-path:inset(100%_0_0_0)] data-[reveal=shown]:[clip-path:inset(0)]",
        className,
      )}
    >
      <Image
        alt={alt}
        className="h-auto w-full transition-transform duration-slow ease-out group-data-[reveal=hidden]/reveal:scale-110 motion-safe:group-hover/reveal:scale-104"
        {...image}
      />
    </div>
  );
}

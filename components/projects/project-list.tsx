"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type FocusEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ImageAsset } from "@/content/schemas/common";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cx } from "@/lib/cx";

export type ProjectRow = {
  slug: string;
  number: string;
  name: string;
  place: string;
  year: number;
  type: string;
  image: ImageAsset;
};

type Point = { x: number; y: number };

const followEase = 0.16;
const focusAnchor = 0.6;
const settled = 0.5;

export function ProjectList({ rows }: { rows: readonly ProjectRow[] }) {
  const [active, setActive] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const target = useRef<Point>({ x: 0, y: 0 });
  const wake = useRef(() => {});
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const position = { ...target.current };
    const ease = reducedMotion ? 1 : followEase;
    let frame = 0;
    const follow = () => {
      const dx = target.current.x - position.x;
      const dy = target.current.y - position.y;
      position.x += dx * ease;
      position.y += dy * ease;
      frameRef.current?.style.setProperty(
        "transform",
        `translate3d(${position.x}px, ${position.y}px, 0)`,
      );
      frame = Math.hypot(dx, dy) > settled ? requestAnimationFrame(follow) : 0;
    };
    wake.current = () => {
      frame ||= requestAnimationFrame(follow);
    };
    wake.current();
    return () => {
      cancelAnimationFrame(frame);
      wake.current = () => {};
    };
  }, [active, reducedMotion]);

  const track = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    target.current = { x: event.clientX, y: event.clientY };
    wake.current();
  };

  const showBeside = (slug: string, event: FocusEvent<HTMLElement>) => {
    const row = event.currentTarget.closest("li")?.getBoundingClientRect();
    if (row) {
      target.current = { x: row.left + row.width * focusAnchor, y: row.top };
    }
    setActive(slug);
  };

  return (
    <div onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <ol className="border-t border-ink">
        {rows.map((row) => (
          <li
            key={row.slug}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse") return;
              track(event);
              setActive(row.slug);
            }}
            className="relative flex items-center gap-gutter border-b border-rule py-5 pointer-fine:md:grid pointer-fine:md:grid-cols-12 pointer-fine:md:py-7"
          >
            <Image
              src={row.image.src}
              width={row.image.width}
              height={row.image.height}
              alt=""
              sizes="6rem"
              className="aspect-4/3 w-20 shrink-0 object-cover sm:w-28 pointer-fine:md:hidden"
            />
            <span className="hidden font-mono text-label text-muted pointer-fine:md:col-span-1 pointer-fine:md:block">
              {row.number}
            </span>
            <div className="min-w-0 flex-1 pointer-fine:md:contents">
              <span className="block font-mono text-label text-muted uppercase pointer-fine:md:hidden">
                {row.number} · {row.type}
              </span>
              <Link
                href={`/projects/${row.slug}`}
                onFocus={(event) => showBeside(row.slug, event)}
                onBlur={() => setActive(null)}
                className="mt-1 block font-display text-display-sm after:absolute after:inset-0 pointer-fine:md:col-span-4 pointer-fine:md:mt-0"
              >
                <span className="link-reveal">{row.name}</span>
              </Link>
              <span className="mt-1 block text-small text-muted pointer-fine:md:col-span-4 pointer-fine:md:mt-0 pointer-fine:md:text-body pointer-fine:md:text-ink">
                {row.place}
                <span className="pointer-fine:md:hidden"> · {row.year}</span>
              </span>
            </div>
            <span className="hidden tabular-nums pointer-fine:md:col-span-1 pointer-fine:md:block">
              {row.year}
            </span>
            <span className="hidden text-right font-mono text-label text-muted uppercase pointer-fine:md:col-span-2 pointer-fine:md:block">
              {row.type}
            </span>
          </li>
        ))}
      </ol>

      <div
        ref={frameRef}
        data-preview={active ?? ""}
        aria-hidden
        className={cx(
          "pointer-events-none fixed top-0 left-0 z-20 hidden w-80 transition-opacity duration-fast pointer-fine:md:block",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="relative translate-x-8 translate-y-6 overflow-hidden">
          {rows.map((row, index) => (
            <Image
              key={row.slug}
              src={row.image.src}
              width={row.image.width}
              height={row.image.height}
              alt=""
              sizes="20rem"
              className={cx(
                "w-full",
                index === 0
                  ? "h-auto"
                  : "absolute inset-0 size-full object-cover",
                row.slug === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

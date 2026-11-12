"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import type { ImageAsset } from "@/content/schemas/common";
import { useDismiss } from "@/hooks/use-dismiss";
import { cx } from "@/lib/cx";

export type ShopItem = {
  id: string;
  name: string;
  x: number;
  y: number;
  details: ReactNode;
};

type ShopTheRoomProps = { image: ImageAsset; items: readonly ShopItem[] };

function besideHotspot({ x, y }: ShopItem): CSSProperties {
  return {
    ...(x > 50
      ? { right: `calc(${100 - x}% + 1.5rem)` }
      : { left: `calc(${x}% + 1.5rem)` }),
    ...(y > 50
      ? { bottom: `calc(${100 - y}% - 1.25rem)` }
      : { top: `calc(${y}% - 1.25rem)` }),
  };
}

export function ShopTheRoom({ image, items }: ShopTheRoomProps) {
  const cardId = useId();
  const openRef = useRef<HTMLDivElement>(null);
  const hotspots = useRef(new Map<string, HTMLButtonElement>());
  const [openId, setOpenId] = useState<string | null>(null);

  const close = (refocus: boolean) => {
    if (refocus && openId) hotspots.current.get(openId)?.focus();
    setOpenId(null);
  };

  useDismiss(openId !== null, openRef, (reason) => close(reason === "escape"));

  return (
    <div className="relative grid">
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes="(min-width: 110rem) 100rem, 100vw"
        className="col-start-1 row-start-1 h-auto w-full"
      />
      {items.map((item) => {
        const expanded = item.id === openId;
        return (
          <div
            key={item.id}
            ref={expanded ? openRef : undefined}
            className="contents"
          >
            <button
              ref={(node) => {
                if (node) hotspots.current.set(item.id, node);
                return () => {
                  hotspots.current.delete(item.id);
                };
              }}
              type="button"
              aria-expanded={expanded}
              aria-controls={expanded ? cardId : undefined}
              onClick={() => setOpenId(expanded ? null : item.id)}
              className="group absolute col-start-1 col-end-2 row-start-1 row-end-2 grid size-9 -translate-1/2 place-items-center focus-visible:focus-ring-contrast"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <span
                aria-hidden
                className={cx(
                  "grid size-6 place-items-center border border-ink transition-colors duration-fast",
                  expanded
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink group-hover:bg-ink group-hover:text-paper",
                )}
              >
                <svg
                  viewBox="0 0 10 10"
                  className={cx(
                    "size-2.5 stroke-current transition-transform duration-fast",
                    expanded && "rotate-45",
                  )}
                >
                  <path d="M5 1v8M1 5h8" />
                </svg>
              </span>
              <span className="sr-only">{item.name}</span>
            </button>
            {expanded && (
              <div
                id={cardId}
                role="group"
                aria-label={item.name}
                className="z-10 col-start-1 row-start-2 mt-4 border border-ink bg-paper p-5 transition-[opacity,translate] duration-fast md:absolute md:row-start-1 md:row-end-2 md:mt-0 md:w-80 starting:translate-y-1 starting:opacity-0"
                style={besideHotspot(item)}
              >
                {item.details}
                <Button
                  variant="text"
                  onClick={() => close(true)}
                  className="mt-5"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

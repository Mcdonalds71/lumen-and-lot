import { Label } from "@/components/ui/label";
import { easeOut } from "@/lib/motion";

import { Chapter, type ChapterProps } from "./chapter";
import { MotionDemo } from "./motion-demo";

type Point = { x: number; y: number };

function toCanvas(x: number, y: number): Point {
  return { x: Math.round(x * 100), y: Math.round((1 - y) * 100) };
}

const [x1, y1, x2, y2] = easeOut;
const start = toCanvas(0, 0);
const end = toCanvas(1, 1);
const first = toCanvas(x1, y1);
const second = toCanvas(x2, y2);

const handles = `M${start.x} ${start.y} L${first.x} ${first.y} M${end.x} ${end.y} L${second.x} ${second.y}`;
const curve = `M${start.x} ${start.y} C${first.x} ${first.y} ${second.x} ${second.y} ${end.x} ${end.y}`;

export function MotionChapter({ meta }: ChapterProps) {
  return (
    <Chapter
      meta={meta}
      title="Three speeds, one curve"
      intro="Movement starts quickly and settles slowly. Only the marquee loops, and everything stands still when your device asks for reduced motion."
    >
      <figure className="grid gap-8 border-t border-rule pt-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-end sm:gap-gutter">
        <svg
          viewBox="-6 -6 112 112"
          role="img"
          aria-label="Easing curve"
          className="w-full max-w-72"
        >
          <rect
            width="100"
            height="100"
            className="fill-none stroke-rule"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={handles}
            className="fill-none stroke-muted"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={curve}
            className="fill-none stroke-ink"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          {[first, second].map(({ x, y }) => (
            <rect
              key={`${x}-${y}`}
              x={x - 2}
              y={y - 2}
              width="4"
              height="4"
              className="fill-clay"
            />
          ))}
        </svg>
        <figcaption>
          <Label as="p" tone="ink">
            Ease out
          </Label>
          <p className="mt-3 font-mono text-small">
            cubic-bezier({easeOut.join(", ")})
          </p>
          <p className="mt-2 text-caption text-muted">
            Quick to start and slow to settle. Every transition on the site uses
            it.
          </p>
        </figcaption>
      </figure>
      <MotionDemo className="mt-16" />
    </Chapter>
  );
}

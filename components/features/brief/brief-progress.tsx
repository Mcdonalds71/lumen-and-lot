import { cx } from "@/lib/cx";

type BriefProgressProps = { step: number; titles: readonly string[] };

export function BriefProgress({ step, titles }: BriefProgressProps) {
  const reviewing = step >= titles.length;

  return (
    <div>
      <p className="font-mono text-label text-muted uppercase">
        {reviewing ? "Review" : `Step ${step + 1} of ${titles.length}`}
      </p>
      <ol
        aria-label="Steps"
        className="mt-4 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${titles.length}, 1fr)` }}
      >
        {titles.map((title, index) => (
          <li key={title} aria-current={index === step ? "step" : undefined}>
            <span
              aria-hidden
              className={cx(
                "block h-0.5 transition-colors duration-base",
                index <= step ? "bg-ink" : "bg-rule",
              )}
            />
            <span
              className={cx(
                "sr-only font-mono text-label uppercase md:not-sr-only md:mt-2 md:block",
                index === step ? "text-ink" : "text-muted",
              )}
            >
              {title}
              {index < step && <span className="sr-only">, done</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

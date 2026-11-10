import { cx } from "@/lib/cx";

const orientations = {
  horizontal: "h-(--hairline) w-full",
  vertical: "h-auto w-(--hairline) self-stretch",
} as const;

const tones = {
  rule: "bg-rule",
  ink: "bg-ink",
} as const;

type RuleProps = {
  orientation?: keyof typeof orientations;
  tone?: keyof typeof tones;
  className?: string;
};

export function Rule({
  orientation = "horizontal",
  tone = "rule",
  className,
}: RuleProps) {
  return (
    <hr
      aria-hidden
      className={cx(
        "shrink-0 border-0",
        orientations[orientation],
        tones[tone],
        className,
      )}
    />
  );
}

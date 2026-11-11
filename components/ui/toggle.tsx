"use client";

import { type ReactNode, useId } from "react";

import { cx } from "@/lib/cx";

import { Label } from "./label";

export type ToggleOption<T extends string> = { value: T; label: ReactNode };

const tones = {
  ink: {
    label: "muted",
    group: "border-ink",
    option:
      "not-first:border-ink not-has-checked:hover:bg-rule/50 has-checked:bg-ink has-checked:text-paper",
  },
  paper: {
    label: "paper",
    group: "border-paper",
    option:
      "not-first:border-paper not-has-checked:hover:bg-paper/15 has-checked:bg-paper has-checked:text-ink",
  },
} as const;

export type ToggleTone = keyof typeof tones;

const layouts = {
  inline: "flex-wrap items-center gap-x-4",
  stacked: "flex-col items-start",
} as const;

export type ToggleLayout = keyof typeof layouts;

type ToggleProps<T extends string> = {
  label: string;
  options: readonly ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  hideLabel?: boolean;
  tone?: ToggleTone;
  layout?: ToggleLayout;
  className?: string;
};

export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
  tone = "ink",
  layout = "inline",
  className,
}: ToggleProps<T>) {
  const id = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={id}
      className={cx("flex gap-y-2", layouts[layout], className)}
    >
      <Label
        id={id}
        tone={tones[tone].label}
        className={cx(hideLabel && "sr-only")}
      >
        {label}
      </Label>
      <div className={cx("flex border", tones[tone].group)}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cx(
              "cursor-pointer px-3 py-1.5 font-mono text-label transition-colors duration-fast not-first:border-l has-focus-visible:focus-ring",
              tones[tone].option,
            )}
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

"use client";

import { type ReactNode, useId } from "react";

import { cx } from "@/lib/cx";

import { Label } from "./label";

export type ToggleOption<T extends string> = { value: T; label: ReactNode };

type ToggleProps<T extends string> = {
  label: string;
  options: readonly ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  hideLabel?: boolean;
  className?: string;
};

export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
  className,
}: ToggleProps<T>) {
  const id = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={id}
      className={cx("flex flex-wrap items-center gap-x-4 gap-y-2", className)}
    >
      <Label id={id} className={cx(hideLabel && "sr-only")}>
        {label}
      </Label>
      <div className="flex border border-ink">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer px-3 py-1.5 font-mono text-label transition-colors duration-fast not-first:border-l not-first:border-ink not-has-checked:hover:bg-rule/50 has-checked:bg-ink has-checked:text-paper has-focus-visible:focus-ring"
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

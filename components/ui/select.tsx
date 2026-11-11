"use client";

import { useId } from "react";

import { cx } from "@/lib/cx";

import { FieldError } from "./field-error";
import { Label } from "./label";

export type SelectOption<T extends string> = { value: T; label: string };

type SelectProps<T extends string> = {
  label: string;
  options: readonly SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  name?: string;
  error?: string | undefined;
  className?: string;
};

export function Select<T extends string>({
  label,
  options,
  value,
  onChange,
  name,
  error,
  className,
}: SelectProps<T>) {
  const id = useId();
  const errorId = `${id}error`;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <Label as="label" htmlFor={id}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            const chosen = options.find(
              (option) => option.value === event.currentTarget.value,
            );
            if (chosen) onChange(chosen.value);
          }}
          className="w-full cursor-pointer appearance-none rounded-input border border-muted bg-paper py-2.5 pr-10 pl-3 text-small transition-colors duration-fast hover:border-ink aria-invalid:border-ink"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className="pointer-events-none absolute top-1/2 right-3 w-2.5 -translate-y-1/2 fill-none stroke-ink"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

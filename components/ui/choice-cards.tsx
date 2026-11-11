import { type ReactNode, useId } from "react";

import { cx } from "@/lib/cx";

import { FieldError } from "./field-error";
import { Label } from "./label";

export type Choice<T extends string> = {
  value: T;
  label: ReactNode;
  detail?: ReactNode;
};

const layouts = {
  two: "sm:grid-cols-2",
  four: "grid-cols-2 sm:grid-cols-4",
} as const;

type ChoiceCardsProps<T extends string> = {
  legend: string;
  name: string;
  choices: readonly Choice<T>[];
  value: string;
  onChange: (value: T) => void;
  error?: string | undefined;
  layout?: keyof typeof layouts;
  className?: string;
};

export function ChoiceCards<T extends string>({
  legend,
  name,
  choices,
  value,
  onChange,
  error,
  layout = "two",
  className,
}: ChoiceCardsProps<T>) {
  const errorId = useId();

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      className={className}
    >
      <Label as="legend">{legend}</Label>
      {error && (
        <FieldError id={errorId} className="mt-3">
          {error}
        </FieldError>
      )}
      <div className={cx("mt-4 grid gap-3", layouts[layout])}>
        {choices.map((choice) => (
          <label
            key={choice.value}
            className="flex cursor-pointer flex-col gap-1 border border-muted p-4 transition-colors duration-fast hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:focus-ring"
          >
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              className="sr-only"
            />
            <span>{choice.label}</span>
            {choice.detail && (
              <>
                {" "}
                <span className="text-small opacity-75">{choice.detail}</span>
              </>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

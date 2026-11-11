import { useId } from "react";

import { cx } from "@/lib/cx";

import { FieldError } from "./field-error";
import { Label } from "./label";

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  hint?: string;
  multiline?: boolean;
  inputMode?: "text" | "numeric";
  autoComplete?: string;
  className?: string;
};

const control =
  "mt-2 w-full rounded-input border border-muted bg-paper px-3 py-2.5 text-body transition-colors duration-fast hover:border-ink aria-invalid:border-ink";

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  multiline = false,
  inputMode = "text",
  autoComplete,
  className,
}: TextFieldProps) {
  const id = useId();
  const hintId = `${id}hint`;
  const errorId = `${id}error`;
  const describedBy = cx(hint && hintId, error && errorId) || undefined;
  const invalid = error ? true : undefined;

  return (
    <div className={className}>
      <Label as="label" htmlFor={id} className="block">
        {label}
      </Label>
      {hint && (
        <p id={hintId} className="mt-1 text-small text-muted">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          rows={4}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={cx(control, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={control}
        />
      )}
      {error && (
        <FieldError id={errorId} className="mt-2">
          {error}
        </FieldError>
      )}
    </div>
  );
}

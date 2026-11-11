"use client";

import { type FormEvent, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";

export function NewsletterForm({ className }: { className?: string }) {
  const inputId = useId();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className={cx("flex flex-col gap-3", className)}>
      <label htmlFor={inputId} className="text-small font-medium">
        Email address
      </label>
      <div className="flex gap-3">
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          className="min-w-0 flex-1 rounded-input border border-muted bg-transparent px-4 py-3 text-small"
        />
        <Button type="submit">Sign up</Button>
      </div>
      <p role="status" className="text-small text-muted">
        {submitted &&
          "Thank you. This is a concept site, so nothing was sent and your address was not stored."}
      </p>
    </form>
  );
}

import type { ReactNode } from "react";

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p
      aria-hidden
      className="col-[quote] my-12 border-y border-rule py-8 font-display text-display-md text-pretty md:my-20 md:py-12"
    >
      {children}
    </p>
  );
}

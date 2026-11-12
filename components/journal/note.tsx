import { type ReactNode, useId } from "react";

import { Label } from "@/components/ui/label";

export function Note({ children }: { children: ReactNode }) {
  const labelId = useId();

  return (
    <aside
      aria-labelledby={labelId}
      className="mt-16 border-t border-ink pt-5 md:mt-24"
    >
      <Label as="p" id={labelId}>
        Note
      </Label>
      <p className="mt-3 text-small text-muted">{children}</p>
    </aside>
  );
}

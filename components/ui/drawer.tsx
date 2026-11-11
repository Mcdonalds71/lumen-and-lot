"use client";

import { type ReactNode, useEffect, useId, useRef } from "react";

import { cx } from "@/lib/cx";

const sizes = {
  panel: "max-w-md",
  full: "max-w-none",
} as const;

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
};

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  size = "panel",
  className,
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    dialog.showModal();
    return () => dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      className={cx(
        "fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full bg-paper text-ink",
        sizes[size],
        "translate-x-full transition-[translate,overlay,display] transition-discrete duration-base ease-out open:translate-x-0 starting:open:translate-x-full",
        "backdrop:bg-ink/40 backdrop:opacity-0 backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-base open:backdrop:opacity-100 starting:open:backdrop:opacity-0",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-baseline justify-between gap-6 border-b border-rule px-6 py-5">
          <h2 id={titleId} className="font-display text-display-sm">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="link-underline font-mono text-label uppercase"
          >
            Close
          </button>
        </header>
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain px-6 py-8"
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}

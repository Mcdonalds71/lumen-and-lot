export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only bg-ink px-4 py-3 text-small font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
  );
}

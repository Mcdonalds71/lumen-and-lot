const formatters = new Map<string, Intl.NumberFormat>();

export function numberFormat(
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = JSON.stringify(options);
  const cached = formatters.get(key);
  if (cached) return cached;
  const created = new Intl.NumberFormat("en-US", options);
  formatters.set(key, created);
  return created;
}

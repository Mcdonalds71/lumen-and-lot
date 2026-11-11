export const colors = {
  paper: "#f4f1ea",
  ink: "#161513",
  muted: "#6b675e",
  clay: "#b4532a",
  moss: "#4b5a3c",
  rule: "#d9d4c8",
} as const;

export type ColorName = keyof typeof colors;

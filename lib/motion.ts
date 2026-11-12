export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
} as const;

export type DurationName = keyof typeof durations;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export const smoothScrollQuery =
  "(pointer: fine) and (prefers-reduced-motion: no-preference)";

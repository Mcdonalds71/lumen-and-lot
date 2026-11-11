import { useSyncExternalStore } from "react";

import { reducedMotionQuery } from "@/lib/motion";

function subscribe(onChange: () => void): () => void {
  const query = matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

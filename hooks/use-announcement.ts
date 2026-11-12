import { useSyncExternalStore } from "react";

let current = "";
const listeners = new Set<() => void>();

export function announce(message: string): void {
  current = message;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAnnouncement(): string {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "",
  );
}

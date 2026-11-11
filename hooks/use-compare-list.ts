import { useSyncExternalStore } from "react";

import {
  addToCompare,
  compareStorageKey,
  parseCompareList,
  removeFromCompare,
  serializeCompareList,
} from "@/lib/compare";

const changeEvent = "lumen-and-lot:compare";

let unsaved: string | undefined;

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === compareStorageKey) onChange();
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function read(): string {
  if (unsaved !== undefined) return unsaved;
  try {
    return localStorage.getItem(compareStorageKey) ?? "";
  } catch {
    return "";
  }
}

function save(slugs: readonly string[]): void {
  const value = serializeCompareList(slugs);
  try {
    localStorage.setItem(compareStorageKey, value);
    unsaved = undefined;
  } catch {
    unsaved = value;
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function useCompareList() {
  const slugs = parseCompareList(
    useSyncExternalStore(subscribe, read, () => ""),
  );

  return {
    slugs,
    add: (slug: string) => save(addToCompare(slugs, slug)),
    remove: (slug: string) => save(removeFromCompare(slugs, slug)),
  };
}

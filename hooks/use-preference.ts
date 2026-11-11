import { useSyncExternalStore } from "react";

import { type Preference, preferences } from "@/lib/preferences";

const changeEvent = "lumen-and-lot:preference";

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    const preference = preferences.find(
      (candidate) => candidate.storageKey === event.key,
    );
    if (!preference) return;
    document.documentElement.setAttribute(
      preference.attribute,
      preference.parse(event.newValue),
    );
    onChange();
  };

  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function persist(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function usePreference<T extends string>(
  preference: Preference<T>,
): readonly [T, (value: T) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () =>
      preference.parse(
        document.documentElement.getAttribute(preference.attribute),
      ),
    () => preference.fallback,
  );

  const setValue = (next: T) => {
    document.documentElement.setAttribute(preference.attribute, next);
    persist(preference.storageKey, next);
    window.dispatchEvent(new Event(changeEvent));
  };

  return [value, setValue] as const;
}

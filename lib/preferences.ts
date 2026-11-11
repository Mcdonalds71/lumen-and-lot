import { displayCurrencies } from "./currency";
import { areaUnits } from "./units";

export type Preference<T extends string> = {
  attribute: `data-${string}`;
  optionAttribute: `data-${string}`;
  storageKey: string;
  values: readonly T[];
  fallback: T;
  parse: (raw: string | null) => T;
};

function definePreference<const T extends string>(
  definition: Omit<Preference<T>, "parse" | "fallback"> & {
    fallback: NoInfer<T>;
  },
): Preference<T> {
  return {
    ...definition,
    parse: (raw) =>
      definition.values.find((value) => value === raw) ?? definition.fallback,
  };
}

export const areaPreference = definePreference({
  attribute: "data-area",
  optionAttribute: "data-area-option",
  storageKey: "lumen-and-lot:area",
  values: areaUnits,
  fallback: "m2",
});

export const currencyPreference = definePreference({
  attribute: "data-currency",
  optionAttribute: "data-currency-option",
  storageKey: "lumen-and-lot:currency",
  values: ["local", ...displayCurrencies],
  fallback: "local",
});

export const residenceViewPreference = definePreference({
  attribute: "data-residence-view",
  optionAttribute: "data-residence-view-option",
  storageKey: "lumen-and-lot:residence-view",
  values: ["grid", "list"],
  fallback: "grid",
});

export const preferences = [
  areaPreference,
  currencyPreference,
  residenceViewPreference,
] as const;

export function preferenceDefaults(
  list: readonly Preference<string>[],
): Record<string, string> {
  return Object.fromEntries(
    list.map(({ attribute, fallback }) => [attribute, fallback]),
  );
}

export function preferenceScript(list: readonly Preference<string>[]): string {
  const entries = JSON.stringify(
    list.map(({ storageKey, attribute, values }) => [
      storageKey,
      attribute,
      values,
    ]),
  );
  return `(function(){try{var root=document.documentElement;${entries}.forEach(function(entry){var value=localStorage.getItem(entry[0]);if(value&&entry[2].indexOf(value)>-1)root.setAttribute(entry[1],value)})}catch(error){}})()`;
}

export function preferenceStyles(list: readonly Preference<string>[]): string {
  const selectors = list.flatMap(({ attribute, optionAttribute, values }) =>
    values.map(
      (value) =>
        `:root:not([${attribute}="${value}"]) [${optionAttribute}="${value}"]`,
    ),
  );
  return `${selectors.join(",")}{display:none}`;
}

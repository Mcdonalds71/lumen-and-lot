import { readFileSync } from "node:fs";

import { parseTokens } from "@/lib/design-tokens";

export const tokens = parseTokens(
  readFileSync(
    new URL("../../../app/styles/tokens.css", import.meta.url),
    "utf8",
  ),
);

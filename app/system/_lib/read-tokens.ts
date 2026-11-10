import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parseTokens, type TokenMap } from "@/lib/design-tokens";

export function readTokens(): TokenMap {
  return parseTokens(
    readFileSync(join(process.cwd(), "app", "styles", "tokens.css"), "utf8"),
  );
}

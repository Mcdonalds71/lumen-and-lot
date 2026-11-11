import { expect, test as setup } from "@playwright/test";

import { pages } from "./pages";

setup(
  "every page compiles and responds before the suites run in parallel",
  async ({ request }) => {
    for (const { path } of pages) {
      expect(await request.get(path), path).toBeOK();
    }
  },
);

import { expect, test as setup } from "@playwright/test";

import { pages } from "./pages";

setup(
  "every page compiles and responds before the suites run in parallel",
  async ({ request }) => {
    for (const { path, status = 200 } of pages) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(status);
    }
  },
);

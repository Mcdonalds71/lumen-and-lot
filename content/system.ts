import { z } from "zod";

import { image } from "./media";
import { imageSchema } from "./schemas/common";

export const systemImages = z
  .object({ window: imageSchema, doorway: imageSchema })
  .parse({
    window: image(
      "/images/system/window.webp",
      "A bentwood rocking chair beside a tall window, with sun on the floor",
      "portrait",
    ),
    doorway: image(
      "/images/system/doorway.webp",
      "A white house with two dark red doors on a cobbled street",
      "landscape",
    ),
  });

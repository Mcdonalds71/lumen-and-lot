import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "stair-house";

export const stairHouse = {
  slug,
  name: "Stair House",
  market: "lisbon",
  locality: "Alfama",
  year: 2024,
  type: "Renovation",
  areaM2: 140,
  homes: 2,
  summary:
    "A narrow house on a steep street, rebuilt as two apartments. A new stair runs up through the middle and carries light down from a roof lantern.",
  cover: projectImage(
    slug,
    "cover",
    "A tiled front with two doors on a sloping cobbled street",
    "wide",
  ),
  sections: [
    {
      title: "A tall, thin house",
      body: [
        "The house is four stories high and four meters wide. The old stair blocked the middle of every floor, so we moved it and opened up the rooms.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "A tall, narrow yellow house between its tiled neighbors",
        "landscape",
      ),
    },
    {
      title: "Light from the roof",
      body: [
        "A glass lantern on the roof sits above the new stair. On bright days, its light reaches all the way down to the ground floor.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "A wooden stair winding up under the roof lantern",
        "portrait",
      ),
    },
    {
      title: "Old walls, new rooms",
      body: [
        "We kept the thick stone walls and the tiled front, and lined the new rooms in lime plaster and pine.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "Wooden shutters on an old plastered wall, with palm shadows",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Section",
      image: projectImage(
        slug,
        "drawing-1",
        "Section through all four floors and the lantern",
        "landscape",
      ),
    },
    {
      title: "Upper floor plan",
      image: projectImage(
        slug,
        "drawing-2",
        "Plan of the upper apartment",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The stair as we found it, its plaster cracked and peeling",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The finished stair under the new roof lantern",
      "landscape",
    ),
    caption: "The stair as we found it, and the finished stair.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

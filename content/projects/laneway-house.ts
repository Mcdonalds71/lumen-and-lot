import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "laneway-house";

export const lanewayHouse = {
  slug,
  name: "Laneway House",
  market: "toronto",
  locality: "Little Portugal",
  year: 2021,
  type: "New build",
  areaM2: 92,
  homes: 1,
  summary:
    "A two-story house on a former garage lot behind a Victorian row. The neighbors stand close on both sides, so light comes in from above and from a small courtyard.",
  cover: projectImage(
    slug,
    "cover",
    "A small house at dusk, its doorway and windows lit",
    "wide",
  ),
  sections: [
    {
      title: "The lot",
      body: [
        "The lot was six meters wide and held a garage no one had used in years. A change in the city's rules for laneway homes let us build a small house in its place.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "A narrow path between a brick wall and an ivy-covered wall",
        "landscape",
      ),
    },
    {
      title: "Light from above",
      body: [
        "With neighbors close on both sides, the side walls stay blind. A long skylight over the stair and a courtyard at the back bring daylight into every room.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "A concrete stair rising to a long skylight",
        "portrait",
      ),
    },
    {
      title: "Small rooms, tall ceilings",
      body: [
        "The rooms are small, so we made them tall. Ceilings rise to three meters on the ground floor, and built-in shelves keep the floors clear.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "White built-in shelves below a row of windows",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Ground floor plan",
      image: projectImage(
        slug,
        "drawing-1",
        "Ground floor plan of the laneway house",
        "landscape",
      ),
    },
    {
      title: "Long section",
      image: projectImage(
        slug,
        "drawing-2",
        "Long section through the stair and skylight",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The lot in 2019: an old garage between two fences",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The finished house in 2021, between the same fences",
      "landscape",
    ),
    caption: "The garage lot in 2019, and the finished house in 2021.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

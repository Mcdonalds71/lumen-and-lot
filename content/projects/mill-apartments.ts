import { projectImage, studioCredits } from "./images";
import type { ProjectInput } from "../schemas/project";

const slug = "mill-apartments";

export const millApartments = {
  slug,
  name: "Mill Apartments",
  market: "hudson-valley",
  locality: "Kingston",
  year: 2022,
  type: "Conversion",
  areaM2: 640,
  homes: 6,
  summary:
    "Six apartments inside a brick mill on the edge of Kingston. We kept the timber frame and the tall windows, and arranged the new homes so each one has light from two sides.",
  cover: projectImage(
    slug,
    "cover",
    "A large brick mill with a tall chimney",
    "wide",
  ),
  sections: [
    {
      title: "What we kept",
      body: [
        "The brick walls, timber posts and big windows were sound. We repaired them instead of replacing them, and left the old beams visible in every apartment.",
      ],
      image: projectImage(
        slug,
        "section-1",
        "Old brick and a timber post and brace beside new plaster",
        "landscape",
      ),
    },
    {
      title: "Light from two sides",
      body: [
        "Each home runs from one side of the building to the other, so morning and evening light both reach the living rooms.",
      ],
      image: projectImage(
        slug,
        "section-2",
        "A living room under a tall steel window",
        "portrait",
      ),
    },
    {
      title: "A shared garden",
      body: [
        "The old loading yard became a garden for the residents, with raised beds and paths between the old brick walls.",
      ],
      image: projectImage(
        slug,
        "section-3",
        "Planted beds and a path inside an old brick-walled yard",
        "square",
      ),
    },
  ],
  drawings: [
    {
      title: "Typical floor plan",
      image: projectImage(
        slug,
        "drawing-1",
        "Typical floor plan of the mill apartments",
        "landscape",
      ),
    },
    {
      title: "Cross section",
      image: projectImage(
        slug,
        "drawing-2",
        "Cross section through two apartments",
        "landscape",
      ),
    },
  ],
  beforeAfter: {
    before: projectImage(
      slug,
      "before",
      "The mill before work began, its windows broken and boarded",
      "landscape",
    ),
    after: projectImage(
      slug,
      "after",
      "The restored mill, its yard planted with raised beds",
      "landscape",
    ),
    caption: "The mill before work began, and the restored building.",
  },
  credits: studioCredits,
} satisfies ProjectInput;

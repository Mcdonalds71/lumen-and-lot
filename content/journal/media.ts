import { image } from "../media";

const folder = "/images/journal";

export const daylightMedia = {
  cover: image(
    `${folder}/designing-for-daylight/cover.webp`,
    "A small house in low winter sun, its south windows catching the light.",
    "wide",
  ),
  northRoom: image(
    `${folder}/designing-for-daylight/north-room.webp`,
    "A north-facing workroom with even light and no direct sun.",
    "landscape",
  ),
  section: image(
    `${folder}/designing-for-daylight/section.webp`,
    "A line drawing of a house in section, showing a roof overhang above a tall window.",
    "wide",
  ),
};

export const energyMedia = {
  cover: image(
    `${folder}/how-to-read-an-energy-certificate/cover.webp`,
    "The street front of a small apartment building with deep window reveals.",
    "wide",
  ),
  wall: image(
    `${folder}/how-to-read-an-energy-certificate/wall.webp`,
    "A close view of an insulated wall build-up before the plaster goes on.",
    "landscape",
  ),
};

export const abroadMedia = {
  cover: image(
    `${folder}/buying-a-new-home-from-abroad/cover.webp`,
    "A row of new homes at dusk with lights on in the windows.",
    "wide",
  ),
  visit: image(
    `${folder}/buying-a-new-home-from-abroad/visit.webp`,
    "An empty living room in a finished home, ready for a walk-through.",
    "landscape",
  ),
};

export const journalMedia = [daylightMedia, energyMedia, abroadMedia];

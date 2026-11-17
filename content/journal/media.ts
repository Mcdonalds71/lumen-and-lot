import { image } from "../media";

const folder = "/images/journal";

export const daylightMedia = {
  cover: image(
    `${folder}/designing-for-daylight/cover.webp`,
    "Bare branches casting shadows across a sunlit wall and shutter.",
    "wide",
  ),
  northRoom: image(
    `${folder}/designing-for-daylight/north-room.webp`,
    "An empty room in soft, even light from a wide window.",
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
    "An apartment front with blue window frames and small balconies.",
    "wide",
  ),
  wall: image(
    `${folder}/how-to-read-an-energy-certificate/wall.webp`,
    "A new room before plastering, its walls bare and its glazing fitted.",
    "landscape",
  ),
};

export const abroadMedia = {
  cover: image(
    `${folder}/buying-a-new-home-from-abroad/cover.webp`,
    "New houses on a lake shore at dusk, their lights reflected in the water.",
    "wide",
  ),
  visit: image(
    `${folder}/buying-a-new-home-from-abroad/visit.webp`,
    "An empty living room in a finished home, with a glazed door to a balcony.",
    "landscape",
  ),
};

export const journalMedia = [daylightMedia, energyMedia, abroadMedia];

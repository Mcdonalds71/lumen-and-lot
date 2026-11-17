import { z } from "zod";

import { findContentImage } from "./images";
import { uniqueBy } from "./schemas/common";
import { type Photo, photoSchema } from "./schemas/photo";

function unsplash(id: string, name: string, handle: string) {
  return { site: "Unsplash", id, photographer: { name, handle } } as const;
}

export const photos = z
  .array(photoSchema)
  .check(uniqueBy("photo", (photo) => photo.src))
  .transform((list, ctx) =>
    list.map((photo) => {
      const image = findContentImage(photo.src);
      if (!image) {
        ctx.addIssue({
          code: "custom",
          message: `No content image uses "${photo.src}".`,
        });
        return z.NEVER;
      }
      return { ...photo, width: image.width, height: image.height };
    }),
  )
  .parse([
    {
      src: "/images/home/hero.webp",
      source: unsplash(
        "photo-1610286986642-057ece0c3656",
        "Alexandre Lallemand",
        "alexandrelallemand",
      ),
    },
    {
      src: "/images/residences/canal-house/detail.webp",
      source: unsplash(
        "photo-1648624219254-1adcd4e49bc6",
        "Kiwihug",
        "kiwihug",
      ),
    },
    {
      src: "/images/residences/canal-house/exterior.webp",
      source: unsplash(
        "photo-1640013531534-ce1e28c23f33",
        "Virginia Marinova",
        "virginiaphotostories",
      ),
    },
    {
      src: "/images/residences/canal-house/interior.webp",
      source: unsplash("photo-1585128792020-803d29415281", "Julia", "beazy"),
    },
    {
      src: "/images/residences/courtyard-rooms/detail.webp",
      source: unsplash(
        "photo-1783684866731-fba1baf7b164",
        "tommao wang",
        "tommaomaoer",
      ),
    },
    {
      src: "/images/residences/courtyard-rooms/exterior.webp",
      source: unsplash("photo-1767371051716-c060c61f73f3", "ᛟᛞᚨᛚᚹ", "odalv"),
    },
    {
      src: "/images/residences/courtyard-rooms/interior.webp",
      source: unsplash(
        "photo-1659448596572-439eae35f7b7",
        "Alex Rhee",
        "alexdhrhee",
      ),
    },
    {
      src: "/images/residences/garden-floor/detail.webp",
      source: unsplash(
        "photo-1789292249119-5f349a3031e9",
        "john july",
        "johnjuly",
      ),
    },
    {
      src: "/images/residences/garden-floor/exterior.webp",
      source: unsplash(
        "photo-1787069699249-a9eeff0c5705",
        "Vincent Yap",
        "chonky_films",
      ),
    },
    {
      src: "/images/residences/garden-floor/interior.webp",
      source: unsplash(
        "photo-1610307540583-7472788642d6",
        "Erika Osberg",
        "erikaosberg",
      ),
    },
    {
      src: "/images/residences/harbor-room/detail.webp",
      source: unsplash(
        "photo-1761773850049-4ecdda3b76a5",
        "Gunnar Ridderström",
        "gunnarridder",
      ),
    },
    {
      src: "/images/residences/harbor-room/exterior.webp",
      source: unsplash(
        "photo-1612729886707-cdb08254f69a",
        "Gianluigi Marin",
        "gianluigi_marin",
      ),
    },
    {
      src: "/images/residences/harbor-room/interior.webp",
      source: unsplash(
        "photo-1790181034141-ce32507c2543",
        "Rafael Hoyos Weht",
        "rhweht",
      ),
    },
    {
      src: "/images/residences/high-terrace/detail.webp",
      source: unsplash(
        "photo-1779653449220-d519e2721433",
        "Bernd 📷 Dittrich",
        "hdbernd",
      ),
    },
    {
      src: "/images/residences/high-terrace/exterior.webp",
      source: unsplash(
        "photo-1777899622154-ca0d92e9d99d",
        "Milan Trninic",
        "wedesignmarbella",
      ),
    },
    {
      src: "/images/residences/high-terrace/interior.webp",
      source: unsplash(
        "photo-1777930733413-cb4fefb4960b",
        "rsthomson",
        "rsthomson",
      ),
    },
    {
      src: "/images/residences/north-light/detail.webp",
      source: unsplash(
        "photo-1586111176290-ab279703bed0",
        "Trude Jonsson Stangel",
        "trude_jonsson_stangel",
      ),
    },
    {
      src: "/images/residences/north-light/exterior.webp",
      source: unsplash(
        "photo-1757237638175-2d193095a319",
        "Farnaz Kohankhaki",
        "farnaz________",
      ),
    },
    {
      src: "/images/residences/north-light/interior.webp",
      source: unsplash(
        "photo-1613324061338-19d4528a5be9",
        "Laura Cleffmann",
        "cloudett",
      ),
    },
    {
      src: "/images/residences/orchard-house/detail.webp",
      source: unsplash(
        "photo-1774597998075-456cfe1c2dfa",
        "Adrien Olichon",
        "adrienolichon",
      ),
    },
    {
      src: "/images/residences/orchard-house/exterior.webp",
      source: unsplash(
        "photo-1704306830195-71ce5ae2c11e",
        "Jon Flobrant",
        "jonflobrant",
      ),
    },
    {
      src: "/images/residences/orchard-house/interior.webp",
      source: unsplash(
        "photo-1774095147477-7ec6948f209b",
        "Clay Banks",
        "claybanks",
      ),
    },
    {
      src: "/images/projects/courtyard-block/cover.webp",
      source: unsplash(
        "photo-1791257684881-3acaa37ac35f",
        "Reza Madani",
        "qarqa_",
      ),
    },
    {
      src: "/images/projects/courtyard-block/section-1.webp",
      source: unsplash(
        "photo-1785281571594-37797c0d2c3a",
        "Ali Abbas Kadhim",
        "aakadhim",
      ),
    },
    {
      src: "/images/projects/courtyard-block/section-2.webp",
      source: unsplash("photo-1596591891504-f767068af8a2", "HJ S", "h_j_"),
    },
    {
      src: "/images/projects/courtyard-block/section-3.webp",
      source: unsplash(
        "photo-1569216961559-fd512349ebba",
        "Richard Wang",
        "rrricharddd",
      ),
    },
    {
      src: "/images/projects/laneway-house/cover.webp",
      source: unsplash(
        "photo-1494526585095-c41746248156",
        "Brian Babb",
        "brianbabb",
      ),
    },
    {
      src: "/images/projects/laneway-house/section-1.webp",
      source: unsplash("photo-1768904074221-a319d2e5828c", "T", "tanyabarrow"),
    },
    {
      src: "/images/projects/laneway-house/section-2.webp",
      source: unsplash(
        "photo-1672679429946-88d3b65ea7d0",
        "Pascal Meier",
        "zhpix",
      ),
    },
    {
      src: "/images/projects/laneway-house/section-3.webp",
      source: unsplash(
        "photo-1778088442532-2a3ed3767931",
        "Taylor Friehl",
        "taylor_friehl",
      ),
    },
    {
      src: "/images/projects/mews-house/cover.webp",
      source: unsplash(
        "photo-1657073900955-add2877e53b3",
        "Gonzalo Facello",
        "gonchifacello",
      ),
    },
    {
      src: "/images/projects/mews-house/section-1.webp",
      source: unsplash(
        "photo-1728227170736-fb03247665a9",
        "Annie Spratt",
        "anniespratt",
      ),
    },
    {
      src: "/images/projects/mews-house/section-2.webp",
      source: unsplash(
        "photo-1767024383912-3be50fd6df8e",
        "Nathan Langer",
        "nlangerdev",
      ),
    },
    {
      src: "/images/projects/mews-house/section-3.webp",
      source: unsplash(
        "photo-1606073997705-dcd0bf7a7d14",
        "SJ Objio",
        "sjobjio",
      ),
    },
    {
      src: "/images/projects/mill-apartments/cover.webp",
      source: unsplash("photo-1760818074803-cbb4ddf90236", "T", "tanyabarrow"),
    },
    {
      src: "/images/projects/mill-apartments/section-1.webp",
      source: unsplash(
        "photo-1722349675254-79b0ec25c8d4",
        "Lisa Anna",
        "lisaanna195",
      ),
    },
    {
      src: "/images/projects/mill-apartments/section-2.webp",
      source: unsplash(
        "photo-1610123172763-1f587473048f",
        "Michael Oxendine",
        "oxendine_",
      ),
    },
    {
      src: "/images/projects/mill-apartments/section-3.webp",
      source: unsplash(
        "photo-1776757980912-2a92d733809c",
        "Annie Spratt",
        "anniespratt",
      ),
    },
    {
      src: "/images/projects/stair-house/cover.webp",
      source: unsplash(
        "photo-1533421821268-87e42c1d70b0",
        "Diego García",
        "diegogarcia",
      ),
    },
    {
      src: "/images/projects/stair-house/section-1.webp",
      source: unsplash(
        "photo-1592638082799-f14ba81b4caa",
        "Ira Komornik",
        "mintsatan",
      ),
    },
    {
      src: "/images/projects/stair-house/section-2.webp",
      source: unsplash(
        "photo-1760238379071-5365334db65c",
        "Dmytro Yarish",
        "dmytro_yarish",
      ),
    },
    {
      src: "/images/projects/stair-house/section-3.webp",
      source: unsplash(
        "photo-1571327352610-1c5484ccc840",
        "Kadir Celep",
        "kadircelep",
      ),
      focus: [0.35, 0.5],
    },
    {
      src: "/images/journal/buying-a-new-home-from-abroad/cover.webp",
      source: unsplash(
        "photo-1760824951703-9b63c7cfdf86",
        "Pradeep Sus",
        "pixelpioneer98",
      ),
    },
    {
      src: "/images/journal/buying-a-new-home-from-abroad/visit.webp",
      source: unsplash(
        "photo-1630699144919-681cf308ae82",
        "Point3D Commercial Imaging Ltd.",
        "3dottawa",
      ),
    },
    {
      src: "/images/journal/designing-for-daylight/cover.webp",
      source: unsplash(
        "photo-1767371891362-e846cc78cdfb",
        "Marija Zaric",
        "simplicity",
      ),
    },
    {
      src: "/images/journal/designing-for-daylight/north-room.webp",
      source: unsplash(
        "photo-1779119507174-377fd3d44785",
        "Alicia Christin Gerald",
        "allysphotos",
      ),
    },
    {
      src: "/images/journal/how-to-read-an-energy-certificate/cover.webp",
      source: unsplash(
        "photo-1469022563428-aa04fef9f5a2",
        "Ján Jakub Naništa",
        "janjakubnanista",
      ),
    },
    {
      src: "/images/journal/how-to-read-an-energy-certificate/wall.webp",
      source: unsplash(
        "photo-1707725669477-18feaba381f4",
        "Steffen Lemmerzahl",
        "steffen_l",
      ),
    },
    {
      src: "/images/system/doorway.webp",
      source: unsplash(
        "photo-1650966111967-d21275544d07",
        "Frank Eiffert",
        "feiffert",
      ),
    },
    {
      src: "/images/system/window.webp",
      source: unsplash(
        "photo-1642960974194-ada4f16723fd",
        "Morgane Le Breton",
        "morgane_lb",
      ),
    },
  ]);

export type PhotoCredit = Photo["credit"];

export const photoCredits: readonly PhotoCredit[] = [
  ...new Map(photos.map(({ credit }) => [credit.url, credit])).values(),
].sort((a, b) => a.name.localeCompare(b.name));

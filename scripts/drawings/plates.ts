import {
  column,
  dashed,
  dashedBox,
  door,
  flight,
  ground,
  hatch,
  outline,
  partyWall,
  type Plate,
  ray,
  slab,
  stairs,
  thin,
  tree,
  wall,
  windowAcross,
  windowDown,
} from "./pen";

const landscape = { width: 240, height: 160 };
const wide = { width: 240, height: 135 };

function plate(size: typeof landscape, marks: (string | string[])[]): Plate {
  return { ...size, marks: marks.flat() };
}

function glassWall(x: number, fromY: number, toY: number, panes: number) {
  const pane = (toY - fromY) / panes;
  return [
    ...windowDown(x, fromY, toY),
    ...Array.from({ length: panes - 1 }, (_, index) =>
      thin(
        [x - 1, fromY + pane * (index + 1)],
        [x + 1, fromY + pane * (index + 1)],
      ),
    ),
  ];
}

function windowsAcross(
  fromX: number,
  toX: number,
  y: number,
  every: number,
  width: number,
) {
  const marks: string[] = [];
  for (let x = fromX; x + width <= toX; x += every) {
    marks.push(...windowAcross(x, x + width, y));
  }
  return marks;
}

const mewsSection = plate(landscape, [
  ground(10, 230, 132),
  hatch(210, 48, 20, 84),
  slab(30, 210, 132, 2),
  slab(30, 118, 92),
  slab(152, 210, 92),
  slab(30, 60, 54),
  slab(200, 210, 54),
  thin([60, 54], [66, 45], [194, 45], [200, 54]),
  thin([66, 46.2], [194, 46.2]),
  wall([30, 50], [30, 92]),
  windowDown(30, 64, 84),
  glassWall(30, 93, 131, 3),
  partyWall([210, 50], [210, 132]),
  flight([152, 132], [118, 92], 10),
  ray([96, 46], [90, 92]),
  ray([126, 46], [118, 131]),
  ray([140, 46], [131, 131]),
  ray([176, 46], [170, 92]),
]);

const mewsPlan = plate(landscape, [
  hatch(30, 36, 180, 5),
  hatch(30, 119, 180, 5),
  partyWall([30, 41], [210, 41]),
  partyWall([30, 119], [210, 119]),
  partyWall([210, 41], [210, 119]),
  glassWall(30, 42, 118, 5),
  stairs(116, 41, 36, 15, 10, "x"),
  wall([178, 84], [210, 84]),
  wall([178, 84], [178, 88]),
  wall([178, 104], [178, 119]),
  door([178, 104], [192, 104], [178, 90], 0),
  outline(94, 111, 66, 8),
  outline(130, 112.5, 8, 5),
  outline(40, 58, 9, 38),
  outline(62, 92, 24, 12),
  dashedBox(58, 72, 142, 14),
]);

const lanewayPlan = plate(landscape, [
  dashed([18, 50], [40, 50]),
  dashed([18, 110], [40, 110]),
  thin([150, 50], [206, 50]),
  thin([150, 110], [206, 110]),
  thin([206, 50], [206, 110]),
  partyWall([40, 50], [150, 50]),
  partyWall([40, 110], [150, 110]),
  wall([40, 50], [40, 110]),
  windowDown(40, 58, 74),
  windowDown(40, 88, 100),
  wall([150, 50], [150, 110]),
  glassWall(150, 58, 102, 3),
  stairs(78, 50, 40, 12, 10, "x"),
  dashedBox(76, 51.5, 44, 14),
  wall([124, 50], [124, 60]),
  wall([124, 70], [150, 70]),
  door([124, 70], [124, 60], [134, 70], 1),
  outline(96, 102, 46, 8),
  tree(176, 70, 8),
  tree(188, 94, 5.5),
  dashed([152, 80], [204, 80]),
]);

const lanewaySection = plate(landscape, [
  ground(10, 230, 130),
  slab(40, 150, 130, 2),
  slab(40, 80, 96),
  slab(120, 150, 96),
  slab(40, 76, 62),
  slab(124, 150, 62),
  thin([76, 62], [76, 54], [124, 54], [124, 62]),
  thin([76, 55.2], [124, 55.2]),
  wall([40, 58], [40, 96]),
  windowDown(40, 70, 88),
  wall([40, 96], [40, 130]),
  glassWall(40, 104, 129, 2),
  wall([150, 58], [150, 130]),
  windowDown(150, 68, 90),
  glassWall(150, 100, 129, 2),
  flight([120, 130], [80, 96], 12),
  thin([180, 130], [180, 108]),
  tree(180, 100, 11),
  thin([206, 130], [206, 116]),
  ray([90, 55], [84, 129]),
  ray([100, 55], [94, 129]),
  ray([110, 55], [104, 129]),
]);

const millPlan = plate(landscape, [
  wall([15, 40], [225, 40], [225, 120], [15, 120], [15, 40]),
  windowsAcross(66, 176, 40, 15, 9),
  windowsAcross(66, 176, 120, 15, 9),
  windowAcross(28, 40, 40),
  windowAcross(200, 212, 120),
  partyWall([60, 40], [60, 74]),
  partyWall([60, 86], [60, 120]),
  partyWall([120, 40], [120, 120]),
  partyWall([180, 40], [180, 74]),
  partyWall([180, 86], [180, 120]),
  door([60, 86], [70, 86], [60, 76], 0),
  door([180, 86], [170, 86], [180, 76], 1),
  stairs(22, 50, 30, 24, 8, "y"),
  stairs(188, 86, 30, 24, 8, "y"),
  [75, 90, 105, 135, 150, 165].flatMap((x) => [column(x, 67), column(x, 93)]),
  wall([80, 72], [102, 72], [102, 88], [80, 88], [80, 72]),
  wall([138, 72], [160, 72], [160, 88], [138, 88], [138, 72]),
  outline(64, 72, 10, 16),
  outline(166, 72, 10, 16),
]);

const millSection = plate(landscape, [
  ground(10, 230, 140),
  [140, 113, 86, 59].map((y) => slab(50, 190, y, y === 140 ? 2 : 1.6)),
  thin([46, 34], [120, 12], [194, 34]),
  thin([50, 34], [120, 14.5], [190, 34]),
  slab(50, 190, 33, 1.2),
  wall([50, 33], [50, 140]),
  wall([190, 33], [190, 140]),
  [113, 86, 59, 32].flatMap((top) => [
    ...windowDown(50, top + 6, top + 22),
    ...windowDown(190, top + 6, top + 22),
  ]),
  [140, 113, 86, 59].flatMap((floor) =>
    [97, 143].map((x) => outline(x - 0.8, floor - 26, 1.6, 25)),
  ),
  ray([24, 84], [100, 111]),
  ray([216, 60], [140, 84]),
]);

const courtyardPlan = plate(landscape, [
  wall([25, 18], [215, 18], [215, 142], [25, 142], [25, 18]),
  wall([75, 55], [165, 55], [165, 105], [75, 105], [75, 55]),
  windowsAcross(34, 206, 18, 14, 7),
  windowsAcross(34, 108, 142, 14, 7),
  windowsAcross(134, 206, 142, 14, 7),
  [30, 44, 58, 72, 86, 100, 114, 128].flatMap((y) => [
    ...windowDown(25, y, y + 7),
    ...windowDown(215, y, y + 7),
  ]),
  wall([112, 105], [112, 142]),
  wall([128, 105], [128, 142]),
  (
    [
      [80, 49],
      [104, 49],
      [128, 49],
      [152, 49],
      [80, 105],
      [152, 105],
    ] as const
  ).map(([x, y]) => outline(x - 1, y, 14, 6)),
  [62, 82].map((y) => outline(165, y, 6, 14)),
  [62, 82].map((y) => outline(69, y, 6, 14)),
  stairs(32, 25, 14, 22, 7, "y"),
  stairs(194, 25, 14, 22, 7, "y"),
  stairs(32, 113, 14, 22, 7, "y"),
  stairs(194, 113, 14, 22, 7, "y"),
  partyWall([75, 18], [75, 55]),
  partyWall([165, 18], [165, 55]),
  partyWall([25, 80], [75, 80]),
  partyWall([165, 80], [215, 80]),
  tree(98, 74, 7),
  tree(140, 86, 6),
  dashed([120, 105], [120, 70]),
  outline(124, 64, 12, 3),
]);

const courtyardSection = plate(landscape, [
  ground(10, 230, 145),
  [145, 125, 105, 85, 65].map((y) => slab(30, 100, y, y === 145 ? 2 : 1.4)),
  [145, 125, 105, 85, 65].map((y) => slab(140, 210, y, y === 145 ? 2 : 1.4)),
  slab(30, 104, 45),
  slab(136, 210, 45),
  thin([104, 45], [104, 37], [136, 37], [136, 45]),
  thin([104, 38.2], [136, 38.2]),
  wall([30, 45], [30, 145]),
  wall([210, 45], [210, 145]),
  wall([100, 45], [100, 145]),
  wall([140, 45], [140, 145]),
  [125, 105, 85, 65, 45].flatMap((top) => [
    ...windowDown(30, top + 5, top + 15),
    ...windowDown(210, top + 5, top + 15),
  ]),
  [145, 125, 105, 85, 65].flatMap((floor) => [
    flight([108, floor], [132, floor - 10], 6),
    thin([132, floor - 10], [108, floor - 20]),
    slab(132, 140, floor - 10, 1),
    slab(100, 108, floor - 20, 1),
  ]),
  ray([112, 38], [109, 144]),
  ray([120, 38], [118, 144]),
  ray([128, 38], [127, 144]),
]);

const stairSection = plate(landscape, [
  ground(10, 230, 145),
  hatch(58, 40, 37, 105),
  hatch(145, 52, 38, 93),
  partyWall([95, 40], [95, 145]),
  partyWall([145, 40], [145, 145]),
  slab(95, 145, 145, 2),
  [120, 95, 70].flatMap((y) => [slab(95, 108, y), slab(132, 145, y)]),
  slab(95, 110, 45),
  slab(130, 145, 45),
  thin([110, 45], [110, 34], [130, 34], [130, 45]),
  thin([110, 35.2], [130, 35.2]),
  [145, 120, 95, 70].map((floor, index) =>
    index % 2 === 0
      ? flight([110, floor], [130, floor - 25], 8)
      : flight([130, floor], [110, floor - 25], 8),
  ),
  ray([114, 35], [112, 144]),
  ray([120, 35], [120, 144]),
  ray([126, 35], [128, 144]),
]);

const stairPlan = plate(landscape, [
  hatch(30, 44, 180, 6),
  hatch(30, 110, 180, 6),
  partyWall([30, 50], [210, 50]),
  partyWall([30, 110], [210, 110]),
  wall([30, 50], [30, 110]),
  windowDown(30, 58, 72),
  windowDown(30, 88, 102),
  outline(24, 56, 6, 48),
  wall([210, 50], [210, 110]),
  windowDown(210, 70, 90),
  stairs(106, 50, 38, 20, 10, "x"),
  dashedBox(102, 51.5, 46, 22),
  wall([100, 110], [100, 82], [118, 82]),
  wall([132, 82], [150, 82], [150, 110]),
  door([132, 82], [132, 94], [120, 82], 0),
  wall([150, 50], [150, 56]),
  wall([150, 70], [150, 82]),
  door([150, 70], [160, 70], [150, 60], 0),
  outline(40, 50, 52, 7),
  outline(160, 92, 40, 18),
]);

const daylightSection = plate(wide, [
  ground(10, 230, 108),
  slab(30, 200, 44, 2.6),
  slab(60, 190, 108, 2),
  wall([60, 44], [60, 54]),
  glassWall(60, 54, 106, 2),
  wall([190, 44], [190, 108]),
  ray([14, 10], [55, 104], "dashed"),
  ray([0, 70], [176, 107]),
]);

export const plates: Readonly<Record<string, Plate>> = {
  "/images/projects/mews-house/drawing-1.webp": mewsSection,
  "/images/projects/mews-house/drawing-2.webp": mewsPlan,
  "/images/projects/laneway-house/drawing-1.webp": lanewayPlan,
  "/images/projects/laneway-house/drawing-2.webp": lanewaySection,
  "/images/projects/mill-apartments/drawing-1.webp": millPlan,
  "/images/projects/mill-apartments/drawing-2.webp": millSection,
  "/images/projects/courtyard-block/drawing-1.webp": courtyardPlan,
  "/images/projects/courtyard-block/drawing-2.webp": courtyardSection,
  "/images/projects/stair-house/drawing-1.webp": stairSection,
  "/images/projects/stair-house/drawing-2.webp": stairPlan,
  "/images/journal/designing-for-daylight/section.webp": daylightSection,
};

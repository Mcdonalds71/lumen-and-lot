const places = "Toronto, the Hudson Valley, Copenhagen, Lisbon and London";

export const site = {
  name: "Lumen & Lot",
  places,
  description: `A design-build studio for small homes in ${places}. We design, build and furnish each one around its daylight.`,
  author: {
    name: "Emmanuel Onugwu",
    url: "https://emmanuelonugwu.com",
  },
} as const;

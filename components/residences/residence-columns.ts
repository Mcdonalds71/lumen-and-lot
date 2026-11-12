export const residenceColumns = {
  residence: { heading: "Residence", className: "pr-4 text-left" },
  bedrooms: { heading: "Bedrooms", className: "hidden pr-4 sm:table-cell" },
  area: { heading: "Area", className: "hidden pr-4 md:table-cell" },
  price: { heading: "Indicative price", className: "text-right" },
  status: {
    heading: "Status",
    className: "hidden pl-4 text-right sm:table-cell",
  },
} as const;

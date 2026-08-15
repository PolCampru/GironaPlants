import theme from "@/lib/theme";

// Layout of the 2x2 hero image grid. `defaultImage` is the local photo used
// when Strapi provides no hero images, so the hero never shows empty blocks.
export const HeroImageBox = [
  {
    width: "100%",
    height: "100%",
    borderRadiusTopLeft: "6.25rem",
    borderRadiusTopRight: "1rem",
    borderRadiusBottomLeft: "1rem",
    borderRadiusBottomRight: "1rem",
    color: theme.colors.creamLight,
    defaultImage: "/images/lavenders.jpg",
  },
  {
    width: "100%",
    height: "100%",
    borderRadiusTopLeft: "1rem",
    borderRadiusTopRight: "1rem",
    borderRadiusBottomLeft: "1rem",
    borderRadiusBottomRight: "1rem",
    color: theme.colors.brandGreen,
    defaultImage: undefined,
  },
  {
    width: "100%",
    height: "100%",
    borderRadiusTopLeft: "1rem",
    borderRadiusTopRight: "1rem",
    borderRadiusBottomLeft: "1rem",
    borderRadiusBottomRight: "1rem",
    color: theme.colors.creamLight,
    defaultImage: "/images/redCedar.jpg",
  },
  {
    width: "100%",
    height: "100%",
    borderRadiusTopLeft: "1rem",
    borderRadiusTopRight: "1rem",
    borderRadiusBottomLeft: "1rem",
    borderRadiusBottomRight: "6.25rem",
    color: theme.colors.brandGreen,
    defaultImage: "/images/hazelnut.jpg",
  },
];

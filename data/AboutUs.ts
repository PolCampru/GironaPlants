import { BoxDataType } from "@/types/Box";

// `defaultImage` is the local photo used when Strapi provides no hero
// images, so the hero never shows empty blocks.
export const HeroImageBox: BoxDataType[] = [
  {
    width: "100%",
    height: "100%",
    borderRadiusTopRight: "50%",
    defaultImage: "/images/aboutUs/ilex.jpg",
  },
  { width: "100%", height: "100%", defaultImage: "/images/lavenders.jpg" },
  {
    width: "100%",
    height: "100%",
    borderRadiusBottomLeft: "50%",
    defaultImage: "/images/hazelnut.jpg",
  },
  {
    width: "100%",
    height: "100%",
    borderRadiusTopLeft: "100rem",
    borderRadiusTopRight: "100rem",
    borderRadiusBottomLeft: "100rem",
    borderRadiusBottomRight: "100rem",
    defaultImage: "/images/redCedar.jpg",
  },
];

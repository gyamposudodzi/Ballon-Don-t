import type { AwardCategory } from "./types";

export type CategoryMeta = {
  id: AwardCategory;
  hub: AwardCategory;
  label: string;
  shortLabel: string;
  countTarget: number;
  blurb: string;
  poster: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "mens",
    hub: "mens",
    label: "Men's Ballon D'ont",
    shortLabel: "Men",
    countTarget: 22,
    blurb: "Twenty-two names. One rust ball. The main Ballon D'ont shortlist, as filed by Hater Central.",
    poster: "/flyers/mens-poster.jpg",
  },
  {
    id: "yashit",
    hub: "yashit",
    label: "Yashit Trophy",
    shortLabel: "Yashit",
    countTarget: 10,
    blurb: "The gloves category, renamed. Ten keepers. Two posters. No clean sheet is safe.",
    poster: "/flyers/yashit-1.jpg",
  },
  {
    id: "coach",
    hub: "coach",
    label: "Coach of the Year",
    shortLabel: "Coach",
    countTarget: 6,
    blurb: "Six benches. One masterclass each. The sideline charge sheet.",
    poster: "/flyers/coaches-poster.jpg",
  },
  {
    id: "club",
    hub: "club",
    label: "Club Struck No Fear",
    shortLabel: "Club",
    countTarget: 5,
    blurb: "Hater Central's club prize. Collective bottling. Shared accountability. No refunds.",
    poster: "/flyers/clubs-poster.jpg",
  },
];

export const HUBS = [
  {
    slug: "mens",
    title: "Men's Ballon D'ont",
    ids: ["mens"] as AwardCategory[],
    poster: "/flyers/mens-poster.jpg",
  },
  {
    slug: "yashit",
    title: "Yashit Trophy",
    ids: ["yashit"] as AwardCategory[],
    poster: "/flyers/yashit-1.jpg",
  },
  {
    slug: "coach",
    title: "Coach of the Year",
    ids: ["coach"] as AwardCategory[],
    poster: "/flyers/coaches-poster.jpg",
  },
  {
    slug: "club",
    title: "Club Struck No Fear",
    ids: ["club"] as AwardCategory[],
    poster: "/flyers/clubs-title.jpg",
  },
] as const;

export type HubSlug = (typeof HUBS)[number]["slug"];

import type { AwardCategory } from "./types";

export type CategoryMeta = {
  id: AwardCategory;
  hub: "mens" | "womens" | "young-talent" | "goalkeeper" | "coach" | "club" | "striker";
  label: string;
  shortLabel: string;
  countTarget: number;
  blurb: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "mens",
    hub: "mens",
    label: "Men's Ballon Don't",
    shortLabel: "Men",
    countTarget: 30,
    blurb: "Thirty names. Zero aura. The main prize for the season's loudest disappearances.",
  },
  {
    id: "womens",
    hub: "womens",
    label: "Women's Ballon Don't",
    shortLabel: "Women",
    countTarget: 30,
    blurb: "The other main prize. Same jury. Same charge sheet. Different fixture list.",
  },
  {
    id: "young-talent-mens",
    hub: "young-talent",
    label: "Men's Young Don't",
    shortLabel: "Young Men",
    countTarget: 10,
    blurb: "Under 21 and already collecting excuses.",
  },
  {
    id: "young-talent-womens",
    hub: "young-talent",
    label: "Women's Young Don't",
    shortLabel: "Young Women",
    countTarget: 5,
    blurb: "The future, briefly delayed.",
  },
  {
    id: "goalkeeper-mens",
    hub: "goalkeeper",
    label: "Men's Howler of the Year",
    shortLabel: "Men's GK",
    countTarget: 10,
    blurb: "For the gloves that turned a cross into folklore.",
  },
  {
    id: "goalkeeper-womens",
    hub: "goalkeeper",
    label: "Women's Howler of the Year",
    shortLabel: "Women's GK",
    countTarget: 5,
    blurb: "Same posts. Same panic. Different league table.",
  },
  {
    id: "coach-mens",
    hub: "coach",
    label: "Men's Masterclass",
    shortLabel: "Men's Coach",
    countTarget: 5,
    blurb: "Score. Sub the scorer. Park the bus. Concede. Press conference.",
  },
  {
    id: "coach-womens",
    hub: "coach",
    label: "Women's Masterclass",
    shortLabel: "Women's Coach",
    countTarget: 5,
    blurb: "Tactical courage, punished in public.",
  },
  {
    id: "club-mens",
    hub: "club",
    label: "Men's Club of the Year",
    shortLabel: "Men's Club",
    countTarget: 5,
    blurb: "Collective bottling. Shared accountability. No refunds.",
  },
  {
    id: "club-womens",
    hub: "club",
    label: "Women's Club of the Year",
    shortLabel: "Women's Club",
    countTarget: 5,
    blurb: "The dressing room that could not close.",
  },
  {
    id: "striker-mens",
    hub: "striker",
    label: "Men's Open Goal",
    shortLabel: "Men's Striker",
    countTarget: 10,
    blurb: "For the finishers who finished nothing.",
  },
  {
    id: "striker-womens",
    hub: "striker",
    label: "Women's Open Goal",
    shortLabel: "Women's Striker",
    countTarget: 5,
    blurb: "The six-yard box remains undefeated.",
  },
];

export const HUBS = [
  {
    slug: "mens",
    title: "Men's Ballon Don't",
    ids: ["mens"] as AwardCategory[],
  },
  {
    slug: "womens",
    title: "Women's Ballon Don't",
    ids: ["womens"] as AwardCategory[],
  },
  {
    slug: "young-talent",
    title: "Young Don't of the Year",
    ids: ["young-talent-mens", "young-talent-womens"] as AwardCategory[],
  },
  {
    slug: "goalkeeper",
    title: "Howler of the Year",
    ids: ["goalkeeper-mens", "goalkeeper-womens"] as AwardCategory[],
  },
  {
    slug: "coach",
    title: "Masterclass of the Year",
    ids: ["coach-mens", "coach-womens"] as AwardCategory[],
  },
  {
    slug: "club",
    title: "Club of the Year",
    ids: ["club-mens", "club-womens"] as AwardCategory[],
  },
  {
    slug: "striker",
    title: "Open Goal of the Year",
    ids: ["striker-mens", "striker-womens"] as AwardCategory[],
  },
] as const;

export type HubSlug = (typeof HUBS)[number]["slug"];

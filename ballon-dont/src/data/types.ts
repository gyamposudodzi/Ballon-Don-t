export type AwardCategory =
  | "mens"
  | "womens"
  | "young-talent-mens"
  | "young-talent-womens"
  | "goalkeeper-mens"
  | "goalkeeper-womens"
  | "coach-mens"
  | "coach-womens"
  | "club-mens"
  | "club-womens"
  | "striker-mens"
  | "striker-womens";

export type NomineeKind = "player" | "coach" | "club";

export type ShameStat = {
  label: string;
  value: string;
};

export type Nominee = {
  slug: string;
  name: string;
  kind: NomineeKind;
  club?: string;
  nation: string;
  position?: string;
  categories: AwardCategory[];
  charge: string;
  roast: string;
  stats: ShameStat[];
  why: string;
  relatedStorySlugs: string[];
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  author: string;
  categoryLabel: string;
  body: string[];
  relatedNomineeSlugs: string[];
};

export type PastWinner = {
  year: number;
  award: string;
  name: string;
  note: string;
};

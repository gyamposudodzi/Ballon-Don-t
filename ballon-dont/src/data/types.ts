export type AwardCategory = "mens" | "yashit" | "coach" | "club";

export type NomineeKind = "player" | "coach" | "club";

export type ShameStat = {
  label: string;
  value: string;
};

export type Nominee = {
  slug: string;
  name: string;
  firstName?: string;
  lastName?: string;
  kind: NomineeKind;
  club?: string;
  nation: string;
  nationCode?: string;
  position?: string;
  age?: string;
  nominations?: number;
  image?: string;
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

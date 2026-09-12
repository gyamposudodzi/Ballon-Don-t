export const SITE = {
  name: "Ballon Don't",
  shortName: "Don't",
  tagline: "The least prestigious award in football",
  description:
    "Ballon Don't is the anti-Ballon d'Or: a satirical shortlist for stinkers, bottled nights, and premium invisibility, compiled in the spirit of Hater Central.",
  year: 2026,
  edition: 1,
  ceremony: {
    dateLabel: "26 October 2026",
    timeLabel: "8:00 p.m. London",
    iso: "2026-10-26T20:00:00.000Z",
    venue: "The Complaint Palladium, London",
    city: "London",
  },
  social: {
    x: "https://x.com/TheHateCentral",
    instagram: "https://www.instagram.com/thehatecentral/",
    handle: "@TheHateCentral",
    name: "Hater Central",
  },
  jury: {
    size: 100,
    method: "One hater per eligible nation. Rank a top 10. Fifteen points for the worst night, one point for a mild disappearance.",
  },
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/nominees", label: "Nominees" },
  { href: "/stories", label: "Stories" },
  { href: "/the-ballon-dont", label: "The Ballon Don't" },
  { href: "/ceremony", label: "Ceremony" },
] as const;

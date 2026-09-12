import { CATEGORIES, HUBS, type HubSlug } from "@/data/categories";
import { nominees } from "@/data/nominees";
import { stories } from "@/data/stories";
import type { AwardCategory, Nominee, Story } from "@/data/types";

export function getNominee(slug: string): Nominee | undefined {
  return nominees.find((nominee) => nominee.slug === slug);
}

export function getNomineesByCategory(category: AwardCategory): Nominee[] {
  return nominees.filter((nominee) => nominee.categories.includes(category));
}

export function getNomineesByHub(hub: HubSlug): { id: AwardCategory; nominees: Nominee[] }[] {
  const meta = HUBS.find((item) => item.slug === hub);
  if (!meta) return [];
  return meta.ids.map((id) => ({
    id,
    nominees: getNomineesByCategory(id),
  }));
}

export function getCategoryMeta(id: AwardCategory) {
  return CATEGORIES.find((category) => category.id === id);
}

export function getHub(hub: HubSlug) {
  return HUBS.find((item) => item.slug === hub);
}

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getLatestStories(limit = 6): Story[] {
  return [...stories]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedStories(slugs: string[]): Story[] {
  return slugs
    .map((slug) => getStory(slug))
    .filter((story): story is Story => Boolean(story));
}

export function getRelatedNominees(slugs: string[]): Nominee[] {
  return slugs
    .map((slug) => getNominee(slug))
    .filter((nominee): nominee is Nominee => Boolean(nominee));
}

export function getMensBallot(): Nominee[] {
  return getNomineesByCategory("mens");
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00.000Z`));
}

export function initials(name: string): string {
  const parts = name.replace(/['’]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function avatarTone(slug: string): string {
  const tones = [
    "from-rust to-ink-950",
    "from-bronze to-ink-900",
    "from-rust-hot to-ink-900",
    "from-ink-800 to-bronze",
    "from-bronze-light/50 to-ink-950",
  ];
  const index = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return tones[index % tones.length];
}

export function categoryCount(id: AwardCategory): number {
  return getNomineesByCategory(id).length;
}

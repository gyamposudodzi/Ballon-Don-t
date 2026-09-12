import Link from "next/link";
import type { Story } from "@/data/types";
import { formatDate } from "@/lib/content";

type StoryCardProps = {
  story: Story;
  featured?: boolean;
};

export function StoryCard({ story, featured = false }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={`group block border border-line bg-ink-900/50 transition hover:border-bronze/60 ${
        featured ? "p-6 sm:p-8" : "p-5"
      }`}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">
        {story.categoryLabel} · {formatDate(story.date)}
      </p>
      <h3
        className={`mt-3 font-serif text-cream group-hover:text-bronze-light ${
          featured ? "text-3xl" : "text-xl"
        }`}
      >
        {story.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-cream-dim">{story.dek}</p>
    </Link>
  );
}

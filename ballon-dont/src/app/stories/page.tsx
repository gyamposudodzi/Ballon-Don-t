import { PageHero } from "@/components/PageHero";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/stories";
import { formatDate } from "@/lib/content";

export const metadata = {
  title: "Stories",
  description: "Latest stories and charge sheets from the Ballon Don't desk.",
};

export default function StoriesPage() {
  const [featured, ...rest] = [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        kicker="The latest"
        title="Stories & highlights"
        dek="Unveiling notes, jury rules, category deep dives, and the London countdown."
      />
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-14 sm:px-6">
        {featured ? <StoryCard story={featured} featured /> : null}
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
        <p className="text-xs text-cream-dim">
          Desk copy is original. Dates follow the 2026 unveiling week. Last updated {formatDate(featured?.date ?? "2026-09-16")}.
        </p>
      </section>
    </>
  );
}

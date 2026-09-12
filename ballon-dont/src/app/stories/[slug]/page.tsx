import Link from "next/link";
import { notFound } from "next/navigation";
import { NomineeCard } from "@/components/NomineeCard";
import { stories } from "@/data/stories";
import { formatDate, getRelatedNominees, getStory } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story" };
  return { title: story.title, description: story.dek };
}

export default async function StoryArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const related = getRelatedNominees(story.relatedNomineeSlugs);

  return (
    <article>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
            {story.categoryLabel} · {formatDate(story.date)}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{story.title}</h1>
          <p className="mt-5 text-lg text-cream-dim">{story.dek}</p>
          <p className="mt-6 text-sm text-cream-dim">{story.author}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
        {story.body.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-cream-dim">
            {paragraph}
          </p>
        ))}
        <Link href="/stories" className="inline-block text-xs tracking-[0.16em] uppercase text-bronze-light">
          All stories
        </Link>
      </section>
      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl">Names in this file</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((nominee) => (
              <NomineeCard key={nominee.slug} nominee={nominee} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

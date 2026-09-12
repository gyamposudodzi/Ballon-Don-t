import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/StoryCard";
import { CATEGORIES } from "@/data/categories";
import { nominees } from "@/data/nominees";
import { avatarTone, getNominee, getRelatedStories, initials } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return nominees.map((nominee) => ({ slug: nominee.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const nominee = getNominee(slug);
  if (!nominee) return { title: "Nominee" };
  return {
    title: nominee.name,
    description: nominee.charge,
  };
}

export default async function NomineeProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const nominee = getNominee(slug);
  if (!nominee) notFound();

  const stories = getRelatedStories(nominee.relatedStorySlugs);
  const categoryLabels = nominee.categories
    .map((id) => CATEGORIES.find((category) => category.id === id)?.label)
    .filter(Boolean);

  return (
    <article>
      <section className="border-b border-[#FCD4A0]/30">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-14 md:flex-row md:items-end">
          <div
            className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[#FCD4A0] text-3xl text-[#FCD4A0] ${avatarTone(nominee.slug)}`}
          >
            {initials(nominee.name)}
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
              {nominee.nation}
              {nominee.club ? ` · ${nominee.club}` : ""}
              {nominee.position ? ` · ${nominee.position}` : ""}
            </p>
            <h1 className="mt-3 text-4xl font-medium uppercase tracking-[0.04em] sm:text-6xl">{nominee.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-cream-dim">{nominee.charge}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryLabels.map((label) => (
                <span key={label} className="border border-line px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-bronze-light">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="section-title">The roast</h2>
          <p className="mt-4 text-base leading-8 text-cream-dim">{nominee.roast}</p>
          <h2 className="section-title mt-10">Why they&apos;re nominated</h2>
          <p className="mt-4 text-base leading-8 text-cream-dim">{nominee.why}</p>
        </div>
        <aside className="border border-line bg-ink-900/50 p-6">
          <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Stats of shame</p>
          <dl className="mt-5 space-y-4">
            {nominee.stats.map((stat) => (
              <div key={stat.label} className="border-b border-line pb-4 last:border-0">
                <dt className="text-xs tracking-[0.16em] uppercase text-cream-dim">{stat.label}</dt>
                <dd className="mt-1 font-serif text-2xl text-bronze-light">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {stories.length > 0 ? (
        <section className="mx-auto max-w-[1200px] px-4 pb-16">
          <h2 className="section-title">Related stories</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-[1200px] px-4 pb-16">
        <Link href="/nominees" className="text-xs tracking-[0.16em] uppercase text-bronze-light">
          Back to all nominees
        </Link>
      </div>
    </article>
  );
}

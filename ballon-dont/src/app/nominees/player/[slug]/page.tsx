import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCard } from "@/components/StoryCard";
import { TrophyMark } from "@/components/TrophyMark";
import { CATEGORIES } from "@/data/categories";
import { nominees } from "@/data/nominees";
import { getNominee, getRelatedStories, initials } from "@/lib/content";

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
  const last = nominee.lastName ?? nominee.name;
  const first =
    nominee.firstName && nominee.firstName.toLowerCase() !== last.toLowerCase() ? nominee.firstName : "";

  return (
    <article>
      <section className="border-b border-[#FCD4A0]/30">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="gold-frame bg-[#050C13]">
            {nominee.image ? (
              <img src={nominee.image} alt={nominee.name} className="w-full object-cover" />
            ) : (
              <div className="flyer-card relative aspect-[4/5] px-8 pb-8 pt-10">
                <p className="absolute right-8 top-8 text-[11px] tracking-[0.28em] text-[#FCD4A0]/70">20 26</p>
                <div className="flex items-start justify-between">
                  <span className="flex h-40 w-40 items-center justify-center rounded-full border border-[#FCD4A0]/40 bg-[#223A49] text-4xl text-[#FCD4A0]">
                    {initials(nominee.name)}
                  </span>
                  <TrophyMark className="mt-16 h-24 w-24" />
                </div>
                <div className="absolute inset-x-8 bottom-16">
                  {first ? <p className="text-2xl text-[#1a1208]">{first}</p> : null}
                  <p className="mt-1 text-5xl font-medium uppercase leading-[0.9] text-[#1a1208]">{last}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
              {nominee.age ? `${nominee.age} · ` : ""}
              {nominee.nation}
              {nominee.nationCode ? ` (${nominee.nationCode})` : ""}
              {nominee.club ? ` · ${nominee.club}` : ""}
              {nominee.position ? ` · ${nominee.position}` : ""}
            </p>
            <h1 className="mt-3 text-4xl font-medium uppercase tracking-[0.04em] sm:text-6xl">{nominee.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-cream-dim">{nominee.charge}</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#877458]">
              {nominee.nominations ?? 1} nomination
              {(nominee.nominations ?? 1) === 1 ? "" : "s"}
            </p>
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

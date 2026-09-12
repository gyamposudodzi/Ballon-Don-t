import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { HomePoll } from "@/components/HomePoll";
import { NomineeCard } from "@/components/NomineeCard";
import { StoryCard } from "@/components/StoryCard";
import { TrophyMark } from "@/components/TrophyMark";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/data/site";
import { pastWinners } from "@/data/winners";
import { categoryCount, getLatestStories, getNomineesByCategory } from "@/lib/content";

export default function Home() {
  const featured = getNomineesByCategory("mens").slice(0, 6);
  const stories = getLatestStories(4);
  const winners = pastWinners.filter((winner) => winner.year === 2026);
  const hubs = [
    CATEGORIES.find((item) => item.id === "mens"),
    CATEGORIES.find((item) => item.id === "womens"),
    CATEGORIES.find((item) => item.id === "young-talent-mens"),
    CATEGORIES.find((item) => item.id === "goalkeeper-mens"),
    CATEGORIES.find((item) => item.id === "coach-mens"),
    CATEGORIES.find((item) => item.id === "club-mens"),
  ].filter(Boolean);

  return (
    <>
      <section className="grain overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-bronze-light">
              {SITE.year} · Edition {SITE.edition}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-cream sm:text-7xl">
              Ballon <span className="italic text-rust-hot">Don&apos;t</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream-dim">{SITE.tagline}.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-cream-dim">
              Charge sheets compiled in the spirit of {SITE.social.name}. Ceremony {SITE.ceremony.dateLabel} at{" "}
              {SITE.ceremony.venue}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/nominees"
                className="rounded-full bg-rust px-5 py-3 text-xs tracking-[0.18em] uppercase transition hover:bg-rust-hot"
              >
                See the nominees
              </Link>
              <Link
                href="/ceremony"
                className="rounded-full border border-bronze/50 px-5 py-3 text-xs tracking-[0.18em] uppercase text-bronze-light hover:border-bronze-light"
              >
                The ceremony
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <TrophyMark className="h-52 w-52 drop-shadow-[0_20px_40px_rgba(194,65,12,0.25)] sm:h-64 sm:w-64" />
            <div className="w-full">
              <p className="mb-3 text-center text-[10px] tracking-[0.24em] uppercase text-bronze-light">
                Until London
              </p>
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <HomePoll />
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Opening names</p>
              <h2 className="mt-2 font-serif text-3xl">Men&apos;s charge sheet</h2>
            </div>
            <Link href="/nominees/mens" className="text-xs tracking-[0.16em] uppercase text-bronze-light">
              All 30
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((nominee) => (
              <NomineeCard key={nominee.slug} nominee={nominee} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Awards</p>
          <h2 className="mt-2 font-serif text-3xl">Every category, inverted</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((category) =>
              category ? (
                <Link
                  key={category.id}
                  href={`/nominees/${category.hub}`}
                  className="border border-line bg-ink-950/40 p-5 transition hover:border-bronze/60"
                >
                  <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">
                    {categoryCount(category.id)} names
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">{category.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream-dim">{category.blurb}</p>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Stories</p>
            <h2 className="mt-2 font-serif text-3xl">Latest charge sheets</h2>
          </div>
          <Link href="/stories" className="text-xs tracking-[0.16em] uppercase text-bronze-light">
            All stories
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {stories.map((story, index) => (
            <StoryCard key={story.slug} story={story} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-900/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Archive</p>
              <h2 className="mt-2 font-serif text-3xl">Still to be crowned</h2>
            </div>
            <Link href="/winners" className="text-xs tracking-[0.16em] uppercase text-bronze-light">
              Full archive
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {winners.map((winner) => (
              <div key={winner.award} className="border border-line p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">{winner.year}</p>
                <h3 className="mt-2 font-serif text-2xl">{winner.award}</h3>
                <p className="mt-2 text-bronze-light">{winner.name}</p>
                <p className="mt-2 text-sm text-cream-dim">{winner.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

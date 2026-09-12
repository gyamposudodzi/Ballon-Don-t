import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { Countdown } from "@/components/Countdown";
import { HomePoll } from "@/components/HomePoll";
import { NomineeCard } from "@/components/NomineeCard";
import { StoryCard } from "@/components/StoryCard";
import { HUBS } from "@/data/categories";
import { SITE } from "@/data/site";
import { pastWinners } from "@/data/winners";
import { getLatestStories, getNomineesByCategory } from "@/lib/content";

export default function Home() {
  const featured = getNomineesByCategory("mens").slice(0, 6);
  const stories = getLatestStories(6);
  const [lead, ...rest] = stories;
  const archive = pastWinners.filter((winner) => winner.year < 2026).slice(0, 5);

  return (
    <>
      <section className="px-4 pt-4 md:px-6">
        <Link href="/nominees" className="gold-frame group relative mx-auto block max-w-[1400px]">
          <div className="relative aspect-[1920/640] overflow-hidden bg-black">
            <img
              src="/flyers/ceremony-h2.jpg"
              alt="Ballon D'ont H-2 nominees announcement"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14">
              <p className="text-xs uppercase tracking-[0.22em] text-[#F5F1DC]">London · 26 October 2026</p>
              <h1 className="mt-3 max-w-xl text-3xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-[#FCD4A0] md:text-6xl">
                Nominees 2026
              </h1>
              <p className="mt-3 max-w-md text-sm text-[#F5F1DC] md:text-lg">
                {SITE.tagline}. The Hater Central flyers are live.
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title">Nominees 2026</h2>
          <Link href="/nominees" className="text-sm text-[#FCD4A0] hover:text-white">
            All the nominees
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {HUBS.map((hub) => (
            <Link
              key={hub.slug}
              href={`/nominees/${hub.slug}`}
              className="gold-frame group relative aspect-[16/10] overflow-hidden bg-[#050C13]"
            >
              <img
                src={hub.poster}
                alt={hub.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#FCD4A0]">2026</p>
                <h3 className="mt-1 text-xl text-[#F5F1DC] md:text-2xl">{hub.title}</h3>
                <p className="mt-1 text-sm text-[#F5F1DC]/80">Discover the nominees</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6 md:px-6">
        <h2 className="section-title mb-8">Insights</h2>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          {lead ? <StoryCard story={lead} featured /> : null}
          <div className="grid gap-4">
            {rest.slice(0, 2).map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F1DC] py-10 text-black">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 px-4">
          <div className="gold-divider" />
          <h2 className="text-4xl font-normal uppercase tracking-[0.04em] md:text-5xl">Stories of</h2>
          <BrandMark invert />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.slice(2).map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title">Men&apos;s Nominees</h2>
          <Link href="/nominees/mens" className="text-sm text-[#FCD4A0] hover:text-white">
            See the nominees
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((nominee) => (
            <NomineeCard key={nominee.slug} nominee={nominee} />
          ))}
        </div>
      </section>

      <section className="bg-[#FCD4A0]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 text-black md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-4xl font-medium uppercase">Fan Zone</h2>
            <p className="mt-3 text-lg">Test your knowledge. Vote now.</p>
            <div className="mt-8">
              <Countdown />
            </div>
            <p className="mt-4 text-sm text-black/70">
              Until London · {SITE.ceremony.dateLabel} · {SITE.ceremony.timeLabel}
            </p>
          </div>
          <HomePoll />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-6">
        <h2 className="section-title mb-8">Honorary D&apos;onts</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {archive.map((winner) => (
            <Link
              key={`${winner.year}-${winner.award}`}
              href="/winners"
              className="min-w-[180px] border border-[#FCD4A0] p-5"
            >
              <p className="text-sm text-[#877458]">{winner.year}</p>
              <p className="mt-3 text-xl text-[#FCD4A0]">{winner.name}</p>
            </Link>
          ))}
          <Link href="/winners" className="min-w-[180px] border border-[#FCD4A0] p-5">
            <p className="text-sm text-[#877458]">2026</p>
            <p className="mt-3 text-xl text-[#FCD4A0]">To be crowned</p>
          </Link>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { HomePoll } from "@/components/HomePoll";
import { NomineeCard } from "@/components/NomineeCard";
import { StoryCard } from "@/components/StoryCard";
import { HUBS } from "@/data/categories";
import { SITE } from "@/data/site";
import { pastWinners } from "@/data/winners";
import { getLatestStories, getNomineesByCategory } from "@/lib/content";

export default function Home() {
  const featured = getNomineesByCategory("mens").slice(0, 6);
  const stories = getLatestStories(9);
  const [lead, ...rest] = stories;
  const archive = pastWinners.filter((winner) => winner.year < 2026).slice(0, 5);

  return (
    <>
      <section>
        <Link href="/nominees" className="group relative block overflow-hidden">
          <div className="relative aspect-[1920/640] min-h-[280px] bg-black">
            <img
              src="/flyers/ceremony-h2.jpg"
              alt="Ballon D'ont H-2 nominees announcement"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
              <p className="text-xs uppercase tracking-[0.22em] text-[#F5F1DC]">London · 26 October 2026</p>
              <h1 className="mt-3 max-w-xl text-4xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-[#FCD4A0] md:text-6xl">
                Nominees 2026
              </h1>
              <p className="mt-3 max-w-md text-sm text-[#F5F1DC] md:text-lg">
                {SITE.tagline}. The Hater Central flyers are live.
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 md:px-6">
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

      <section className="mx-auto max-w-[1280px] px-4 pb-6 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title">Nominees 2026</h2>
          <Link href="/nominees" className="text-sm text-[#FCD4A0] hover:text-white">
            All the nominees
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HUBS.map((hub) => (
            <Link key={hub.slug} href={`/nominees/${hub.slug}`} className="group relative overflow-hidden rounded-2xl bg-[#141414]">
              <img src={hub.poster} alt="" className="aspect-[16/11] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#FCD4A0]">2026</p>
                <h3 className="mt-1 text-lg text-[#F5F1DC]">{hub.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#FCD4A0] py-10 text-black">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-2 px-4">
          <div className="gold-divider" />
          <h2 className="text-4xl font-normal uppercase tracking-[0.04em] md:text-5xl">Stories of</h2>
          <BrandMark invert />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.slice(2, 8).map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-title">Men&apos;s Ballon D&apos;ont</h2>
          <Link href="/nominees" className="text-sm text-[#FCD4A0] hover:text-white">
            See the nominees
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((nominee) => (
            <NomineeCard key={nominee.slug} nominee={nominee} />
          ))}
        </div>
      </section>

      <section className="bg-[#FCD4A0]">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 text-black md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em]">Fan Zone</p>
            <h2 className="mt-2 text-4xl font-medium uppercase">Become the rust expert</h2>
            <p className="mt-3 text-lg">Pronostics, quizzes, and the hater ballot.</p>
            <Link
              href="/fan-zone"
              className="mt-8 inline-flex rounded-full bg-black px-5 py-2 text-xs uppercase tracking-[0.14em] text-[#FCD4A0]"
            >
              Enter Fan Zone
            </Link>
          </div>
          <HomePoll />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-6">
        <h2 className="section-title mb-8">Honorary D&apos;onts</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {archive.map((winner) => (
            <Link
              key={`${winner.year}-${winner.award}`}
              href="/winners"
              className="min-w-[180px] rounded-2xl bg-[#141414] p-5"
            >
              <p className="text-sm text-[#877458]">{winner.year}</p>
              <p className="mt-3 text-xl text-[#FCD4A0]">{winner.name}</p>
            </Link>
          ))}
          <Link href="/winners" className="min-w-[180px] rounded-2xl bg-[#141414] p-5">
            <p className="text-sm text-[#877458]">2026</p>
            <p className="mt-3 text-xl text-[#FCD4A0]">To be crowned</p>
          </Link>
        </div>
      </section>
    </>
  );
}

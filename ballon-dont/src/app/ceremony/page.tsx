import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { PageHero } from "@/components/PageHero";
import { TrophyMark } from "@/components/TrophyMark";
import { SITE } from "@/data/site";

export const metadata = {
  title: "Ceremony",
  description: "London, 26 October 2026. How to watch the Don't.",
};

export default function CeremonyPage() {
  return (
    <>
      <PageHero
        kicker="26 October 2026"
        title="London 2026"
        dek="A very serious room for a very unserious trophy. The Hater jury's tallies close at 8:00 p.m."
      />
      <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pb-20 lg:grid-cols-2">
        <div>
          <dl className="space-y-5">
            <div>
              <dt className="text-xs tracking-[0.2em] uppercase text-bronze-light">Date</dt>
              <dd className="mt-1 font-serif text-2xl">{SITE.ceremony.dateLabel}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] uppercase text-bronze-light">Time</dt>
              <dd className="mt-1 font-serif text-2xl">{SITE.ceremony.timeLabel}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] uppercase text-bronze-light">Venue</dt>
              <dd className="mt-1 font-serif text-2xl">{SITE.ceremony.venue}</dd>
            </div>
          </dl>
          <p className="mt-8 text-base leading-8 text-cream-dim">
            There is no fake livestream. If you want gold, watch the other ceremony. Then come back here for
            the minutes that matter: the charge sheets, the vote, the stories. What gets announced: the Men&apos;s
            Nominees, the Yashit Trophy, Coach of the Year, and Club Struck No Fear.
          </p>
          <Link
            href="/vote"
            className="mt-8 inline-flex bg-[#FCD4A0] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-black"
          >
            File your ballot
          </Link>
        </div>
        <div className="gold-frame flex flex-col items-center gap-6 bg-[#050C13] p-8">
          <TrophyMark className="h-44 w-44" />
          <div className="w-full">
            <p className="mb-3 text-center text-[10px] tracking-[0.24em] uppercase text-bronze-light">
              Until the rust ball moves
            </p>
            <Countdown />
          </div>
        </div>
      </section>
    </>
  );
}

import { PageHero } from "@/components/PageHero";
import { pastWinners } from "@/data/winners";

export const metadata = {
  title: "Archive",
  description: "Honorary Don'ts and the 2026 names still to be crowned.",
};

export default function WinnersPage() {
  const years = [...new Set(pastWinners.map((winner) => winner.year))].sort((a, b) => b - a);

  return (
    <>
      <PageHero
        kicker="Winners archive"
        title="The rust ball, and the years before it existed"
        dek="2026 is the first official night. Earlier names are honorary exhibits from the Hater Central era."
      />
      <section className="mx-auto max-w-6xl space-y-12 px-4 py-14 sm:px-6">
        {years.map((year) => (
          <div key={year}>
            <h2 className="font-serif text-3xl text-bronze-light">{year}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {pastWinners
                .filter((winner) => winner.year === year)
                .map((winner) => (
                  <article key={`${winner.year}-${winner.award}`} className="border border-line bg-ink-900/40 p-6">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">{winner.award}</p>
                    <h3 className="mt-3 font-serif text-2xl">{winner.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-cream-dim">{winner.note}</p>
                  </article>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

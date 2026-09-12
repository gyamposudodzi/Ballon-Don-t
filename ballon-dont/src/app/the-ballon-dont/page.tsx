import { PageHero } from "@/components/PageHero";
import { SITE } from "@/data/site";

export const metadata = {
  title: "The Ballon Don't",
  description: "History, inverted rules, and the three anti-criteria.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="History & legacy"
        title="The least prestigious award in football"
        dek="A rust ball for the year you would rather forget. Built as the opposite of the gold night."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="border border-line p-6">
          <p className="font-serif text-4xl text-bronze-light">2026</p>
          <p className="mt-2 text-sm text-cream-dim">First public edition</p>
        </div>
        <div className="border border-line p-6">
          <p className="font-serif text-4xl text-bronze-light">{SITE.jury.size}</p>
          <p className="mt-2 text-sm text-cream-dim">International haters</p>
        </div>
        <div className="border border-line p-6">
          <p className="font-serif text-4xl text-bronze-light">10</p>
          <p className="mt-2 text-sm text-cream-dim">Names ranked per ballot</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-12 px-4 pb-16 sm:px-6">
        <div>
          <h2 className="font-serif text-3xl">History</h2>
          <p className="mt-4 text-base leading-8 text-cream-dim">
            For nearly seven decades the other award has stood as football&apos;s most serious individual night.
            Ballon Don&apos;t is the afterparty that tells the truth: the stinker, the bottled header, the
            90-minute disappearing act. The charge sheets were already being written in public by{" "}
            {SITE.social.name}. This site is the museum.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-3xl">Award rules</h2>
          <p className="mt-4 text-base leading-8 text-cream-dim">{SITE.jury.method}</p>
          <p className="mt-4 text-base leading-8 text-cream-dim">
            Thirty men. Thirty women. Supporting lists for young talent, gloves, benches, clubs, and strikers.
            Only the year under review counts. Legacy is aggravation, not mitigation.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-3xl">Criteria</h2>
          <ol className="mt-6 space-y-5">
            <li className="border border-line p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">01 · Individual stinker</p>
              <p className="mt-2 text-cream-dim">
                The night they were supposed to show up and filed a missing-person report instead.
              </p>
            </li>
            <li className="border border-line p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">02 · Team collapse</p>
              <p className="mt-2 text-cream-dim">
                Shared accountability. The sub that removed the scorer. The high line that became folklore.
              </p>
            </li>
            <li className="border border-line p-5">
              <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">03 · No class / no fair play</p>
              <p className="mt-2 text-cream-dim">
                The opposite of the gold night&apos;s third pillar. Theatrics, excuses, blue filters, and press-conference poetry.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}

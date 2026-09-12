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
        title="History"
        dek="For one public edition so far, Ballon Don't has stood as the least prestigious individual accolade in football. It honours the nights players would rather delete."
      />
      <section className="mx-auto grid max-w-[1200px] gap-6 px-4 pb-16 md:grid-cols-3">
        {[
          ["2026", "First edition"],
          ["1", "Ceremony held"],
          [String(SITE.jury.size), "International haters"],
        ].map(([value, label]) => (
          <div key={label} className="border border-[#FCD4A0] p-8 text-center">
            <p className="text-5xl text-[#FCD4A0]">{value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#F5F1DC]">{label}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[800px] px-4 pb-16">
        <h2 className="section-title">Award rules</h2>
        <p className="mt-6 text-base leading-8 text-[#F5F1DC]">{SITE.jury.method}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["30", "Men nominees"],
            ["30", "Women nominees"],
            ["10", "Top players ranked"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-4xl text-[#FCD4A0]">{value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#F5F1DC]">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[800px] px-4 pb-20">
        <h2 className="section-title">Criteria</h2>
        <p className="mt-6 text-base leading-8 text-[#F5F1DC]">
          Ballon Don&apos;t is awarded on three pillars, in order of importance: individual stinker, team collapse,
          and no class / no fair play.
        </p>
        <ol className="mt-8 space-y-4">
          {[
            ["01", "Individual stinker", "The night they were supposed to show up."],
            ["02", "Team collapse", "The sub that removed the scorer. The header still conceded."],
            ["03", "No class / no fair play", "Theatrics, excuses, blue filters, press-conference poetry."],
          ].map(([n, title, body]) => (
            <li key={n} className="border border-[#FCD4A0] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#877458]">
                {n} · {title}
              </p>
              <p className="mt-2 text-[#F5F1DC]">{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

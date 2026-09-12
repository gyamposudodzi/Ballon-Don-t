import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { HUBS } from "@/data/categories";
import { SITE } from "@/data/site";
import { categoryCount } from "@/lib/content";

export const metadata = {
  title: "Nominees",
  description: "Every Ballon D'ont shortlist in one place.",
};

export default function NomineesPage() {
  return (
    <>
      <PageHero
        kicker={`${SITE.year} shortlists`}
        title="All the nominees of the 2026 Ballon D'ont"
        dek="Hater Central's flyers, hung in the gold frames. Men's Nominees, Yashit Trophy, Coach of the Year, Club Struck No Fear."
      />
      <section className="mx-auto max-w-[1200px] px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {HUBS.map((hub) => {
            const total = hub.ids.reduce((sum, id) => sum + categoryCount(id), 0);
            return (
              <Link key={hub.slug} href={`/nominees/${hub.slug}`} className="gold-frame group relative overflow-hidden bg-[#050C13]">
                <img
                  src={hub.poster}
                  alt={hub.title}
                  className="aspect-[16/11] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#FCD4A0]">{total} nominees</p>
                  <h2 className="mt-2 text-3xl text-[#F5F1DC]">{hub.title}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

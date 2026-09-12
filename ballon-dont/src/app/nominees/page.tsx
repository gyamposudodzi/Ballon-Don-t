import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CATEGORIES, HUBS } from "@/data/categories";
import { SITE } from "@/data/site";
import { categoryCount } from "@/lib/content";

export const metadata = {
  title: "Nominees",
  description: "Every Ballon Don't shortlist in one place.",
};

export default function NomineesPage() {
  return (
    <>
      <PageHero
        kicker={`${SITE.year} shortlists`}
        title="All the nominees of the 2026 Ballon Don't"
        dek="Discover the complete list of nominees in one place. The countdown to the winners begins now."
      />
      <section className="mx-auto max-w-[1200px] px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {HUBS.map((hub) => {
            const cats = CATEGORIES.filter((category) => hub.ids.includes(category.id));
            const total = hub.ids.reduce((sum, id) => sum + categoryCount(id), 0);
            return (
              <Link
                key={hub.slug}
                href={`/nominees/${hub.slug}`}
                className="gold-frame bg-[#050C13] p-6 hover:bg-[#223A49]"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#877458]">{total} nominees</p>
                <h2 className="mt-2 text-3xl text-[#FCD4A0]">{hub.title}</h2>
                <ul className="mt-4 space-y-1 text-sm text-[#F5F1DC]">
                  {cats.map((category) => (
                    <li key={category.id}>
                      {category.label} · {categoryCount(category.id)}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

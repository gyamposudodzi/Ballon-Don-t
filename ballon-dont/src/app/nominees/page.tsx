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
        title="All the nominees of the Ballon Don't"
        dek="The recap of all recaps. Who bottled it. Who vanished. Who should take home the rust."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {HUBS.map((hub) => {
            const cats = CATEGORIES.filter((category) => hub.ids.includes(category.id));
            const total = hub.ids.reduce((sum, id) => sum + categoryCount(id), 0);
            return (
              <Link
                key={hub.slug}
                href={`/nominees/${hub.slug}`}
                className="border border-line bg-ink-900/40 p-6 transition hover:border-bronze/60"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">
                  {total} on the sheet
                </p>
                <h2 className="mt-2 font-serif text-3xl">{hub.title}</h2>
                <ul className="mt-4 space-y-1 text-sm text-cream-dim">
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

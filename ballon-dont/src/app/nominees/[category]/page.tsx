import { notFound } from "next/navigation";
import { NomineeGrid } from "@/components/NomineeGrid";
import { PageHero } from "@/components/PageHero";
import { CATEGORIES, HUBS, type HubSlug } from "@/data/categories";
import { getCategoryMeta, getNomineesByHub } from "@/lib/content";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return HUBS.map((hub) => ({ category: hub.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const hub = HUBS.find((item) => item.slug === category);
  if (!hub) return { title: "Nominees" };
  return {
    title: hub.title,
    description: `The ${hub.title} charge sheet.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const hub = HUBS.find((item) => item.slug === category);
  if (!hub) notFound();

  const groups = getNomineesByHub(hub.slug as HubSlug);
  const lead = CATEGORIES.find((item) => item.hub === hub.slug);

  return (
    <>
      <PageHero
        kicker="Nominees"
        title={hub.title}
        dek={lead?.blurb ?? "The Hater jury has filed these names."}
      />
      <section className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6">
        {groups.map((group) => {
          const meta = getCategoryMeta(group.id);
          return (
            <div key={group.id}>
              {groups.length > 1 ? (
                <div className="mb-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
                    {group.nominees.length} names
                  </p>
                  <h2 className="mt-2 font-serif text-3xl">{meta?.label}</h2>
                </div>
              ) : null}
              <NomineeGrid nominees={group.nominees} />
            </div>
          );
        })}
      </section>
    </>
  );
}

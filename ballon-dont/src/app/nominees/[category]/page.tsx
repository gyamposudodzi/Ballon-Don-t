import { notFound } from "next/navigation";
import { NomineeGrid } from "@/components/NomineeGrid";
import { HUBS, type HubSlug } from "@/data/categories";
import { getCategoryMeta, getNomineesByHub } from "@/lib/content";

type PageProps = {
  params: Promise<{ category: string }>;
};

const EXTRA_POSTERS: Partial<Record<HubSlug, string[]>> = {
  yashit: ["/flyers/yashit-2.jpg"],
  club: ["/flyers/clubs-poster.jpg"],
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
  const lead = getCategoryMeta(hub.ids[0]);
  const extras = EXTRA_POSTERS[hub.slug] ?? [];

  return (
    <>
      <section className="bg-black">
        <div className="mx-auto max-w-[1200px] px-4 pb-6 pt-10 md:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#877458]">Nominees</p>
          <h1 className="mt-3 text-4xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-[#FCD4A0] sm:text-6xl">
            {hub.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#F5F1DC] sm:text-lg">
            {lead?.blurb ?? "The Hater jury has filed these names."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-6 px-4 pb-10 md:px-6">
        <div className={`grid gap-4 ${extras.length ? "md:grid-cols-2" : ""}`}>
          <div className="gold-frame">
            <img src={hub.poster} alt={hub.title} className="w-full object-cover" />
          </div>
          {extras.map((src) => (
            <div key={src} className="gold-frame">
              <img src={src} alt={`${hub.title} poster`} className="w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] space-y-14 px-4 pb-20 md:px-6">
        {groups.map((group) => {
          const meta = getCategoryMeta(group.id);
          return (
            <div key={group.id}>
              {groups.length > 1 ? (
                <div className="mb-6">
                  <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
                    {group.nominees.length} names
                  </p>
                  <h2 className="section-title mt-2">{meta?.label}</h2>
                </div>
              ) : (
                <p className="mb-6 text-xs tracking-[0.2em] uppercase text-bronze-light">
                  {group.nominees.length} nominees
                </p>
              )}
              <NomineeGrid nominees={group.nominees} />
            </div>
          );
        })}
      </section>
    </>
  );
}

import { notFound } from "next/navigation";
import { NomineeExplorer } from "@/components/NomineeExplorer";
import { HUBS, type HubSlug } from "@/data/categories";
import { getNomineesByHub } from "@/lib/content";

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
    title: `${hub.title} Nominees`,
    description: `The ${hub.title} charge sheet.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const hub = HUBS.find((item) => item.slug === category);
  if (!hub) notFound();

  const groups = getNomineesByHub(hub.slug as HubSlug);
  const nominees = groups.flatMap((group) => group.nominees);

  return <NomineeExplorer hub={hub.slug} title={`${hub.title} Nominees`} nominees={nominees} />;
}

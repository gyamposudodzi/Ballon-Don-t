import Link from "next/link";
import { HUBS, type HubSlug } from "@/data/categories";
import { MiniBall } from "@/components/MiniBall";

type AwardSidebarProps = {
  current: HubSlug;
};

export function AwardSidebar({ current }: AwardSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[#877458]">Award categories</p>
      <nav aria-label="Award categories" className="flex flex-col gap-2">
        {HUBS.map((hub) => {
          const active = hub.slug === current;
          return (
            <Link
              key={hub.slug}
              href={`/nominees/${hub.slug}`}
              className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm ${
                active
                  ? "bg-[#2A2A2A] text-[#FCD4A0]"
                  : "bg-[#111] text-[#FCD4A0]/80 hover:bg-[#1C1C1C]"
              }`}
            >
              <MiniBall className="h-5 w-5 shrink-0" />
              <span>{hub.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

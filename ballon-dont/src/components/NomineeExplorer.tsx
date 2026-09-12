"use client";

import { useState } from "react";
import { AwardSidebar } from "@/components/AwardSidebar";
import { NomineeCard } from "@/components/NomineeCard";
import type { HubSlug } from "@/data/categories";
import type { Nominee } from "@/data/types";

type NomineeExplorerProps = {
  hub: HubSlug;
  title: string;
  nominees: Nominee[];
};

const PAGE_SIZE = 9;

export function NomineeExplorer({ hub, title, nominees }: NomineeExplorerProps) {
  const [visible, setVisible] = useState(Math.min(PAGE_SIZE, nominees.length));
  const shown = nominees.slice(0, visible);
  const remaining = nominees.length - visible;

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <AwardSidebar current={hub} />
        <div>
          <h1 className="mb-10 text-center text-3xl font-medium text-[#FCD4A0] md:text-4xl">
            {title}
          </h1>
          {shown.length === 0 ? (
            <p className="text-center text-sm text-[#F5F1DC]">The Hater jury has not filed this charge sheet yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((nominee) => (
                <NomineeCard key={nominee.slug} nominee={nominee} />
              ))}
            </div>
          )}
          {remaining > 0 ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible(nominees.length)}
                className="inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-5 py-2 text-sm text-[#FCD4A0]"
              >
                Load more
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCD4A0] text-lg text-black">
                  +
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

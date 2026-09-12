import Link from "next/link";
import type { Nominee } from "@/data/types";
import { initials } from "@/lib/content";

type NomineeCardProps = {
  nominee: Nominee;
};

export function NomineeCard({ nominee }: NomineeCardProps) {
  return (
    <Link
      href={`/nominees/player/${nominee.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-[#223A49]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#FCD4A0_0%,transparent_42%),linear-gradient(180deg,#223A49_0%,#050C13_100%)] opacity-80" />
      <div className="absolute inset-x-0 top-[18%] flex justify-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full border border-[#FCD4A0]/50 text-2xl text-[#FCD4A0]">
          {initials(nominee.name)}
        </span>
      </div>
      <div className="story-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#F5F1DC]/80">
          {nominee.nation}
          {nominee.club ? ` · ${nominee.club}` : ""}
        </p>
        <h3 className="mt-1 text-2xl leading-[1.15] text-[#FCD4A0]">{nominee.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#F5F1DC]">{nominee.charge}</p>
      </div>
    </Link>
  );
}

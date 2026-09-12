import Link from "next/link";
import type { Nominee } from "@/data/types";
import { initials } from "@/lib/content";
import { TrophyMark } from "@/components/TrophyMark";

type NomineeCardProps = {
  nominee: Nominee;
};

function flyerNames(nominee: Nominee) {
  const last = nominee.lastName ?? nominee.name.split(" ").slice(-1)[0];
  const first =
    nominee.firstName && nominee.firstName.toLowerCase() !== last.toLowerCase()
      ? nominee.firstName
      : nominee.name === last
        ? ""
        : nominee.name.replace(new RegExp(`\\s*${last}$`, "i"), "");
  return { first, last };
}

export function NomineeCard({ nominee }: NomineeCardProps) {
  const { first, last } = flyerNames(nominee);

  return (
    <Link
      href={`/nominees/player/${nominee.slug}`}
      className="group relative block overflow-hidden rounded-sm bg-[#050C13] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
    >
      {nominee.image ? (
        <img
          src={nominee.image}
          alt={nominee.name}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flyer-card relative aspect-[4/5] overflow-hidden px-5 pb-5 pt-8">
          <p className="absolute right-5 top-5 text-[10px] tracking-[0.28em] text-[#FCD4A0]/70">20 26</p>
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-[42%] min-h-28 w-[42%] items-center justify-center rounded-full border border-[#FCD4A0]/40 bg-[#223A49] text-2xl text-[#FCD4A0]">
              {initials(nominee.name)}
            </span>
            <TrophyMark className="mt-10 h-16 w-16 opacity-90" />
          </div>
          <div className="absolute right-5 top-[22%] max-w-[46%] text-right text-[10px] uppercase leading-5 tracking-[0.16em] text-[#FCD4A0]/85">
            {nominee.age ? <p>{nominee.age} y-o {nominee.nationCode ? `(${nominee.nationCode})` : ""}</p> : null}
            {nominee.position ? <p className="mt-4">{nominee.position}</p> : null}
            {nominee.club ? <p className="mt-4">{nominee.club}</p> : null}
            <p className="mt-4">
              {nominee.nominations ?? 1} nomination
              {(nominee.nominations ?? 1) === 1 ? "" : "s"}
            </p>
          </div>
          <div className="absolute inset-x-5 bottom-12">
            {first ? <p className="text-lg leading-none text-[#1a1208]">{first}</p> : null}
            <p className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-medium uppercase leading-[0.9] tracking-[0.02em] text-[#1a1208]">
              {last}
            </p>
          </div>
          <p className="absolute inset-x-5 bottom-4 text-[9px] uppercase tracking-[0.22em] text-[#877458]">
            Ballon D&apos;ont · Nominees
          </p>
        </div>
      )}
    </Link>
  );
}

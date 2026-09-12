import Link from "next/link";
import type { Nominee } from "@/data/types";
import { initials } from "@/lib/content";
import { MiniBall } from "@/components/MiniBall";

type NomineeCardProps = {
  nominee: Nominee;
};

export function NomineeCard({ nominee }: NomineeCardProps) {
  const last = nominee.lastName ?? nominee.name.split(" ").slice(-1)[0];
  const first =
    nominee.firstName && nominee.firstName.toLowerCase() !== last.toLowerCase() ? nominee.firstName : "";
  const meta = [nominee.age, nominee.nationCode ?? nominee.nation].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/nominees/player/${nominee.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-[#141414] px-5 pb-8 pt-6"
    >
      {meta ? (
        <p className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.08em] text-[#FCD4A0]/70">{meta}</p>
      ) : null}

      <div className="relative mx-auto mt-2 flex h-[168px] w-[168px] items-center justify-center sm:h-[180px] sm:w-[180px]">
        <span className="block h-full w-full overflow-hidden rounded-full bg-[#223A49]">
          {nominee.image ? (
            <img
              src={nominee.image}
              alt=""
              className="h-full w-full object-cover object-[center_12%]"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-3xl text-[#FCD4A0]">
              {initials(nominee.name)}
            </span>
          )}
        </span>
        <MiniBall className="absolute -right-1 bottom-3 h-12 w-12 drop-shadow-md sm:h-14 sm:w-14" />
      </div>

      <div className="mt-6 pr-12">
        {first ? <p className="text-sm text-[#FCD4A0]/80">{first}</p> : null}
        <h3 className="text-2xl font-medium uppercase leading-[1.05] tracking-[0.02em] text-[#FCD4A0]">
          {last}
        </h3>
        {nominee.club ? <p className="mt-2 text-xs text-[#877458]">{nominee.club}</p> : null}
      </div>

      <span className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F1DC] text-black transition group-hover:bg-white">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span className="sr-only">Open {nominee.name}</span>
      </span>
    </Link>
  );
}

import Link from "next/link";
import type { Nominee } from "@/data/types";
import { avatarTone, initials } from "@/lib/content";

type NomineeCardProps = {
  nominee: Nominee;
};

export function NomineeCard({ nominee }: NomineeCardProps) {
  return (
    <Link
      href={`/nominees/player/${nominee.slug}`}
      className="group block border border-line bg-ink-900/60 p-4 transition hover:-translate-y-0.5 hover:border-bronze/60 hover:bg-ink-800"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-medium tracking-wide text-cream ${avatarTone(nominee.slug)}`}
          aria-hidden
        >
          {initials(nominee.name)}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.2em] uppercase text-bronze-light">
            {nominee.nation}
            {nominee.club ? ` · ${nominee.club}` : ""}
          </p>
          <h3 className="mt-1 font-serif text-xl text-cream group-hover:text-bronze-light">
            {nominee.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-cream-dim">{nominee.charge}</p>
        </div>
      </div>
    </Link>
  );
}

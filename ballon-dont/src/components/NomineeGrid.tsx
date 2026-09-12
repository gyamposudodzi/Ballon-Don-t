import type { Nominee } from "@/data/types";
import { NomineeCard } from "./NomineeCard";

type NomineeGridProps = {
  nominees: Nominee[];
};

export function NomineeGrid({ nominees }: NomineeGridProps) {
  if (nominees.length === 0) {
    return (
      <p className="border border-dashed border-line px-4 py-10 text-center text-sm text-cream-dim">
        The Hater jury has not filed this charge sheet yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {nominees.map((nominee) => (
        <NomineeCard key={nominee.slug} nominee={nominee} />
      ))}
    </div>
  );
}

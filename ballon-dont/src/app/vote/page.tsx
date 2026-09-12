import { PageHero } from "@/components/PageHero";
import { VoteWidget } from "@/components/VoteWidget";
import { getMensBallot } from "@/lib/content";

export const metadata = {
  title: "Hater vote",
  description: "Rank a top 10 for the Men's Ballon Don't. Local ballot only.",
};

export default function VotePage() {
  const nominees = getMensBallot();

  return (
    <>
      <PageHero
        kicker="Hater jury"
        title="Rank the men's Don't"
        dek="Same shape as the gold vote, inverted criteria. Fifteen points for the worst night. Stored on this device only."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <VoteWidget nominees={nominees} />
      </section>
    </>
  );
}

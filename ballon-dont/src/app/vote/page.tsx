import { PageHero } from "@/components/PageHero";
import { VoteWidget } from "@/components/VoteWidget";
import { getMensBallot } from "@/lib/content";

export const metadata = {
  title: "Hater vote",
  description: "Rank a top 10 for the Men's Nominees. Local ballot only.",
};

export default function VotePage() {
  const nominees = getMensBallot();

  return (
    <>
      <PageHero
        kicker="Fan Zone"
        title="Vote now"
        dek="Same shape as the gold vote, inverted criteria. Fifteen points for the worst night. Stored on this device only."
      />
      <section className="mx-auto max-w-[1200px] px-4 pb-20">
        <VoteWidget nominees={nominees} />
      </section>
    </>
  );
}

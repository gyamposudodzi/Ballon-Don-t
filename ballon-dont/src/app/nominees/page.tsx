import { NomineeExplorer } from "@/components/NomineeExplorer";
import { getNomineesByCategory } from "@/lib/content";

export const metadata = {
  title: "Nominees",
  description: "Every Ballon D'ont shortlist in one place.",
};

export default function NomineesPage() {
  const nominees = getNomineesByCategory("mens");

  return <NomineeExplorer hub="mens" title="Men's Ballon D'ont Nominees" nominees={nominees} />;
}

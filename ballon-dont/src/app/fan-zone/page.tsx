import { FanZoneBoard } from "@/components/FanZoneBoard";
import { getMensBallot } from "@/lib/content";

export const metadata = {
  title: "Fan Zone",
  description: "Pronostics, quizzes, and the hater ballot.",
};

export default function FanZonePage() {
  return <FanZoneBoard nominees={getMensBallot()} />;
}

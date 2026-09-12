import Link from "next/link";
import type { Story } from "@/data/types";

type StoryCardProps = {
  story: Story;
  featured?: boolean;
};

export function StoryCard({ story, featured = false }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={`group relative block overflow-hidden rounded-lg ${
        featured ? "min-h-[420px] md:min-h-[520px]" : "min-h-[340px]"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#223A49_0%,#050C13_55%,#000_100%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_10%,#FCD4A0,transparent_45%)]" />
      <div className="story-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-10">
        <span className="exclusive-badge mb-4 w-fit px-6 py-1 text-[13px] font-medium uppercase leading-none text-black">
          {story.categoryLabel}
        </span>
        <h3 className={`leading-[1.2] text-[#FCD4A0] ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {story.title}
        </h3>
      </div>
    </Link>
  );
}

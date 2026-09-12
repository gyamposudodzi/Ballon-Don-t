import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { SITE } from "@/data/site";

const LINKS = [
  { href: "/nominees", label: "Nominees" },
  { href: "/stories", label: "Stories" },
  { href: "/winners", label: "Winners" },
  { href: "/the-ballon-dont", label: "The Ballon D'ont" },
  { href: "/ceremony", label: "Ceremony" },
  { href: "/vote", label: "Fan Zone" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-black" aria-label="Footer">
      <div className="h-px bg-[#877458]" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-14 md:flex-row md:items-start md:justify-between">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#F5F1DC]">
            The official home of the least prestigious award in football.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[15px] text-[#FCD4A0]">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="py-1 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-5 text-sm text-[#FCD4A0]">
          <a href={SITE.social.x} target="_blank" rel="noreferrer" className="hover:text-white">
            X
          </a>
          <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
            Instagram
          </a>
        </div>
      </div>
      <div className="bg-[#050C13] py-4 text-center text-xs text-[#877458]">
        Satire. Original copy. No official Ballon d&apos;Or affiliation.
      </div>
    </footer>
  );
}

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { SITE } from "@/data/site";

const INFO = [
  { href: "/fan-zone", label: "Voting terms and conditions" },
  { href: "/the-ballon-dont", label: "Terms of use" },
  { href: "/the-ballon-dont", label: "Privacy policy" },
  { href: "/the-ballon-dont", label: "Cookie policy" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-black" aria-label="Footer">
      <div className="h-px bg-[#877458]/40" />
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-6">
        <BrandMark />
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#877458]">Follow us</p>
            <div className="mt-4 flex gap-5 text-sm text-[#FCD4A0]">
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram
              </a>
              <a href={SITE.social.x} target="_blank" rel="noreferrer" className="hover:text-white">
                X
              </a>
            </div>
            <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-[#877458]">Sponsors</p>
            <p className="mt-3 text-sm text-[#FCD4A0]/80">Hater Central · Just Jokes, No Bias</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#877458]">Information</p>
            <ul className="mt-4 space-y-2 text-sm text-[#FCD4A0]">
              {INFO.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#877458]">Ballon D&apos;ont press room</p>
            <Link href="/ceremony" className="mt-4 inline-block text-sm text-[#FCD4A0] hover:text-white">
              Press Room
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-black py-4 text-center text-xs text-[#877458]">
        Satire. Original copy. No official Ballon d&apos;Or affiliation.
      </div>
    </footer>
  );
}

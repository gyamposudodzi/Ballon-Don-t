import Link from "next/link";
import { NAV, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">
            Ballon <span className="italic text-rust-hot">Don&apos;t</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-cream-dim">
            {SITE.tagline}. Compiled in the spirit of {SITE.social.name}.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Explore</p>
          <div className="mt-4 flex flex-col gap-2">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream-dim hover:text-cream">
                {item.label}
              </Link>
            ))}
            <Link href="/winners" className="text-sm text-cream-dim hover:text-cream">
              Archive
            </Link>
            <Link href="/vote" className="text-sm text-cream-dim hover:text-cream">
              Hater vote
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">The jury&apos;s feed</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href={SITE.social.x} className="text-cream-dim hover:text-cream" target="_blank" rel="noreferrer">
              X {SITE.social.handle}
            </a>
            <a
              href={SITE.social.instagram}
              className="text-cream-dim hover:text-cream"
              target="_blank"
              rel="noreferrer"
            >
              Instagram {SITE.social.handle}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream-dim sm:px-6">
          Satire. Original copy. No official Ballon d&apos;Or affiliation. Just jokes, no bias.
        </p>
      </div>
    </footer>
  );
}

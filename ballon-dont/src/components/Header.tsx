"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const PRIMARY = [
  { href: "/stories", label: "Stories" },
  { href: "/nominees", label: "Nominees" },
  { href: "/winners", label: "Winners" },
  { href: "/the-ballon-dont", label: "The Ballon D'ont" },
  { href: "/ceremony", label: "Ceremony" },
] as const;

const MENU = [
  ...PRIMARY,
  { href: "/vote", label: "Fan Zone" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-center gap-10 bg-[#FCD4A0] py-2">
        <a
          href="https://x.com/TheHateCentral"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium uppercase tracking-[0.18em] text-black opacity-90 hover:opacity-60"
        >
          Hater Central
        </a>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/70">
          Just Jokes, No Bias
        </span>
        <a
          href="https://www.instagram.com/thehatecentral/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium uppercase tracking-[0.18em] text-black opacity-90 hover:opacity-60"
        >
          Instagram
        </a>
      </div>

      <div className="header-gradient">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-[#FCD4A0]"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
            <Link href="/" onClick={() => setOpen(false)} aria-label="Ballon D'ont">
              <BrandMark compact />
            </Link>
            <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
              {PRIMARY.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[15px] ${active ? "text-white" : "text-[#FCD4A0] hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-5 text-sm text-black">
            <span className="hidden sm:inline">EN</span>
            <Link href="/vote" className="hidden text-black hover:underline sm:inline">
              Login
            </Link>
            <Link
              href="/vote"
              className="bg-[#FCD4A0] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-black"
            >
              Vote now
            </Link>
          </div>
        </div>
      </div>

      {open ? (
        <nav
          id="site-menu"
          className="border-b border-[#FCD4A0]/30 bg-black/95 px-4 py-6 backdrop-blur"
          aria-label="Menu"
        >
          <div className="mx-auto grid max-w-[1200px] gap-2 sm:grid-cols-2">
            {MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-lg font-bold text-[#FCD4A0] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

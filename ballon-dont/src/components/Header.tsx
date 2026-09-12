"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const LEFT = [
  { href: "/nominees", label: "Nominees" },
  { href: "/stories", label: "All articles" },
  { href: "/ceremony", label: "Press Room" },
  { href: "/fan-zone", label: "Fan Zone" },
] as const;

const MENU = [
  ...LEFT,
  { href: "/the-ballon-dont", label: "The Ballon D'ont" },
  { href: "/winners", label: "Winners" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5F1DC]">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-6">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="text-[#877458]"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {LEFT.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14px] ${active ? "text-black" : "text-[#877458] hover:text-black"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Ballon D'ont"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <BrandMark compact invert />
        </Link>

        <div className="flex items-center gap-4 text-sm text-[#877458]">
          <span className="hidden sm:inline">EN</span>
          <Link href="/fan-zone" className="hidden hover:text-black sm:inline">
            Login
          </Link>
        </div>
      </div>

      {open ? (
        <nav id="site-menu" className="border-t border-black/10 bg-[#F5F1DC] px-4 py-6" aria-label="Menu">
          <div className="mx-auto grid max-w-[1280px] gap-2 sm:grid-cols-2">
            {MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-lg text-[#877458] hover:text-black"
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

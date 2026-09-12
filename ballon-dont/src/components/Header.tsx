"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl tracking-wide text-cream sm:text-2xl">
            Ballon
          </span>
          <span className="font-serif text-xl tracking-wide text-rust-hot italic sm:text-2xl">
            Don&apos;t
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-[0.16em] uppercase transition-colors ${
                  active ? "text-bronze-light" : "text-cream-dim hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/vote"
            className="rounded-full border border-bronze/50 bg-rust px-4 py-2 text-xs tracking-[0.16em] uppercase text-cream transition-colors hover:bg-rust-hot"
          >
            Vote
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-4 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-cream transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-4 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-ink-900 px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm tracking-[0.16em] uppercase text-cream"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/vote"
              className="mt-2 rounded-full bg-rust px-4 py-3 text-center text-xs tracking-[0.16em] uppercase"
              onClick={() => setOpen(false)}
            >
              Vote
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

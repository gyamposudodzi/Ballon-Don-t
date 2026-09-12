"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[#FCD4A0]">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-6">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="text-[#877458]"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            )}
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

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <nav
        id="site-menu"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(86vw,320px)] flex-col bg-[#FCD4A0] px-6 py-8 shadow-[8px_0_32px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <BrandMark compact invert />
          <button type="button" className="text-[#877458]" onClick={() => setOpen(false)}>
            <span className="sr-only">Close menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {MENU.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-1 py-3 text-lg ${active ? "text-black" : "text-[#877458] hover:text-black"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

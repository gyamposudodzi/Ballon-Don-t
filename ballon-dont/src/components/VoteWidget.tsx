"use client";

import { useEffect, useMemo, useState } from "react";
import type { Nominee } from "@/data/types";

const STORAGE_KEY = "ballon-dont-ballot";
const POINTS = [15, 12, 10, 8, 7, 5, 4, 3, 2, 1];

type VoteWidgetProps = {
  nominees: Nominee[];
};

export function VoteWidget({ nominees }: VoteWidgetProps) {
  const [ballot, setBallot] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        setBallot(parsed.filter((slug) => nominees.some((nominee) => nominee.slug === slug)).slice(0, 10));
      } catch {
        setBallot([]);
      }
    }
    setReady(true);
  }, [nominees]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ballot));
  }, [ballot, ready]);

  const selected = useMemo(
    () => ballot.map((slug) => nominees.find((nominee) => nominee.slug === slug)).filter(Boolean) as Nominee[],
    [ballot, nominees],
  );

  function toggle(slug: string) {
    setBallot((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 10) return current;
      return [...current, slug];
    });
  }

  function move(slug: string, direction: -1 | 1) {
    setBallot((current) => {
      const index = current.indexOf(slug);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">
          {ballot.length} / 10 on the charge sheet
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {nominees.map((nominee) => {
            const active = ballot.includes(nominee.slug);
            const rank = ballot.indexOf(nominee.slug);
            return (
              <button
                key={nominee.slug}
                type="button"
                onClick={() => toggle(nominee.slug)}
                className={`border px-4 py-4 text-left transition ${
                  active
                    ? "border-rust bg-ink-800"
                    : "border-line bg-ink-900/50 hover:border-bronze/60"
                }`}
              >
                <p className="text-[10px] tracking-[0.16em] uppercase text-bronze-light">
                  {active ? `Rank ${rank + 1} · ${POINTS[rank]} pts` : nominee.nation}
                </p>
                <p className="mt-1 font-serif text-lg">{nominee.name}</p>
                <p className="mt-1 text-sm text-cream-dim">{nominee.charge}</p>
              </button>
            );
          })}
        </div>
      </div>
      <aside className="border border-line bg-ink-900/70 p-5 lg:sticky lg:top-24 lg:h-fit">
        <h2 className="font-serif text-2xl">Your top 10</h2>
        <p className="mt-2 text-sm leading-6 text-cream-dim">
          Fifteen points for the worst night. One point for a mild disappearance. Stored only on this device.
        </p>
        <ol className="mt-5 space-y-3">
          {selected.length === 0 ? (
            <li className="text-sm text-cream-dim">Tap a name to start the ballot.</li>
          ) : (
            selected.map((nominee, index) => (
              <li key={nominee.slug} className="flex items-center justify-between gap-3 border border-line px-3 py-3">
                <div>
                  <p className="text-[10px] tracking-[0.16em] uppercase text-bronze-light">
                    {index + 1}. {POINTS[index]} pts
                  </p>
                  <p className="font-serif text-lg">{nominee.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="border border-line px-2 py-1 text-xs disabled:opacity-30"
                    onClick={() => move(nominee.slug, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="border border-line px-2 py-1 text-xs disabled:opacity-30"
                    onClick={() => move(nominee.slug, 1)}
                    disabled={index === selected.length - 1}
                  >
                    Down
                  </button>
                </div>
              </li>
            ))
          )}
        </ol>
      </aside>
    </div>
  );
}

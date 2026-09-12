"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  { id: "kane", label: "Harry Kane", line: "Premium invisibility" },
  { id: "bellingham", label: "Jude Bellingham", line: "All aura, no output" },
] as const;

const STORAGE_KEY = "ballon-dont-home-poll";

export function HomePoll() {
  const [choice, setChoice] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({ kane: 12, bellingham: 9 });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "kane" || saved === "bellingham")) {
      setChoice(saved);
    }
  }, []);

  function vote(id: string) {
    if (choice) return;
    setChoice(id);
    setCounts((current) => ({ ...current, [id]: current[id] + 1 }));
    window.localStorage.setItem(STORAGE_KEY, id);
  }

  const total = counts.kane + counts.bellingham;

  return (
    <div className="border border-line bg-ink-900/60 p-6">
      <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Free kick from 25 meters</p>
      <h2 className="mt-3 font-serif text-2xl text-cream sm:text-3xl">
        Who bottled the bigger night?
      </h2>
      <div className="mt-6 space-y-3">
        {OPTIONS.map((option) => {
          const share = Math.round((counts[option.id] / total) * 100);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => vote(option.id)}
              disabled={Boolean(choice)}
              className="block w-full border border-line px-4 py-4 text-left transition hover:border-bronze/70 disabled:cursor-default"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg">{option.label}</p>
                  <p className="text-sm text-cream-dim">{option.line}</p>
                </div>
                {choice ? <p className="text-sm text-bronze-light">{share}%</p> : null}
              </div>
              {choice ? (
                <div className="mt-3 h-1 bg-ink-800">
                  <div className="h-1 bg-rust" style={{ width: `${share}%` }} />
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

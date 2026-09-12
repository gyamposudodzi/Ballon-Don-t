"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  { id: "kane", label: "Harry Kane" },
  { id: "bellingham", label: "Jude Bellingham" },
] as const;

const STORAGE_KEY = "ballon-dont-home-poll";

export function HomePoll() {
  const [choice, setChoice] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({ kane: 12, bellingham: 9 });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "kane" || saved === "bellingham") setChoice(saved);
  }, []);

  function vote(id: string) {
    if (choice) return;
    setChoice(id);
    setCounts((current) => ({ ...current, [id]: current[id] + 1 }));
    window.localStorage.setItem(STORAGE_KEY, id);
  }

  const total = counts.kane + counts.bellingham;

  return (
    <div className="bg-[#FCD4A0] p-6 text-black">
      <p className="text-xs font-medium uppercase tracking-[0.16em]">Fan Zone</p>
      <h2 className="mt-3 text-2xl font-medium uppercase leading-tight md:text-3xl">
        You have a free kick 25 meters out — who bottled the bigger night?
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
              className="block w-full border border-black/20 bg-white px-4 py-4 text-left disabled:cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option.label}</span>
                {choice ? <span className="text-sm">{share}%</span> : null}
              </div>
              {choice ? (
                <div className="mt-3 h-1 bg-black/10">
                  <div className="h-1 bg-black" style={{ width: `${share}%` }} />
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

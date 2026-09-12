"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(): Remaining {
  const target = new Date(SITE.ceremony.iso).getTime();
  const delta = Math.max(0, target - Date.now());
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1000) % 60),
    done: delta === 0,
  };
}

export function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!remaining) {
    return (
      <div className="grid grid-cols-4 gap-3" aria-hidden>
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="border border-line bg-ink-900/70 px-3 py-4 text-center">
            <p className="font-serif text-3xl text-bronze-light">--</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-cream-dim">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (remaining.done) {
    return (
      <p className="border border-line bg-ink-900/70 px-4 py-5 text-center font-serif text-xl text-bronze-light">
        The rust ball is in the room.
      </p>
    );
  }

  const units = [
    ["Days", remaining.days],
    ["Hours", remaining.hours],
    ["Minutes", remaining.minutes],
    ["Seconds", remaining.seconds],
  ] as const;

  return (
    <div className="grid grid-cols-4 gap-3" role="timer" aria-label="Countdown to the ceremony">
      {units.map(([label, value]) => (
        <div key={label} className="border border-line bg-ink-900/70 px-3 py-4 text-center">
          <p className="font-serif text-3xl text-bronze-light sm:text-4xl">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-cream-dim">{label}</p>
        </div>
      ))}
    </div>
  );
}

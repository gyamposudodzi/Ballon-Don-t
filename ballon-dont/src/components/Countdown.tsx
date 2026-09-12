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
      <div className="grid grid-cols-4 gap-3">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="bg-[#050C13] px-2 py-4 text-center">
            <p className="text-3xl text-[#FCD4A0]">--</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#877458]">{label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (remaining.done) {
    return <p className="bg-[#050C13] px-4 py-5 text-center text-xl text-[#FCD4A0]">The trophy is in the room.</p>;
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
        <div key={label} className="bg-[#050C13] px-2 py-4 text-center">
          <p className="text-3xl text-[#FCD4A0] sm:text-4xl">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#877458]">{label}</p>
        </div>
      ))}
    </div>
  );
}

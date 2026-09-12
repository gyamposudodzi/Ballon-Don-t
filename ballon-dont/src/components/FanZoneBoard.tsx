"use client";

import { useMemo, useState } from "react";
import { VoteWidget } from "@/components/VoteWidget";
import { CLASSIC_QUIZ, EITHER_OR, PERSONALITY, PRONOSTICS } from "@/data/fan-zone";
import type { Nominee } from "@/data/types";

type FanZoneBoardProps = {
  nominees: Nominee[];
};

export function FanZoneBoard({ nominees }: FanZoneBoardProps) {
  const [prono, setProno] = useState<Record<string, string>>({});
  const [quiz, setQuiz] = useState<Record<string, number>>({});
  const [either, setEither] = useState<Record<string, string>>({});
  const [persona, setPersona] = useState<Record<string, string>>({});

  const personaResult = useMemo(() => {
    const picks = Object.values(persona);
    if (picks.length < PERSONALITY.length) return null;
    const counts = picks.reduce<Record<string, number>>((acc, name) => {
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  }, [persona]);

  const quizScore = Object.entries(quiz).filter(([slug, index]) => {
    const item = CLASSIC_QUIZ.find((q) => q.slug === slug);
    return item?.answer === index;
  }).length;

  return (
    <div className="bg-gradient-to-b from-[#F5F1DC] via-[#F5F1DC] to-black">
      <section className="mx-auto max-w-[1280px] px-4 pb-6 pt-14 text-center md:px-6">
        <h1 className="text-4xl font-medium uppercase tracking-[0.06em] text-black md:text-6xl">Fan Zone</h1>
        <p className="mt-3 text-lg text-black/70">Become the rust expert.</p>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-12 md:px-6">
        <div className="overflow-hidden rounded-2xl bg-black">
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="bg-[#223A49] p-8">
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[#050C13] text-4xl text-[#FCD4A0]">
                HC
              </div>
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-[#877458]">Fan Zone</p>
              <h2 className="mt-2 text-3xl uppercase text-[#FCD4A0] md:text-4xl">Become the rust expert</h2>
              <p className="mt-3 max-w-xl text-[#F5F1DC]">
                Pronostics, classic quizzes, either/or, and a personality test. Same shape as the gold Fan Zone.
                Inverted criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E24B2D] px-4 py-10 text-center text-white">
        <p className="text-xs uppercase tracking-[0.18em]">Fan Zone</p>
        <h2 className="mt-2 text-3xl uppercase md:text-4xl">How much do you know about it?</h2>
        <p className="mt-2 text-white/80">120% online. Tuition: free. Results: public shame.</p>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-black/50">Pronostics</p>
        <h2 className="mt-2 text-center text-3xl uppercase text-black">Latest of Pronostics</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PRONOSTICS.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-2xl bg-black">
              <div className="flex h-28 items-center justify-center bg-[#141414] text-[#FCD4A0]">
                {item.title}
              </div>
              <div className="p-4">
                <p className="text-sm text-[#F5F1DC]">{item.prompt}</p>
                <div className="mt-3 space-y-2">
                  {item.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setProno((current) => ({ ...current, [item.slug]: option }))}
                      className={`block w-full rounded-full px-3 py-2 text-left text-sm ${
                        prono[item.slug] === option ? "bg-[#FCD4A0] text-black" : "bg-[#1A1A1A] text-[#FCD4A0]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-black/50">Classic Quiz</p>
        <h2 className="mt-2 text-center text-3xl uppercase text-black">Latest of Classic Quiz</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {CLASSIC_QUIZ.map((item) => (
            <article key={item.slug} className="rounded-2xl bg-black p-5">
              <h3 className="text-lg text-[#FCD4A0]">{item.question}</h3>
              <div className="mt-4 space-y-2">
                {item.options.map((option, index) => {
                  const picked = quiz[item.slug];
                  const revealed = picked !== undefined;
                  const correct = index === item.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={revealed}
                      onClick={() => setQuiz((current) => ({ ...current, [item.slug]: index }))}
                      className={`block w-full rounded-full px-3 py-2 text-left text-sm ${
                        !revealed
                          ? "bg-[#1A1A1A] text-[#FCD4A0]"
                          : correct
                            ? "bg-[#FCD4A0] text-black"
                            : picked === index
                              ? "bg-[#E24B2D] text-white"
                              : "bg-[#1A1A1A] text-[#FCD4A0]/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
        {Object.keys(quiz).length === CLASSIC_QUIZ.length ? (
          <p className="mt-6 text-center text-black">
            {quizScore} / {CLASSIC_QUIZ.length} — the Hater jury has seen your paper.
          </p>
        ) : null}
      </section>

      <section className="bg-black px-4 py-14 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-[#FCD4A0]/70">Either / Or</p>
        <h2 className="mt-2 text-center text-3xl uppercase text-[#FCD4A0]">Latest of Either / Or</h2>
        <div className="mx-auto mt-8 grid max-w-[1280px] gap-4 md:grid-cols-3">
          {EITHER_OR.map((item) => (
            <article key={item.slug} className="rounded-2xl bg-[#141414] p-5">
              <h3 className="text-lg text-[#FCD4A0]">{item.title}</h3>
              <div className="mt-4 grid gap-2">
                {[item.left, item.right].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setEither((current) => ({ ...current, [item.slug]: option }))}
                    className={`rounded-full px-3 py-3 text-sm ${
                      either[item.slug] === option ? "bg-[#FCD4A0] text-black" : "bg-black text-[#FCD4A0]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-4 pb-16 md:px-6">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-[#FCD4A0]/70">Personality Quiz</p>
        <h2 className="mt-2 text-center text-3xl uppercase text-[#FCD4A0]">Latest of Personality Quiz</h2>
        <div className="mx-auto mt-8 max-w-[1280px] space-y-4">
          {PERSONALITY.map((item) => (
            <article key={item.slug} className="rounded-2xl bg-[#141414] p-5">
              <h3 className="text-lg text-[#FCD4A0]">{item.question}</h3>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {item.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setPersona((current) => ({ ...current, [item.slug]: option.result }))}
                    className={`rounded-full px-3 py-3 text-left text-sm ${
                      persona[item.slug] === option.result ? "bg-[#FCD4A0] text-black" : "bg-black text-[#FCD4A0]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
        {personaResult ? (
          <p className="mt-6 text-center text-2xl text-[#FCD4A0]">You are {personaResult}.</p>
        ) : null}
      </section>

      <section className="bg-black px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-[#877458]">Hater ballot</p>
          <h2 className="mt-2 text-center text-3xl uppercase text-[#FCD4A0]">Rank a top 10</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#F5F1DC]">
            Fifteen points for the worst night. One point for a mild disappearance. Stored on this device only.
          </p>
          <div className="mt-10">
            <VoteWidget nominees={nominees} />
          </div>
        </div>
      </section>
    </div>
  );
}

type PageHeroProps = {
  kicker?: string;
  title: string;
  dek?: string;
};

export function PageHero({ kicker, title, dek }: PageHeroProps) {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:py-20">
        {kicker ? (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#877458]">{kicker}</p>
        ) : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-[#FCD4A0] sm:text-6xl">
          {title}
        </h1>
        {dek ? <p className="mt-5 max-w-2xl text-base leading-7 text-[#F5F1DC] sm:text-lg">{dek}</p> : null}
      </div>
    </section>
  );
}

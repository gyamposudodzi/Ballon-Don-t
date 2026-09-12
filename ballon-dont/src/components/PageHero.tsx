type PageHeroProps = {
  kicker?: string;
  title: string;
  dek?: string;
};

export function PageHero({ kicker, title, dek }: PageHeroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {kicker ? (
          <p className="text-xs tracking-[0.24em] uppercase text-bronze-light">{kicker}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-cream sm:text-6xl">
          {title}
        </h1>
        {dek ? <p className="mt-5 max-w-2xl text-base leading-7 text-cream-dim sm:text-lg">{dek}</p> : null}
      </div>
    </section>
  );
}

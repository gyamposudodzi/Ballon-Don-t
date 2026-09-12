import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs tracking-[0.2em] uppercase text-bronze-light">Missing person report</p>
      <h1 className="mt-4 font-serif text-5xl">This page bottled it</h1>
      <p className="mt-4 text-cream-dim">The charge sheet you asked for is not on file.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-rust px-5 py-3 text-xs tracking-[0.18em] uppercase hover:bg-rust-hot"
      >
        Back to the ceremony
      </Link>
    </section>
  );
}

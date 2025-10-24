import ListingCard, { type Listing } from "@/components/ListingCard";

/** Force runtime rendering so Next doesn’t pre-render and hit undefined/api/listings */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Home() {
  // Relative fetch + no-store ensures this runs at request time on Cloudflare
  const res = await fetch("/api/listings", { cache: "no-store" });
  if (!res.ok) {
    // fail-safe: show an empty list if API ever hiccups
    return (
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <Header />
        <EmptyState />
      </main>
    );
  }

  const listings: Listing[] = await res.json();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <Header />
      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="flex items-baseline justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">
          AudioDepot UK — Used Samplers & Synths
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Live deals from UK sellers · GBP prices · Updated automatically
        </p>
      </div>
      <a
        href="https://reverb.com/uk"
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        Browse on Reverb
      </a>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="card mt-8 p-8 text-[var(--muted)]">
      Couldn’t load listings right now. Please refresh in a moment.
    </div>
  );
}

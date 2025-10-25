import OsWindow from "../components/OsWindow";
import ListingCard, { Listing } from "../components/ListingCard";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    process.env.URL ||
    "http://localhost:3000";

  const res = await fetch(`${base}/api/listings`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <OsWindow title="AudioDepot" statusLeft="Offline" statusRight="">
        <Header />
        <EmptyState />
      </OsWindow>
    );
  }

  const data = (await res.json()) as { items: Listing[] };
  const items = data.items ?? [];

  return (
    <OsWindow
      title="AudioDepot"
      statusLeft={`Listings: ${items.length}`}
      statusRight=""
    >
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Live deals from UK sellers</h1>
        <p className="text-sm text-[var(--fg-muted)] mt-1">GBP prices · Updated automatically</p>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="border border-[var(--border)] rounded-md bg-[var(--card)] hover:bg-[var(--card-hover)] transition"
              >
                <div className="p-4">
                  <ListingCard item={item} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </OsWindow>
  );
}
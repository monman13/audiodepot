import OsWindow from "../components/OsWindow";
import ListingCard, { Listing } from "../components/ListingCard";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  // Resolve base URL for both local and Netlify/Vercel
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    process.env.URL ||
    "http://localhost:3000";

  const res = await fetch(`${base}/api/listings`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <OsWindow title="My Computer — AudioDepot" statusLeft="Offline">
          <Header />
          <EmptyState />
        </OsWindow>
      </main>
    );
  }

  const data = (await res.json()) as { items: Listing[] };
  const items = data.items ?? [];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      <OsWindow
        title="My Computer — AudioDepot"
        statusLeft={`Listings: ${items.length}`}
        statusRight=""
      >
        <Header />

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <ListingCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </OsWindow>
    </main>
  );
}
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
      <OsWindow
        title="My Computer — AudioDepot"
        statusLeft="Offline"
        statusRight=""
      >
        <Header />
        <EmptyState />
      </OsWindow>
    );
  }

  const data = (await res.json()) as { items: Listing[] };
  const items = data.items ?? [];

  return (
    <OsWindow
      title="My Computer — AudioDepot"
      statusLeft={`Listings: ${items.length}`}
      statusRight=""
    >
      <Header />

      <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && <EmptyState />}
    </OsWindow>
  );
}
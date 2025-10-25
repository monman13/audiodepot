import ListingCard, { type Listing } from "@/components/ListingCard";
import OsWindow from "@/components/OsWindow";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Home() {
 const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  process.env.URL ||
  "http://localhost:3000";

const res = await fetch(`${baseUrl}/api/listings`, {
  cache: "no-store",
});

  if (!res.ok) {
    return (
      <OsWindow title="My Computer — AudioDepot" statusLeft="Offline" statusRight="ENG 12:00">
        <Header />
        <EmptyState />
      </OsWindow>
    );
  }

  const data = (await res.json()) as { items: Listing[] };
  const items = data.items ?? [];

  return (
    <OsWindow title="My Computer — AudioDepot" statusLeft={`Listings: ${items.length}`} statusRight="ENG 12:00">
      <Header />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {items.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </OsWindow>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between osw-toolbar">
      <h1 className="text-lg font-extrabold tracking-tight">AudioDepot</h1>
      <a
        href="https://reverb.com"
        target="_blank"
        rel="noreferrer"
        className="pixel-btn"
      >
        Browse on Reverb
      </a>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="card mt-6 p-8 text-[var(--px-ink-soft)]">
      Couldn’t load listings. Try again soon.
    </div>
  );
}

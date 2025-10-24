import ListingCard from "@/components/ListingCard";
import SkeletonCard from "@/components/SkeletonCard";

async function getListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const listings = await getListings();

  return (
    <>
      <section className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Used Samplers & Synths
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Live deals · Updated automatically
        </p>
      </section>

      {listings.length === 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item: any) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

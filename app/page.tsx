'use client';

import { useEffect, useState } from 'react';
import ListingCard from '@/components/ListingCard';

type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  source: 'ebay' | 'reverb';
  url: string;
};

export default function Home() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.json())
      .then((d: { items?: Listing[] }) => {
        setItems(d.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">AudioDepot UK — Used Samplers & Synths</h1>
        <p className="text-sm text-gray-600">
          Live deals from UK sellers · GBP prices · Updated automatically
        </p>
      </header>

      {loading && <div>Loading latest deals…</div>}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((it) => (
            <ListingCard key={`${it.source}-${it.id}`} item={it} />
          ))}
        </div>
      )}
    </main>
  );
}

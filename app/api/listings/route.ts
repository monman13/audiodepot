import { NextRequest, NextResponse } from 'next/server';

// ✅ Required by Cloudflare Pages (next-on-pages)
export const runtime = 'edge';

const GBP = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

async function fetchReverb(query: string, perPage = 24) {
  const token = process.env.REVERB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/hal+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const url = `https://api.reverb.com/api/listings?query=${encodeURIComponent(
    query
  )}&ships_to=GB&per_page=${perPage}`;

  try {
    const res = await fetch(url, { headers }); // Edge-safe
    if (!res.ok) return [];
    const data = await res.json();
    const items = data?.listings || [];
    return items.map((it: any) => ({
      id: String(it.id),
      title: it.title,
      priceNumber: it.price?.amount ? Number(it.price.amount) : undefined,
      price: it.price?.amount ? GBP(Number(it.price.amount)) : '—',
      image: it.photos?.[0]?.['_links']?.thumbnail?.href || '/placeholder.png',
      source: 'reverb' as const,
      url: it['_links']?.web?.href || '#',
    }));
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || 'sampler').trim();
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  let items = await fetchReverb(q);

  if (maxPrice && !Number.isNaN(maxPrice)) {
    items = items.filter((x: any) => typeof x.priceNumber === 'number' && x.priceNumber <= maxPrice);
  }

  if (items.length === 0) {
    items = [
      {
        id: 'demo1',
        title: 'Roland SP-404SX (Demo)',
        price: GBP(239),
        image: 'https://placehold.co/600x400?text=SP-404',
        source: 'reverb',
        url: '#',
      },
      {
        id: 'demo2',
        title: 'Akai MPC 1000 (Demo)',
        price: GBP(299),
        image: 'https://placehold.co/600x400?text=MPC1000',
        source: 'ebay',
        url: '#',
      },
    ] as any;
  }

  const publicItems = items.map(({ priceNumber, ...rest }: any) => rest);

  return NextResponse.json(
    { items: publicItems },
    { headers: { 'Cache-Control': 's-maxage=900, stale-while-revalidate' } }
  );
}

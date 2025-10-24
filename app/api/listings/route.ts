import { NextRequest, NextResponse } from 'next/server';

// Required by Cloudflare Pages (next-on-pages)
export const runtime = 'edge';

const GBP = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

/** ----- Types from Reverb (minimal fields we use) ----- */
type ReverbPrice = { amount?: string | number | null };
type ReverbPhoto = { _links?: { thumbnail?: { href?: string } } };
type ReverbLinks = { web?: { href?: string } };
type ReverbListing = {
  id: string | number;
  title: string;
  price?: ReverbPrice;
  photos?: ReverbPhoto[];
  _links?: ReverbLinks;
};

type ReverbSearchResponse = {
  listings?: ReverbListing[];
};

/** ----- Our normalized listing type ----- */
export type Listing = {
  id: string;
  title: string;
  price: string;        // "£239.00"
  priceNumber?: number; // 239
  image: string;
  source: 'reverb';
  url: string;
};

function toNumber(value: unknown): number | undefined {
  if (value == null) return undefined;
  const n = typeof value === 'string' ? Number(value) : (value as number);
  return Number.isFinite(n) ? (n as number) : undefined;
}

async function fetchReverb(query: string, perPage = 24): Promise<Listing[]> {
  const token = process.env.REVERB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/hal+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const url = `https://api.reverb.com/api/listings?query=${encodeURIComponent(
    query
  )}&ships_to=GB&per_page=${perPage}`;

  const res = await fetch(url, { headers });
  if (!res.ok) return [];

  const data = (await res.json()) as ReverbSearchResponse;
  const arr = data.listings ?? [];

  return arr.map<Listing>((it) => {
    const amount = toNumber(it.price?.amount);
    const thumb =
      it.photos?.[0]?._links?.thumbnail?.href ??
      '/placeholder.png';
    const web = it._links?.web?.href ?? '#';
    return {
      id: String(it.id),
      title: it.title,
      priceNumber: amount,
      price: typeof amount === 'number' ? GBP(amount) : '—',
      image: thumb,
      source: 'reverb',
      url: web,
    };
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || 'sampler').trim();
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  let items = await fetchReverb(q);

  if (typeof maxPrice === 'number' && Number.isFinite(maxPrice)) {
    items = items.filter((x) => (x.priceNumber ?? Infinity) <= maxPrice);
  }

  // Fallback demo items if API returns nothing
  if (items.length === 0) {
    items = [
      {
        id: 'demo1',
        title: 'Roland SP-404SX (Demo)',
        price: GBP(239),
        priceNumber: 239,
        image: 'https://placehold.co/600x400?text=SP-404',
        source: 'reverb',
        url: '#',
      },
      {
        id: 'demo2',
        title: 'Akai MPC 1000 (Demo)',
        price: GBP(299),
        priceNumber: 299,
        image: 'https://placehold.co/600x400?text=MPC1000',
        source: 'reverb',
        url: '#',
      },
    ];
  }

  // Don’t expose priceNumber publicly (not needed by UI)
  const publicItems = items.map(({ priceNumber, ...rest }) => rest);

  return NextResponse.json(
    { items: publicItems },
    { headers: { 'Cache-Control': 's-maxage=900, stale-while-revalidate' } }
  );
}

import { NextResponse } from 'next/server';

const GBP = (n: number) =>
  new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n);

export async function GET() {
  // Temporary demo listings (until we add eBay API keys)
  const demo = [
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
  ];

  return NextResponse.json({ items: demo });
}

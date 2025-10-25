"use client";
import Link from "next/link";

export type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  source: "ebay" | "reverb";
  url: string;
};

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block"
    >
      <div className="w-full h-48 bg-[#222] rounded-md mb-3 flex items-center justify-center text-sm text-[#666]">
        {item.title}
      </div>

      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-medium">{item.title}</h3>
        <span className="btn">{item.source}</span>
      </div>

      <div className="text-lg font-semibold mt-1">{item.price}</div>
    </Link>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";

export type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  source: "ebay" | "reverb";
  url: string;
};

const SOURCE_LABELS = {
  ebay: "eBay",
  reverb: "Reverb",
};

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <article className="card group overflow-hidden">
      <Link
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4"
      >
        <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/5">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-base font-medium line-clamp-2">{item.title}</h3>
          <span className="badge">{SOURCE_LABELS[item.source]}</span>
        </div>

        <div className="mt-2 text-lg font-semibold">{item.price}</div>
      </Link>
    </article>
  );
}

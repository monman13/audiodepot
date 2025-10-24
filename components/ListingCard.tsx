import Image from "next/image";

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
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border p-3 hover:shadow-md"
    >
      {/* image */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* title + source */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium line-clamp-2">{item.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full border">{item.source}</span>
      </div>

      {/* price */}
      <div className="mt-1 text-lg font-semibold">{item.price}</div>
    </a>
  );
}

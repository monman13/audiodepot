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
  const vendor = item.source === "reverb" ? "Reverb" : "eBay";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="block card transition-transform hover:-translate-y-0.5"
    >
      <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-[15px]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="thumb-fallback h-full w-full text-3xl">GEAR</div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[17px] sm:text-[18px] font-semibold leading-snug">
            {item.title}
          </h3>
          <span className="pill">{vendor}</span>
        </div>

        <div className="mt-3 text-[20px] sm:text-[22px] font-semibold tracking-[-0.01em]">
          {item.price}
        </div>
      </div>
    </a>
  );
}
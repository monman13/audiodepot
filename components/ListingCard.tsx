type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  source: 'ebay' | 'reverb';
  url: string;
};

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer"
       className="block rounded-2xl border p-3 hover:shadow-md">
      <img src={item.image} alt={item.title}
           className="h-40 w-full object-cover rounded-xl mb-3" />
      <div className="flex items-center justify-between">
        <h3 className="font-medium line-clamp-2">{item.title}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full border">{item.source}</span>
      </div>
      <div className="mt-1 text-lg font-semibold">{item.price}</div>
    </a>
  );
}

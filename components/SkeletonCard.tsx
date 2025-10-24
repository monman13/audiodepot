export default function SkeletonCard() {
  return (
    <div className="card p-4">
      <div className="h-56 w-full animate-pulse rounded-xl bg-white/5" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-white/5" />
      <div className="mt-3 h-6 w-24 animate-pulse rounded bg-white/5" />
    </div>
  );
}

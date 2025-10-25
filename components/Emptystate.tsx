// components/EmptyState.tsx
export default function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center">
      <p className="text-sm opacity-70">No listings right now. Check back soon.</p>
    </div>
  );
}
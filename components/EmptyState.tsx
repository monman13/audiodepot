export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-full border border-[var(--edge)] grid place-items-center">
        <span className="text-[var(--muted)] font-semibold">Ø</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold">No listings (yet)</h3>
      <p className="mt-2 text-[15px] text-[var(--muted)]">
        We’ll pull fresh deals shortly. Check back in a moment.
      </p>
    </div>
  );
}
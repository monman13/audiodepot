"use client";

export default function Header() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.015em]">
          Live deals from UK sellers
        </h2>
        <p className="text-sm text-[#746B63] mt-1">
          GBP prices • Updated automatically
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="pill">Marketplace</span>
        <span className="pill">Samplers &amp; Synths</span>
      </div>
    </div>
  );
}
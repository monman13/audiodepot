import "./globals.css";

export const metadata = {
  title: "AudioDepot UK — Used Samplers & Synths",
  description: "Live deals from UK sellers. GBP prices. Updated automatically.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur bg-black/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-white">Audio</span>
              <span className="text-[var(--accent)]">Depot</span> UK
            </h1>
            <span className="badge">UK Marketplace</span>
          </div>
        </header>

        {/* Body */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/5 text-sm text-[var(--muted)]">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 flex justify-between">
            <p>© {new Date().getFullYear()} AudioDepot UK</p>
            <p>Live marketplace aggregator</p>
          </div>
        </footer>

      </body>
    </html>
  );
}

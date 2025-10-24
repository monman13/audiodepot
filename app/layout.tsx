import "./globals.css";

export const runtime = "edge";

export const metadata = {
  title: "AudioDepot UK — Used Samplers & Synths",
  description: "Live deals from UK sellers. Updated automatically.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="os-desktop">
        {/* Top “system” bar */}
        <div className="pixel-topbar">
          <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3 text-[12px] text-white">
            <span className="font-extrabold tracking-wide">AUDIODEPOT</span>
            <span className="opacity-80">Pixel OS</span>
          </div>
        </div>

        {/* Desktop area */}
        <main className="mx-auto max-w-7xl px-4 pt-6 pb-24">
          {children}
        </main>

        {/* Taskbar */}
        <div className="pixel-taskbar">
          <div className="mx-auto max-w-7xl px-3 py-2 flex items-center gap-2 text-[11px]">
            <button className="pixel-btn">Start</button>
            <div className="pixel-chip">Cart: 0</div>
            <div className="ml-auto pixel-chip">12:00</div>
          </div>
        </div>
      </body>
    </html>
  );
}

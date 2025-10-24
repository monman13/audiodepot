/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Pages + next-on-pages: use the origin image (no Node "sharp")
    unoptimized: true,
    // Allow common marketplaces now; add more as you expand
    remotePatterns: [
      { protocol: "https", hostname: "images.reverb.com" },
      { protocol: "https", hostname: "img.revimage.com" },
      { protocol: "https", hostname: "i.ebayimg.com" },
      // keep localhost for dev fallback
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "localhost" }
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;

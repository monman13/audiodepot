/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.reverb.com",
      "img.revimage.com",
      "localhost"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

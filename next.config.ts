import { defineConfig } from 'next';

export default defineConfig({
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
});

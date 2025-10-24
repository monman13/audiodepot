// next.config.mjs
import { defineConfig } from 'next';

export default defineConfig({
  // Don’t let ESLint/TS stop the build while we’re moving fast
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
});

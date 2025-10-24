// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        depot: {
          bg: "#0b1512",
          panel: "#0f241e",
          text: "#e6f2ee",
          accent: "#ff7a1a",
          muted: "#99b6ad"
        }
      },
      borderRadius: {
        xl: "16px",
      }
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'slide-right': 'slideRight 1s ease-in-out infinite',
        'slide-infinite': 'slideInfinite 1.5s ease-in-out infinite',
        'progress-shimmer': 'progressShimmer 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInfinite: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        progressShimmer: {
          '0%': { backgroundPosition: '-40px 0' },
          '100%': { backgroundPosition: '40px 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
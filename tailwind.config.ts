import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: "#00C9C9",
          blue: "#3498DB",
          teal: "#005F73",
        },
        neutral: {
          dark: "#2C3E50",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
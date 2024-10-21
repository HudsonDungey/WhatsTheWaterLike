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
        'baby-blue': "#89cff0",
        'light-baby-blue': "#b1e1f9",
        'lemon-yellow': "#FFF36D"
      },
    },
  },
  plugins: [],
};
export default config;

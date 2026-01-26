import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        primary: {
          DEFAULT: "#6EC1E4", 
          foreground: "#FFFFFF",
          10: "#EAF6FB",
          20: "#D4EDF7", 
        },
        secondary: {
            DEFAULT: "#54595F",
            foreground: "#FFFFFF",
        },
        accent: {
            DEFAULT: "#61CE70", 
            foreground: "#FFFFFF",
        },
        muted: "#7A7A7A", 
        card: {
            DEFAULT: "#FFFFFF",
            highlight: "#E0F2F1",
        },
        border: "#E5E7EB",
      },
    },
  },
  plugins: [], 
} satisfies Config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ink: "#1C1917",
        rust: {
          DEFAULT: "#C2410C",
          light: "#EA580C",
          dark: "#9A3412",
        },
        stone: {
          warm: "#78716C",
          light: "#E7E5E4",
        },
        forest: "#166534",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [],
};

export default config;

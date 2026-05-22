import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        surface: "#FFFFFF",
        "surface-subtle": "#F7F8FB",
        "surface-lilac": "#F4F1FF",
        // Text
        ink: {
          DEFAULT: "#101828",
          secondary: "#475467",
          muted: "#667085",
        },
        // Brand
        brand: {
          DEFAULT: "#6F5CFF",
          dark: "#3B247F",
          soft: "#EDE9FF",
        },
        // Accents
        "accent-green": "#25D366",
        "accent-lime": "#C8E84F",
        // Lines (named "line" to avoid clashing with the `border` utility)
        line: {
          DEFAULT: "#E5E7EB",
          soft: "#EDF0F5",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          '"Manrope"',
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-1": [
          "clamp(2.5rem, 5.2vw, 4.5rem)",
          {
            lineHeight: "1.02",
            fontWeight: "800",
            letterSpacing: "-0.02em",
          },
        ],
        "display-2": [
          "clamp(2rem, 3.6vw, 3.4rem)",
          {
            lineHeight: "1.08",
            fontWeight: "800",
            letterSpacing: "-0.02em",
          },
        ],
        "display-3": [
          "1.25rem",
          {
            lineHeight: "1.25",
            fontWeight: "700",
          },
        ],
        lead: [
          "1.125rem",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
      },
      borderRadius: {
        card: "1.5rem",
        "card-lg": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(16 24 40 / 0.05), 0 1px 2px -1px rgb(16 24 40 / 0.05)",
        card: "0 4px 24px -4px rgb(16 24 40 / 0.08)",
        brand: "0 4px 14px 0 rgb(111 92 255 / 0.25)",
        "brand-lg": "0 8px 24px -4px rgb(111 92 255 / 0.35)",
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        "lilac-fade":
          "linear-gradient(180deg, rgba(244,241,255,0.6) 0%, rgba(255,255,255,0) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

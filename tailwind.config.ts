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
        uxi: {
          white: "#FFFFFF",
          "off-white": "#FFFDF9",
          "warm-bg": "#F4F8FC",
          "light-neutral": "#F5F5F3",
          surface: "#FAFAF8",
          primary: "#171717",
          secondary: "#6F6F6F",
          muted: "#8E8E8E",
          blue: "#2C72B2",
          electric: "#1D68BD",
          sky: "#38BDF8",
          "soft-blue": "#EBF3FA",
          "soft-ice": "#D5E7F7",
          orange: "#2C72B2",
          coral: "#1D68BD",
          "soft-orange": "#EBF3FA",
          "soft-coral": "#D5E7F7",
          border: "#EAEAE7",
          "border-light": "#F2F1ED",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        tech: ["var(--font-tech)", "var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-tech)", "var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "uxi-sm": "0 2px 8px -2px rgba(23, 23, 23, 0.04), 0 1px 4px -1px rgba(23, 23, 23, 0.02)",
        "uxi-md": "0 8px 24px -4px rgba(23, 23, 23, 0.06), 0 2px 8px -2px rgba(23, 23, 23, 0.03)",
        "uxi-lg": "0 20px 48px -8px rgba(23, 23, 23, 0.08), 0 4px 16px -4px rgba(23, 23, 23, 0.03)",
        "uxi-glow": "0 12px 36px -4px rgba(44, 114, 178, 0.22)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

// ДИЗАЙН v3 — карточки со скруглениями. Скругление задаётся ОДНОЙ переменной --radius в app/globals.css:
// 24px — как сейчас, 0px — квадратный стиль park-patriot.com. Цвета те же, что на сайте парка.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        chalk: "#F2F2F2",     // подложка карточек, как в референсе
        line: "#E1E1E1",
        ink: "#181818",
        dim: "#6F6F6F",
        brandRed: "#DB2200",
        brandRedDeep: "#B31C00",
        brandBlue: "#0D70CC",
        footer: "#1C1C1C",
        flagNote: "#8B5CF6",
      },
      fontFamily: {
        sans: ["var(--font-golos)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1180px" },
      borderRadius: {
        card: "var(--radius)",
        cardSm: "var(--radius-sm)",
        pill: "var(--radius-pill)",
      },
    },
  },
  plugins: [],
};
export default config;

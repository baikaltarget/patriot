import type { Config } from "tailwindcss";

// ДИЗАЙН. Фирменный стиль park-patriot.com — цвета сняты пипеткой с реального сайта.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",     // сайт парка — чистый белый, без кремовых подложек
        chalk: "#F3F3F3",     // светло-серые подложки секций
        line: "#E1E1E1",      // тонкие разделители
        ink: "#181818",       // основной текст, близко к футеру
        dim: "#666666",       // второстепенный текст
        brandRed: "#DB2200",  // кнопки «Узнать подробнее» / CTA — снято с сайта
        brandRedDeep: "#B31C00",
        brandBlue: "#0D70CC", // стрелки карусели, заголовки колонок футера
        footer: "#1C1C1C",    // футер park-patriot.com, не чистый чёрный
        flagNote: "#8B5CF6",  // служебная пометка «нужны данные» — намеренно не пересекается с брендом
      },
      fontFamily: {
        sans: ["var(--font-golos)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1180px" },
      borderRadius: { none: "0px" },
    },
  },
  plugins: [],
};
export default config;

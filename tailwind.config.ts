import type { Config } from "tailwindcss";

// ДИЗАЙН. Палитра и шрифты сайта. Контент здесь не живёт — он в content/site.json.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",   // фон страницы, тёплый белый
        chalk: "#EFF0EC",   // подложки, чередование строк
        line: "#C7CAC5",    // линии чертежа, границы таблиц
        ink: "#22262A",     // основной текст
        dim: "#6B7075",     // второстепенный текст
        signal: "#E85D04",  // акцент — сигнальный оранжевый сценического оборудования
        signalDeep: "#C24B00",
        alert: "#D7263D",   // красная рамка «нужны данные заказчика»
      },
      fontFamily: {
        sans: ["var(--font-golos)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1180px" },
    },
  },
  plugins: [],
};
export default config;

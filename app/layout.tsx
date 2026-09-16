import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { content, SITE_URL } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Metrika from "@/components/Metrika";
import UtmCatcher from "@/components/UtmCatcher";
import JsonLd from "@/components/JsonLd";
import { localBusinessLd, organizationLd } from "@/lib/seo";

// Шрифты подключены локально: в песочнице и на части хостингов Google Fonts не грузится.
const golos = localFont({
  src: "./fonts/GolosText.ttf",
  variable: "--font-golos",
  weight: "400 900",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/JetBrainsMono.ttf",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: content.pages.home.title,
  description: content.pages.home.description,
  robots: { index: true, follow: true },
  // /favicon.ico лежит в public — его ищут Яндекс.Вебмастер, Метрика и Search Console.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  // Подтверждение прав в Яндекс.Вебмастере и Google Search Console.
  // Коды — в content/site.json -> site.verification. Пустое значение не выводится.
  verification: {
    ...(content.site.verification?.yandex ? { yandex: content.site.verification.yandex } : {}),
    ...(content.site.verification?.google ? { google: content.site.verification.google } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${golos.variable} ${mono.variable}`}>
      <body>
        <div id="top" />
        <JsonLd data={organizationLd()} />
        <JsonLd data={localBusinessLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <Metrika />
        <UtmCatcher />
      </body>
    </html>
  );
}

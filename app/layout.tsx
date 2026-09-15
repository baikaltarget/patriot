import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { content, SITE_URL } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        {/* Счётчики: Яндекс.Метрика вставляется сюда, перед </body>. См. README. */}
      </body>
    </html>
  );
}

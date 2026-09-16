import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  const s = content.site;
  return {
    name: `${s.name} — ${s.parentName}`,
    short_name: s.name,
    description: s.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#db2200",
    lang: "ru",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}

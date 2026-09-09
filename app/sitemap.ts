import type { MetadataRoute } from "next";
import { content, SITE_URL } from "@/lib/content";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const p = (path: string, priority = 0.7, changeFrequency: "weekly" | "monthly" = "monthly") => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    p("/", 1, "weekly"),
    p("/konferenc-zal/", 0.9),
    p("/korporativ/", 0.9),
    p("/korporativ/novogodniy/", 0.8, "weekly"),
    p("/ploshchadka/", 0.8),
    p("/oborudovanie/", 0.7),
    p("/ceny/", 0.8, "weekly"),
    p("/zaly/", 0.6),
    ...content.halls.map((h) => p(`/zaly/${h.slug}/`, 0.7)),
    ...content.formats.map((f) => p(`/format/${f.slug}/`, 0.6)),
    p("/meropriyatiya/", 0.6),
    ...content.cases.map((c) => p(`/meropriyatiya/${c.slug}/`, 0.6)),
    p("/blog/", 0.5, "weekly"),
    ...getPosts().map((b) => p(`/blog/${b.slug}/`, 0.5)),
    p("/o-ploshchadke/", 0.4),
    p("/kontakty/", 0.6),
    p("/politika/", 0.1),
  ];
}

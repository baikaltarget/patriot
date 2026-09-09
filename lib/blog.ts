import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  h1: string;
  html: string;
  excerpt: string;
};

const dir = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data: Record<string, string> = {};
  if (!m) return { data, body: raw };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    data[k] = v;
  }
  return { data, body: m[2] };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const html = marked.parse(body) as string;
      const excerpt = body.replace(/[#*_>`]/g, "").trim().split("\n").find((l) => l.trim().length > 60) ?? "";
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? f,
        description: data.description ?? "",
        date: data.date ?? "",
        h1: data.h1 ?? data.title ?? f,
        html,
        excerpt,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

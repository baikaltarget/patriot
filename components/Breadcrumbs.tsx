import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbsLd } from "@/lib/seo";

export default function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Главная", href: "/" }, ...items];
  return (
    <nav aria-label="Хлебные крошки" className="wrap pt-6 text-sm text-dim">
      <JsonLd data={breadcrumbsLd(all)} />
      <ol className="flex flex-wrap gap-x-2">
        {all.map((it, i) => (
          <li key={it.href} className="flex gap-2">
            {i < all.length - 1 ? (
              <Link href={it.href} className="hover:text-ink">{it.name}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{it.name}</span>
            )}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

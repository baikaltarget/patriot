import Link from "next/link";
import { content } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const pg = content.blog;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/blog/" });

export default function Page() {
  const posts = getPosts();
  return (
    <>
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }]} />
      <section className="wrap py-10 md:py-16">
        <h1>{pg.h1}</h1>
        <p className="mt-5 max-w-[56ch] text-lg text-dim">Без рекламы: как считать площадку, что проверять и когда ресторан выгоднее зала.</p>
      </section>
      <section className="wrap section pt-0">
        <ul className="grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="border-t border-ink pt-4">
              <time dateTime={p.date} className="dimension">{new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</time>
              <h2 className="mt-2 text-xl"><Link href={`/blog/${p.slug}/`} className="no-underline hover:underline">{p.title}</Link></h2>
              <p className="mt-2 text-dim">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

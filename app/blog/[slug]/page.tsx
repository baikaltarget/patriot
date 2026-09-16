import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/blog";
import { blogPostingLd, meta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return meta({ title: p.title, description: p.description, path: `/blog/${p.slug}/`, type: "article" });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = getPosts().filter((x) => x.slug !== p.slug);
  return (
    <>
      <JsonLd data={blogPostingLd({ title: p.title, description: p.description, path: `/blog/${p.slug}/`, date: p.date })} />
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }, { name: p.title, href: `/blog/${p.slug}/` }]} />
      <article className="wrap py-10 md:py-16">
        <time dateTime={p.date} className="dimension">{new Date(p.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}</time>
        <h1 className="mt-2 max-w-[24ch]">{p.h1}</h1>
        <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: p.html }} />
      </article>
      <section className="wrap section pt-0">
        <h2 className="mb-6">Ещё в блоге</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="card">
              <Link href={`/blog/${o.slug}/`} className="no-underline">
                <h3 className="hover:underline">{o.title}</h3>
                <p className="mt-2 text-[15px] text-dim">{o.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mb-6 mt-12">Посмотреть площадку</h2>
        <ul className="flex flex-wrap gap-2">
          {[
            { n: "Конференц-зал", h: "/konferenc-zal/" },
            { n: "Корпоратив", h: "/korporativ/" },
            { n: "Выпускной", h: "/vypusknoy/" },
            { n: "Концерты и выставки", h: "/ploshchadka/" },
            { n: "Цены", h: "/ceny/" },
            { n: "Проведённые мероприятия", h: "/meropriyatiya/" },
          ].map((x) => (
            <li key={x.h}><Link href={x.h} className="inline-block rounded-pill border border-line px-4 py-2 text-[15px] no-underline hover:border-ink">{x.n}</Link></li>
          ))}
        </ul>
      </section>
      <section className="wrap section pt-0"><LeadForm title="Посчитать площадку под своё мероприятие" /></section>
    </>
  );
}

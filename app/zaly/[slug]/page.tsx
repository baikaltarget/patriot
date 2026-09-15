import { notFound } from "next/navigation";
import Link from "next/link";
import { content, fmt } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import PhotoSlot from "@/components/PhotoSlot";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import { SeatingSchemes, HallList } from "@/components/Sections";

export function generateStaticParams() {
  return content.halls.map((h) => ({ slug: h.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = content.halls.find((x) => x.slug === slug);
  if (!h) return {};
  return meta({ title: h.title, description: h.description, path: `/zaly/${h.slug}/` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = content.halls.find((x) => x.slug === slug);
  if (!h) notFound();
  const big = h.slug === "multihall";
  return (
    <>
      <JsonLd data={serviceLd({ name: `Аренда: ${h.name}`, description: h.description, path: `/zaly/${h.slug}/`, price: h.priceFrom, priceUnit: h.priceUnit })} />
      <Breadcrumbs items={[{ name: "Залы", href: "/zaly/" }, { name: h.name, href: `/zaly/${h.slug}/` }]} />
      <section className="wrap grid items-center gap-10 py-10 md:grid-cols-[1fr_1fr] md:py-16">
        <div>
          <h1>{h.h1}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-dim">{h.intro}</p>
          <dl className="card mt-6 grid grid-cols-3 gap-4">
            <div><dt className="text-sm text-dim">Площадь</dt><dd className="font-mono text-xl">{h.area} м²</dd></div>
            <div><dt className="text-sm text-dim">Потолок</dt><dd className="font-mono text-xl">{h.height} м</dd></div>
            <div><dt className="text-sm text-dim">Вместимость</dt><dd className="font-mono text-xl">{h.capacity}</dd></div>
          </dl>
          <NeedsData on={!!("needsData" in h && h.needsData)} className="mt-6 inline-block">
            <p className="flex items-baseline gap-3"><span className="text-3xl font-semibold">от {fmt(h.priceFrom)}</span><span className="text-dim">{h.priceUnit}</span></p>
          </NeedsData>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#zayavka" className="btn-signal">Забронировать</a>
            <Link href="/ceny/" className="btn-ghost">Все цены</Link>
          </div>
        </div>
        <PhotoSlot src={big ? "/img/hall-01.jpg" : `/img/${h.slug}-01.jpg`} alt={h.name} ratio="4/3" placeholder={!big} />
      </section>
      <section className="wrap section pt-0 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4">Что в зале</h2>
          <ul className="grid gap-2">
            {h.features.map((f) => (
              <li key={f} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brandRed" /><span>{f}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4">Для чего берут</h2>
          <ul className="grid gap-2">
            {h.bestFor.map((f) => <li key={f} className="border-b border-line pb-2">{f}</li>)}
          </ul>
        </div>
      </section>
      {big && <SeatingSchemes />}
      <Faq items={h.faq} />
      <HallList title="Другие помещения" />
      <section className="wrap section pt-0"><LeadForm title={`Забронировать: ${h.name}`} /></section>
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { caseEstimate, content, fmt, layoutName } from "@/lib/content";
import { meta, productLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoSlot from "@/components/PhotoSlot";
import LeadForm from "@/components/LeadForm";
import { CaseList } from "@/components/Sections";

export function generateStaticParams() {
  return content.cases.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = content.cases.find((x) => x.slug === slug);
  if (!c) return {};
  const e = caseEstimate(c);
  return meta({
    title: `${c.name} — ${fmt(e.total)}, Мультихолл, Иркутск`,
    description: `${c.summary} Стоимость площадки: ${fmt(e.total)}. Полная смета на странице.`,
    path: `/meropriyatiya/${c.slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = content.cases.find((x) => x.slug === slug);
  if (!c) notFound();
  const e = caseEstimate(c);
  return (
    <>
      <JsonLd data={productLd({ name: c.name, description: c.summary, path: `/meropriyatiya/${c.slug}/`, price: e.total, image: `/img/case-${c.slug}-01.jpg` })} />
      <Breadcrumbs items={[{ name: "Мероприятия", href: "/meropriyatiya/" }, { name: c.name, href: `/meropriyatiya/${c.slug}/` }]} />
      <div className="wrap my-6">
        <section className="grid items-start gap-10 py-6 md:grid-cols-2 md:py-10">
          <div>
            <p className="text-dim">{c.format} · {layoutName(c.layout)} · {c.guests} человек</p>
            <h1 className="mt-2">{c.name}</h1>
            <p className="mt-5 max-w-[52ch] text-lg text-dim">{c.summary}</p>
            <p className="mt-4 max-w-[60ch]">{c.detail}</p>
          </div>
          <div>
            <PhotoSlot src={c.photos[0]} alt={c.name} ratio="4/3" placeholder={false} />
            <h2 className="mb-3 mt-8">Смета</h2>
            <table className="table-price">
              <tbody>
                {e.lines.map((l) => <tr key={l.name}><td>{l.name}</td><td className="num">{fmt(l.price)}</td></tr>)}
                <tr className="font-semibold"><td className="!border-ink">Итого за площадку</td><td className="num !border-ink">{fmt(e.total)}</td></tr>
              </tbody>
            </table>
            <p className="mt-2 text-sm text-dim">{fmt(Math.round(e.total / c.guests))} на участника. Кейтеринг и программа заказчика — не включены.</p>
          </div>
        </section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {c.photos.map((src) => (
            <PhotoSlot key={src} src={src} alt={`${c.name} — Мультихолл, Иркутск`} placeholder={false} />
          ))}
        </div>
        <p className="dimension mt-3">Фотографии сделаны в этом зале на мероприятиях похожего формата</p>
      </div>
      <p className="wrap text-dim">Похожее мероприятие? <Link href="/ceny/" className="underline">Посчитайте своё в калькуляторе</Link> — цены те же.</p>
      <CaseList title="Другие мероприятия" filter={(x) => x.slug !== c.slug} limit={3} />
      <section className="wrap section pt-0"><LeadForm preset={{ event: c.format, guests: String(c.guests) }} /></section>
    </>
  );
}

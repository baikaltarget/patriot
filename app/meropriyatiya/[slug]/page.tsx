import { notFound } from "next/navigation";
import Link from "next/link";
import { caseEstimate, content, fmt, layoutName } from "@/lib/content";
import { meta, productLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoSlot from "@/components/PhotoSlot";
import LeadForm from "@/components/LeadForm";
import { CaseList } from "@/components/Sections";

function durationLabel(c: { duration: string; hours?: number }) {
  if (c.duration === "hourly") return `${c.hours ?? 1} ч по часам`;
  if (c.duration === "short") return "4–6 часов";
  if (c.duration === "day") return "полный день";
  if (c.duration === "twodays") return "два дня";
  return c.duration;
}

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
      <JsonLd data={productLd({ name: c.name, description: c.summary, path: `/meropriyatiya/${c.slug}/`, price: e.total, image: c.photos[0] })} />
      <Breadcrumbs items={[{ name: "Мероприятия", href: "/meropriyatiya/" }, { name: c.name, href: `/meropriyatiya/${c.slug}/` }]} />
      <div className="wrap my-6">
        <section className="grid items-center gap-8 py-6 md:grid-cols-2 md:gap-10 md:py-10">
          <div>
            <p className="text-dim">{c.format} · {layoutName(c.layout)} · {c.guests} человек</p>
            <h1 className="mt-2">{c.name}</h1>
            <p className="mt-5 max-w-[52ch] text-lg text-dim">{c.summary}</p>
          </div>
          <PhotoSlot src={c.photos[0]} alt={c.name} ratio="4/3" placeholder={false} />
        </section>

        <section className="grid items-start gap-4 md:grid-cols-[1.15fr_1fr] md:gap-6">
          <div className="card">
            <h2 className="mb-4">Как это было</h2>
            <p className="max-w-[60ch] text-dim">{c.detail}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
              <div><dt className="text-sm text-dim">Формат</dt><dd className="font-medium">{c.format}</dd></div>
              <div><dt className="text-sm text-dim">Рассадка</dt><dd className="font-medium">{layoutName(c.layout)}</dd></div>
              <div><dt className="text-sm text-dim">Участников</dt><dd className="font-medium">{c.guests}</dd></div>
              <div><dt className="text-sm text-dim">Аренда</dt><dd className="font-medium">{durationLabel(c)}</dd></div>
            </dl>
          </div>

          <div className="card">
            <h2 className="mb-4">Смета</h2>
            <table className="table-price">
              <tbody>
                {e.lines.map((l) => <tr key={l.name}><td>{l.name}</td><td className="num">{fmt(l.price)}</td></tr>)}
                <tr className="font-semibold"><td className="!border-ink">Итого за площадку</td><td className="num !border-ink">{fmt(e.total)}</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-dim">{fmt(Math.round(e.total / c.guests))} на участника. Кейтеринг и программа заказчика не включены.</p>
            <a href="#zayavka" className="btn-signal mt-5">Посчитать своё мероприятие</a>
          </div>
        </section>

        {c.photos.length > 1 && (
          <section className="mt-4">
            <div className={`grid gap-4 ${c.photos.length - 1 >= 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
              {c.photos.slice(1).map((src) => (
                <PhotoSlot key={src} src={src} alt={`${c.name} — Мультихолл, Иркутск`} placeholder={false} />
              ))}
            </div>
            <p className="dimension mt-3">Фотографии сделаны в этом зале на мероприятиях похожего формата</p>
          </section>
        )}
      </div>
      <p className="wrap text-dim">Похожее мероприятие? <Link href="/ceny/" className="underline">Посчитайте своё в калькуляторе</Link> — цены те же.</p>
      <CaseList title="Другие мероприятия" filter={(x) => x.slug !== c.slug} limit={3} />
      <section className="wrap section pt-0"><LeadForm preset={{ event: c.format, guests: String(c.guests) }} /></section>
    </>
  );
}

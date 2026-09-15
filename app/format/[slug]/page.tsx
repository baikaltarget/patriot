import { notFound } from "next/navigation";
import Link from "next/link";
import { content, estimate, fmt, layoutName } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoSlot from "@/components/PhotoSlot";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";
import { FormatList, CaseList } from "@/components/Sections";

const formatImage: Record<string, { src: string; alt: string }> = {
  seminar: { src: "/img/format-class.jpg", alt: "Рассадка классом на реальном турнире в Мультихолле" },
  trening: { src: "/img/format-class.jpg", alt: "Рассадка классом в Мультихолле" },
  prezentaciya: { src: "/img/conf-02.jpg", alt: "Презентация на сцене Мультихолла" },
  "master-klass": { src: "/img/format-class.jpg", alt: "Столы и стулья для мастер-класса" },
  vystavka: { src: "/img/koncert-02.jpg", alt: "Мероприятие с партнёрами в Мультихолле" },
  koncert: { src: "/img/koncert-01.jpg", alt: "Концертная программа на сцене Мультихолла" },
};

export function generateStaticParams() {
  return content.formats.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = content.formats.find((x) => x.slug === slug);
  if (!f) return {};
  return meta({ title: f.title, description: f.description, path: `/format/${f.slug}/` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = content.formats.find((x) => x.slug === slug);
  if (!f) notFound();
  const dur = f.duration as "short" | "day" | "twodays" | "hourly";
  const est = estimate({ duration: dur, hours: 4, extras: f.equipmentSet, cleaning: true });
  const durName = dur === "hourly" ? "4 часа по часам" : content.pricing.tariffs.find((t) => t.id === dur)!.name.toLowerCase();
  const parent = ["seminar", "trening", "prezentaciya", "master-klass"].includes(f.slug)
    ? { name: "Конференц-зал", href: "/konferenc-zal/" }
    : { name: "Концерты и выставки", href: "/ploshchadka/" };
  return (
    <>
      <JsonLd data={serviceLd({ name: f.h1, description: f.description, path: `/format/${f.slug}/`, price: est.total, priceUnit: `пример сметы: ${durName}` })} />
      <Breadcrumbs items={[parent, { name: f.name, href: `/format/${f.slug}/` }]} />
      <section className="wrap grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1>{f.h1}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-dim">{f.intro}</p>
          <dl className="card mt-6 grid gap-3 sm:grid-cols-2">
            <div><dt className="text-sm text-dim">Рассадка</dt><dd className="font-medium">{layoutName(f.layout)}</dd></div>
            <div><dt className="text-sm text-dim">Обычно</dt><dd className="font-medium">{f.typicalGuests}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#zayavka" className="btn-signal">Запросить дату</a>
            <Link href={parent.href} className="btn-ghost">{parent.name}</Link>
          </div>
        </div>
        <PhotoSlot {...(formatImage[f.slug] ?? { src: "/img/hall-01.jpg", alt: f.h1 })} ratio="4/3" placeholder={false} />
      </section>
      <section className="wrap section pt-0 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4">Как это обычно устроено</h2>
          <ul className="grid gap-3">
            {f.tips.map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brandRed" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4">Пример сметы</h2>
          <table className="table-price">
            <tbody>
              {est.lines.map((l) => <tr key={l.name}><td>{l.name}</td><td className="num">{fmt(l.price)}</td></tr>)}
              <tr className="font-semibold"><td className="!border-ink">Итого за площадку</td><td className="num !border-ink">{fmt(est.total)}</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm text-dim">Типовой набор для формата «{f.name.toLowerCase()}»: {durName}. Точный расчёт — в <Link href="/ceny/" className="underline">калькуляторе</Link>.</p>
        </div>
      </section>
      <CaseList limit={3} />
      <Faq items={f.faq} />
      <FormatList title="Другие форматы" exclude={f.slug} />
      <section className="wrap section pt-0"><LeadForm title={`Заявка: ${f.name.toLowerCase()}`} preset={{ event: f.name }} /></section>
    </>
  );
}

import { content } from "@/lib/content";
import { meta, productLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import { CaseList } from "@/components/Sections";

const pg = content.pages.prices;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/ceny/" });

export default function Page() {
  return (
    <>
      {content.pricing.tariffs.map((t) => (
        <JsonLd key={t.id} data={productLd({ name: `Аренда зала: ${t.name}`, description: `${t.name}, ${t.unit}. Зал 300 м² до 175 человек, Иркутск.`, path: "/ceny/", price: t.price })} />
      ))}
      <Breadcrumbs items={[{ name: "Цены", href: "/ceny/" }]} />
      <section className="wrap py-10 md:py-16">
        <h1>{pg.h1}</h1>
        <p className="mt-5 max-w-[56ch] text-lg text-dim">{pg.lead}</p>
      </section>
      <section className="wrap section pt-0"><PriceTable /></section>
      <section className="section bg-chalk">
        <div className="wrap">
          <h2 className="mb-8">Калькулятор</h2>
          <Calculator />
        </div>
      </section>
      <CaseList title="Примеры смет" />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

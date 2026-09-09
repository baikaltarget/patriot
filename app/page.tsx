import Link from "next/link";
import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { Hero, SpecStrip, Blocks, Gallery, HallList, FormatList, CaseList, Layouts } from "@/components/Sections";
import PriceTable from "@/components/PriceTable";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";

const pg = content.pages.home;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Аренда зала для мероприятий", description: pg.description, path: "/", price: 15000, priceUnit: "за мероприятие 4–6 часов" })} />
      <Hero h1={pg.h1} lead={pg.lead} layout="theatre" priceFrom={15000} priceUnit="за мероприятие 4–6 часов" secondary={{ label: "Цены", href: "/ceny/" }} />
      <SpecStrip />
      <Blocks title="Почему сюда" items={pg.why} cols={4} />
      <FormatList />
      <Layouts />
      <Gallery />
      <HallList />
      <section className="section bg-chalk">
        <div className="wrap">
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <h2>Цены</h2>
            <Link href="/ceny/" className="text-dim hover:text-ink">Подробнее о ценах</Link>
          </div>
          <PriceTable compact />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="mb-2">Посчитать стоимость</h2>
          <p className="mb-8 max-w-[60ch] text-dim">Четыре вопроса — и сумма по прайсу. Без «от» и без звонка, чтобы узнать цену.</p>
          <Calculator />
        </div>
      </section>
      <CaseList limit={3} />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0">
        <LeadForm />
      </section>
    </>
  );
}

import Link from "next/link";
import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, SpecStrip, Blocks, Gallery, CaseList, FormatList } from "@/components/Sections";
import PriceTable from "@/components/PriceTable";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";

const pg = content.pages.venue;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/ploshchadka/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Площадка для концертов и выставок в Иркутске", description: pg.description, path: "/ploshchadka/", price: 15000, priceUnit: "за мероприятие 4–6 часов" })} />
      <Breadcrumbs items={[{ name: "Концерты и выставки", href: "/ploshchadka/" }]} />
      <Hero
        h1={pg.h1}
        lead={pg.lead}
        image={{ src: "/img/koncert-02.jpg", alt: "Сцена Мультихолла со светом на мероприятии" }}
        priceFrom={15000}
        priceUnit="за мероприятие, сцена включена"
        secondary={{ label: "Оборудование и райдер", href: "/oborudovanie/" }}
      />
      <SpecStrip />
      <Blocks items={pg.blocks} />
      <Gallery
        title="Реальные концерты и события"
        images={[
          { src: "/img/koncert-01.jpg", alt: "Награждение на сцене с цветной подсветкой" },
          { src: "/img/festival-01.jpg", alt: "Праздничная программа на сцене" },
          { src: "/img/hall-02.jpg", alt: "Полный зал сверху" },
          { src: "/img/hall-03.jpg", alt: "Зал во время мероприятия с экраном" },
          { src: "/img/koncert-02.jpg", alt: "Сцена с фирменным оформлением" },
        ]}
      />
      <section className="section bg-chalk">
        <div className="wrap"><h2 className="mb-8">Тарифы</h2><PriceTable compact /><p className="mt-6 text-dim">Свет, подвес, конференц-системы и персонал — в <Link href="/oborudovanie/" className="text-brandBlue underline">полном прайсе оборудования</Link>.</p></div>
      </section>
      <CaseList filter={(c) => ["Выставка", "Презентация"].includes(c.format)} title="Выставки и презентации со сметой" />
      <FormatList title="Форматы" />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Заявка на площадку" preset={{ event: "Концерт или показ" }} /></section>
    </>
  );
}

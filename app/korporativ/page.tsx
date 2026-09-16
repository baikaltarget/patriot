import Link from "next/link";
import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, SpecStrip, Blocks, Gallery, CaseList, TeamBuilding, SeatingSchemes } from "@/components/Sections";
import PriceTable from "@/components/PriceTable";
import LeadForm from "@/components/LeadForm";
import Catering from "@/components/Catering";
import Faq from "@/components/Faq";

const pg = content.pages.corporate;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/korporativ/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Зал для корпоратива в Иркутске", description: pg.description, path: "/korporativ/", price: 15000, priceUnit: "вечер 4–6 часов" })} />
      <Breadcrumbs items={[{ name: "Корпоратив", href: "/korporativ/" }]} />
      <Hero
        h1={pg.h1}
        lead={pg.lead}
        image={{ src: "/img/koncert-01.jpg", alt: "Награждение на сцене Мультихолла, корпоративное мероприятие" }}
        priceFrom={15000}
        priceUnit="за вечер 4–6 часов"
        secondary={{ label: "Новогодний корпоратив", href: "/korporativ/novogodniy/" }}
      />
      <SpecStrip />
      <Blocks items={pg.blocks} />
      <TeamBuilding />
      <Gallery
        title="Реальные корпоративы и праздники"
        images={[
          { src: "/img/koncert-02.jpg", alt: "Сцена с фирменным оформлением на корпоративном мероприятии" },
          { src: "/img/hall-02.jpg", alt: "Полный зал на мероприятии в Мультихолле" },
          { src: "/img/festival-01.jpg", alt: "Праздничная программа на сцене Мультихолла" },
          { src: "/img/koncert-01.jpg", alt: "Награждение с цветной подсветкой сцены" },
          { src: "/img/kids-02.jpg", alt: "Праздничное мероприятие в Мультихолле" },
        ]}
      />
      <SeatingSchemes />
      <section className="section bg-chalk">
        <div className="wrap">
          <h2 className="mb-2">Что стоит вечер</h2>
          <p className="mb-8 max-w-[60ch] text-dim">Зал 15 000 ₽, звук 5 000, микрофон 2 000, уборка 1 500 — 23 500 ₽ за площадку на любое число гостей до 56. На 50 человек это около 470 ₽ с каждого.</p>
          <PriceTable compact />
          <p className="mt-6"><Link href="/#zayavka" className="text-brandBlue underline">Посчитать точнее в калькуляторе на главной</Link></p>
        </div>
      </section>
      <Catering />
      <CaseList filter={(c) => c.format === "Корпоратив"} title="Корпоративы со сметой" />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Заявка на корпоратив" preset={{ event: "Корпоратив" }} /></section>
    </>
  );
}

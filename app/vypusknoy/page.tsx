import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, SpecStrip, Blocks, Gallery, SeatingSchemes, CaseList } from "@/components/Sections";
import PriceTable from "@/components/PriceTable";
import LeadForm from "@/components/LeadForm";
import Faq from "@/components/Faq";

const pg = content.pages.graduation;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/vypusknoy/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Площадка для выпускного в Иркутске", description: pg.description, path: "/vypusknoy/", price: 15000, priceUnit: "за мероприятие 4–6 часов" })} />
      <Breadcrumbs items={[{ name: "Выпускной", href: "/vypusknoy/" }]} />
      <Hero
        h1={pg.h1}
        lead={pg.lead}
        image={{ src: "/img/festival-01.jpg", alt: "Детский праздник на сцене Мультихолла" }}
        priceFrom={15000}
        priceUnit="за мероприятие 4–6 часов"
        cta="Узнать свободные даты"
      />
      <SpecStrip />
      <Blocks items={pg.blocks} label="Выпускной" />
      <Gallery
        title="Детские и школьные праздники в зале"
        images={[
          { src: "/img/kids-01.jpg", alt: "Детский праздник в Мультихолле" },
          { src: "/img/kids-02.jpg", alt: "Группа детей на сцене Мультихолла" },
          { src: "/img/festival-01.jpg", alt: "Выступление детей на сцене" },
          { src: "/img/hall-02.jpg", alt: "Зрительный зал с родителями" },
          { src: "/img/koncert-01.jpg", alt: "Сцена со световым оформлением" },
        ]}
      />
      <SeatingSchemes />
      <section className="section bg-chalk">
        <div className="wrap">
          <h2 className="mb-2">Сколько стоит</h2>
          <p className="mb-8 max-w-[62ch] text-dim">
            Платите за площадку один раз, а не за пакет с чужим ведущим. Вечер со звуком и микрофоном — 23 500 ₽ на любое число гостей до 175.
          </p>
          <PriceTable compact />
        </div>
      </section>
      <CaseList filter={(c) => ["Фестиваль", "Мастер-класс"].includes(c.format)} title="Детские мероприятия со сметой" />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Заявка на выпускной" preset={{ event: "Другое", comment: "Выпускной" }} /></section>
    </>
  );
}

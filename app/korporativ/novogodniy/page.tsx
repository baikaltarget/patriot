import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, Blocks, Gallery, TeamBuilding } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";
import Catering from "@/components/Catering";
import Faq from "@/components/Faq";

const pg = content.pages.newYear;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/korporativ/novogodniy/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Новогодний корпоратив в Иркутске", description: pg.description, path: "/korporativ/novogodniy/", price: 15000, priceUnit: "вечер 4–6 часов" })} />
      <Breadcrumbs items={[{ name: "Корпоратив", href: "/korporativ/" }, { name: "Новогодний", href: "/korporativ/novogodniy/" }]} />
      <Hero
        h1={pg.h1}
        lead={pg.lead}
        image={{ src: "/img/koncert-02.jpg", alt: "Новогоднее оформление сцены Мультихолла" }}
        priceFrom={15000}
        priceUnit="за вечер 4–6 часов"
        cta="Проверить дату"
      />
      <Blocks items={pg.blocks} />
      <Catering />
      <TeamBuilding />
      <Gallery
        title="С прошлых праздников"
        images={[
          { src: "/img/koncert-01.jpg", alt: "Награждение на сцене с цветной подсветкой" },
          { src: "/img/hall-02.jpg", alt: "Полный зал на праздничном мероприятии" },
          { src: "/img/koncert-02.jpg", alt: "Сцена с праздничным оформлением" },
        ]}
      />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Забронировать дату в декабре" preset={{ event: "Корпоратив", date: `декабрь ${pg.seasonYear}` }} /></section>
    </>
  );
}

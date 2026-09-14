import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import { Hero, Blocks, Gallery, TeamBuilding } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";
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
      <section className="section bg-chalk">
        <div className="wrap">
          <h2 className="mb-2">Даты декабря {pg.seasonYear}</h2>
          <p className="mb-6 text-dim">Обновляется вручную менеджером. Позвоните, чтобы подтвердить.</p>
          <NeedsData on={pg.datesNeedsData} className="inline-block">
            <table className="table-price min-w-[320px]">
              <tbody>
                {pg.dates.map((d) => (
                  <tr key={d.date}>
                    <td>{d.date}</td>
                    <td className={`num ${d.status === "занято" ? "text-dim line-through" : "text-brandBlue font-medium"}`}>{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </NeedsData>
        </div>
      </section>
      <Blocks items={pg.blocks} />
      <TeamBuilding />
      <Gallery
        title="С прошлых праздников"
        images={[
          { src: "/img/koncert-01.jpg", alt: "Награждение на сцене с цветной подсветкой" },
          { src: "/img/hall-02.jpg", alt: "Полный зал на праздничном мероприятии" },
        ]}
      />
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Забронировать дату в декабре" preset={{ event: "Корпоратив", date: `декабрь ${pg.seasonYear}` }} /></section>
    </>
  );
}

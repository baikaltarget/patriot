import { content } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, SpecStrip, Blocks, Gallery, HallList, CaseList, FormatList } from "@/components/Sections";
import PriceTable from "@/components/PriceTable";
import LeadForm from "@/components/LeadForm";
import Link from "next/link";
import Faq from "@/components/Faq";

const pg = content.pages.conference;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/konferenc-zal/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Аренда конференц-зала в Иркутске", description: pg.description, path: "/konferenc-zal/", price: 30000, priceUnit: "полный день 10 часов" })} />
      <Breadcrumbs items={[{ name: "Конференц-зал", href: "/konferenc-zal/" }]} />
      <Hero
        h1={pg.h1}
        lead={pg.lead}
        image={{ src: "/img/conf-01.jpg", alt: "Панельная дискуссия в конференц-зале Мультихолл" }}
        priceFrom={30000}
        priceUnit="за полный день, 10 часов"
        cta="Запросить расчёт"
      />
      <SpecStrip />
      <Blocks items={pg.blocks} />
      <Gallery
        title="Реальные конференции в зале"
        images={[
          { src: "/img/conf-02.jpg", alt: "Панельная дискуссия, форум в Мультихолле" },
          { src: "/img/hall-03.jpg", alt: "Зал во время доклада с проекцией" },
          { src: "/img/vks-01.jpg", alt: "Видеоконференцсвязь на мероприятии в Мультихолле" },
          { src: "/img/format-class.jpg", alt: "Рассадка классом на турнире в Мультихолле" },
          { src: "/img/conf-01.jpg", alt: "Деловой форум в Мультихолле" },
        ]}
      />
      <HallList title="Большой зал и малый зал" />
      <section className="section bg-chalk">
        <div className="wrap"><h2 className="mb-8">Тарифы для деловых мероприятий</h2><PriceTable /></div>
      </section>
      <CaseList filter={(c) => ["Конференция", "Форум", "Презентация"].includes(c.format)} title="Деловые мероприятия со сметой" />
      <FormatList title="Форматы деловых мероприятий" />
      <section className="wrap section pt-0">
        <h2 className="mb-6">Перед бронированием</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="card"><Link href="/blog/kak-organizovat-konferenciyu-chek-list/" className="no-underline"><h3 className="hover:underline">Чек-лист площадки для конференции</h3><p className="mt-2 text-[15px] text-dim">20 вещей, которые стоит проверить до подписания договора.</p></Link></li>
          <li className="card"><Link href="/blog/skolko-stoit-arenda-zala-v-irkutske/" className="no-underline"><h3 className="hover:underline">Сколько стоит аренда зала в Иркутске</h3><p className="mt-2 text-[15px] text-dim">Модели оплаты, что входит в цену и за что берут отдельно.</p></Link></li>
        </ul>
      </section>
      <Faq items={pg.faq} />
      <section className="wrap section pt-0"><LeadForm title="Запросить расчёт для конференции" preset={{ event: "Конференция" }} /></section>
    </>
  );
}

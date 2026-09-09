import { content, fmt } from "@/lib/content";
import { meta, serviceLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import FloorPlan from "@/components/FloorPlan";

const pg = content.pages.equipment;
const eq = content.equipment;
void eq.intro;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/oborudovanie/" });

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd({ name: "Аренда проектора, звука и света в Иркутске", description: pg.description, path: "/oborudovanie/", price: 12000, priceUnit: "базовый комплект: проектор, звук, микрофон" })} />
      <Breadcrumbs items={[{ name: "Оборудование", href: "/oborudovanie/" }]} />
      <section className="wrap grid items-start gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div>
          <h1>{pg.h1}</h1>
          <p className="mt-5 max-w-[56ch] text-lg text-dim">{pg.lead}</p>
        </div>
        <FloorPlan layout="empty" rooms caption={false} />
      </section>
      <section className="wrap section pt-0">
        <div className="grid gap-12 md:grid-cols-2">
          {eq.categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="mb-4">{cat.name}</h2>
              <table className="table-price">
                <tbody>
                  {cat.items.map((it) => (
                    <tr key={it.name}><td>{it.name}</td><td className="num">{fmt(it.price)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div>
            <h2 className="mb-4">Персонал и работы</h2>
            <table className="table-price">
              <tbody>
                {eq.staff.map((it) => (
                  <tr key={it.name}><td>{it.name}</td><td className="num">{"prefix" in it && it.prefix ? `${it.prefix} ` : ""}{fmt(it.price)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-ink pt-4">
            <h2 className="mb-3">Базовые комплекты</h2>
            <table className="table-price">
              <tbody>
                <tr><td>Семинар: проектор + микрофон</td><td className="num">{fmt(7000)}</td></tr>
                <tr><td>Конференция: проектор + звук + микрофон</td><td className="num">{fmt(12000)}</td></tr>
                <tr><td>Корпоратив: звук + микрофон</td><td className="num">{fmt(7000)}</td></tr>
                <tr><td>Концерт: звук + звукооператор + свет с художником</td><td className="num">{fmt(20000)}</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-dim">Комплекты «звук», «проектор» и «микрофон» из тарифов — это позиции ADJ Imperio, Christie LX1500 и Sennheiser EW 100 соответственно.</p>
          </div>
        </div>
      </section>
      <section className="wrap section pt-0"><LeadForm title="Уточнить оборудование под мероприятие" subtitle="Напишите, что планируете, — техник площадки скажет, чего хватит, а что лишнее." /></section>
    </>
  );
}

import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CaseList } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";

export const metadata = meta({
  title: "Проведённые мероприятия со сметами — Мультихолл, Иркутск",
  description: "Примеры мероприятий на площадке Мультихолл в Иркутске: формат, число участников, рассадка, что арендовали и итоговая стоимость площадки.",
  path: "/meropriyatiya/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Мероприятия", href: "/meropriyatiya/" }]} />
      <section className="wrap py-10 md:py-16">
        <h1>Проведённые мероприятия</h1>
        <p className="mt-5 max-w-[56ch] text-lg text-dim">Каждое — с составом аренды и суммой по прайсу. Это и есть ответ на вопрос «сколько это стоит на самом деле».</p>
      </section>
      <CaseList title="Со сметой" />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

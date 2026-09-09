import { content } from "@/lib/content";
import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloorPlan from "@/components/FloorPlan";
import { HallList } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";

export const metadata = meta({
  title: "Залы в аренду в Иркутске — 346 м², малый зал 68 м², переговорная 46 м²",
  description: "Три помещения Мультихолла в Иркутске: большой зал 346 м² до 300 человек, малый конференц-зал 68 м², переговорная 46 м². Аренда по часам и на день.",
  path: "/zaly/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Залы", href: "/zaly/" }]} />
      <section className="wrap grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1>Залы и помещения</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-dim">Большой зал со сценой и два помещения рядом. Берутся вместе под конференцию или по отдельности — переговорная по часам, малый зал под тренинг.</p>
        </div>
        <FloorPlan layout="empty" rooms caption />
      </section>
      <HallList title="Что есть" />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

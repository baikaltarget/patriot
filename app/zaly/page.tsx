import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoSlot from "@/components/PhotoSlot";
import { HallList } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";

export const metadata = meta({
  title: "Залы в аренду в Иркутске — большой зал 300 м² и малый зал 68 м²",
  description: "Два помещения Мультихолла в Иркутске: большой зал 300 м² до 175 человек по официальной схеме и малый конференц-зал 68 м² до 40 человек. Аренда по часам и на день.",
  path: "/zaly/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Залы", href: "/zaly/" }]} />
      <section className="wrap grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1>Залы и помещения</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-dim">Большой зал со сценой и малый зал рядом. Берутся вместе под конференцию или по отдельности — малый зал по часам под тренинг или кофе-брейк.</p>
        </div>
        <PhotoSlot src="/img/hall-01.jpg" alt="Большой зал Мультихолл" ratio="4/3" placeholder={false} />
      </section>
      <HallList title="Что есть" />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

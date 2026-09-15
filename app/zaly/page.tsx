import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Hero, HallList } from "@/components/Sections";
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
      <Hero
        h1="Залы и помещения"
        lead="Большой зал 300 м² со сценой и малый зал 68 м² рядом. Берутся вместе под конференцию или по отдельности — малый зал по часам под тренинг или кофе-брейк."
        image={{ src: "/img/hall-01.jpg", alt: "Большой зал Мультихолл" }}
        priceFrom={1500}
        priceUnit="за час малого зала, большой — от 15 000 ₽"
        cta="Подобрать зал"
      />
      <HallList title="Что есть" />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

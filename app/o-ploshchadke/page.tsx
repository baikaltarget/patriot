import { content } from "@/lib/content";
import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import PhotoSlot from "@/components/PhotoSlot";
import { Gallery, HallList, SpecStrip } from "@/components/Sections";
import LeadForm from "@/components/LeadForm";

const pg = content.pages.about;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/o-ploshchadke/" });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "О площадке", href: "/o-ploshchadke/" }]} />
      <section className="wrap grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <NeedsData on={pg.needsData}>
          <h1>{pg.h1}</h1>
          <div className="mt-5 grid max-w-[60ch] gap-4 text-lg text-dim">
            {pg.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </NeedsData>
        <PhotoSlot src="/img/conf-01.jpg" alt="Форум «Легенды Роскосмоса» в Мультихолле" ratio="4/3" placeholder={false} />
      </section>
      <SpecStrip />
      <Gallery
        title="Разные форматы на одной площадке"
        images={[
          { src: "/img/hall-02.jpg", alt: "Полный зал на мероприятии" },
          { src: "/img/festival-01.jpg", alt: "Детский фестиваль на сцене Мультихолла" },
          { src: "/img/format-class.jpg", alt: "Турнир с рассадкой классом" },
          { src: "/img/kids-01.jpg", alt: "Детский праздник в Мультихолле" },
          { src: "/img/kids-02.jpg", alt: "Детское мероприятие в Мультихолле" },
        ]}
      />
      <HallList />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

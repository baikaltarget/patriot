import { content } from "@/lib/content";
import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import FloorPlan from "@/components/FloorPlan";
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
        <FloorPlan layout="empty" rooms />
      </section>
      <SpecStrip />
      <Gallery />
      <HallList />
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

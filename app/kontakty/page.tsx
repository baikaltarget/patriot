import { content } from "@/lib/content";
import { meta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NeedsData from "@/components/NeedsData";
import LeadForm from "@/components/LeadForm";

const pg = content.pages.contacts;
const s = content.site;
export const metadata = meta({ title: pg.title, description: pg.description, path: "/kontakty/" });

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Контакты", href: "/kontakty/" }]} />
      <section className="wrap grid gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <h1>{pg.h1}</h1>
          <a href={`tel:${s.phoneRaw}`} className="mt-6 block text-3xl font-semibold no-underline">{s.phone}</a>
          <p className="text-dim">{s.managerHours}</p>
          <a href={`mailto:${s.email}`} className="mt-3 block underline">{s.email}</a>
          <address className="mt-6 not-italic">
            <div className="font-medium">{s.address}</div>
            <div className="text-dim">Зал работает {s.hours}</div>
            <a href={s.yandexMapsUrl} className="mt-2 inline-block underline" target="_blank" rel="noopener">Открыть в Яндекс Картах</a>
          </address>
          <div className="mt-8 grid gap-4">
            {pg.directions.map((d) => (
              <NeedsData key={d.t} on={!!("needsData" in d && d.needsData)} className="border-t border-line pt-3">
                <h2 className="text-lg">{d.t}</h2>
                <p className="text-dim">{d.d}</p>
              </NeedsData>
            ))}
          </div>
          <div className="mt-8 text-sm text-dim">
            <div className="font-medium text-ink">Реквизиты для договора</div>
            {s.legal.org}<br />ИНН {s.legal.inn}, ОГРН {s.legal.ogrn}<br />{s.postalCode}, {s.address}
          </div>
        </div>
        <NeedsData className="min-h-[360px]">
          {/* Карта: вставить iframe Яндекс Карт (Конструктор карт -> код) вместо этого блока */}
          <div className="flex h-full min-h-[360px] items-center justify-center rounded-card bg-chalk p-6 text-center text-dim">
            Сюда вставляется карта Яндекс с меткой Мультихолла и парковки. Код — из Конструктора карт Яндекса.
          </div>
        </NeedsData>
      </section>
      <section className="wrap section pt-0"><LeadForm /></section>
    </>
  );
}

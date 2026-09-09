import Link from "next/link";
import FloorPlan from "./FloorPlan";
import NeedsData from "./NeedsData";
import PhotoSlot from "./PhotoSlot";
import { caseEstimate, content, fmt, layoutName } from "@/lib/content";

/** Первый экран посадочной: заголовок слева, чертёж справа, тарифы под ним. */
export function Hero({
  h1,
  lead,
  layout = "theatre",
  priceFrom,
  priceUnit,
  cta = "Оставить заявку",
  secondary,
}: {
  h1: string;
  lead: string;
  layout?: "theatre" | "class" | "banquet" | "buffet" | "empty";
  priceFrom?: number;
  priceUnit?: string;
  cta?: string;
  secondary?: { label: string; href: string };
}) {
  const s = content.site;
  return (
    <section className="wrap grid items-center gap-10 py-10 md:grid-cols-[1.05fr_1fr] md:py-16">
      <div>
        <h1>{h1}</h1>
        <p className="mt-5 max-w-[56ch] text-lg text-dim md:text-xl">{lead}</p>
        {priceFrom !== undefined && (
          <p className="mt-6 flex items-baseline gap-3">
            <span className="whitespace-nowrap text-3xl font-semibold tabular-nums">от {fmt(priceFrom)}</span>
            <span className="text-dim">{priceUnit}</span>
          </p>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#zayavka" className="btn-signal">{cta}</a>
          <a href={`tel:${s.phoneRaw}`} className="btn-ghost">{s.phone}</a>
          {secondary && <Link href={secondary.href} className="btn-ghost">{secondary.label}</Link>}
        </div>
      </div>
      <FloorPlan layout={layout} caption={false} />
    </section>
  );
}

/** Полоса характеристик — как строка размеров на чертеже. */
export function SpecStrip() {
  const h = content.hall;
  const items = [
    { v: `${h.area} м²`, l: "площадь зала" },
    { v: `${h.height} м`, l: "высота потолка" },
    { v: `${h.stageArea} м²`, l: "сцена" },
    { v: "5 × 2,5 м", l: "экран" },
    { v: `${h.capacityMax}`, l: "человек театром" },
    { v: "68 + 46 м²", l: "малый зал и переговорная" },
  ];
  return (
    <section className="border-y border-ink">
      <div className="wrap grid grid-cols-2 md:grid-cols-6">
        {items.map((it) => (
          <div key={it.l} className="border-l border-line py-5 pl-4 pr-3 odd:border-l-0 odd:pl-0 md:odd:border-l md:odd:pl-4 md:first:border-l-0 md:first:pl-0">
            <div className="font-mono text-2xl tabular-nums">{it.v}</div>
            <div className="text-sm text-dim">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Два-четыре смысловых блока текста, без карточек. */
export function Blocks({ title, items, cols = 2 }: { title?: string; items: { t: string; d: string; needsData?: boolean }[]; cols?: 2 | 3 | 4 }) {
  return (
    <section className="section">
      <div className="wrap">
        {title && <h2 className="mb-8">{title}</h2>}
        <div className={`grid gap-x-10 gap-y-8 ${cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((it) => (
            <NeedsData key={it.t} on={!!it.needsData} className="border-t border-ink pt-4">
              <h3 className="mb-2">{it.t}</h3>
              <p className="max-w-[52ch] text-dim">{it.d}</p>
            </NeedsData>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ prefix = "hall", count = 5 }: { prefix?: string; count?: number }) {
  return (
    <section className="section pt-0">
      <div className="wrap">
        <h2 className="mb-6">Как выглядит зал</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <PhotoSlot key={i} src={`/img/${prefix}-0${i + 1}.jpg`} alt={`Мультихолл, фото ${i + 1}`} ratio={i === 0 ? "4/3" : "4/3"} className={i === 0 ? "col-span-2 row-span-2" : ""} />
          ))}
        </div>
        <p className="dimension mt-3">Фото с текущего сайта парка: перенести в public/img/ в WebP, ширина 1600 px.</p>
      </div>
    </section>
  );
}

/** Схемы рассадки — четыре маленьких чертежа. */
export function Layouts() {
  return (
    <section className="section">
      <div className="wrap">
        <h2 className="mb-2">Варианты рассадки</h2>
        <p className="mb-8 max-w-[60ch] text-dim">Один зал, четыре расстановки. Перестановка между деловой частью и банкетом занимает около двух часов.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.hall.layouts.map((l) => (
            <NeedsData key={l.id} on={!!l.needsData}>
              <FloorPlan layout={l.id as "theatre"} caption={false} />
              <div className="mt-2 flex items-baseline justify-between">
                <h3>{l.name}</h3>
                <span className="font-mono">до {l.capacity}</span>
              </div>
              <p className="mt-1 text-sm text-dim">{l.note}</p>
            </NeedsData>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HallList({ title = "Три помещения" }: { title?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-8 flex items-baseline justify-between gap-6">
          <h2>{title}</h2>
          <Link href="/zaly/" className="text-dim hover:text-ink">Все залы</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.halls.map((h) => (
            <Link key={h.slug} href={`/zaly/${h.slug}/`} className="group border-t border-ink pt-4 no-underline">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl">{h.area} м²</span>
                <span className="text-sm text-dim">{h.capacity}</span>
              </div>
              <h3 className="mt-2 group-hover:underline">{h.name}</h3>
              <p className="mt-1 text-sm text-dim">{h.short}</p>
              <p className="mt-3 text-sm">от {fmt(h.priceFrom)} {h.priceUnit}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FormatList({ title = "Под какое мероприятие", exclude }: { title?: string; exclude?: string }) {
  const landing = [
    { name: "Конференции и форумы", href: "/konferenc-zal/", note: "до 300 участников, экран, звук, секции в малом зале" },
    { name: "Корпоративы и тимбилдинг", href: "/korporativ/", note: "до 200 гостей за столами, тир и фаертаг рядом" },
    { name: "Концерты, выставки, съёмки", href: "/ploshchadka/", note: "сцена 30 м², подвес света, потолки 6 м" },
  ];
  return (
    <section className="section bg-chalk">
      <div className="wrap">
        <h2 className="mb-8">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {landing.map((l) => (
            <Link key={l.href} href={l.href} className="group border-t border-ink pt-4 no-underline">
              <h3 className="group-hover:underline">{l.name}</h3>
              <p className="mt-1 text-sm text-dim">{l.note}</p>
            </Link>
          ))}
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {content.formats.filter((f) => f.slug !== exclude).map((f) => (
            <li key={f.slug}>
              <Link href={`/format/${f.slug}/`} className="text-dim hover:text-ink">{f.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CaseList({ title = "Проведённые мероприятия со сметой", limit, filter }: { title?: string; limit?: number; filter?: (c: (typeof content.cases)[number]) => boolean }) {
  let cases = content.cases;
  if (filter) cases = cases.filter(filter);
  if (limit) cases = cases.slice(0, limit);
  if (!cases.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-8 flex items-baseline justify-between gap-6">
          <h2>{title}</h2>
          <Link href="/meropriyatiya/" className="text-dim hover:text-ink">Все мероприятия</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const e = caseEstimate(c);
            return (
              <NeedsData key={c.slug} on={!!c.needsData}>
                <Link href={`/meropriyatiya/${c.slug}/`} className="group block border-t border-ink pt-4 no-underline">
                  <div className="flex items-baseline justify-between text-sm text-dim">
                    <span>{c.format} · {layoutName(c.layout)}</span>
                    <span className="font-mono">{c.guests} чел.</span>
                  </div>
                  <h3 className="mt-2 group-hover:underline">{c.name}</h3>
                  <p className="mt-2 text-sm text-dim">{c.summary}</p>
                  <p className="mt-3 font-mono">{fmt(e.total)} <span className="text-sm text-dim">за площадку</span></p>
                </Link>
              </NeedsData>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TeamBuilding() {
  const s = content.site;
  return (
    <section className="section bg-ink text-paper">
      <div className="wrap grid gap-10 md:grid-cols-2">
        <div>
          <h2>Тимбилдинг в двухстах метрах от зала</h2>
          <p className="mt-4 max-w-[52ch] text-paper/75">
            Стрелковый клуб на 38 направлений, фаертаг, тактический центр 400 м² и бомбоубежище 1970 года — всё на территории парка. Команды соревнуются днём, банкет вечером, переездов нет.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${s.parentUrl}shooting`} className="btn border border-paper/40 text-paper hover:bg-paper/10">Стрелковый клуб</a>
            <a href={`${s.parentUrl}firetag`} className="btn border border-paper/40 text-paper hover:bg-paper/10">Фаертаг</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <PhotoSlot src="/img/park-shooting.jpg" alt="Стрелковый клуб Парка Патриот" />
          <PhotoSlot src="/img/park-firetag.jpg" alt="Фаертаг в Парке Патриот" />
        </div>
      </div>
    </section>
  );
}

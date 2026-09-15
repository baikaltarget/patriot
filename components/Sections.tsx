import Link from "next/link";
import Zoom from "./Zoom";
import NeedsData from "./NeedsData";
import PhotoSlot from "./PhotoSlot";
import { caseEstimate, content, fmt, layoutName } from "@/lib/content";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/** Заголовок секции: лейбл слева, заголовок справа. Часть заголовка можно приглушить через muted. */
export function SectionHead({ label, title, muted, right }: { label: string; title: string; muted?: string; right?: React.ReactNode }) {
  return (
    <div className="sec-head">
      <div className="label">{label}</div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-[24ch]">
          {title}
          {muted && <> <span className="muted">{muted}</span></>}
        </h2>
        {right}
      </div>
    </div>
  );
}

/** Первый экран: фото на всю ширину контейнера, тёмный градиент, текст поверх. */
export function Hero({
  h1,
  lead,
  image,
  priceFrom,
  priceUnit,
  cta = "Оставить заявку",
  secondary,
}: {
  h1: string;
  lead: string;
  image: { src: string; alt: string };
  priceFrom?: number;
  priceUnit?: string;
  cta?: string;
  secondary?: { label: string; href: string };
}) {
  const s = content.site;
  return (
    <section className="wrap py-5 md:py-6">
      <div className="relative overflow-hidden rounded-card bg-ink text-white">
        <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/15" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
        <div className="relative z-10 flex min-h-[440px] flex-col justify-center p-6 md:min-h-[640px] md:p-14 xl:p-16">
          <div className="max-w-[680px]">
            <h1 className="text-white">{h1}</h1>
            <p className="mt-4 max-w-[52ch] text-[15px] text-white/85 md:mt-5 md:text-lg">{lead}</p>
            {priceFrom !== undefined && (
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 md:mt-6">
                <span className="whitespace-nowrap text-2xl font-medium tabular-nums md:text-3xl">от {fmt(priceFrom)}</span>
                <span className="text-[15px] text-white/75 md:text-base">{priceUnit}</span>
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
              <a href="#zayavka" className="btn-signal">{cta} <Arrow /></a>
              <a href={`tel:${s.phoneRaw}`} className="btn-white">{s.phone}</a>
              {secondary && <Link href={secondary.href} className="btn-white md:hidden">{secondary.label}</Link>}
            </div>
          </div>
        </div>
        {secondary && (
          <Link href={secondary.href} className="absolute bottom-8 right-8 z-10 hidden min-w-[200px] rounded-card bg-white p-5 pb-16 pr-8 text-ink no-underline transition-transform hover:-translate-y-0.5 md:block">
            <span className="block text-[17px] font-medium leading-snug">{secondary.label}</span>
            <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"><Arrow /></span>
          </Link>
        )}
      </div>
    </section>
  );
}

/** Официальные цифры площадки — карточки с крупным числом. */
export function SpecStrip() {
  const h = content.hall;
  const items = [
    { v: `${h.area}`, u: "м²", l: "площадь большого зала" },
    { v: `${h.capacityMax}`, u: "мест", l: "театром по официальной схеме" },
    { v: "56", u: "мест", l: "банкетом за круглыми столами" },
    { v: "70", u: "мест", l: "классом, столы рядами" },
    { v: `${h.height}`, u: "м", l: "высота потолка, подвес света" },
    { v: `${h.stageArea}`, u: "м²", l: "сцена 7,5 × 4 м" },
  ];
  return (
    <section className="wrap section pt-2 md:pt-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.l} className="card flex min-h-[170px] flex-col justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-medium tabular-nums md:text-5xl">{it.v}</span>
              <span className="text-lg text-dim">{it.u}</span>
            </div>
            <div className="mt-6 text-[15px] text-dim">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Смысловые блоки — карточки на серой подложке. */
export function Blocks({ title, items, cols = 2, label = "Преимущества" }: { title?: string; items: { t: string; d: string; needsData?: boolean }[]; cols?: 2 | 3 | 4; label?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        {title && <SectionHead label={label} title={title} />}
        <div className={`grid gap-4 ${cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((it) => (
            <NeedsData key={it.t} on={!!("needsData" in it && it.needsData)} className="card">
              <h3 className="mb-3">{it.t}</h3>
              <p className="text-[15px] text-dim">{it.d}</p>
            </NeedsData>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Живая галерея. 5 фото — крупное слева + сетка справа; иначе ровная сетка без дыр. */
export function Gallery({ title = "Как выглядит зал", images }: { title?: string; images: { src: string; alt: string }[] }) {
  if (!images.length) return null;
  const feature = images.length >= 5;
  const shown = feature ? images.slice(0, 5) : images;
  return (
    <section className="section pt-0">
      <div className="wrap">
        <SectionHead label="Фото" title={title} />
        <div className={`grid gap-4 ${feature ? "grid-cols-2 md:grid-cols-4" : shown.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
          {shown.map((img, i) => (
            <PhotoSlot
              key={img.src + i}
              src={img.src}
              alt={img.alt}
              ratio="4/3"
              placeholder={false}
              className={feature && i === 0 ? "col-span-2 row-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Вместимость по официальным схемам. */
export function SeatingSchemes() {
  const extra = content.hall.layoutsExtra;
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead label="Вместимость" title="По официальным схемам рассадки," muted="а не на глаз" />
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.hall.layouts.map((l) => (
            <NeedsData key={l.id} on={!!("needsData" in l && l.needsData)} className="card flex h-full flex-col !p-4">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-cardSm bg-white">
                {l.scheme ? (
                  <Zoom src={l.scheme} alt={`Схема рассадки: ${l.name}`} imgClassName="h-full w-full object-contain p-2" />
                ) : (
                  <div className="flex h-full items-center justify-center p-4 text-center text-sm text-dim">Официальной схемы для этого формата нет</div>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="leading-snug">{l.name}</h3>
                <span className="shrink-0 whitespace-nowrap text-2xl font-medium tabular-nums">до {l.capacity}</span>
              </div>
              <p className="mt-2 text-sm text-dim">{l.note}</p>
            </NeedsData>
          ))}
        </div>
        {extra?.length ? (
          <p className="mt-5 text-sm text-dim">Ещё две официальные схемы для деловых событий: {extra.map((e) => `${e.name} — до ${e.capacity}`).join("; ")}.</p>
        ) : null}
      </div>
    </section>
  );
}

/** Залы — фото-карточки с названием и ценой поверх снимка. */
export function HallList({ title = "Два помещения" }: { title?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead label="Залы" title={title} right={<Link href="/zaly/" className="btn-ghost !py-2">Все залы <Arrow /></Link>} />
        <div className="grid gap-4 md:grid-cols-3">
          {content.halls.map((h) => {
            const big = h.slug === "multihall";
            return (
              <NeedsData key={h.slug} on={!!("needsData" in h && h.needsData)} className={big ? "md:col-span-2" : ""}>
                <Link href={`/zaly/${h.slug}/`} className={`photo-card block aspect-[4/5] md:aspect-auto md:h-full ${big ? "md:min-h-[520px]" : "md:min-h-[520px]"}`}>
                  <img src={h.photo} alt={h.name} />
                  <div className="shade" />
                  <div className="body">
                    <div className="text-sm text-white/75">{h.area} м² · {h.capacity}</div>
                    <h3 className={`mt-1 text-white ${big ? "text-2xl md:text-3xl" : "text-xl"}`}>{h.name}</h3>
                    <p className="mt-1 text-sm text-white/80">{h.short}</p>
                    <span className="price-pill mt-4">от {fmt(h.priceFrom)} {h.priceUnit.replace("за мероприятие 4–6 часов", "").replace("за час", "/ ч")}</span>
                  </div>
                </Link>
              </NeedsData>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FormatList({ title = "Под какое мероприятие", exclude }: { title?: string; exclude?: string }) {
  const landing = [
    { name: "Конференции и форумы", href: "/konferenc-zal/", note: "до 175 участников театром, экран, звук, секции в малом зале", img: "/img/conf-01.jpg" },
    { name: "Корпоративы и тимбилдинг", href: "/korporativ/", note: "до 56 гостей за столами, тир и фаертаг рядом", img: "/img/koncert-01.jpg" },
    { name: "Концерты, выставки, съёмки", href: "/ploshchadka/", note: "сцена 30 м², подвес света, потолки 6 м", img: "/img/koncert-02.jpg" },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead label="Форматы" title={title} />
        <div className="grid gap-4 md:grid-cols-3">
          {landing.map((l) => (
            <Link key={l.href} href={l.href} className="photo-card aspect-[4/3]">
              <img src={l.img} alt={l.name} />
              <div className="shade" />
              <div className="body">
                <h3 className="text-xl text-white">{l.name}</h3>
                <p className="mt-1 text-sm text-white/80">{l.note}</p>
              </div>
            </Link>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {content.formats.filter((f) => f.slug !== exclude).map((f) => (
            <li key={f.slug}>
              <Link href={`/format/${f.slug}/`} className="inline-block rounded-pill border border-line px-4 py-2 text-[15px] no-underline hover:border-ink">{f.name}</Link>
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
        <SectionHead label="Примеры" title={title} right={<Link href="/meropriyatiya/" className="btn-ghost !py-2">Все мероприятия <Arrow /></Link>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const e = caseEstimate(c);
            return (
              <NeedsData key={c.slug} on={!!("needsData" in c && c.needsData)} className="card flex flex-col">
                <Link href={`/meropriyatiya/${c.slug}/`} className="group flex h-full flex-col no-underline">
                  <div className="flex items-baseline justify-between text-sm text-dim">
                    <span>{c.format} · {layoutName(c.layout)}</span>
                    <span className="font-mono">{c.guests} чел.</span>
                  </div>
                  <h3 className="mt-3 group-hover:underline">{c.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] text-dim">{c.summary}</p>
                  <p className="mt-5 text-2xl font-medium tabular-nums">{fmt(e.total)} <span className="text-sm font-normal text-dim">за площадку</span></p>
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
    <section className="wrap section">
      <div className="grid gap-8 rounded-card bg-footer p-7 text-white md:grid-cols-2 md:p-12">
        <div>
          <div className="text-[15px] text-white/55">Тимбилдинг</div>
          <h2 className="mt-2 text-white">Стрельба и фаертаг <span className="text-white/55">рядом с залом</span></h2>
          <p className="mt-4 max-w-[52ch] text-white/75">
            Стрелковый клуб, фаертаг, тактический центр и бомбоубежище — всё на территории парка. Команды соревнуются днём, банкет вечером, переездов нет.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${s.parentUrl}shooting`} className="btn-white">Стрелковый клуб <Arrow /></a>
            <a href={`${s.parentUrl}firetag`} className="btn border border-white/40 text-white hover:bg-white/10">Фаертаг</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <PhotoSlot src="/img/park-shooting.jpg" alt="Стрельба в тире Парка «Патриот»" placeholder={false} />
          <PhotoSlot src="/img/park-firetag.jpg" alt="Фаертаг в Парке «Патриот»" placeholder={false} />
        </div>
      </div>
    </section>
  );
}

/** Карточки-локации: фото, заголовок, текст, кнопка. Оставлено для совместимости. */
export function LocationCards({ title, items }: { title?: string; items: { image: string; alt: string; name: string; description: string; href: string }[] }) {
  return (
    <section className="section">
      <div className="wrap">
        {title && <SectionHead label="Локации" title={title} />}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.href} className="card flex flex-col !p-4">
              <div className="aspect-[4/3] overflow-hidden rounded-cardSm"><img src={it.image} alt={it.alt} className="h-full w-full object-cover" /></div>
              <h3 className="mt-4">{it.name}</h3>
              <p className="mt-2 flex-1 text-[15px] text-dim">{it.description}</p>
              <Link href={it.href} className="btn-signal mt-4 self-start">Узнать подробнее <Arrow /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

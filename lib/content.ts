import site from "@/content/site.json";

export type Site = typeof site;
export type Hall = Site["halls"][number];
export type Format = Site["formats"][number];
export type Case = Site["cases"][number];
export type Faq = { q: string; a: string; needsData?: boolean };

export const content = site;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.site.url).replace(/\/$/, "");

export const showFrames = site.flags.showNeedsDataFrames;

export function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function layoutName(id: string) {
  return site.hall.layouts.find((l) => l.id === id)?.name ?? id;
}

/** Смета мероприятия по прайсу. Используется и для кейсов, и для калькулятора. */
export function estimate(opts: {
  duration: "short" | "day" | "twodays" | "hourly";
  hours?: number;
  extras: string[];
  rooms?: string[];
  roomsHours?: number;
  cleaning?: boolean;
}) {
  const p = site.pricing;
  const lines: { name: string; price: number }[] = [];
  if (opts.duration === "hourly") {
    const h = Math.max(1, opts.hours ?? 1);
    lines.push({ name: `Большой зал, ${h} ч × ${fmt(p.hourly.price)}`, price: p.hourly.price * h });
  } else {
    const t = p.tariffs.find((x) => x.id === opts.duration)!;
    lines.push({ name: t.name, price: t.price });
  }
  for (const id of opts.extras) {
    const e = p.extras.find((x) => x.id === id);
    if (e) lines.push({ name: e.name, price: e.price });
  }
  for (const id of opts.rooms ?? []) {
    const r = p.roomsHourly.find((x) => x.id === id);
    const h = opts.roomsHours ?? 0;
    if (r && h > 0) lines.push({ name: `${r.name}, ${h} ч`, price: r.price * h });
  }
  if (opts.cleaning) lines.push({ name: p.cleaning.name, price: p.cleaning.price });
  const total = lines.reduce((s, l) => s + l.price, 0);
  return { lines, total };
}

export function caseEstimate(c: Case) {
  return estimate({
    duration: c.duration as "short" | "day" | "twodays",
    extras: c.extras,
    rooms: c.rooms,
    roomsHours: c.roomsHours,
    cleaning: c.cleaning,
  });
}

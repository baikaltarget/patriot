/**
 * Метки источника. Ловим их при первом заходе и держим до конца сессии,
 * чтобы заявка со второй-третьей страницы всё равно знала, откуда пришёл человек.
 */
const KEY = "mh-utm";

export type Utm = Record<string, string>;

const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid", // Яндекс.Директ
  "gclid", // Google Ads
];

export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const f of FIELDS) {
      const v = q.get(f);
      if (v) found[f] = v.slice(0, 200);
    }
    // реферер пригодится, когда меток нет вообще
    const saved = getUtm();
    if (Object.keys(found).length === 0) {
      if (!saved.referrer && document.referrer && !document.referrer.includes(location.host)) {
        sessionStorage.setItem(KEY, JSON.stringify({ ...saved, referrer: document.referrer.slice(0, 200) }));
      }
      return;
    }
    if (document.referrer && !document.referrer.includes(location.host)) {
      found.referrer = document.referrer.slice(0, 200);
    }
    // первые метки важнее последующих — не перезаписываем
    if (Object.keys(saved).length === 0) {
      sessionStorage.setItem(KEY, JSON.stringify(found));
    }
  } catch {
    /* приватный режим — просто без меток */
  }
}

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Utm;
  } catch {
    return {};
  }
}

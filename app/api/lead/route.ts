import { NextResponse } from "next/server";

/**
 * Заявка -> Telegram.
 * Ключи в переменных окружения Vercel:
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — id получателя; можно несколько через запятую
 * Пока ключей нет — заявка пишется в лог Vercel, чтобы не потеряться,
 * а форма честно сообщает, что отправка не настроена, и показывает телефон.
 */

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "badjson" }, { status: 400 });
  }

  // honeypot: скрытое поле заполняют только боты
  if (body.website) return NextResponse.json({ ok: true });

  const phone = String(body.phone ?? "").trim();
  if (!phone) return NextResponse.json({ ok: false, reason: "nophone" }, { status: 400 });

  const when = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Irkutsk" });
  const tel = phone.replace(/[^\d+]/g, "");
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  const utm = (body as unknown as { utm?: Record<string, string> }).utm ?? {};
  const srcNames: Record<string, string> = {
    utm_source: "Источник",
    utm_medium: "Канал",
    utm_campaign: "Кампания",
    utm_content: "Объявление",
    utm_term: "Ключевое слово",
    yclid: "Яндекс.Директ (yclid)",
    gclid: "Google Ads (gclid)",
    referrer: "Перешёл с",
  };
  const srcLines = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${srcNames[k] ?? k}: ${esc(v)}`);

  const lines = [
    "📩 <b>Заявка с сайта Мультихолл</b>",
    "",
    `<b>Телефон:</b> <a href="tel:${esc(tel)}">${esc(phone)}</a>`,
    body.name && `<b>Имя:</b> ${esc(body.name)}`,
    body.company && `<b>Компания:</b> ${esc(body.company)}`,
    body.event && `<b>Мероприятие:</b> ${esc(body.event)}`,
    body.date && `<b>Дата:</b> ${esc(body.date)}`,
    body.guests && `<b>Участников:</b> ${esc(body.guests)}`,
    body.comment && `<b>Комментарий:</b> ${esc(body.comment)}`,
    body.estimate && `<b>Расчёт:</b> ${esc(body.estimate)}`,
    "",
    body.page && (site ? `<b>Страница:</b> ${site}${esc(body.page)}` : `<b>Страница:</b> ${esc(body.page)}`),
    srcLines.length ? srcLines.map((l) => `<b>${l.split(":")[0]}:</b>${l.slice(l.indexOf(":") + 1)}`).join("\n") : "<b>Источник:</b> прямой заход",
    `<i>${esc(when)} (Иркутск)</i>`,
  ].filter((x): x is string => typeof x === "string");

  const text = lines.join("\n");

  // лог остаётся всегда: даже если Telegram недоступен, заявка не потеряется
  console.log("[lead]", text.replace(/<[^>]+>/g, "").replace(/\n+/g, " | "));

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  if (!token || chats.length === 0) {
    return NextResponse.json({ ok: false, reason: "notconfigured" });
  }

  const results = await Promise.all(
    chats.map(async (chat_id) => {
      try {
        const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        });
        if (!r.ok) {
          const detail = await r.text();
          console.error("[lead] telegram error", chat_id, r.status, detail.slice(0, 300));
          return false;
        }
        return true;
      } catch (e) {
        console.error("[lead] telegram fetch failed", chat_id, e);
        return false;
      }
    })
  );

  // успех, если сообщение дошло хотя бы до одного получателя
  if (results.some(Boolean)) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false, reason: "telegram" }, { status: 502 });
}

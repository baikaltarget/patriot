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

  const lines = [
    "<b>Заявка с сайта Мультихолл</b>",
    "",
    `☎️ <a href="tel:${esc(tel)}">${esc(phone)}</a>`,
    body.name && `👤 ${esc(body.name)}`,
    body.company && `🏢 ${esc(body.company)}`,
    "",
    body.event && `Мероприятие: <b>${esc(body.event)}</b>`,
    body.date && `Дата: ${esc(body.date)}`,
    body.guests && `Участников: ${esc(body.guests)}`,
    body.comment && `\nКомментарий: ${esc(body.comment)}`,
    body.estimate && `\n💰 Расчёт: ${esc(body.estimate)}`,
    "",
    `<i>${esc(when)} (Иркутск)</i>`,
    body.page && (site ? `Страница: ${site}${esc(body.page)}` : `Страница: ${esc(body.page)}`),
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

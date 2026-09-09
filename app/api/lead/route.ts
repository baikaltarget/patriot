import { NextResponse } from "next/server";

// Заявка -> Telegram. Ключи: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в настройках Vercel (см. README).
// Пока ключей нет — заявка пишется в лог Vercel, чтобы не потеряться, а форма честно сообщает об этом.
export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "badjson" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const text = [
    "Заявка с сайта Мультихолл",
    body.event && `Мероприятие: ${body.event}`,
    body.date && `Дата: ${body.date}`,
    body.guests && `Участников: ${body.guests}`,
    body.company && `Компания: ${body.company}`,
    body.name && `Имя: ${body.name}`,
    `Телефон: ${body.phone}`,
    body.comment && `Комментарий: ${body.comment}`,
    body.estimate && `Расчёт: ${body.estimate}`,
    body.page && `Страница: ${body.page}`,
  ]
    .filter(Boolean)
    .join("\n");

  console.log("[lead]", text.replace(/\n/g, " | "));

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return NextResponse.json({ ok: false, reason: "notconfigured" });

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text }),
  });
  if (!r.ok) return NextResponse.json({ ok: false, reason: "telegram" }, { status: 502 });
  return NextResponse.json({ ok: true });
}

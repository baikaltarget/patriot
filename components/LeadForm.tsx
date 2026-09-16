"use client";
import { useState } from "react";
import { content } from "@/lib/content";
import { reachGoal } from "@/lib/goals";

type Status = "idle" | "sending" | "ok" | "notconfigured" | "error";

export default function LeadForm({
  title = "Заявка на аренду",
  subtitle = "Менеджер проверит дату и пришлёт расчёт в течение рабочего дня.",
  preset = {},
  compact = false,
}: {
  title?: string;
  subtitle?: string;
  preset?: Partial<Record<"event" | "date" | "guests" | "comment", string>>;
  compact?: boolean;
}) {
  const s = content.site;
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    company: "",
    event: preset.event ?? "",
    date: preset.date ?? "",
    guests: preset.guests ?? "",
    comment: preset.comment ?? "",
    agree: true,
    website: "", // honeypot
  });
  const set = (k: keyof typeof values, v: string | boolean) => setValues((o) => ({ ...o, [k]: v }));

  const tgText = encodeURIComponent(
    `Заявка на аренду Мультихолла\nМероприятие: ${values.event}\nДата: ${values.date}\nГостей: ${values.guests}\n${values.comment}\nТелефон: ${values.phone}`
  );
  const tgLink = s.telegram ? `https://t.me/${s.telegram.replace("@", "")}?text=${tgText}` : "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.phone || !values.agree) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, page: typeof location !== "undefined" ? location.pathname : "" }) });
      const j = await r.json();
      setStatus(j.ok ? "ok" : j.reason === "notconfigured" ? "notconfigured" : "error");
      if (j.ok || j.reason === "notconfigured") reachGoal("lead_form_submit", { event: values.event, guests: values.guests });
    } catch {
      setStatus("error");
    }
  }

  const eventTypes = ["Конференция", "Семинар или тренинг", "Презентация", "Корпоратив", "Выставка или ярмарка", "Концерт или показ", "Переговоры", "Другое"];

  return (
    <section id="zayavka" className="scroll-mt-20">
      <div className={`rounded-card bg-chalk ${compact ? "p-5" : "p-6 md:p-10"}`}>
        <h2 className="mb-1">{title}</h2>
        <p className="mb-6 max-w-[60ch] text-dim">{subtitle}</p>
        {status === "ok" ? (
          <p className="text-lg">Заявка отправлена. Перезвоним на {values.phone}.</p>
        ) : (
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm">
              Мероприятие
              <select value={values.event} onChange={(e) => set("event", e.target.value)} className="border border-line bg-white p-3 text-base">
                <option value="">Выберите формат</option>
                {eventTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              Дата или месяц
              <input value={values.date} onChange={(e) => set("date", e.target.value)} placeholder="12 декабря или «в марте»" className="border border-line bg-white p-3 text-base" />
            </label>
            <label className="grid gap-1 text-sm">
              Количество участников
              <input value={values.guests} onChange={(e) => set("guests", e.target.value)} inputMode="numeric" placeholder="120" className="border border-line bg-white p-3 text-base" />
            </label>
            <label className="grid gap-1 text-sm">
              Компания
              <input value={values.company} onChange={(e) => set("company", e.target.value)} className="border border-line bg-white p-3 text-base" />
            </label>
            <label className="grid gap-1 text-sm">
              Как к вам обращаться
              <input value={values.name} onChange={(e) => set("name", e.target.value)} className="border border-line bg-white p-3 text-base" />
            </label>
            <label className="grid gap-1 text-sm">
              Телефон
              <input required value={values.phone} onChange={(e) => set("phone", e.target.value)} type="tel" placeholder="+7 " className="border border-line bg-white p-3 text-base" />
            </label>
            <label className="grid gap-1 text-sm md:col-span-2">
              Что важно знать
              <textarea value={values.comment} onChange={(e) => set("comment", e.target.value)} rows={3} placeholder="Нужен звук и проектор, кофе-брейк на 100 человек, заезд накануне" className="border border-line bg-white p-3 text-base" />
            </label>
            <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden />
            <label className="flex items-start gap-2 text-sm text-dim md:col-span-2">
              <input type="checkbox" checked={values.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-1" />
              <span>Согласен на обработку персональных данных по <a href="/politika/" className="underline">политике</a>.</span>
            </label>
            <div className="flex flex-wrap items-center gap-3 md:col-span-2">
              <button type="submit" disabled={status === "sending"} className="btn-signal">
                {status === "sending" ? "Отправляем" : "Отправить заявку"}
              </button>
              <a href={`tel:${s.phoneRaw}`} onClick={() => reachGoal("phone_click")} className="btn-ghost">Позвонить {s.phone}</a>
              {tgLink && <a href={tgLink} onClick={() => reachGoal("telegram_click")} className="btn-ghost" target="_blank" rel="noopener">Написать в Telegram</a>}
            </div>
            {status === "notconfigured" && (
              <p className="text-sm text-alert md:col-span-2">
                Отправка заявок ещё не настроена. Позвоните {s.phone} — а заявка сохранена в логе сайта и не потеряется.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-alert md:col-span-2">Не удалось отправить. Позвоните {s.phone} или попробуйте ещё раз.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

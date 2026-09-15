"use client";
import { useMemo, useState } from "react";
import { content, estimate, fmt } from "@/lib/content";

type Duration = "short" | "day" | "twodays" | "hourly";

const formats = [
  { id: "conference", name: "Конференция, форум", extras: ["projector", "sound", "mic"], duration: "day" as Duration },
  { id: "seminar", name: "Семинар, тренинг", extras: ["projector", "mic"], duration: "day" as Duration },
  { id: "corporate", name: "Корпоратив", extras: ["sound", "mic"], duration: "short" as Duration },
  { id: "presentation", name: "Презентация", extras: ["projector", "sound", "mic"], duration: "short" as Duration },
  { id: "expo", name: "Выставка, ярмарка", extras: ["sound"], duration: "day" as Duration },
  { id: "concert", name: "Концерт, показ", extras: ["sound", "mic"], duration: "short" as Duration },
  { id: "meeting", name: "Мастер-класс, встреча", extras: [] as string[], duration: "hourly" as Duration },
];

export default function Calculator() {
  const p = content.pricing;
  const s = content.site;
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState<string>("");
  const [guests, setGuests] = useState(100);
  const [duration, setDuration] = useState<Duration>("day");
  const [hours, setHours] = useState(4);
  const [extras, setExtras] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomsHours, setRoomsHours] = useState(4);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState<"idle" | "sending" | "ok" | "notconfigured" | "error">("idle");

  const est = useMemo(
    () => estimate({ duration, hours, extras, rooms, roomsHours, cleaning: true }),
    [duration, hours, extras, rooms, roomsHours]
  );
  const perGuest = guests > 0 ? Math.round(est.total / guests) : 0;

  function pickFormat(id: string) {
    const f = formats.find((x) => x.id === id)!;
    setFormat(id);
    setExtras(f.extras);
    setDuration(f.duration);
    setStep(1);
  }
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  async function send() {
    if (!phone) return;
    setSent("sending");
    const fname = formats.find((x) => x.id === format)?.name ?? "";
    const estimateText = `${est.lines.map((l) => `${l.name} — ${fmt(l.price)}`).join("; ")}; итого ${fmt(est.total)}`;
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, event: fname, guests: String(guests), comment: "Из калькулятора", estimate: estimateText, page: location.pathname }),
      });
      const j = await r.json();
      setSent(j.ok ? "ok" : j.reason === "notconfigured" ? "notconfigured" : "error");
    } catch {
      setSent("error");
    }
  }

  const steps = ["Формат", "Участники", "Длительность", "Оборудование", "Расчёт"];

  return (
    <div className="overflow-hidden rounded-card bg-chalk">
      <ol className="flex bg-white/60 text-sm" aria-label="Шаги расчёта">
        {steps.map((name, i) => (
          <li key={name} className={`flex-1 px-3 py-2 ${i === step ? "bg-ink text-paper" : i < step ? "text-ink" : "text-dim"}`}>
            <span className="font-mono">{i + 1}</span> <span className="hidden sm:inline">{name}</span>
          </li>
        ))}
      </ol>

      <div className="p-5 md:p-8">
        {step === 0 && (
          <div>
            <h3 className="mb-4">Что за мероприятие?</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {formats.map((f) => (
                <button key={f.id} type="button" onClick={() => pickFormat(f.id)} className="rounded-cardSm bg-white p-4 text-left ring-1 ring-transparent hover:ring-ink">
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="mb-1">Сколько участников?</h3>
            <p className="mb-4 text-dim">По официальным схемам: до 175 театром, до 70 классом, до 56 банкетом.</p>
            <div className="flex items-center gap-4">
              <input type="range" min={10} max={300} step={10} value={guests} onChange={(e) => setGuests(+e.target.value)} className="w-full accent-[var(--brand-red)]" aria-label="Количество участников" />
              <span className="w-24 font-mono text-2xl">{guests}</span>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setStep(0)} className="btn-ghost">Назад</button>
              <button type="button" onClick={() => setStep(2)} className="btn-ink">Дальше</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-4">Сколько времени нужен зал?</h3>
            <div className="grid gap-2">
              {p.tariffs.map((t) => (
                <label key={t.id} className={`flex cursor-pointer items-center justify-between gap-4 rounded-cardSm bg-white p-4 ring-1 ${duration === t.id ? "ring-ink" : "ring-transparent"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="dur" checked={duration === t.id} onChange={() => setDuration(t.id as Duration)} />
                    <span>{t.name}<span className="block text-sm text-dim">{t.unit}</span></span>
                  </span>
                  <span className="font-mono">{fmt(t.price)}</span>
                </label>
              ))}
              <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-cardSm bg-white p-4 ring-1 ${duration === "hourly" ? "ring-ink" : "ring-transparent"}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="dur" checked={duration === "hourly"} onChange={() => setDuration("hourly")} />
                  <span>По часам<span className="block text-sm text-dim">короткие встречи и мастер-классы</span></span>
                </span>
                <span className="flex items-center gap-2 font-mono">
                  {duration === "hourly" && (
                    <input type="number" min={1} max={9} value={hours} onChange={(e) => setHours(+e.target.value)} className="w-14 border border-line bg-white p-1 text-center" aria-label="Часов" />
                  )}
                  {fmt(p.hourly.price)}/ч
                </span>
              </label>
            </div>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="btn-ghost">Назад</button>
              <button type="button" onClick={() => setStep(3)} className="btn-ink">Дальше</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-4">Что из оборудования и помещений нужно?</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {p.extras.map((e) => (
                <label key={e.id} className={`flex cursor-pointer items-center justify-between rounded-cardSm bg-white p-4 ring-1 ${extras.includes(e.id) ? "ring-ink" : "ring-transparent"}`}>
                  <span className="flex items-center gap-3"><input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggle(extras, e.id, setExtras)} />{e.name}</span>
                  <span className="font-mono">{fmt(e.price)}</span>
                </label>
              ))}
              {p.roomsHourly.map((r) => (
                <label key={r.id} className={`flex cursor-pointer items-center justify-between rounded-cardSm bg-white p-4 ring-1 ${rooms.includes(r.id) ? "ring-ink" : "ring-transparent"}`}>
                  <span className="flex items-center gap-3"><input type="checkbox" checked={rooms.includes(r.id)} onChange={() => toggle(rooms, r.id, setRooms)} />{r.name}</span>
                  <span className="font-mono">{fmt(r.price)}/ч</span>
                </label>
              ))}
            </div>
            {rooms.length > 0 && (
              <label className="mt-3 flex items-center gap-3 text-sm">
                Часов для доп. помещений
                <input type="number" min={1} max={20} value={roomsHours} onChange={(e) => setRoomsHours(+e.target.value)} className="w-16 border border-line bg-white p-1 text-center font-mono" />
              </label>
            )}
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setStep(2)} className="btn-ghost">Назад</button>
              <button type="button" onClick={() => setStep(4)} className="btn-signal">Посчитать</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="mb-3">Расчёт по прайсу</h3>
              <table className="table-price">
                <tbody>
                  {est.lines.map((l) => (
                    <tr key={l.name}><td>{l.name}</td><td className="num">{fmt(l.price)}</td></tr>
                  ))}
                  <tr className="font-semibold"><td className="!border-ink">Итого за площадку</td><td className="num !border-ink">{fmt(est.total)}</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-sm text-dim">
                {fmt(perGuest)} на участника при {guests} гостях. Кейтеринг и программа — отдельно, вы выбираете их сами.
              </p>
              <button type="button" onClick={() => setStep(0)} className="btn-ghost mt-4">Посчитать заново</button>
            </div>
            <div className="rounded-cardSm bg-white p-6">
              {sent === "ok" ? (
                <p className="text-lg">Расчёт отправлен менеджеру. Перезвоним на {phone} и проверим дату.</p>
              ) : (
                <>
                  <h3 className="mb-1">Закрепить дату</h3>
                  <p className="mb-4 text-sm text-dim">Пришлём этот расчёт и проверим, свободен ли зал.</p>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 " className="mb-2 w-full border border-line bg-white p-3" aria-label="Телефон" />
                  <button type="button" onClick={send} disabled={sent === "sending" || !phone} className="btn-signal w-full">
                    {sent === "sending" ? "Отправляем" : "Отправить расчёт"}
                  </button>
                  {sent === "notconfigured" && <p className="mt-2 text-sm text-alert">Отправка ещё не настроена. Позвоните {s.phone}, расчёт сохранён в логе.</p>}
                  {sent === "error" && <p className="mt-2 text-sm text-alert">Не отправилось. Позвоните {s.phone}.</p>}
                  <a href={`tel:${s.phoneRaw}`} className="mt-3 block text-center text-sm underline">или позвонить {s.phone}</a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

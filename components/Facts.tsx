import { content } from "@/lib/content";

/**
 * Сводка фактов о площадке. Нужна и людям, и поисковикам:
 * это тот блок, который ИИ-ответы и быстрые ответы вырезают целиком.
 */
export default function Facts({ title = "Кратко о площадке" }: { title?: string }) {
  const s = content.site;
  return (
    <section className="section" id="fakty">
      <div className="wrap">
        <h2 className="mb-6">{title}</h2>
        <p className="mb-8 max-w-[70ch] text-lg text-dim" data-speakable>{s.definition}</p>
        <dl className="grid gap-x-10 gap-y-0 md:grid-cols-2">
          {s.facts.map((f) => (
            <div key={f.k} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-line py-3">
              <dt className="text-dim">{f.k}</dt>
              <dd className="font-medium">{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-dim">Данные актуальны на {new Date(s.updated).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}.</p>
      </div>
    </section>
  );
}

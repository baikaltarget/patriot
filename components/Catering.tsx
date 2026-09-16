import { content } from "@/lib/content";
import { SectionHead } from "./Sections";

/** Питание: свой кейтеринг или организация под ключ. Вторая услуга площадки помимо аренды. */
export default function Catering() {
  const c = content.catering;
  const s = content.site;
  return (
    <section className="section" id="pitanie">
      <div className="wrap">
        <SectionHead label={c.label} title={c.h2} />
        <p className="mb-8 max-w-[70ch] text-lg text-dim">{c.lead}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {c.options.map((o, i) => (
            <div key={o.t} className={`card flex flex-col ${i === 1 ? "!bg-footer text-white" : ""}`}>
              <h3 className={i === 1 ? "text-white" : ""}>{o.t}</h3>
              <p className={`mt-3 flex-1 ${i === 1 ? "text-white/80" : "text-dim"}`}>{o.d}</p>
              <p className={`mt-4 border-t pt-4 text-sm ${i === 1 ? "border-white/20 text-white/60" : "border-line text-dim"}`}>{o.note}</p>
              {i === 1 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="#zayavka" className="btn-signal">{c.cta}</a>
                  <a href={`tel:${s.phoneRaw}`} className="btn border border-white/40 text-white hover:bg-white/10">{s.phone}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

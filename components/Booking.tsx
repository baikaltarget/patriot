import JsonLd from "./JsonLd";
import { content } from "@/lib/content";
import TrackLink from "./TrackLink";
import { howToLd } from "@/lib/seo";

/** Как забронировать — нумерованные шаги + разметка HowTo для быстрых ответов. */
export default function Booking() {
  const s = content.site;
  return (
    <section className="section bg-chalk">
      <div className="wrap">
        <JsonLd data={howToLd({ name: "Как забронировать зал в Мультихолле", steps: s.booking, price: 15000 })} />
        <h2 className="mb-8">Как забронировать зал</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {s.booking.map((st, i) => (
            <li key={st.t} className="card">
              <span className="font-mono text-3xl text-brandRed">{i + 1}</span>
              <h3 className="mt-3">{st.t}</h3>
              <p className="mt-2 text-[15px] text-dim">{st.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackLink href={`tel:${s.phoneRaw}`} goal="phone_click" className="btn-signal">Позвонить {s.phone}</TrackLink>
          <a href="#zayavka" className="btn-ghost">Оставить заявку</a>
        </div>
      </div>
    </section>
  );
}

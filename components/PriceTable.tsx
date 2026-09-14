import Link from "next/link";
import NeedsData from "./NeedsData";
import { content, fmt } from "@/lib/content";

export default function PriceTable({ compact = false }: { compact?: boolean }) {
  const p = content.pricing;
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="mb-3">Большой зал</h3>
        <table className="table-price">
          <thead>
            <tr><th>Тариф</th><th className="num">Стоимость</th></tr>
          </thead>
          <tbody>
            {p.tariffs.map((t) => (
              <tr key={t.id}>
                <td>
                  {t.name}
                  <div className="text-sm text-dim">{t.unit}{t.note ? `. ${t.note}` : ""}</div>
                </td>
                <td className="num">{fmt(t.price)}</td>
              </tr>
            ))}
            <tr>
              <td>Почасовая аренда<div className="text-sm text-dim">{p.hourly.note}</div></td>
              <td className="num">{fmt(p.hourly.price)} / ч</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="mb-3">Дополнительно</h3>
        <table className="table-price">
          <thead>
            <tr><th>Позиция</th><th className="num">Стоимость</th></tr>
          </thead>
          <tbody>
            {p.extras.map((e) => (
              <tr key={e.id}><td>{e.name}</td><td className="num">{fmt(e.price)}</td></tr>
            ))}
            {p.roomsHourly.map((r) => (
              <tr key={r.id}>
                <td><NeedsData on={!!r.needsData} as="span">{r.name}</NeedsData></td>
                <td className="num"><NeedsData on={!!r.needsData} as="span">{fmt(r.price)} / ч</NeedsData></td>
              </tr>
            ))}
            <tr><td>{p.cleaning.name}</td><td className="num">{fmt(p.cleaning.price)}</td></tr>
          </tbody>
        </table>
        {!compact && (
          <p className="mt-3 text-sm text-dim">
            Полный прайс оборудования — на странице <Link href="/oborudovanie/" className="underline">оборудование и райдер</Link>.
          </p>
        )}
      </div>
      {!compact && (
        <ul className="grid gap-2 text-[15px] md:col-span-2 md:grid-cols-2">
          {p.terms.map((t) => (
            <NeedsData key={t.text} on={!!t.needsData} as="li" className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-brandRed" />
              <span>{t.text}</span>
            </NeedsData>
          ))}
        </ul>
      )}
    </div>
  );
}

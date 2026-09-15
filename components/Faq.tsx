import JsonLd from "./JsonLd";
import NeedsData from "./NeedsData";
import { faqLd } from "@/lib/seo";
import type { Faq as FaqItem } from "@/lib/content";

export default function Faq({ items, title = "Вопросы и ответы" }: { items: FaqItem[]; title?: string }) {
  if (!items?.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <JsonLd data={faqLd(items)} />
        <h2 className="mb-6">{title}</h2>
        <div className="grid max-w-3xl gap-3">
          {items.map((it) => (
            <NeedsData key={it.q} on={!!("needsData" in it && it.needsData)} as="div" className="rounded-cardSm bg-chalk px-5">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 font-medium">
                  <span>{it.q}</span>
                  <span aria-hidden className="dimension shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[68ch] pb-5 text-dim">{it.a}</p>
              </details>
            </NeedsData>
          ))}
        </div>
      </div>
    </section>
  );
}

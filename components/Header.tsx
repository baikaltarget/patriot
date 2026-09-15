"use client";
import Link from "next/link";
import { useState } from "react";
import { content } from "@/lib/content";

export default function Header() {
  const s = content.site;
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur">
      <div className="wrap flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center no-underline" aria-label={`${s.name} — на главную`}>
          <img src={s.logo.color} alt={s.parentName} width={168} height={72} className="h-9 w-auto sm:h-11 md:h-12" />
        </Link>
        <nav aria-label="Основное меню" className="hidden items-center gap-5 whitespace-nowrap text-[14px] text-dim lg:flex xl:gap-6 xl:text-[15px]">
          {content.nav.map((n) => (
            <Link key={n.href} href={n.href} className="no-underline hover:text-ink">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#zayavka" className="btn-signal hidden !py-2.5 md:inline-flex">Забронировать</a>
          <a href={`tel:${s.phoneRaw}`} aria-label={`Позвонить ${s.phone}`} className="hidden h-11 w-11 items-center justify-center rounded-full bg-chalk text-ink hover:bg-line md:flex">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z" /></svg>
          </a>
          <a href={`tel:${s.phoneRaw}`} className="whitespace-nowrap text-[15px] font-medium no-underline md:hidden">{s.phone}</a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="btn-ghost !px-3.5 !py-2 lg:hidden"
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Мобильное меню" className="bg-paper lg:hidden">
          <div className="wrap grid gap-1 pb-4 pt-1">
            {content.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-cardSm px-3 py-2.5 text-lg no-underline hover:bg-chalk">{n.label}</Link>
            ))}
            <Link href="/korporativ/novogodniy/" onClick={() => setOpen(false)} className="rounded-cardSm px-3 py-2.5 text-lg no-underline hover:bg-chalk">Новогодний корпоратив</Link>
            <Link href="/blog/" onClick={() => setOpen(false)} className="rounded-cardSm px-3 py-2.5 text-lg no-underline hover:bg-chalk">Блог</Link>
            <a href={`tel:${s.phoneRaw}`} className="mt-2 px-3 text-lg font-medium no-underline">{s.phone}</a>
          </div>
        </nav>
      )}
    </header>
  );
}

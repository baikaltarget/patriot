"use client";
import Link from "next/link";
import { useState } from "react";
import { content } from "@/lib/content";

export default function Header() {
  const s = content.site;
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="wrap flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center no-underline" aria-label={`${s.name} — на главную`}>
          <img src={s.logo.color} alt={s.parentName} width={168} height={72} className="h-12 w-auto md:h-14" />
        </Link>
        <nav aria-label="Основное меню" className="hidden items-center gap-4 whitespace-nowrap text-[14px] lg:flex xl:gap-5 xl:text-[15px]">
          {content.nav.map((n) => (
            <Link key={n.href} href={n.href} className="no-underline hover:text-brandBlue">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${s.phoneRaw}`} className="hidden whitespace-nowrap font-bold no-underline md:inline hover:text-brandBlue">{s.phone}</a>
          <a href="#zayavka" className="btn-signal hidden whitespace-nowrap !py-2 md:inline-flex">Забронировать</a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="btn-ghost !px-3 !py-2 lg:hidden"
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Мобильное меню" className="border-t border-line bg-paper lg:hidden">
          <div className="wrap grid gap-1 py-3">
            {content.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-lg no-underline">{n.label}</Link>
            ))}
            <Link href="/korporativ/novogodniy/" onClick={() => setOpen(false)} className="py-2 text-lg no-underline">Новогодний корпоратив</Link>
            <Link href="/blog/" onClick={() => setOpen(false)} className="py-2 text-lg no-underline">Блог</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

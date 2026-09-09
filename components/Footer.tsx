import Link from "next/link";
import NeedsData from "./NeedsData";
import { content } from "@/lib/content";

export default function Footer() {
  const s = content.site;
  return (
    <footer className="mt-10 border-t border-ink bg-chalk pb-24 pt-12 md:pb-12">
      <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-xl font-semibold">{s.name}</div>
          <div className="text-dim">площадка {s.parentName}</div>
          <a href={`tel:${s.phoneRaw}`} className="mt-5 block text-2xl font-semibold no-underline">{s.phone}</a>
          <div className="text-dim">{s.managerHours}</div>
          <address className="mt-4 not-italic">
            {s.address}
            <br />
            <a href={`mailto:${s.email}`} className="text-dim hover:text-ink">{s.email}</a>
          </address>
        </div>
        <nav aria-label="Разделы" className="grid gap-2 text-sm">
          {content.nav.map((n) => (
            <Link key={n.href} href={n.href} className="no-underline hover:underline">{n.label}</Link>
          ))}
          <Link href="/korporativ/novogodniy/" className="no-underline hover:underline">Новогодний корпоратив</Link>
          <Link href="/meropriyatiya/" className="no-underline hover:underline">Проведённые мероприятия</Link>
          <Link href="/blog/" className="no-underline hover:underline">Блог</Link>
          <Link href="/o-ploshchadke/" className="no-underline hover:underline">О площадке</Link>
          <Link href="/politika/" className="no-underline hover:underline">Политика конфиденциальности</Link>
        </nav>
        <div className="text-sm text-dim">
          <div className="mb-2 font-medium text-ink">Парк «Патриот»</div>
          <a href={s.parentUrl} className="block no-underline hover:underline">Сайт парка</a>
          <a href={`${s.parentUrl}shooting`} className="block no-underline hover:underline">Стрелковый клуб</a>
          <a href={`${s.parentUrl}firetag`} className="block no-underline hover:underline">Фаертаг</a>
          {s.socials.map((x) => (
            <a key={x.url} href={x.url} className="block no-underline hover:underline" rel="noopener">{x.name}</a>
          ))}
          <NeedsData className="mt-6 text-xs leading-relaxed">
            © {new Date().getFullYear()} {s.legal.org}
            <br />ИНН {s.legal.inn}, ОГРН {s.legal.ogrn}
          </NeedsData>
        </div>
      </div>
    </footer>
  );
}

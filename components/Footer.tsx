import Link from "next/link";
import { content } from "@/lib/content";
import TrackLink from "./TrackLink";

export default function Footer() {
  const s = content.site;
  return (
    <footer className="mt-6 rounded-t-card bg-footer pb-14 pt-14 text-white">
      <div className="wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src={s.logo.white} alt={s.parentName} width={168} height={72} className="h-12 w-auto" />
          <div className="mt-3 text-white/60">{s.name}</div>
          <TrackLink href={`tel:${s.phoneRaw}`} goal="phone_click" className="mt-5 block text-2xl font-bold no-underline">{s.phone}</TrackLink>
          <div className="text-white/60">{s.managerHours}</div>
          <address className="mt-4 not-italic text-white/80">
            {s.address}
            <br />
            <TrackLink href={`mailto:${s.email}`} goal="email_click" className="text-white/60 hover:text-white">{s.email}</TrackLink>
          </address>
        </div>
        <nav aria-label="Мероприятия">
          <div className="mb-3 font-bold text-brandBlue">Мероприятия</div>
          <div className="grid gap-2 text-[15px] text-white/80">
            {content.nav.slice(0, 3).map((n) => (
              <Link key={n.href} href={n.href} className="no-underline hover:text-white">{n.label}</Link>
            ))}
            <Link href="/korporativ/novogodniy/" className="no-underline hover:text-white">Новогодний корпоратив</Link>
            <Link href="/meropriyatiya/" className="no-underline hover:text-white">Проведённые мероприятия</Link>
          </div>
        </nav>
        <nav aria-label="Информация">
          <div className="mb-3 font-bold text-brandBlue">Информация</div>
          <div className="grid gap-2 text-[15px] text-white/80">
            <Link href="/zaly/" className="no-underline hover:text-white">Залы</Link>
            <Link href="/oborudovanie/" className="no-underline hover:text-white">Оборудование</Link>
            <Link href="/ceny/" className="no-underline hover:text-white">Цены</Link>
            <Link href="/blog/" className="no-underline hover:text-white">Блог</Link>
            <Link href="/o-ploshchadke/" className="no-underline hover:text-white">О площадке</Link>
            <Link href="/politika/" className="no-underline hover:text-white">Политика конфиденциальности</Link>
          </div>
        </nav>
        <div>
          <div className="mb-3 font-bold text-brandBlue">Парк «Патриот»</div>
          <div className="grid gap-2 text-[15px] text-white/80">
            <a href={s.parentUrl} className="no-underline hover:text-white">Сайт парка</a>
            <a href={`${s.parentUrl}shooting`} className="no-underline hover:text-white">Стрелковый клуб</a>
            <a href={`${s.parentUrl}firetag`} className="no-underline hover:text-white">Фаертаг</a>
            {s.socials.map((x) => (
              <a key={x.url} href={x.url} className="no-underline hover:text-white" rel="noopener">{x.name}</a>
            ))}
          </div>
          <div className="mt-6 text-xs leading-relaxed text-white/50">
            © {new Date().getFullYear()} {s.legal.org}
            <br />ИНН {s.legal.inn}, ОГРН {s.legal.ogrn}
          </div>
        </div>
      </div>
      <div className="wrap mt-10 flex items-center justify-between border-t border-white/15 pt-6">
        <span className="text-xs text-white/40">
          Мультихолл — площадка {s.parentName}
          {s.developer && (
            <>
              {" · "}
              {s.developer.text} —{" "}
              <a href={s.developer.url} target="_blank" rel="noopener" className="text-white/55 hover:text-white/80">{s.developer.name}</a>
            </>
          )}
        </span>
        <a href="#top" aria-label="Наверх" className="nav-circle-outline !border-white !text-white hover:!bg-white hover:!text-footer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </a>
      </div>
    </footer>
  );
}

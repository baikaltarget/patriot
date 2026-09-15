"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "mh-cookie-consent";

/** Плашка про куки. Показывается один раз, выбор хранится в localStorage. */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* приватный режим — просто не показываем */
    }
  }, []);
  if (!show) return null;
  const accept = () => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    setShow(false);
  };
  return (
    <div role="region" aria-label="Использование cookie" className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-card bg-footer p-5 text-white shadow-lg md:inset-x-auto md:right-6 md:bottom-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <p className="flex-1 text-[15px] text-white/85">
          Мы используем cookie, чтобы сайт работал корректно и чтобы понимать, какие страницы полезны посетителям. Подробности — в{" "}
          <Link href="/politika/" className="text-white underline">политике обработки персональных данных</Link>.
        </p>
        <button type="button" onClick={accept} className="btn-signal shrink-0 !py-2.5">Принять</button>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

/** Клик по картинке — открывает её во весь экран. Esc или клик по фону — закрыть. */
export default function Zoom({ src, alt, className = "", imgClassName = "" }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`block h-full w-full cursor-zoom-in ${className}`} aria-label={`Увеличить: ${alt}`}>
        <img src={src} alt={alt} className={imgClassName} loading="lazy" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={alt}>
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-cardSm bg-white object-contain" />
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink" aria-label="Закрыть">✕</button>
        </div>
      )}
    </>
  );
}

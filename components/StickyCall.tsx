import { content } from "@/lib/content";

export default function StickyCall() {
  const s = content.site;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a href={`tel:${s.phoneRaw}`} className="btn-signal flex-1">Позвонить</a>
        <a href="#zayavka" className="btn-ghost flex-1">Заявка</a>
      </div>
    </div>
  );
}

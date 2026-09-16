"use client";
import { useState } from "react";
import { content } from "@/lib/content";
import { reachGoal } from "@/lib/goals";

/**
 * Карта Яндекса на виджете организации: реальная метка, карточка с отзывами и кнопка «Маршрут».
 * Конструктор карт не нужен — виджет собирается по ID организации из site.json.
 * Грузится по клику, чтобы не тормозить страницу и не ставить куки Яндекса до согласия.
 */
export default function YandexMap() {
  const s = content.site;
  const [loaded, setLoaded] = useState(false);
  const src = `https://yandex.ru/map-widget/v1/org/${s.yandexOrgSlug}/${s.yandexOrgId}/?ll=${s.geo.lng}%2C${s.geo.lat}&z=17`;

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-card bg-chalk md:h-full">
      {loaded ? (
        <iframe
          src={src}
          title={`${s.name} на карте Яндекса`}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => { setLoaded(true); reachGoal("map_open"); }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
        >
          <span className="text-lg font-medium">{s.address}</span>
          <span className="text-dim">Нажмите, чтобы открыть карту</span>
          <span className="btn-signal mt-2">Показать карту</span>
        </button>
      )}
    </div>
  );
}

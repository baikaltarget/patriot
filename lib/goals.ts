import { content } from "./content";

/**
 * Отправка цели в Яндекс.Метрику.
 * Безопасна: если счётчик не загрузился или отключён, просто ничего не делает.
 * Список целей и как их завести — в README, раздел «Цели Метрики».
 */
export type Goal =
  | "lead_form_submit"
  | "calc_lead_submit"
  | "calc_finish"
  | "phone_click"
  | "telegram_click"
  | "email_click"
  | "map_open";

export function reachGoal(goal: Goal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = content.site.metrikaId;
  const ym = (window as unknown as { ym?: (id: number, a: string, g: string, p?: unknown) => void }).ym;
  if (!id || typeof ym !== "function") return;
  try {
    ym(id, "reachGoal", goal, params);
  } catch {
    /* счётчик не должен ломать сайт */
  }
}

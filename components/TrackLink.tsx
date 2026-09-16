"use client";
import { reachGoal, type Goal } from "@/lib/goals";

/** Ссылка с отправкой цели в Метрику. Нужна, чтобы серверные компоненты не становились клиентскими. */
export default function TrackLink({
  href,
  goal,
  className = "",
  children,
  target,
  rel,
  "aria-label": ariaLabel,
}: {
  href: string;
  goal: Goal;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  return (
    <a href={href} className={className} target={target} rel={rel} aria-label={ariaLabel} onClick={() => reachGoal(goal)}>
      {children}
    </a>
  );
}

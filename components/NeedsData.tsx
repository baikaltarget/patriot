import { showFrames } from "@/lib/content";

/** Обёртка: если данные не подтверждены заказчиком — красная пунктирная рамка. */
export default function NeedsData({
  on = true,
  photo = false,
  className = "",
  children,
  as: Tag = "div",
}: {
  on?: boolean;
  photo?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "span" | "li" | "p" | "section";
}) {
  const cls = [className, on && showFrames ? "needs-data" : "", photo ? "photo" : "", Tag === "span" ? "inline" : ""].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}

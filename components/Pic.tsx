import dims from "@/lib/image-dims.json";

/**
 * Картинка с WebP, размерами и ленивой загрузкой.
 * WebP лежит рядом с JPEG (одно имя, другое расширение) — браузер сам выберет,
 * старые браузеры получат JPEG. Размеры нужны, чтобы страница не «прыгала» при загрузке.
 */
export default function Pic({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const d = (dims as unknown as Record<string, number[]>)[src];
  const webp = src.replace(/\.jpg$/, ".webp");
  return (
    <picture>
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={d?.[0]}
        height={d?.[1]}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority пока не в типах React
        fetchpriority={priority ? "high" : undefined}
        sizes={sizes}
      />
    </picture>
  );
}

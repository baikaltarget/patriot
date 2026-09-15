import NeedsData from "./NeedsData";

/** Место под фото. Пока оригиналов нет — серая плашка с рамкой. Файлы кладутся в public/img/ */
export default function PhotoSlot({
  src,
  alt,
  ratio = "4/3",
  className = "",
  placeholder = true,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <NeedsData on={placeholder} photo className={className}>
      <figure className="relative w-full overflow-hidden rounded-card bg-chalk" style={{ aspectRatio: ratio }}>
        {placeholder ? (
          <div className="absolute inset-0 flex items-end p-3">
            <span className="dimension">{src.replace("/img/", "img/")}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        )}
      </figure>
    </NeedsData>
  );
}

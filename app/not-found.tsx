import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap py-24">
      <h1>Такой страницы нет</h1>
      <p className="mt-4 text-dim">Возможно, адрес изменился. Начните с <Link href="/" className="underline">главной</Link> или <Link href="/ceny/" className="underline">цен</Link>.</p>
    </section>
  );
}

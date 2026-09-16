import type { Metadata } from "next";
import { content, SITE_URL } from "./content";

const s = content.site;

export function meta(o: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  const url = `${SITE_URL}${o.path}`;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: `${s.name} — ${s.parentName}`,
      locale: "ru_RU",
      type: o.type ?? "website",
      images: [{ url: `${SITE_URL}${s.ogImage}`, width: 1200, height: 630, alt: o.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: [`${SITE_URL}${s.ogImage}`],
    },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.legal.org,
    url: SITE_URL,
    telephone: s.phoneRaw,
    email: s.email,
    sameAs: s.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.addressStreet,
      addressLocality: s.addressLocality,
      postalCode: s.postalCode,
      addressCountry: "RU",
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    "@id": `${SITE_URL}/#venue`,
    name: `${s.name} — ${s.parentName}`,
    description: s.tagline,
    url: SITE_URL,
    telephone: s.phoneRaw,
    email: s.email,
    priceRange: "₽₽",
    image: `${SITE_URL}/img/hall-01.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.addressStreet,
      addressLocality: s.addressLocality,
      addressRegion: "Иркутская область",
      postalCode: s.postalCode,
      addressCountry: "RU",
    },
    geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    maximumAttendeeCapacity: content.hall.capacityMax,
    hasMap: s.yandexMapsUrl,
    sameAs: s.sameAs,
    currenciesAccepted: "RUB",
    paymentAccepted: "Наличные, банковская карта, безналичный расчёт",
    publicAccess: true,
    isAccessibleForFree: false,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Проекционный экран", value: true },
      { "@type": "LocationFeatureSpecification", name: "Сцена 30 м²", value: true },
      { "@type": "LocationFeatureSpecification", name: "Звуковое оборудование", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Бесплатная парковка", value: true },
      { "@type": "LocationFeatureSpecification", name: "Свой кейтеринг разрешён", value: true },
    ],
    parentOrganization: { "@type": "Organization", name: s.parentName, url: s.parentUrl },
  };
}

export function serviceLd(o: { name: string; description: string; path: string; price: number; priceUnit?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    provider: { "@id": `${SITE_URL}/#venue` },
    areaServed: { "@type": "City", name: "Иркутск" },
    offers: {
      "@type": "Offer",
      price: o.price,
      priceCurrency: "RUB",
      description: o.priceUnit,
      availability: "https://schema.org/InStock",
    },
  };
}

export function productLd(o: { name: string; description: string; path: string; price: number; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    image: o.image ? `${SITE_URL}${o.image}` : undefined,
    brand: { "@type": "Brand", name: s.name },
    offers: {
      "@type": "Offer",
      price: o.price,
      priceCurrency: "RUB",
      url: `${SITE_URL}${o.path}`,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#venue` },
    },
  };
}

export function howToLd(o: { name: string; steps: { t: string; d: string }[]; price: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: o.name,
    description: `Как забронировать зал в Мультихолле, Иркутск. Аренда от ${o.price} ₽.`,
    totalTime: "PT10M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "RUB", value: o.price },
    step: o.steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.t,
      text: st.d,
    })),
  };
}

export function speakableLd(selectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: selectors },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbsLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.href}`,
    })),
  };
}

export function blogPostingLd(o: { title: string; description: string; path: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: o.title,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    datePublished: o.date,
    dateModified: o.date,
    author: { "@type": "Organization", name: `${s.name} — ${s.parentName}` },
    publisher: { "@type": "Organization", name: s.legal.org },
    mainEntityOfPage: `${SITE_URL}${o.path}`,
  };
}

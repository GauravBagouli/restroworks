import type { ReactNode } from "react";
import { LOCALES, DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AlternateLinks({ locale, path }: { locale: Locale; path: string }) {
  const withoutLocale = path.replace(new RegExp(`^/${locale}`), "");
  const tidy = withoutLocale || "/";
  return (
    <>
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${tidy}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${tidy}`} />
    </>
  );
}

export default async function FeatureLayout({
  params,
  children,
}: {
  params: Promise<{ id: string; locale: string }>;
  children: ReactNode;
}) {
  const { id, locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;

  return (
    <>
      <AlternateLinks locale={locale} path={`/features/${id}/${locale}`} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

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
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`/${l}${tidy}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`/${DEFAULT_LOCALE}${tidy}`} />
    </>
  );
}

export default function LocaleLayout({
  params,
  children,
}: {
  params: { slug: string; locale: string };
  children: ReactNode;
}) {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : DEFAULT_LOCALE;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <AlternateLinks locale={locale} path={`/${params.slug}/${locale}`} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}

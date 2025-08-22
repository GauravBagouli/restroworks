import RenderBlocks from "@/components/RenderBlocks";
import RichTextRenderer from "@/components/RichText";
import { isLocale, DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";
import ContactPage from "@/components/blocks/Contact";
import FeaturesPage from "@/components/blocks/FeaturePage";
import type { Metadata } from "next";

const CMS = process.env.NEXT_PUBLIC_CMS_URL;

async function getHome(locale: Locale, slug: string) {
  const res = await fetch(
    `${CMS}/api/pages?where[slug][equals]=${slug}&locale=${locale}&depth=2`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("CMS fetch failed:", res.status);
    return null;
  }

  const data = await res.json();
  return data.docs?.[0];
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await props.params;
  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const safeSlug = slug || "home";

  const page = await getHome(locale, safeSlug);

  if (!page) {
    return {
      title: "404 - Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const languages: Record<string, string> = {};
  LOCALES.forEach((loc) => {
    languages[loc] = `/${safeSlug}/${loc}`;
  });

  return {
    title: page.seo.metaTitle || "Home Page",
    description: page.seo.metaDescription || "",
    keywords: page.seo.metaKeywords || "",
    openGraph: {
      title: page.seo.metaTitle || "Home Page",
      description: page.seo.metaDescription || "",
      images: page.seo.openGraphImage ? [{ url: page.seo.openGraphImage.url }] : [],
    },
    alternates: {
      canonical: `/${safeSlug}/${locale}`,
      languages
    },
  };
}

export default async function HomePage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale: rawLocale } = await props.params;

  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const safeSlug = slug || "home";
  const page = await getHome(locale, safeSlug);

  if (!page) return <h1 className="py-16 text-center">404 - Page Not Found</h1>;

  if (page.slug === "contact") {
    return (<ContactPage />);
  }

  if (page.slug === "features") {
    return (
      <main>
        <RenderBlocks layout={page.layout} locale={locale} />
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="HomepageHeroGradient w-[150%] h-[150%] absolute left-[-25%] bottom-0
            bg-[linear-gradient(270deg,#a960ee,#ff333d,#90e0ff,#ffcb57,#a960ee)]
            bg-[length:300%_300%] animate-gradient"
          />
        </div>
        
        <div className="pb-32 pt-20 text-center text-white">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
            {page.content && (
              <div className="mt-4 text-lg opacity-90">
                <RichTextRenderer content={page.content} />
              </div>
            )}
          </div>
        </div>
      </section>

      <RenderBlocks layout={page.layout} locale={locale} />
    </main>
  );
}

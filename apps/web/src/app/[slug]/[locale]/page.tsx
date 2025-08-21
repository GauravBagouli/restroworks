import RenderBlocks from "@/components/RenderBlocks";
import RichTextRenderer from "@/components/RichText";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

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
  console.log('data', data)
  return data.docs?.[0];
}

export default async function HomePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { slug, locale: rawLocale } = params;

  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const safeSlug = slug || "home";
  const page = await getHome(locale, safeSlug);

  if (!page) return <h1 className="py-16 text-center">404 - Page Not Found</h1>;

  return (
    <main>
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
          {page.content && (
            <div className="mt-4 text-lg text-gray-600">
              <RichTextRenderer content={page.content} />
            </div>
          )}
        </div>
      </section>

      <RenderBlocks layout={page.layout} />
    </main>
  );
}

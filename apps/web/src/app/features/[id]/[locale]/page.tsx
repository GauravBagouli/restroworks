import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import FeaturesDetailPage from "@/components/blocks/FeatureDetailsPage";

const CMS = process.env.NEXT_PUBLIC_CMS_URL;

async function getFeature(id: string, locale: Locale) {
  const res = await fetch(
    `${CMS}/api/features/${id}?locale=${locale}&depth=2`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("CMS fetch failed:", res.status);
    return null;
  }

  return res.json();
}

export default async function FeatureDetail(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale: rawLocale } = await props.params;

  const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;

  const feature = await getFeature(id, locale);

  if (!feature) {
    return (
      <h1 className="py-16 text-center text-gray-800">
        404 - Feature Not Found
      </h1>
    );
  }

  return (
    <>
      <FeaturesDetailPage params={{ feature, locale }} />
    </>
  );
}

import FeatureList from "@/components/blocks/FeatureList";

export default async function FeaturesPage({
  params,
}: {
  params: { locale: string, slug: string };
}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/features?locale=${params.locale}&depth=2`,
        {
            cache: "no-store",
        }
    );

  const data = await res.json();

  const blockData = {
    features: data.docs,
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6 text-gray-800">
      <FeatureList block={blockData} locale={params.locale} />
    </main>
  );
}

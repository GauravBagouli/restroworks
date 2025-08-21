import Image from "next/image";
import RichTextRenderer from "@/components/RichText";
import Link from "next/link";

export default async function FeatureDetail({
  params,
}: {
  params: { id: string, locale: string };
}) {
  console.log('params', params.locale)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/features/${params.id}?locale=${params.locale}&depth=2`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h1 className="text-center py-20">Feature not found</h1>;
  }

  const feature = await res.json();

  return (
    <main className="max-w-4xl mx-auto py-16 px-6 text-gray-800 bg-gray-50">

      {feature.icon?.url && (
        <Image
          src={feature.icon.url}
          alt={feature.icon.alt || ""}
          width={128}
          height={128}
          className="mx-auto"
        />
      )}

      <h1 className="text-4xl font-bold mt-6 text-center">{feature.title}</h1>
      {feature.description && (
        <p className="mt-2 text-lg text-gray-600 text-center">
          {feature.description}
        </p>
      )}

      {feature.content && (
        <div className="prose prose-lg mx-auto mt-8">
          <RichTextRenderer content={feature.content} />
        </div>
      )}

      {feature.images?.length > 0 && (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {feature.images.map((img: any, i: number) =>
            img.image?.url ? (
              <figure key={i}>
                <Image
                  src={img.image.url}
                  alt={img.image.alt || ""}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-sm text-gray-500 text-center">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ) : null
          )}
        </div>
      )}

      <div className="mt-16 text-center">
        <Link
          href={`/home/${params.locale}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

import Image from "next/image";

export default function FeatureList({ block, locale }: { block: any, locale: string; }) {
  if (!block.features?.length) return null;

  return (
    <section className="py-16 text-center bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {block.features.map((feature: any, i: number) => (
            <div
              key={feature.id || i}
              className="p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-md transition"
            >
              {feature.icon?.url && (
                <Image
                  src={feature.icon.url}
                  alt={feature.icon.alt || ""}
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              )}
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
              {feature.link && (
                <a
                  href={`/features/${feature.id}/${locale}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  {feature.link_label || "Learn more"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

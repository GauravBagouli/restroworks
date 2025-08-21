import Image from "next/image";
import RichTextRenderer from "../RichText";

export default function Hero({ block }: { block: any }) {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          {block.eyebrow && (
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {block.eyebrow}
            </p>
          )}
          <h1 className="mt-2 text-5xl font-extrabold text-gray-900 leading-tight">
            {block.headline}
          </h1>
          {block.description && (
            <div className="mt-6 text-lg text-gray-600">
              <RichTextRenderer content={block.description} />
            </div>
          )}
          {block.primaryCta?.label && (
            <a
              href={block.primaryCta.href}
              className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow hover:bg-blue-700 transition"
            >
              {block.primaryCta.label}
            </a>
          )}
        </div>
        {block.image?.url && (
          <div className="flex justify-center md:justify-end">
            <Image
              src={block.image.url}
              alt={block.image.alt || ""}
              width={block.image.width || 500}
              height={block.image.height || 500}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}

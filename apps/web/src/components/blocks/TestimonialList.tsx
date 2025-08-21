import Image from "next/image";

export default function TestimonialList({ block }: { block: any }) {
  if (!block.testimonials?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {block.testimonials.map((t: any, i: number) => (
            <div
              key={i}
              className="p-8 bg-white rounded-xl shadow-md text-left"
            >
              <p className="text-gray-700 italic">“{t.quote}”</p>
              <div className="flex items-center mt-6">
                {t.avatar?.url && (
                  <Image
                    src={t.avatar.url}
                    alt={t.avatar.alt || ""}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  {t.role && (
                    <p className="text-sm text-gray-500">{t.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CTA({ block }: { block: any }) {
  if (!block.headline) return null;

  return (
    <section className="py-20 bg-blue-400 text-center text-white">
      <h2 className="text-4xl font-bold">{block.headline}</h2>
      <div className="mt-8 flex justify-center gap-6 flex-wrap">
        {block.buttons?.map((btn: any, i: number) => (
          <a
            key={i}
            href={btn.href}
            className="bg-white text-blue-500 px-8 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </section>
  );
}

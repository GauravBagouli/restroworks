"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TestimonialList({ block }: { block: any }) {
  if (!block.testimonials?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          {block.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {block.testimonials.map((t: any, i: number) => (
            <motion.div
              key={i}
              className="cursor-zoom-in p-8 rounded-xl shadow-md flex flex-col gap-4 text-left bg-white relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f9fafb",
                boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              }}
            >

              <motion.p
                className="text-gray-700 italic relative z-10"
                whileHover={{ color: "#1d4ed8" }}
                transition={{ duration: 0.3 }}
              >
                “{t.quote}”
              </motion.p>

              <div className="flex items-center mt-auto">
                {t.avatar?.url && (
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={t.avatar.url}
                      alt={t.avatar.alt || ""}
                      width={50}
                      height={50}
                      priority
                      className="rounded-full"
                    />
                  </motion.div>
                )}
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  {t.role && (
                    <p className="text-sm text-gray-500">{t.role}</p>
                  )}
                </div>
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 -z-0 card-gradient-animate"
                style={{
                  background:
                    "linear-gradient(135deg, #a960ee40, #ff333d40, #90e0ff40, #ffcb5740)",
                  backgroundSize: "300% 300%",
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

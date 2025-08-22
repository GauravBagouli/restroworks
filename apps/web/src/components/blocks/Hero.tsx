"use client";

import Image from "next/image";
import RichTextRenderer from "../RichText";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";

export default function Hero({ block, locale }: { block: any, locale: string }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.95], [0, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.85]);

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.95], [0, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.85]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div key={locale} style={{ y: textY, opacity: textOpacity, scale: textScale }}>
          {block.eyebrow && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-semibold text-blue-600 uppercase tracking-wide"
            >
              {block.eyebrow}
            </motion.p>
          )}
          <AnimatePresence mode="wait">
            <motion.h1
              key={locale}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-4xl font-extrabold text-gray-900 leading-tight"
            >
              {block.headline}
            </motion.h1>
          </AnimatePresence>

          {block.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-gray-600 max-w-xl"
            >
              <RichTextRenderer content={block.description} />
            </motion.div>
          )}

          {block.primaryCta?.label && (
            <motion.a
              href={block.primaryCta.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="mt-10 inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {block.primaryCta.label}
            </motion.a>
          )}
        </motion.div>

        {block.image?.url && (
          <motion.div
            style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
            className="flex justify-center md:justify-end relative"
          >
            <Image
              src={block.image.url}
              alt={block.image.alt || "block image"}
              width={block.image.width || 500}
              height={block.image.height || 500}
              priority
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

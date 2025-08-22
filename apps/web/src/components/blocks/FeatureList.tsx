"use client";

import Image from "next/image";
import RichTextRenderer from "@/components/RichText";
import { SerializedEditorState } from "lexical";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

type Feature = {
  id?: string | number;
  title?: string;
  description: string;
  icon?: { url: string; alt?: string };
  link?: string;
  link_label?: string;
};

type FeatureListBlock = {
  title?: string;
  description?: SerializedEditorState;
  features: Feature[];
};

export default function FeatureList({ block, locale }: { block: FeatureListBlock, locale: string; }) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.85]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  if (!block.features?.length) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="py-20 px-6 text-center text-gray-800 overflow-hidden">
      <motion.div 
        style={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold">{block.title}</h2>

        {block.description && (
          <div className="prose prose-lg mx-auto mb-10 mt-5 text-gray-600">
            <RichTextRenderer content={block.description} />
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {block.features.map((feature: Feature, i: number) => (
            <motion.div
              key={feature.id || i}
              className="p-6 rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition"
              variants={cardVariants}
            >
              {feature.icon?.url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={feature.icon.url}
                    alt={feature.icon.alt || "icon"}
                    width={64}
                    height={64}
                    priority
                    className="mx-auto"
                  />
                </motion.div>
              )}

              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>

              {feature.link && (
                <motion.a
                  href={`/features/${feature.id}/${locale}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {feature.link_label || "Learn more"}
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

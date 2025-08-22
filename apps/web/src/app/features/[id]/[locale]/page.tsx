"use client";

import Image from "next/image";
import RichTextRenderer from "@/components/RichText";
import { SerializedEditorState } from "lexical";
import Link from "next/link";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { use } from "react";

const CMS = process.env.NEXT_PUBLIC_CMS_URL;

type FeatureImage = {
  image?: { url: string; alt?: string };
  caption?: string;
};

type Feature = {
  id: string;
  title: string;
  description?: string;
  content?: SerializedEditorState;
  icon?: { url: string; alt?: string };
  images?: FeatureImage[];
};

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

export default function FeatureDetail({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
    const { id, locale: rawLocale } = use(params);
    const locale = isLocale(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;

    const [feature, setFeature] = useState<Feature | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      getFeature(id, locale)
        .then(setFeature)
        .finally(() => setLoading(false));
    }, [id, locale]);
    

    if (loading) {
      return <h1 className="py-16 text-center text-gray-800">Loading…</h1>;
    }

    if (!feature) {
      return <h1 className="py-16 text-center text-gray-800">404 - Feature Not Found</h1>;
    }

    const fadeUp: Variants = {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

  return (
    <main className="relative max-w-4xl mx-auto py-16 px-6 text-gray-800 bg-gray-50">

      <motion.div
        className="absolute inset-0 -z-10 rounded-xl opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #a960ee40, #ff333d40, #90e0ff40, #ffcb5740)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {feature.icon?.url && (
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          <Image
            src={feature.icon.url}
            alt={feature.icon.alt || "feature"}
            width={128}
            height={128}
            priority
            className="mx-auto"
          />
        </motion.div>
      )}

      <motion.h1
        className="text-4xl font-bold mt-6 text-center"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        {feature.title}
      </motion.h1>

      {feature.description && (
        <motion.p
          className="mt-2 text-lg text-gray-600 text-center"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          {feature.description}
        </motion.p>
      )}

      {feature.content && (
        <motion.div
          className="prose prose-lg mx-auto mt-8"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <RichTextRenderer content={feature.content} />
        </motion.div>
      )}

      {feature.images && feature.images?.length > 0 && (
        <motion.div 
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15, delayChildren: 0.5 },
            },
          }}
        >
          {feature.images.map((img: FeatureImage, i: number) =>
            img.image?.url ? (
              <motion.figure
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="transition-transform"
              >
                <Image
                  src={img.image.url}
                  alt={img.image.alt || "feature"}
                  width={600}
                  height={400}
                  priority
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-sm text-gray-500 text-center">
                    {img.caption}
                  </figcaption>
                )}
              </motion.figure>
            ) : null
          )}
        </motion.div>
      )}

      <motion.div
        className="mt-16 text-center"
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ delay: 0.6 }}
      >
        <Link
          href={`/home/${locale}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}

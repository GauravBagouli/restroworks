import { MetadataRoute } from "next";
import { isLocale, DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

const CMS = process.env.NEXT_PUBLIC_CMS_URL;

async function fetchPages() {
  const res = await fetch(`${CMS}/api/pages?depth=0&limit=100`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.docs || [];
}

async function fetchFeatures() {
  const res = await fetch(`${CMS}/api/features?depth=0&limit=100`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.docs || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const pages = await fetchPages();
  const features = await fetchFeatures();

  const entries: MetadataRoute.Sitemap = [];

  // Pages
  for (const page of pages) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${baseUrl}/${page.slug}/${locale}`,
        lastModified: page.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Features
  for (const feature of features) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${baseUrl}/feature/${feature.id}/${locale}`,
        lastModified: feature.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}

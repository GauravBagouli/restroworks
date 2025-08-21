export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && LOCALES.includes(v as Locale);
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import { LOCALES, type Locale, isLocale } from "@/i18n/config";
console.log("LOCALES", LOCALES);

const FLAG: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
};

const LABEL: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [currentLocalVal, setCurrentLocalVal] = useState(current);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const query = searchParams ? `?${searchParams.toString()}` : "";
  const segments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  useEffect(() => {
    setCurrentLocalVal(
      isLocale(segments[0]) ? (segments[0] as Locale) : current
    );
  }, []);

  function switchTo(nextLocale: Locale) {
    setCurrentLocalVal(nextLocale);
    if (nextLocale === currentLocalVal) {
      setOpen(false);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (isLocale(segments[segments.length - 1])) {
      const base = segments.slice(0, -1).join("/");
      const nextPath = `/${base}${base ? "/" : ""}${nextLocale}${query}`;
      router.push(nextPath);
    } else {
      const base = segments.join("/");
      const nextPath = `/${base}${base ? "/" : ""}${nextLocale}${query}`;
      router.push(nextPath);
    }

    setOpen(false);
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-400"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <span className="text-lg">{FLAG[currentLocalVal]}</span>
        <span className="font-medium">{LABEL[currentLocalVal]}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border text-gray-800 bg-white shadow-lg"
        >
          {LOCALES.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === currentLocalVal}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                l === currentLocalVal ? "bg-gray-50 font-semibold" : ""
              }`}
              onClick={() => switchTo(l)}
            >
              <span className="mr-2 text-lg">{FLAG[l]}</span>
              {LABEL[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

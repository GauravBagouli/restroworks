"use client";

import Link from "next/link";
import { type Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href={`/home/${locale}`} className="flex items-center">
          <Image
            src="https://www.restroworks.com/wp-content/uploads/2023/09/restroworks-logo.png"
            alt="Restroworks Logo"
            width={120}
            height={40}
            priority
            className="mr-2"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/features/${locale}`}
            className={`text-sm hover:text-gray-900 text-gray-500 ${
              pathname?.includes("/features") ? "font-semibold" : ""
            }`}
          >
            {locale === "en" ? "Features" : "Características"}
          </Link>
          <Link
            href={`/contact/${locale}`}
            className={`text-sm hover:text-gray-900 text-gray-500 ${
              pathname?.includes("/contact") ? "font-semibold" : ""
            }`}
          >
            {locale === "en" ? "Contact" : "Contato"}
          </Link>

          <LanguageSwitcher current={locale} />
        </nav>
      </div>
    </header>
  );
}

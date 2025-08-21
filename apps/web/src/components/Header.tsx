// import Image from "next/image";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <header className="bg-white shadow sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
//         {/* Logo */}
//         <Image
//           src="https://www.restroworks.com/wp-content/uploads/2023/09/restroworks-logo.png"
//           alt="Restroworks Logo"
//           width={120}
//           height={40}
//           className="mr-2"
//         />

//         {/* Nav */}
//         <nav className="space-x-6">
//           <Link href="/home" className="text-gray-700 hover:text-blue-600">
//             Home
//           </Link>
//           <Link href="/contact" className="text-gray-700 hover:text-blue-600">
//             Contact
//           </Link>
//           <Link href="/about" className="text-gray-700 hover:text-blue-600">
//             About
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { type Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { usePathname } from "next/navigation";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href={`/home/${locale}`} className="font-semibold">
          Restroworks
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/features/${locale}`}
            className={`text-sm hover:text-gray-900 ${
              pathname?.includes("/features") ? "font-semibold" : "text-gray-600"
            }`}
          >
            Features
          </Link>
          <Link
            href={`/contact/${locale}`}
            className={`text-sm hover:text-gray-900 ${
              pathname?.includes("/contact") ? "font-semibold" : "text-gray-600"
            }`}
          >
            Contact
          </Link>

          <LanguageSwitcher current={locale} />
        </nav>
      </div>
    </header>
  );
}

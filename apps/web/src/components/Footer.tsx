import type { Locale } from "@/i18n/config";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div key={locale} className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p>&copy; {new Date().getFullYear()} Restroworks. All rights reserved.</p>
        <nav className="space-x-6">
          <a href="https://www.restroworks.com/privacy-policy/" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="https://www.restroworks.com/website-terms-of-use/" className="hover:text-white">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
}

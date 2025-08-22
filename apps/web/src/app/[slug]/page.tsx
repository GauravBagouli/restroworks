import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default function RedirectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return redirect(`/${slug}/${DEFAULT_LOCALE}`);
}
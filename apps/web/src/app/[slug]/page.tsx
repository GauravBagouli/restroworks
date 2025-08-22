import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/config";

interface RedirectParams {
  params: Promise<{ slug: string }>;
}

export default async function RedirectPage({ params }: RedirectParams) {
  const { slug } = await params;
  redirect(`/${slug}/${DEFAULT_LOCALE}`);
}
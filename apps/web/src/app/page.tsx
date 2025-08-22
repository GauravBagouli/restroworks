import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default async function RedirectPage() {
  redirect(`/home/${DEFAULT_LOCALE}`);
}
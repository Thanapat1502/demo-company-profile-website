import { getRequestConfig } from "next-intl/server";
import { loadMessages } from "@/lib/i18n/loadMessages";

// Can be imported from a shared config
export const locales = ["en", "th"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as "en" | "th")) {
    // Load default English translations from Supabase
    const messages = await loadMessages("en");
    return {
      locale: "en",
      messages,
    };
  }

  // Load translations from Supabase for the requested locale
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});

import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["en", "th"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as "en" | "th")) {
    return {
      locale: "en",
      messages: (await import(`../../messages/en.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

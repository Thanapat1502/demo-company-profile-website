import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import StructuredData from "@/components/seo/StructuredData";

// Enable ISR for localized content with proper caching
export const dynamic = 'auto'; // Allow dynamic rendering for localized content
export const revalidate = 3600; // Revalidate every hour

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as "en" | "th")) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData type="Organization" locale={locale as "th" | "en"} />
      <StructuredData type="WebSite" locale={locale as "th" | "en"} />
      {children}
    </NextIntlClientProvider>
  );
}

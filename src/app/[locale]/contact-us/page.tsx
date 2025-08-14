import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientContactUsPage from "@/components/pages/ClientContactUsPage";
import { generateSEOMetadata, getPageSEOConfig } from "@/lib/seo/metadata";
import StructuredData from "@/components/seo/StructuredData";
import HeroButtons from "@/components/ui/HeroButtons";

// Enable static generation with proper locale support
export const dynamic = 'auto'; // Allow proper locale context while enabling static generation
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = false; // Only allow pre-generated params

// Generate static params for all locales
export async function generateStaticParams() {
  console.log('🏗️ Generating static params for contact-us page');
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = getPageSEOConfig("contact", locale as "th" | "en");

  return generateSEOMetadata({
    ...seoConfig,
    locale: locale as "th" | "en",
    canonical: `https://www.padungsilpa.group/${locale}/contact-us`,
    alternateLocales: {
      th: "https://www.padungsilpa.group/th/contact-us",
      en: "https://www.padungsilpa.group/en/contact-us",
    },
    type: "website",
  });
}

export default async function ContactUsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("CONTACT");

  return (
    <MainLayout>
      <StructuredData
        type="WebPage"
        locale={locale as "th" | "en"}
        config={{
          locale: locale as "th" | "en",
          page: "contact-us",
          title: t("contact.hero.title"),
          description: t("contact.hero.description"),
          images: ["https://padungsilpa.group/images/seo.jpg"],
        }}
      />
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        description={t("contact.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-1.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons
          primaryButtonText={locale === 'th' ? 'โทรด่วน' : 'Hot line'}
          primaryButtonHref="/contact-us#contact-us-section" />
        {/* Hero buttons will be handled in client component */}
      </DynamicHeroSection>

      <ClientContactUsPage locale={locale} />
    </MainLayout>
  );
}

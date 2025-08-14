import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientNewsEventsPage from "@/components/pages/ClientNewsEventsPage";

// Enable static generation with proper locale support
export const dynamic = 'auto'; // Allow proper locale context while enabling static generation
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = false; // Only allow pre-generated params

// Generate static params for all locales
export async function generateStaticParams() {
  console.log('🏗️ Generating static params for news-events page');
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewsEventsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("NEWS");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("news.hero.title")}
        subtitle={t("news.hero.subtitle")}
        description={t("news.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-5.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons primaryButtonText={locale === 'th' ? 'ดูข่าวสาร' : 'View More'}
          primaryButtonHref="/news-events#news-events" />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientNewsEventsPage locale={locale} />
    </MainLayout>
  );
}

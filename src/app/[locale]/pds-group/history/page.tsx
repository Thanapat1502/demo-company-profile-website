import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientCompanyHistoryPage from "@/components/pages/ClientCompanyHistoryPage";

// Enable ISR for localized content
export const revalidate = 3600;
export const dynamic = 'auto';

// Generate static params for all locales
export async function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyHistoryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("ABOUT_HISTORY");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("company.history.hero.title")}
        subtitle={t("company.history.hero.subtitle")}
        description={t("company.history.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-1.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientCompanyHistoryPage locale={locale} />
    </MainLayout>
  );
}

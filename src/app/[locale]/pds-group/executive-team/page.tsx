import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientExecutiveTeamPage from "@/components/pages/ClientExecutiveTeamPage";

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

export default async function ExecutiveTeamPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("ABOUT_EXECUTIVE");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("company.executive.hero.title")}
        subtitle={t("company.executive.hero.subtitle")}
        description={t("company.executive.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-3.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientExecutiveTeamPage locale={locale} />
    </MainLayout>
  );
}

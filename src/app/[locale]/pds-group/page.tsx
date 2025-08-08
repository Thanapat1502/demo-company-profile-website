import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientCompanyProfilePage from "@/components/pages/ClientCompanyProfilePage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CompanyProfilePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("ABOUT_MAIN");

  return (
    <MainLayout>
      {/* Hero Section - Using DynamicHeroSection for consistency */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("company.overview.title")}
        subtitle={t("company.overview.subtitle")}
        description={t("company.overview.description")}
        fallbackImages={[
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        ]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientCompanyProfilePage locale={locale} />
    </MainLayout>
  );
}

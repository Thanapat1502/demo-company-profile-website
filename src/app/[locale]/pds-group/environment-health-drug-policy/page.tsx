import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ServerEnvironmentHealthDrugPolicy from "@/components/pages/ServerEnvironmentHealthDrugPolicy";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EnvironmentHealthDrugPolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("ABOUT_VISION");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("environmentHealthDrugPolicy.heroTitle")}
        subtitle={t("environmentHealthDrugPolicy.heroSubtitle")}
        description=""
        fallbackImages={["/images/hero-sections/hero-banner-2.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Server-side content */}
      <ServerEnvironmentHealthDrugPolicy locale={locale} />
    </MainLayout>
  );
}

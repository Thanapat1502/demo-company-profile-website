import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientMissionCommitmentPage from "@/components/pages/ClientMissionCommitmentPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MissionCommitmentPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("ABOUT_VISION");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("company.mission.hero.title")}
        subtitle={t("company.mission.hero.subtitle")}
        description={t("company.mission.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-2.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientMissionCommitmentPage locale={locale} />
    </MainLayout>
  );
}

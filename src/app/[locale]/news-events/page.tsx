import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientNewsEventsPage from "@/components/pages/ClientNewsEventsPage";

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
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientNewsEventsPage locale={locale} />
    </MainLayout>
  );
}

import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientReferencePage from "@/components/pages/ClientReferencePage";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ReferencePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("REFERENCE");

  return (
    <MainLayout>
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("references.hero.title")}
        subtitle={t("references.hero.subtitle")}
        description={t("references.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-2.jpg"]}
        autoSlideDelay={6000}>
        {/* Hero buttons will be handled in client component */}
      </DynamicHeroSection>

      <ClientReferencePage locale={locale} />
    </MainLayout>
  );
}

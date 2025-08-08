import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientContactUsPage from "@/components/pages/ClientContactUsPage";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactUsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("CONTACT");

  return (
    <MainLayout>
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
        description={t("contact.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-1.jpg"]}
        autoSlideDelay={6000}>
        {/* Hero buttons will be handled in client component */}
      </DynamicHeroSection>

      <ClientContactUsPage locale={locale} />
    </MainLayout>
  );
}

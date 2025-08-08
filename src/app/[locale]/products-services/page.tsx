import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientProductsServicesPage from "@/components/pages/ClientProductsServicesPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("PRODUCTS_SERVICE");

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        imageUrls={heroImages}
        title={t("products.hero.title")}
        subtitle={t("products.hero.subtitle")}
        description={t("products.hero.description")}
        fallbackImages={["/images/hero-sections/hero-banner-4.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Client-side content */}
      <ClientProductsServicesPage locale={locale} />
    </MainLayout>
  );
}

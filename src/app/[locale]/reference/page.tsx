import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { getHeroImageById } from "@/lib/hero-utils";
import ClientReferencePage from "@/components/pages/ClientReferencePage";
import { generateSEOMetadata, getPageSEOConfig } from "@/lib/seo/metadata";
import StructuredData from "@/components/seo/StructuredData";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seoConfig = getPageSEOConfig("reference", locale as "th" | "en");

  return generateSEOMetadata({
    ...seoConfig,
    locale: locale as "th" | "en",
    canonical: `https://www.padungsilpa.group/${locale}/reference`,
    alternateLocales: {
      th: "https://www.padungsilpa.group/th/reference",
      en: "https://www.padungsilpa.group/en/reference",
    },
    type: "website",
  });
}

export default async function ReferencePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  // Fetch hero images server-side
  const heroImages = await getHeroImageById("REFERENCE");

  return (
    <MainLayout>
      <StructuredData
        type="WebPage"
        locale={locale as "th" | "en"}
        config={{
          locale: locale as "th" | "en",
          page: "reference",
          title: t("references.hero.title"),
          description: t("references.hero.description"),
          images: ["https://padungsilpa.techtoptierapp.com/images/seo.jpg"],
        }}
      />
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

import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/home/HeroSection";
import ServerHomePage from "@/components/pages/ServerHomePage";
import { getHeroImageById } from "@/lib/hero-utils";
import StructuredData from "@/components/seo/StructuredData";
import { getSEOData, generateMetadata as generateSEOMetadataNew, SEO_DEFAULTS } from "@/lib/seo-utils";
import PageSEO from "@/components/seo/PageSEO";
import { fetchHomePageDataSSR } from "@/lib/server/dataFetchers";

// Enable ISR (Incremental Static Regeneration) for localized content
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'auto'; // Allow dynamic rendering for localized content

// Generate static params for all locales at build time
export async function generateStaticParams() {
  return [
    { locale: 'th' },
    { locale: 'en' },
  ];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get SEO data from database
  const seoData = await getSEOData('/', locale);

  // Generate metadata using new SEO system
  return generateSEOMetadataNew(seoData, {
    title: SEO_DEFAULTS[locale as 'th' | 'en'].default_title,
    description: SEO_DEFAULTS[locale as 'th' | 'en'].default_description,
    locale: locale as 'th' | 'en',
    pagePath: '/',
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Fetch all data server-side
  const [heroImages, homePageData] = await Promise.all([
    getHeroImageById("HOME"),
    fetchHomePageDataSSR(),
  ]);

  return (
    <MainLayout>
      <PageSEO
        pagePath="/"
        locale={locale}
        fallback={{
          title: SEO_DEFAULTS[locale as 'th' | 'en'].default_title,
          description: SEO_DEFAULTS[locale as 'th' | 'en'].default_description,
        }}
      />
      <StructuredData
        type="WebPage"
        locale={locale as "th" | "en"}
        config={{
          locale: locale as "th" | "en",
          title:
            locale === "th"
              ? "กลุ่มบริษัท ผดุงศิลป์ - ผู้เชี่ยวชาญด้าน PERMATANK® และสถานีบริการน้ำมันครบวงจร"
              : "PADUNGSILPA GROUP - PERMATANK® and Gas Station construction",
          description:
            locale === "th"
              ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร และ PERMATANK® ด้วยประสบการณ์กว่า 50 ปี"
              : "Leading comprehensive gas station business services and PERMATANK® with over 50 years of experience in construction and engineering.",
          images: ["https://padungsilpa.group/images/seo.jpg"],
        }}
      />
      <HeroSection heroImages={heroImages} />
      <ServerHomePage
        locale={locale}
        services={homePageData.services}
        products={homePageData.products}
        content={homePageData.content}
        partners={homePageData.partners}
      />
    </MainLayout>
  );
}

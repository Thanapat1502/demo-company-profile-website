import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/home/HeroSection";
import ServerHomePage from "@/components/pages/ServerHomePage";
import { getHeroImageById } from "@/lib/hero-utils";
import StructuredData from "@/components/seo/StructuredData";
import { getSEOData, generateMetadata as generateSEOMetadataNew, SEO_DEFAULTS } from "@/lib/seo-utils";
import PageSEO from "@/components/seo/PageSEO";
import { fetchHomePageDataSSR } from "@/lib/server/dataFetchers";

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
              ? "กลุ่มบริษัท ผดุงศิลป์ | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร"
              : "Padungsilpa Group | Leading Gas Station Construction & Engineering Services",
          description:
            locale === "th"
              ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม"
              : "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering",
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

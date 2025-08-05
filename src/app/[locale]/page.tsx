"use client";
import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/home/HeroSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import ProductSection from "@/components/sections/home/ProductSection";
import StatsSection from "@/components/sections/home/StatsSection";
import Overview from "@/components/sections/home/Overview";
import PartnersSection from "@/components/sections/home/PartnersSection";
import { usePartnerStore } from "@/store/zustand/partnerStore";
import { useProductStore } from "@/store/zustand/productStore";
import { useServiceStore } from "@/store/zustand/servicesStore";
import { useEffect, useState } from "react";
import { useContentStore } from "@/store/zustand/contentStore";
import { useLocale } from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { locale } = await params;

//   const title =
//     locale === "th"
//       ? "กลุ่มบริษัท ผดุงศิลป์ | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร"
//       : "Padungsilpa Group | Leading Gas Station Construction & Engineering Services";

//   const description =
//     locale === "th"
//       ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม บริการครบวงจรตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา"
//       : "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering. From design and construction to maintenance services.";

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: `https://www.padungsilpa.group/${locale}`,
//       locale: locale === "th" ? "th_TH" : "en_US",
//       images: [
//         {
//           url: "https://padungsilpa.techtoptierapp.com/images/seo.jpg",
//           width: 1200,
//           height: 630,
//           alt: title,
//         },
//       ],
//     },
//     twitter: {
//       title,
//       description,
//       images: ["https://padungsilpa.techtoptierapp.com/images/seo.jpg"],
//     },
//     alternates: {
//       canonical: `https://www.padungsilpa.group/${locale}`,
//       languages: {
//         th: "https://www.padungsilpa.group/th",
//         en: "https://www.padungsilpa.group/en",
//       },
//     },
//   };
// }

export default function Home() {
  const locale = useLocale();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Zustand stores
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    fetchServices,
  } = useServiceStore();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();

  const {
    partners,
    loading: partnersLoading,
    error: partnersError,
    fetchPartners,
  } = usePartnerStore();

  const {
    content,
    loading: contentLoading,
    error: contentError,
    fetchContent,
  } = useContentStore();

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsInitialLoading(true);
      try {
        await Promise.all([
          fetchServices(),
          fetchProducts(),
          fetchPartners(),
          fetchContent("HOME"),
        ]);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllData();
  }, [fetchServices, fetchProducts, fetchPartners, fetchContent]);

  // Loading state for initial page load
  if (isInitialLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 text-lg">
              {locale === "th" ? "กำลังโหลด..." : "Loading..."}
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state (optional - you can customize this)
  const hasErrors =
    servicesError || productsError || partnersError || contentError;
  if (hasErrors) {
    console.warn("Homepage errors:", {
      servicesError,
      productsError,
      partnersError,
      contentError,
    });
  }

  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection
        services={services}
        loading={servicesLoading}
        locale={locale}
      />
      <ProductSection
        products={products}
        loading={productsLoading}
        locale={locale}
      />
      <Overview gallery={content} loading={contentLoading} locale={locale} />
      <StatsSection />
      <PartnersSection
        partners={partners}
        loading={partnersLoading}
        locale={locale}
      />
    </MainLayout>
  );
}

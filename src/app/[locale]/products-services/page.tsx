"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import ConstructionServiceSection from "@/components/sections/products-services/ConstructionServiceSection";
import PermatankSection from "@/components/sections/products-services/PermatankSection";
import PipeInstallationSection from "@/components/sections/products-services/PipeInstallationSection";
import ATGSystemSection from "@/components/sections/products-services/ATGSystemSection";
import TankServicesSection from "@/components/sections/products-services/TankServicesSection";
import ProductsSection from "@/components/sections/products-services/ProductsSection";
import { useProductStore } from "@/store/zustand/productStore";
import { useServiceStore } from "@/store/zustand/servicesStore";
import { useContentStore } from "@/store/zustand/contentStore";
export default function ProductsServicesPage() {
  const locale = useLocale();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Zustand stores
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();

  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    fetchServices,
  } = useServiceStore();

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
          fetchProducts(),
          fetchServices(),
          fetchContent("SERVICE", "gallery"),
          fetchContent("SERVICE", "video"),
        ]);
      } catch (error) {
        console.error("Error fetching products-services data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllData();
  }, [fetchProducts, fetchServices, fetchContent]);

  // Filter services by ID for each section
  const getServiceById = (serviceId: string) => {
    return services.find((service) => service.id === serviceId);
  };

  // Get content for a specific service
  const getServiceContent = (serviceId: string) => {
    return content.filter(
      (c) =>
        c.page === "SERVICE" && (c.id === serviceId || c.id.includes(serviceId))
    );
  };

  // Service section data
  const constructionService = getServiceById("SERVICE_1");
  const permatankService = getServiceById("SERVICE_2");
  const pipeInstallationService = getServiceById("SERVICE_3");
  const atgSystemService = getServiceById("SERVICE_4");
  const tankServicesService = getServiceById("SERVICE_5");

  // Content for each service
  const constructionContent = getServiceContent("SERVICE_1");
  const permatankContent = getServiceContent("SERVICE_2");
  const pipeInstallationContent = getServiceContent("SERVICE_3");
  const atgSystemContent = getServiceContent("SERVICE_4");
  const tankServicesContent = getServiceContent("SERVICE_5");

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
  const hasErrors = servicesError || productsError || contentError;
  if (hasErrors) {
    console.warn("Products-Services page errors:", {
      servicesError,
      productsError,
      contentError,
    });
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        pageId="PRODUCTS_SERVICE"
        title={locale === "th" ? "ผลิตภัณฑ์และบริการ" : "Products & Services"}
        subtitle={locale === "th" ? "บริการครบวงจร" : "Complete Solutions"}
        description={
          locale === "th"
            ? "ผลิตภัณฑ์และบริการคุณภาพสูง\nสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน"
            : "High-quality products and services\nfor gas stations and energy industry"
        }
        fallbackImages={["/images/hero-sections/hero-banner-3.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Service Sections */}
      {/**งานก่อสร้างสถานีบริการน้ำมัน gallery*/}
      <ConstructionServiceSection
        service={constructionService}
        content={constructionContent}
        locale={locale}
        loading={servicesLoading || contentLoading}
      />
      {/**ถังน้ำมันใต้ดิน PERMATANK video*/}
      <PermatankSection
        service={permatankService}
        content={permatankContent}
        locale={locale}
        loading={servicesLoading || contentLoading}
      />
      {/**จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น gallery*/}
      <PipeInstallationSection
        service={pipeInstallationService}
        content={pipeInstallationContent}
        locale={locale}
        loading={servicesLoading || contentLoading}
      />
      {/**ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน video*/}
      <ATGSystemSection
        service={atgSystemService}
        content={atgSystemContent}
        locale={locale}
        loading={servicesLoading || contentLoading}
      />
      {/**บริการต่าง ๆ เกี่ยวกับถังน้ำมัน  gallery*/}
      <TankServicesSection
        service={tankServicesService}
        content={tankServicesContent}
        locale={locale}
        loading={servicesLoading || contentLoading}
      />

      {/* Products Section */}
      <ProductsSection
        products={products}
        locale={locale}
        loading={productsLoading}
      />
    </MainLayout>
  );
}

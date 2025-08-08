"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ConstructionServiceSection from "@/components/sections/products-services/ConstructionServiceSection";
import PermatankSection from "@/components/sections/products-services/PermatankSection";
import PipeInstallationSection from "@/components/sections/products-services/PipeInstallationSection";
import ATGSystemSection from "@/components/sections/products-services/ATGSystemSection";
import TankServicesSection from "@/components/sections/products-services/TankServicesSection";
import ProductsSection from "@/components/sections/products-services/ProductsSection";
import { useProductStore } from "@/store/zustand/productStore";
import { useServiceStore } from "@/store/zustand/servicesStore";
import { useContentStore } from "@/store/zustand/contentStore";

interface ClientProductsServicesPageProps {
  locale: string;
}

export default function ClientProductsServicesPage({
  locale,
}: ClientProductsServicesPageProps) {
  const t = useTranslations();
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

  const getServiceById = (serviceId: string) => {
    return services.find((service) => service.id === serviceId);
  };

  // Get content for a specific service
  const getServiceContent = (serviceId: string) => {
    console.log("Waht is content:", content);
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

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsInitialLoading(true);
        await Promise.all([
          fetchProducts(),
          fetchServices(),
          fetchContent("SERVICE"),
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllData();
  }, [fetchProducts, fetchServices, fetchContent]);

  // Loading state
  const isLoading =
    isInitialLoading || productsLoading || servicesLoading || contentLoading;

  // Error state
  const hasError = productsError || servicesError || contentError;
  if (hasError) {
    console.error("Failed to fetch data:", hasError);
  }

  return (
    <>
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
    </>
  );
}

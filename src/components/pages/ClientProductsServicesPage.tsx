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

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsInitialLoading(true);
        await Promise.all([
          fetchProducts(),
          fetchServices(),
          fetchContent("PRODUCTS_SERVICE"),
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
  // if (hasError) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //           {t("common.error")}
  //         </h2>
  //         <p className="text-gray-600">{t("common.error.description")}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* Construction Services Section */}
      <ConstructionServiceSection
        service={services[0]}
        content={content}
        loading={isLoading}
        locale={locale}
      />

      {/* Permatank Section */}
      <PermatankSection
        service={services[1]}
        content={content}
        loading={isLoading}
        locale={locale}
      />

      {/* Pipe Installation Section */}
      <PipeInstallationSection
        service={services[2]}
        content={content}
        loading={isLoading}
        locale={locale}
      />

      {/* ATG System Section */}
      <ATGSystemSection
        service={services[3]}
        content={content}
        loading={isLoading}
        locale={locale}
      />

      {/* Tank Services Section */}
      <TankServicesSection
        service={services[4]}
        content={content}
        loading={isLoading}
        locale={locale}
      />

      {/* Products Section */}
      <ProductsSection
        products={products}
        loading={isLoading}
        locale={locale}
      />
    </>
  );
}

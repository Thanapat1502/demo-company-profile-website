"use client";

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

interface ClientHomePageProps {
  locale: string;
}

export default function ClientHomePage({ locale }: ClientHomePageProps) {
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
    <>
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
    </>
  );
}

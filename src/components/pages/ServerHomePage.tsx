import ServerServicesSection from "@/components/sections/home/ServerServicesSection";
import ServerProductSection from "@/components/sections/home/ServerProductSection";
import StatsSection from "@/components/sections/home/StatsSection";
import Overview from "@/components/sections/home/Overview";
import PartnersSection from "@/components/sections/home/PartnersSection";
import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";

interface ServerHomePageProps {
  locale: string;
  services: ServiceType[];
  products: ProductType[];
  // Add other props as needed for Overview and PartnersSection
  content?: any;
  partners?: any[];
}

export default function ServerHomePage({
  locale,
  services,
  products,
  content,
  partners,
}: ServerHomePageProps) {
  return (
    <>
      <ServerServicesSection services={services} locale={locale} />
      {/* <ServerProductSection products={products} locale={locale} /> */}
      <Overview gallery={content} loading={false} locale={locale} />
      <StatsSection />
      <PartnersSection
        partners={partners || []}
        loading={false}
        locale={locale}
      />
    </>
  );
}

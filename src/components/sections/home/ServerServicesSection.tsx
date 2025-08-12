import { ServiceType } from "@/store/zustand/servicesStore";
import NewServerServicesSection from "./NewServerServicesSection";

interface ServerServicesSectionProps {
  services: ServiceType[];
  locale: string;
}

export default function ServerServicesSection({
  services,
  locale,
}: ServerServicesSectionProps) {
  return (
    <NewServerServicesSection
      services={services}
      locale={locale}
    />
  );
}

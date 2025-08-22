// Export all static data
export { staticServices } from "./services";
export { staticProducts } from "./products";
export { staticPartners } from "./partners";
export { staticContent } from "./content";
export { staticHeroImages } from "./hero-images";
export { staticNews, staticNewsCategories, staticNewsTags } from "./news";
export { staticReferences, staticOverseaProjects } from "./references";
export { staticExecutiveMembers } from "./executive";
export { staticContactInfo, staticCompanies } from "./contact";

// Re-export types for convenience
export type { ServiceType } from "@/store/zustand/servicesStore";
export type { ProductType } from "@/store/zustand/productStore";
export type { PartnerType } from "@/store/zustand/partnerStore";
export type { Content } from "@/store/zustand/contentStore";
export type { News, NewsTag, Category } from "@/store/zustand/newsStore";
export type { Reference, OverseaProject } from "@/store/zustand/referenceStore";
export type { ExecutiveType } from "@/store/zustand/executiveStore";
export type { Contact, Company } from "@/store/zustand/contactStore";
export type { HeroSectionId } from "@/lib/hero-utils";

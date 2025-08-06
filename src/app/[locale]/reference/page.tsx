"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import ReferenceCard from "@/components/share/ReferenceCard";
import {
  useReferenceStore,
  Reference,
  OverseaProject,
} from "@/store/zustand/referenceStore";
import {
  getBilingualName,
  getBilingualContent,
  getLoadingText,
} from "@/utils/bilingual";

// Component interfaces for sections
interface ProjectSectionProps {
  references: Reference[];
  locale: string;
  loading?: boolean;
}

interface PermatankSectionProps {
  references: Reference[];
  locale: string;
  loading?: boolean;
}

interface OverseasSectionProps {
  references: OverseaProject[];
  locale: string;
  loading?: boolean;
}

// ProjectSection Component for Service Station references
const ProjectSection: React.FC<ProjectSectionProps> = ({
  references,
  locale,
  loading = false,
}) => {
  if (loading) {
    return (
      <section id="projects-section" className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {getLoadingText(locale, "content")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects-section" className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {locale === "th" ? "ผลงาน" : "PROJECTS"}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {locale === "th"
              ? "โครงการที่เราภาคภูมิใจ"
              : "Projects We're Proud Of"}
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {references.map((project) => (
            <ReferenceCard
              key={project.id}
              reference={project}
              handleReferenceClick={() => {
                window.location.href = `/${locale}/reference/${project.id}`;
              }}
              locale={locale}
            />
          ))}
        </div>

        {references.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">
              {locale === "th"
                ? "ไม่มีโครงการในขณะนี้"
                : "No projects available at the moment"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// PermatankSection Component for PERMATANK references
const PermatankSection: React.FC<PermatankSectionProps> = ({
  references,
  locale,
  loading = false,
}) => {
  if (loading) {
    return (
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {getLoadingText(locale, "content")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-minimal bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {locale === "th" ? "ผลิตภัณฑ์" : "PRODUCTS"}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            PERMATANK® Series
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {references.map((card) => (
            <ReferenceCard
              key={card.id}
              reference={card}
              handleReferenceClick={() => {
                // For Permatank products, we might want different behavior
                console.log("Permatank product clicked:", card.id);
              }}
              locale={locale}
            />
          ))}
        </div>

        {references.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">
              {locale === "th"
                ? "ไม่มีผลิตภัณฑ์ในขณะนี้"
                : "No products available at the moment"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// OverseasSection Component for overseas projects
const OverseasSection: React.FC<OverseasSectionProps> = ({
  references,
  locale,
  loading = false,
}) => {
  const [showAllOverseas, setShowAllOverseas] = useState(false);

  if (loading) {
    return (
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {getLoadingText(locale, "content")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayedProjects = showAllOverseas
    ? references
    : references.slice(0, 20);

  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {locale === "th" ? "โครงการต่างประเทศ" : "OVERSEAS PROJECTS"}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {locale === "th" ? "PERMATANK® Overseas" : "PERMATANK® Overseas"}
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--primary-blue)]">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  {locale === "th" ? "แบรนด์" : "Brand"}
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  {locale === "th" ? "ประเภท" : "Type"}
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  {locale === "th" ? "ชื่อโครงการ" : "Project Name"}
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  {locale === "th" ? "ประเทศ" : "Country"}
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {project.brand}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {getBilingualContent(project, "type", locale)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {getBilingualContent(project, "project_name", locale)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {getBilingualContent(project, "country", locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {references.length > 20 && (
          <div className="text-center mt-12">
            <div className="luxury-hero-btn-container max-w-xs mx-auto">
              <button
                className="luxury-hero-btn luxury-hero-btn-secondary group"
                onClick={() => setShowAllOverseas(!showAllOverseas)}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    {showAllOverseas
                      ? locale === "th"
                        ? "แสดงน้อยลง"
                        : "Show Less"
                      : locale === "th"
                      ? "ดูเพิ่มเติม"
                      : "View More"}
                  </span>
                  <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                </span>
                <div className="luxury-btn-border"></div>
                <div className="luxury-btn-glow-secondary"></div>
              </button>
            </div>
          </div>
        )}

        {references.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">
              {locale === "th"
                ? "ไม่มีโครงการต่างประเทศในขณะนี้"
                : "No overseas projects available at the moment"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default function ReferencePage() {
  const locale = useLocale();
  const {
    references,
    overseaProjects,
    loading,
    error,
    fetchReference,
    fetchOverseaProjects,
  } = useReferenceStore();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsInitialLoading(true);
      try {
        await Promise.all([fetchReference(), fetchOverseaProjects()]);
      } catch (error) {
        console.error("Error fetching reference data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllData();
  }, [fetchReference, fetchOverseaProjects]);

  // Filter and sort functions
  const getServiceStationReferences = (): Reference[] => {
    if (!references) return [];
    return references
      .filter((ref) => ref.type_en === "Service Station")
      .sort(
        (a, b) => new Date(b.open_at).getTime() - new Date(a.open_at).getTime()
      );
  };

  const getPermatankReferences = (): Reference[] => {
    if (!references) return [];
    return references
      .filter((ref) => ref.type_en === "PERMATANK")
      .sort(
        (a, b) => new Date(b.open_at).getTime() - new Date(a.open_at).getTime()
      );
  };

  const getSortedOverseaProjects = (): OverseaProject[] => {
    if (!overseaProjects) return [];
    return [...overseaProjects]; // No opened_at field, so no sorting
  };

  // Get filtered data
  const serviceStationProjects = getServiceStationReferences();
  const permatankProjects = getPermatankReferences();
  const sortedOverseaProjects = getSortedOverseaProjects();

  return (
    <MainLayout>
      {/* Hero Section */}
      <DynamicHeroSection
        pageId="REFERENCE"
        title={locale === "th" ? "ผลงานของเรา" : "Our Portfolio"}
        subtitle={
          locale === "th"
            ? "ความภาคภูมิใจในทุกโครงการ"
            : "Pride in Every Project"
        }
        description={
          locale === "th"
            ? "ผลงานการก่อสร้างและติดตั้งระบบน้ำมันที่ได้รับความไว้วางใจจากลูกค้าชั้นนำ"
            : "Construction and fuel system installation projects trusted by leading clients"
        }
        fallbackImages={["/images/hero-sections/hero-banner-2.jpg"]}
        autoSlideDelay={6000}
      />

      {/* Service Station Projects Section */}
      <ProjectSection
        references={serviceStationProjects}
        locale={locale}
        loading={loading}
      />

      {/* PERMATANK Products Section */}
      <PermatankSection
        references={permatankProjects}
        locale={locale}
        loading={loading}
      />

      {/* Overseas Projects Section */}
      <OverseasSection
        references={sortedOverseaProjects}
        locale={locale}
        loading={loading}
      />
    </MainLayout>
  );
}

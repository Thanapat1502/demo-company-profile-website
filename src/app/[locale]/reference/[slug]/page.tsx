"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Eye,
  MapPin,
  Calendar,
  Building2,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import { useReferenceStore } from "@/store/zustand/referenceStore";
import {
  getBilingualName,
  getBilingualContent,
  getLoadingText,
} from "@/utils/bilingual";
import ImageModal from "@/components/ui/ImageModal";
import StatsSection from "@/components/sections/home/StatsSection";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const locale = useLocale();
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    locale: string;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const {
    currentReference,
    detailLoading,
    error: storeError,
    fetchReferenceDetail,
  } = useReferenceStore();

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    const loadProject = async () => {
      if (!resolvedParams?.slug) return;

      try {
        // Fetch reference detail by ID
        await fetchReferenceDetail(resolvedParams.slug);
      } catch (error) {
        console.error("Error loading project:", error);
      }
    };

    loadProject();
  }, [resolvedParams, fetchReferenceDetail]);

  // Loading state
  if (detailLoading || !resolvedParams) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">
              {getLoadingText(locale, "content")}
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Project not found or error
  if (!currentReference || storeError) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === "th" ? "ไม่พบโครงการที่ต้องการ" : "Project Not Found"}
            </h1>
            <p className="text-gray-600 mb-8">
              {storeError ||
                (locale === "th"
                  ? "โครงการที่คุณกำลังมองหาอาจถูกลบหรือไม่มีอยู่ในระบบ"
                  : "The project you're looking for may have been removed or doesn't exist.")}
            </p>
            <button
              onClick={() => router.push(`/${locale}/reference`)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <ArrowLeft className="w-4 h-4" />
              {locale === "th" ? "กลับไปหน้าผลงาน" : "Back to Portfolio"}
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Get project data with proper bilingual support
  const projectName = getBilingualName(currentReference, locale);
  const projectType = getBilingualContent(currentReference, "type", locale);
  const projectImages = currentReference.galleries || [];

  // Fix date conversion with error handling
  const openDate = (() => {
    try {
      const date = new Date(currentReference.open_at);
      if (isNaN(date.getTime())) {
        return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
      }
      return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
    }
  })();

  return (
    <MainLayout>
      <div>
        {/* Hero Section with Thumbnail Background */}
        <section className="relative bg-slate-50">
          {/* Background Image */}
          <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
            {currentReference.thumbnail ? (
              <Image
                src={currentReference.thumbnail}
                alt={projectName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
            {/* Enhanced Gradient Overlay for Better Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10" />
          </div>

          {/* Content Overlay - Positioned Absolutely */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between">
            {/* Top Section - Back Button */}
            <div className="pt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                  onClick={() => router.push(`/${locale}/reference`)}
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black/30">
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    {locale === "th" ? "กลับไปหน้าผลงาน" : "Back to Portfolio"}
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Section - Main Content */}
            <div className="pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="">
                  {/* Project Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {projectName}
                  </h1>

                  {/* Project Type Badge */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30">
                      <Layers className="w-4 h-4" />
                      <span>{projectType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Information Section */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[var(--primary-blue)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {locale === "th" ? "สถานที่" : "Location"}
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {locale === "th"
                      ? currentReference.location_th
                      : currentReference.location_en}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[var(--primary-blue)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {locale === "th" ? "วันที่เปิด" : "Opening Date"}
                  </p>
                  <p className="text-gray-900 font-semibold">{openDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[var(--primary-blue)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {locale === "th" ? "ประเภทโครงการ" : "Project Type"}
                  </p>
                  <p className="text-gray-900 font-semibold">{projectType}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Gallery - Reduced gaps */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {projectImages.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectImages.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="group cursor-pointer relative overflow-hidden bg-gray-100 aspect-square hover:shadow-lg transition-all duration-300 rounded-lg"
                    onClick={() => setSelectedImage(index)}>
                    <Image
                      src={image}
                      alt={`${projectName} - ${
                        locale === "th" ? "รูปที่" : "Image"
                      } ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    {/* View Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Eye className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {locale === "th"
                    ? "ไม่มีรูปภาพสำหรับโครงการนี้"
                    : "No images available for this project"}
                </p>
              </div>
            )}
          </div>
        </section>
        <StatsSection />

        {/* Image Modal */}
        <ImageModal
          images={projectImages}
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          initialIndex={selectedImage || 0}
          alt={projectName}
        />
      </div>
    </MainLayout>
  );
}

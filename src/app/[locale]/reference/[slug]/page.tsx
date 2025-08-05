"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
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
        {/* Simple Header - Reduced gaps */}
        <section className="bg-white pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={() => router.push(`/${locale}/reference`)}
                  className="inline-flex items-center gap-2 text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    {locale === "th" ? "กลับไปหน้าผลงาน" : "Back to Portfolio"}
                  </span>
                </button>
              </div>

              {/* Project Title */}
              <h1 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-1 tracking-[0.02em] !leading-normal drop-shadow-sm">
                {projectName}
              </h1>

              {/* Enhanced Elegant Line */}
              <div className="relative flex items-center justify-center mb-2">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              {/* Project Info */}
              <div className="flex flex-wrap justify-center gap-6 text-gray-600 mt-0">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--primary-blue)]" />
                  <span>
                    {locale === "th"
                      ? currentReference.location_th
                      : currentReference.location_en}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--primary-blue)]" />
                  <span>{openDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--primary-blue)]" />
                  <span>{projectType}</span>
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

        {/* Simple Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const newIndex =
                        selectedImage > 0
                          ? selectedImage - 1
                          : projectImages.length - 1;
                      setSelectedImage(newIndex);
                    }}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                    <ArrowLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      const newIndex =
                        selectedImage < projectImages.length - 1
                          ? selectedImage + 1
                          : 0;
                      setSelectedImage(newIndex);
                    }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Full-Screen Image */}
              <div className="relative max-w-[95vw] max-h-[95vh]">
                <Image
                  src={projectImages[selectedImage]}
                  alt={`${projectName} - ${
                    locale === "th" ? "รูปที่" : "Image"
                  } ${selectedImage + 1}`}
                  width={1600}
                  height={1200}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-center text-white">
                    <p className="text-sm opacity-75 mb-1">{projectName}</p>
                    <p className="text-xs opacity-60">
                      {selectedImage + 1} / {projectImages.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";

interface ProjectImage {
  id: number;
  url: string;
  caption: string;
}

interface ProjectData {
  slug: string;
  title: string;
  thumnail: string;
  category: string;
  client: string;
  location: string;
  completionDate: string;
  projectValue: string;
  description: string;
  features: string[];
  images: ProjectImage[];
  specifications: {
    area: string;
    duration: string;
    contractor: string;
    engineer: string;
  };
}

// Simplified project data - only title, images, and opened date
const getProjectData = (
  slug: string
): { title: string; openedDate: string; images: ProjectImage[] } | null => {
  const projects = [
    {
      slug: "ptt-station-bangkok",
      title: "สถานีบริการน้ำมัน PTT สาขาใหม่",
      openedDate: "ธันวาคม 2566",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "ภาพรวมสถานีบริการน้ำมันที่เสร็จสมบูรณ์",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "การติดตั้งถังน้ำมันใต้ดิน PERMATANK",
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "ระบบวัดน้ำมันอัตโนมัติ",
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "หัวจ่ายน้ำมันที่ทันสมัย",
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "พื้นที่ก่อนการก่อสร้าง",
        },
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "ระบบดับเพลิงอัตโนมัติ",
        },
      ],
    },
    {
      slug: "shell-v-power-pattaya",
      title: "สถานีบริการน้ำมัน Shell V-Power",
      openedDate: "สิงหาคม 2566",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "ภาพรวมสถานีบริการ",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          caption: "ระบบถังน้ำมัน",
        },
      ],
    },
    // Add more projects as needed
  ];

  return projects.find((p) => p.slug === slug) || null;
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const locale = useLocale();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    locale: string;
  } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลด...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const project = getProjectData(resolvedParams.slug);

  if (!project) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-4">
              ไม่พบโครงการที่ต้องการ
            </h1>
            <button
              onClick={() => router.push(`/${locale}/reference`)}
              className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200">
              กลับไปหน้าผลงาน
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = project.images.findIndex(
      (img) => img.id === selectedImage
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : project.images.length - 1;
    } else {
      newIndex =
        currentIndex < project.images.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(project.images[newIndex].id);
  };

  const selectedImageData = selectedImage
    ? project.images.find((img) => img.id === selectedImage)
    : null;

  return (
    <MainLayout>
      {/* Simplified Header */}
      <section className="section-minimal bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => router.push(`/${locale}/reference`)}
                className="inline-flex items-center gap-2 text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>กลับไปหน้าผลงาน</span>
              </button>
            </div>

            {/* Project Title */}
            <h1 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {project.title}
            </h1>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Officially Opened Date */}
            <div className="inline-flex items-center gap-3 mb-12">
              <span className="text-gray-600">
                เปิดให้บริการอย่างเป็นทางการ:
              </span>
              <span className="font-semibold text-[var(--primary-blue)]">
                {project.openedDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Gallery */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.images.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer relative overflow-hidden bg-gray-100 aspect-square hover:shadow-lg transition-all duration-300"
                onClick={() => openLightbox(image.id)}>
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                {/* View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <Eye className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
              <ArrowLeft className="w-10 h-10" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
              <ArrowRight className="w-10 h-10" />
            </button>

            {/* Full-Screen Image */}
            <div className="relative max-w-[95vw] max-h-[95vh]">
              <Image
                src={selectedImageData.url}
                alt={selectedImageData.caption}
                width={1600}
                height={1200}
                className="max-w-full max-h-full object-contain"
              />

              {/* Minimal Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <p className="text-white text-xl font-light leading-relaxed text-center">
                  {selectedImageData.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

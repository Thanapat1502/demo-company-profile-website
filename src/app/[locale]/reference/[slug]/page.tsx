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

// Mock project data
const getProjectData = (slug: string): ProjectData | null => {
  const projects: ProjectData[] = [
    {
      slug: "ptt-station-bangkok",
      title: "สถานีบริการน้ำมัน PTT กรุงเทพฯ",
      category: "สถานีบริการน้ำมัน",
      client: "บริษัท ปตท. จำกัด (มหาชน)",
      location: "กรุงเทพมหานคร",
      completionDate: "2023",
      projectValue: "25000000",
      thumnail:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน PTT แห่งใหม่ พร้อมระบบความปลอดภัยที่ทันสมัย และการออกแบบที่เป็นมิตรกับสิ่งแวดล้อม รวมถึงการติดตั้งระบบ PERMATANK และอุปกรณ์ที่เกี่ยวข้องครบครัน",
      features: [
        "ระบบถังน้ำมันใต้ดิน PERMATANK ขนาด 50,000 ลิตร",
        "ระบบท่อน้ำมันผนัง 2 ชั้น",
        "ระบบวัดน้ำมันอัตโนมัติ (ATG)",
        "ระบบป้องกันการรั่วไหล",
        "หลังคาโซลาร์เซลล์",
        "ระบบดับเพลิงอัตโนมัติ",
      ],
      specifications: {
        area: "2,500 ตารางเมตร",
        duration: "8 เดือน",
        contractor: "บริษัท ผดุงศิลป์โยธาการ จำกัด",
        engineer: "บริษัท ผดุงศิลป์วิศวการ จำกัด",
      },
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
      {/* Full-Screen Gallery Hero */}
      <section className="pt-20">
        <div className="h-screen relative">
          {/* Main Hero Image */}
          <div className="h-full relative overflow-hidden">
            <Image
              src={project.images[0]?.url || project.thumnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent"></div>

            {/* Project Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-end">
                  {/* Left: Project Details */}
                  <div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                      {project.title}
                    </h1>
                    <p className="text-lg font-light opacity-90 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Right: Quick Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs opacity-70 mb-1">ลูกค้า</div>
                      <div className="text-sm font-medium">
                        {project.client}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70 mb-1">สถานที่</div>
                      <div className="text-sm font-medium">
                        {project.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70 mb-1">
                        ปีที่เสร็จสิ้น
                      </div>
                      <div className="text-sm font-medium">
                        {project.completionDate}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70 mb-1">
                        มูลค่าโครงการ
                      </div>
                      <div className="text-sm font-medium">
                        ฿{parseInt(project.projectValue).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Gallery Grid - Main Content */}
      <section className="bg-gradient-to-t from-blue-950 via-blue-900 to-blue-800">
        <div className="max-w-full">
          {/* Full-Width Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {project.images.slice(1).map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer relative overflow-hidden bg-gray-900 aspect-square"
                onClick={() => openLightbox(image.id)}>
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                />

                {/* Minimal Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Image Number */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-white text-sm font-light bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {index + 2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned CTA Section */}
      <section className="relative bg-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">
                ติดต่อเรา
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-white mb-8 leading-tight">
              พร้อมให้คำปรึกษา
              <br />
              <span className="text-blue-400">โครงการของคุณ</span>
            </h2>

            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              บริษัท ผดุงศิลป์โยธาการ จำกัด ผู้เชี่ยวชาญด้านการออกแบบและก่อสร้าง
              <br />
              สถานีบริการน้ำมันแบบครบวงจร มากกว่า 30 ปี
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Phone Card */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/30 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">
                  โทรศัพท์
                </h3>

                <div className="space-y-3">
                  <a
                    href="tel:025734222"
                    className="block text-lg text-gray-300 hover:text-blue-400 transition-colors duration-200 font-light">
                    02-573-4222
                  </a>
                  <a
                    href="tel:025733533"
                    className="block text-lg text-gray-300 hover:text-blue-400 transition-colors duration-200 font-light">
                    02-573-3533
                  </a>
                </div>
              </div>
            </div>

            {/* Fax Card */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/30 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v7.5M7 4V3a1 1 0 00-1 1v7.5m0 0L12 16l5-4.5M7 11.5V21a1 1 0 001 1h8a1 1 0 001-1v-9.5"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">แฟกซ์</h3>

                <div className="text-lg text-gray-300 font-light">
                  02-573-7726
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push(`/${locale}/contact-us`)}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105">
              <span>ส่งข้อความถึงเรา</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
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
              className="absolute top-8 right-8 z-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-centetext-gray-800-white hover:bg-white/20 transition-all duration-300">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-centetext-gray-800-white hover:bg-white/20 transition-all duration-300">
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

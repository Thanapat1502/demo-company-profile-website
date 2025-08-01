"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";

export default function ReferencePage() {
  const locale = useLocale();
  const [showAllOverseas, setShowAllOverseas] = useState(false);

  // Simplified reference projects - only image and name
  const referenceProjects = [
    {
      slug: "ptt-station-bangkok",
      title: "สถานีบริการน้ำมัน PTT สาขาใหม่",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "ธันวาคม 2566",
    },
    {
      slug: "shell-v-power-pattaya",
      title: "สถานีบริการน้ำมัน Shell V-Power",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "สิงหาคม 2566",
    },
    {
      slug: "bangchak-renovation-chiangmai",
      title: "ปรับปรุงสถานีบริการ Bangchak",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "มิถุนายน 2566",
    },
    {
      slug: "esso-express-nakhon-ratchasima",
      title: "สถานีบริการ Esso Express",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "เมษายน 2566",
    },
    {
      slug: "caltex-starmart-hatyai",
      title: "สถานีบริการ Caltex StarMart",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "กุมภาพันธ์ 2566",
    },
    {
      slug: "susco-udonthani",
      title: "สถานีบริการ Susco",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "มกราคม 2566",
    },
    {
      slug: "irpc-station-chonburi",
      title: "สถานีบริการ IRPC",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "พฤศจิกายน 2565",
    },
    {
      slug: "bcp-station-samutprakarn",
      title: "สถานีบริการ BCP",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "ตุลาคม 2565",
    },
    {
      slug: "or-station-rayong",
      title: "สถานีบริการ OR",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      openedDate: "กันยายน 2565",
    },
  ];

  // PERMATANK cards data (non-clickable)
  const permatankCards = [
    {
      title: "PERMATANK® Standard",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "ถังน้ำมันใต้ดินผนัง 2 ชั้น มาตรฐาน UL 58",
    },
    {
      title: "PERMATANK® Plus",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "ถังน้ำมันใต้ดินพร้อมระบบตรวจจับการรั่วไหล",
    },
    {
      title: "PERMATANK® Pro",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "ถังน้ำมันใต้ดินพร้อมเทคโนโลยี IoT",
    },
    {
      title: "PERMATANK® Industrial",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "ถังน้ำมันสำหรับอุตสาหกรรมขนาดใหญ่",
    },
  ];

  // PERMATANK Overseas projects data
  const overseasProjects = [
    {
      brand: "Shell",
      type: "PERMATANK® Standard",
      projectName: "Shell Station Bangkok",
      country: "Thailand",
    },
    {
      brand: "Chevron",
      type: "PERMATANK® Plus",
      projectName: "Chevron Express Hanoi",
      country: "Vietnam",
    },
    {
      brand: "Total",
      type: "PERMATANK® Pro",
      projectName: "Total Station Phnom Penh",
      country: "Cambodia",
    },
    {
      brand: "BP",
      type: "PERMATANK® Standard",
      projectName: "BP Connect Yangon",
      country: "Myanmar",
    },
    {
      brand: "Esso",
      type: "PERMATANK® Plus",
      projectName: "Esso Station Vientiane",
      country: "Laos",
    },
    {
      brand: "Caltex",
      type: "PERMATANK® Pro",
      projectName: "Caltex StarMart Manila",
      country: "Philippines",
    },
    {
      brand: "Petron",
      type: "PERMATANK® Standard",
      projectName: "Petron Station Kuala Lumpur",
      country: "Malaysia",
    },
    {
      brand: "Shell",
      type: "PERMATANK® Plus",
      projectName: "Shell V-Power Singapore",
      country: "Singapore",
    },
    {
      brand: "Mobil",
      type: "PERMATANK® Pro",
      projectName: "Mobil 1 Station Jakarta",
      country: "Indonesia",
    },
    {
      brand: "PTT",
      type: "PERMATANK® Industrial",
      projectName: "PTT Station Brunei",
      country: "Brunei",
    },
    {
      brand: "Chevron",
      type: "PERMATANK® Standard",
      projectName: "Chevron Station Ho Chi Minh",
      country: "Vietnam",
    },
    {
      brand: "Total",
      type: "PERMATANK® Plus",
      projectName: "Total Access Siem Reap",
      country: "Cambodia",
    },
    {
      brand: "BP",
      type: "PERMATANK® Pro",
      projectName: "BP Station Mandalay",
      country: "Myanmar",
    },
    {
      brand: "Esso",
      type: "PERMATANK® Standard",
      projectName: "Esso Express Luang Prabang",
      country: "Laos",
    },
    {
      brand: "Caltex",
      type: "PERMATANK® Plus",
      projectName: "Caltex Station Cebu",
      country: "Philippines",
    },
    {
      brand: "Petron",
      type: "PERMATANK® Pro",
      projectName: "Petron Blaze Penang",
      country: "Malaysia",
    },
    {
      brand: "Shell",
      type: "PERMATANK® Industrial",
      projectName: "Shell Helix Singapore Central",
      country: "Singapore",
    },
    {
      brand: "Mobil",
      type: "PERMATANK® Standard",
      projectName: "Mobil Station Surabaya",
      country: "Indonesia",
    },
    {
      brand: "PTT",
      type: "PERMATANK® Plus",
      projectName: "PTT Global Bandar Seri Begawan",
      country: "Brunei",
    },
    {
      brand: "Chevron",
      type: "PERMATANK® Pro",
      projectName: "Chevron Techron Da Nang",
      country: "Vietnam",
    },
    {
      brand: "Total",
      type: "PERMATANK® Standard",
      projectName: "Total Station Battambang",
      country: "Cambodia",
    },
    {
      brand: "BP",
      type: "PERMATANK® Plus",
      projectName: "BP Ultimate Naypyidaw",
      country: "Myanmar",
    },
    {
      brand: "Esso",
      type: "PERMATANK® Pro",
      projectName: "Esso Synergy Pakse",
      country: "Laos",
    },
    {
      brand: "Caltex",
      type: "PERMATANK® Industrial",
      projectName: "Caltex Techron Davao",
      country: "Philippines",
    },
    {
      brand: "Petron",
      type: "PERMATANK® Standard",
      projectName: "Petron Station Johor Bahru",
      country: "Malaysia",
    },
    {
      brand: "Shell",
      type: "PERMATANK® Plus",
      projectName: "Shell FuelSave Jurong",
      country: "Singapore",
    },
    {
      brand: "Mobil",
      type: "PERMATANK® Pro",
      projectName: "Mobil Super Bandung",
      country: "Indonesia",
    },
    {
      brand: "PTT",
      type: "PERMATANK® Standard",
      projectName: "PTT Station Seria",
      country: "Brunei",
    },
    {
      brand: "Chevron",
      type: "PERMATANK® Plus",
      projectName: "Chevron Station Can Tho",
      country: "Vietnam",
    },
    {
      brand: "Total",
      type: "PERMATANK® Pro",
      projectName: "Total Excellium Kampong Cham",
      country: "Cambodia",
    },
  ];

  const displayedOverseasProjects = showAllOverseas
    ? overseasProjects
    : overseasProjects.slice(0, 20);

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-1.jpg"]}
        title="ผลงานและโครงการ"
        subtitle="ความภาคภูมิใจในทุกโครงการที่เราได้สร้างสรรค์"
        autoSlideDelay={6000}>
        {/* Luxury Hero Buttons */}
        <div className="luxury-hero-btn-container">
          <button
            className="luxury-hero-btn luxury-hero-btn-primary group"
            onClick={() =>
              document
                .getElementById("projects-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">
                ดูผลงานทั้งหมด
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <div className="luxury-btn-shimmer"></div>
            <div className="luxury-btn-glow"></div>
          </button>

          <button
            className="luxury-hero-btn luxury-hero-btn-secondary group"
            onClick={() => (window.location.href = `/${locale}/contact-us`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">ติดต่อเรา</span>
              <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
            </span>
            <div className="luxury-btn-border"></div>
            <div className="luxury-btn-glow-secondary"></div>
          </button>
        </div>
      </ImageCarouselHero>

      {/* Reference Projects - Simplified Cards */}
      <section id="projects-section" className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                ผลงาน
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              โครงการที่เราภาคภูมิใจ
            </h2>

            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {referenceProjects.map((project, index) => (
              <Link
                key={index}
                href={`/${locale}/reference/${project.slug}`}
                className="group cursor-pointer block">
                <div className="card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 mb-4 overflow-hidden bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--primary-blue)] transition-colors tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PERMATANK Cards Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                ผลิตภัณฑ์
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {permatankCards.map((card, index) => (
              <div
                key={index}
                className="card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERMATANK Overseas Table */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                โครงการต่างประเทศ
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              PERMATANK® Overseas
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
                    Brand
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Project Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedOverseasProjects.map((project, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {project.brand}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{project.type}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {project.projectName}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {project.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {overseasProjects.length > 20 && (
            <div className="text-center mt-12">
              <div className="luxury-hero-btn-container max-w-xs mx-auto">
                <button
                  className="luxury-hero-btn luxury-hero-btn-secondary group"
                  onClick={() => setShowAllOverseas(!showAllOverseas)}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      {showAllOverseas ? "แสดงน้อยลง" : "ดูเพิ่มเติม"}
                    </span>
                    <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                  </span>
                  <div className="luxury-btn-border"></div>
                  <div className="luxury-btn-glow-secondary"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

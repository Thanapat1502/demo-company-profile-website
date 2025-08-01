"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  name: string;
  description: string;
  image: string;
}

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Section Label - Matching ServicesSection style */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              ผลิตภัณฑ์
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          {/* Main Heading - Strong & Minimal Style */}
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            ผลิตภัณฑ์ของเรา
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Image container - Minimal design without rounded corners */}
              <div className="relative h-64 mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary-blue)] transition-colors tracking-tight">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-12">
            <div className="luxury-hero-btn-container max-w-xs mx-auto">
              <button
                className="luxury-hero-btn luxury-hero-btn-secondary group"
                onClick={() => setShowAllProducts(!showAllProducts)}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    {showAllProducts ? "แสดงน้อยลง" : "ดูผลิตภัณฑ์ทั้งหมด"}
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
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import MinimalButton from "@/components/ui/MinimalButton";

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ผลิตภัณฑ์ของเรา
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Simple image container */}
              <div className="relative h-64 mb-6 overflow-hidden bg-gray-100 rounded-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
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
            <MinimalButton
              onClick={() => setShowAllProducts(!showAllProducts)}
              variant="secondary">
              {showAllProducts ? "แสดงน้อยลง" : "ดูผลิตภัณฑ์ทั้งหมด"}
            </MinimalButton>
          </div>
        )}
      </div>
    </section>
  );
}

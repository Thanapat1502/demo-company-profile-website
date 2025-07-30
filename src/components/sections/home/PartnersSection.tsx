"use client";

import { Star } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      id: 1,
      name: "PTT",
      description: "บริษัท ปตท. จำกัด (มหาชน)",
    },
    {
      id: 2,
      name: "Shell",
      description: "Shell Thailand",
    },
    {
      id: 3,
      name: "Chevron",
      description: "Chevron Thailand",
    },
    {
      id: 4,
      name: "Esso",
      description: "Esso Thailand",
    },
    {
      id: 5,
      name: "Bangchak",
      description: "บริษัท บางจาก คอร์ปอเรชั่น จำกัด (มหาชน)",
    },
    {
      id: 6,
      name: "IRPC",
      description: "บริษัท ไออาร์พีซี จำกัด (มหาชน)",
    },
    {
      id: 7,
      name: "OR",
      description: "บริษัท ปตท. น้ำมันและการค้าปลีก จำกัด (มหาชน)",
    },
    {
      id: 8,
      name: "Susco",
      description: "บริษัท ซัสโก้ จำกัด (มหาชน)",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-base font-medium mb-4">
            พันธมิตรของเรา
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ความไว้วางใจจาก
            <span className="text-blue-600 block">ผู้นำด้านพลังงาน</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            เราภูมิใจที่ได้รับความไว้วางใจจากบริษัทน้ำมันชั้นนำของประเทศ
            ในการให้บริการก่อสร้างและติดตั้งระบบสถานีบริการน้ำมัน
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-gray-50 p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 relative flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                    <span className="text-2xl font-bold text-gray-700">
                      {partner.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-2">
              ความไว้วางใจจากพันธมิตรชั้นนำ
            </p>
            <p className="text-gray-600">
              และพันธมิตรอื่น ๆ อีกมากมาย ที่ไว้วางใจในคุณภาพงานของเรา
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

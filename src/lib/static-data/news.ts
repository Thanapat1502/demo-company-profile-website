import { News, NewsTag, Category } from "@/store/zustand/newsStore";

export const staticNewsCategories: Category[] = [
  {
    id: "cat-1",
    cat_th: "ข่าวบริษัท",
    cat_en: "Company News",
    description_th: "ข่าวสารและกิจกรรมของบริษัท",
    description_en: "Company news and activities",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-2",
    cat_th: "ข่าวอุตสาหกรรม",
    cat_en: "Industry News",
    description_th: "ข่าวสารในอุตสาหกรรมน้ำมันและพลังงาน",
    description_en: "Oil and energy industry news",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "cat-3",
    cat_th: "กิจกรรม",
    cat_en: "Events",
    description_th: "กิจกรรมและงานแสดงต่างๆ",
    description_en: "Activities and exhibitions",
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  },
];

export const staticNewsTags: NewsTag[] = [
  { id: 1, tag_th: "PERMATANK®", tag_en: "PERMATANK®" },
  { id: 2, tag_th: "สถานีบริการน้ำมัน", tag_en: "Gas Station" },
  { id: 3, tag_th: "ความปลอดภัย", tag_en: "Safety" },
  { id: 4, tag_th: "เทคโนโลยี", tag_en: "Technology" },
  { id: 5, tag_th: "สิ่งแวดล้อม", tag_en: "Environment" },
  { id: 6, tag_th: "นวัตกรรม", tag_en: "Innovation" },
  { id: 7, tag_th: "การก่อสร้าง", tag_en: "Construction" },
  { id: 8, tag_th: "บำรุงรักษา", tag_en: "Maintenance" },
];

export const staticNews: News[] = [
  {
    id: "news-1",
    thumbnail:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center",
    title_th: "เปิดตัวถัง PERMATANK® รุ่นใหม่ล่าสุด",
    title_en: "Introducing the Latest PERMATANK® Model",
    slug_th: "permatank-new-model-launch",
    slug_en: "permatank-new-model-launch",
    excerpt_th:
      "กลุ่มบริษัทผดุงศิลป์เปิดตัวถัง PERMATANK® รุ่นใหม่ที่มีเทคโนโลยีล้ำสมัย เพิ่มความปลอดภัยและประสิทธิภาพ",
    excerpt_en:
      "Padungsilpa Group launches the new PERMATANK® model with advanced technology for enhanced safety and efficiency",
    tag_id: [1, 4, 6],
    body_th: {
      ops: [
        {
          insert:
            "กลุ่มบริษัทผดุงศิลป์ภูมิใจเสนอถัง PERMATANK® รุ่นใหม่ล่าสุด ที่ได้รับการพัฒนาด้วยเทคโนโลยีล้ำสมัย เพื่อตอบสนองความต้องการของอุตสาหกรรมน้ำมันและพลังงานในยุคใหม่\n\n",
        },
        {
          insert:
            "คุณสมบัติเด่น:\n• ระบบป้องกันการรั่วไหลที่ดีขึ้น\n• วัสดุที่ทนทานต่อการกัดกร่อน\n• ระบบตรวจสอบอัตโนมัติ\n• ประสิทธิภาพการใช้งานที่สูงขึ้น\n\n",
        },
        {
          insert:
            "ผลิตภัณฑ์นี้ได้รับการรับรองมาตรฐานสากล และพร้อมให้บริการลูกค้าทั่วประเทศ",
        },
      ],
    },
    body_en: {
      ops: [
        {
          insert:
            "Padungsilpa Group proudly presents the latest PERMATANK® model, developed with cutting-edge technology to meet the demands of the modern oil and energy industry.\n\n",
        },
        {
          insert:
            "Key Features:\n• Enhanced leak prevention system\n• Corrosion-resistant materials\n• Automatic monitoring system\n• Improved operational efficiency\n\n",
        },
        {
          insert:
            "This product is internationally certified and ready to serve customers nationwide.",
        },
      ],
    },
    cat_id: "cat-1",
    is_highlighted: true,
    status: "published",
    created_at: "2024-01-15T00:00:00.000Z",
    updated_at: "2024-01-15T00:00:00.000Z",
    publish_at: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "news-2",
    thumbnail:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&crop=center",
    title_th: "ความร่วมมือกับพันธมิตรใหม่ในอุตสาหกรรมพลังงาน",
    title_en: "New Partnership in Energy Industry",
    slug_th: "new-energy-partnership",
    slug_en: "new-energy-partnership",
    excerpt_th:
      "บริษัทได้เข้าร่วมมือกับพันธมิตรใหม่เพื่อขยายธุรกิจในภูมิภาคเอเชียตะวันออกเฉียงใต้",
    excerpt_en:
      "The company has partnered with new allies to expand business in Southeast Asia region",
    tag_id: [2, 6],
    cat_id: "cat-1",
    is_highlighted: false,
    status: "published",
    created_at: "2024-01-10T00:00:00.000Z",
    updated_at: "2024-01-10T00:00:00.000Z",
    publish_at: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "news-3",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
    title_th: "งานแสดงเทคโนโลยีพลังงาน 2024",
    title_en: "Energy Technology Exhibition 2024",
    slug_th: "energy-tech-exhibition-2024",
    slug_en: "energy-tech-exhibition-2024",
    excerpt_th: "ร่วมงานแสดงเทคโนโลยีพลังงานระดับนานาชาติ นำเสนอนวัตกรรมล่าสุด",
    excerpt_en:
      "Participating in international energy technology exhibition showcasing latest innovations",
    tag_id: [4, 6],
    cat_id: "cat-3",
    is_highlighted: false,
    status: "published",
    created_at: "2024-01-05T00:00:00.000Z",
    updated_at: "2024-01-05T00:00:00.000Z",
    publish_at: "2024-01-05T00:00:00.000Z",
  },
];

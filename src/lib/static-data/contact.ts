import { Contact, Company } from "@/store/zustand/contactStore";

export const staticContactInfo: Contact = {
  id: "contact-1",
  tel: "+66 2 123 4567",
  email: "info@padungsilpa.group",
  address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110",
  google_map_url: "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5!3d13.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQyJzAwLjAiTiAxMDDCsDMwJzAwLjAiRQ!5e0!3m2!1sth!2sth!4v1234567890",
  line: "@padungsilpa",
  facebook: "https://facebook.com/padungsilpa",
  youtube: "https://youtube.com/padungsilpa",
  tiktok: "@padungsilpa",
  business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.\nเสาร์: 08:00 - 12:00 น.\nอาทิตย์: ปิด",
  business_hour_en: "Monday - Friday: 08:00 - 17:00\nSaturday: 08:00 - 12:00\nSunday: Closed"
};

export const staticCompanies: Company[] = [
  {
    id: "company-1",
    name_th: "บริษัท ผดุงศิลป์ กรุ๊ป จำกัด",
    name_en: "Padungsilpa Group Co., Ltd.",
    address_th: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110",
    address_en: "123 Sukhumvit Road, Khlong Tan, Khlong Toei, Bangkok 10110",
    tel: "+66 2 123 4567",
    email: "info@padungsilpa.group",
    business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
    business_hour_en: "Monday - Friday: 08:00 - 17:00"
  },
  {
    id: "company-2",
    name_th: "บริษัท ผดุงศิลป์ เอ็นจิเนียริ่ง จำกัด",
    name_en: "Padungsilpa Engineering Co., Ltd.",
    address_th: "456 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240",
    address_en: "456 Ramkhamhaeng Road, Hua Mak, Bang Kapi, Bangkok 10240",
    tel: "+66 2 234 5678",
    email: "engineering@padungsilpa.group",
    business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
    business_hour_en: "Monday - Friday: 08:00 - 17:00"
  },
  {
    id: "company-3",
    name_th: "บริษัท ผดุงศิลป์ คอนสตรัคชั่น จำกัด",
    name_en: "Padungsilpa Construction Co., Ltd.",
    address_th: "789 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
    address_en: "789 Ladprao Road, Chom Phon, Chatuchak, Bangkok 10900",
    tel: "+66 2 345 6789",
    email: "construction@padungsilpa.group",
    business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
    business_hour_en: "Monday - Friday: 08:00 - 17:00"
  }
];

import { Contact, Company } from "@/store/zustand/contactStore";

export const staticContactInfo: Contact = {
  id: "contact-1",
  tel: "0850994775",
  email: "thanapat15020@gmail.com",
  address: "กรุงเทพมหานคร ประเทศไทย",
  google_map_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDMwJzA2LjUiRQ!5e0!3m2!1sen!2sth!4v1234567890",
  line: "@oildevelopment",
  facebook: "https://facebook.com/oildevelopment",
  youtube: "https://youtube.com/oildevelopment",
  tiktok: "@oildevelopment",
  business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
  business_hour_en: "Monday - Friday: 08:00 - 17:00",
};

export const staticCompanies: Company[] = [
  {
    id: "company-1",
    name_th: "บริษัท OIL DEVELOPMENT จำกัด",
    name_en: "OIL DEVELOPMENT Co., Ltd.",
    address_th: "กรุงเทพมหานคร ประเทศไทย",
    address_en: "Bangkok, Thailand",
    tel: "0850994775",
    email: "thanapat15020@gmail.com",
    business_hour_th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
    business_hour_en: "Monday - Friday: 08:00 - 17:00",
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
    business_hour_en: "Monday - Friday: 08:00 - 17:00",
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
    business_hour_en: "Monday - Friday: 08:00 - 17:00",
  },
];

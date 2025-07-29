import { useLocale } from "next-intl";

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "Service";
}

export default function StructuredData({ type = "Organization" }: StructuredDataProps) {
  const locale = useLocale();

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": locale === 'th' ? "กลุ่มบริษัท ผดุงศิลป์" : "Padungsilpa Group",
    "alternateName": "PDS Group",
    "url": "https://www.padungsilpa.group",
    "logo": "https://www.padungsilpa.group/images/pds-logo.png",
    "image": "https://www.padungsilpa.group/images/seo.jpg",
    "description": locale === 'th' 
      ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม"
      : "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering",
    "foundingDate": "2003",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11/1 Chaengwatta 14 Rd, Thungsonghong",
      "addressLocality": "Laksi",
      "addressRegion": "Bangkok",
      "postalCode": "10210",
      "addressCountry": "TH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-2-573-3533",
      "contactType": "customer service",
      "email": "sales@padungsilpa.com",
      "availableLanguage": ["Thai", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/padungsilpagroup",
      "https://www.linkedin.com/company/padungsilpagroup"
    ],
    "industry": "Construction and Engineering",
    "numberOfEmployees": "50-200",
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "serviceType": [
      "Gas Station Construction",
      "Petroleum Engineering",
      "Industrial Construction",
      "Engineering Consulting"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": locale === 'th' ? "กลุ่มบริษัท ผดุงศิลป์" : "Padungsilpa Group",
    "url": "https://www.padungsilpa.group",
    "description": locale === 'th' 
      ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี"
      : "Leading comprehensive gas station business services with over 50 years of experience",
    "inLanguage": [
      {
        "@type": "Language",
        "name": "Thai",
        "alternateName": "th"
      },
      {
        "@type": "Language", 
        "name": "English",
        "alternateName": "en"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Padungsilpa Group",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.padungsilpa.group/images/pds-logo.png"
      }
    }
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'th' ? "บริการก่อสร้างสถานีบริการน้ำมัน" : "Gas Station Construction Services",
    "description": locale === 'th' 
      ? "บริการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันครบวงจร ตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา"
      : "Comprehensive gas station construction and engineering services from design to maintenance",
    "provider": {
      "@type": "Organization",
      "name": "Padungsilpa Group",
      "url": "https://www.padungsilpa.group"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "serviceType": "Construction and Engineering",
    "category": "Gas Station Construction"
  };

  const getStructuredData = () => {
    switch (type) {
      case "WebSite":
        return websiteData;
      case "Service":
        return serviceData;
      default:
        return organizationData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}

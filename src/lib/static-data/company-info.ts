// Static company information for demo purposes
export const staticCompanyInfo = {
  // Brand Information
  brandName: {
    th: "OIL DEVELOPMENT",
    en: "OIL DEVELOPMENT"
  },
  
  // Contact Information
  contact: {
    phone: "0850994775",
    email: "thanapat15020@gmail.com",
    whatsapp: "0850994775",
    
    // Address
    address: {
      th: "กรุงเทพมหานคร ประเทศไทย",
      en: "Bangkok, Thailand"
    },
    
    // Google Maps (mock coordinates for Bangkok)
    googleMaps: {
      lat: 13.7563,
      lng: 100.5018,
      url: "https://maps.google.com/?q=13.7563,100.5018",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDMwJzA2LjUiRQ!5e0!3m2!1sen!2sth!4v1234567890"
    },
    
    // Business Hours
    businessHours: {
      th: "จันทร์ - ศุกร์: 08:00 - 17:00 น.",
      en: "Monday - Friday: 08:00 - 17:00"
    },
    
    // Social Media (optional)
    social: {
      facebook: "",
      linkedin: "",
      twitter: ""
    }
  },
  
  // Company Description
  description: {
    th: "ผู้นำด้านการพัฒนาและจำหน่ายอุปกรณ์สถานีบริการน้ำมัน",
    en: "Leading developer and supplier of gas station equipment"
  },
  
  // Logo Path
  logo: {
    main: "/images/logo/oil-development-logo.svg",
    white: "/images/logo/oil-development-logo-white.svg",
    dark: "/images/logo/oil-development-logo-dark.svg"
  }
};

// Export individual items for convenience
export const { brandName, contact, description, logo } = staticCompanyInfo;

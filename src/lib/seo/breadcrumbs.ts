export interface BreadcrumbItem {
  name: string;
  url: string;
}

const baseUrl = "https://www.OIL DEVELOPMENT.group";

export function generateBreadcrumbs(
  locale: "th" | "en",
  path: string,
  customLabels?: { [key: string]: { th: string; en: string } }
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with home
  breadcrumbs.push({
    name: locale === "th" ? "หน้าแรก" : "Home",
    url: `${baseUrl}/${locale}`,
  });

  // Parse the path
  const pathSegments = path
    .split("/")
    .filter((segment) => segment && segment !== locale);

  // Default labels for common paths
  const defaultLabels: { [key: string]: { th: string; en: string } } = {
    "products-services": {
      th: "ผลิตภัณฑ์และบริการ",
      en: "Products & Services",
    },
    "contact-us": {
      th: "ติดต่อเรา",
      en: "Contact Us",
    },
    "pds-group": {
      th: "เกี่ยวกับเรา",
      en: "About Us",
    },
    history: {
      th: "ประวัติบริษัท",
      en: "Company History",
    },
    "executive-team": {
      th: "ทีมผู้บริหาร",
      en: "Executive Team",
    },
    "mission-commitment": {
      th: "วิสัยทัศน์และพันธกิจ",
      en: "Mission & Commitment",
    },
    "news-events": {
      th: "ข่าวสารและกิจกรรม",
      en: "News & Events",
    },
    reference: {
      th: "ผลงาน",
      en: "References",
    },
  };

  // Merge with custom labels
  const labels = { ...defaultLabels, ...customLabels };

  // Build breadcrumbs for each segment
  let currentPath = `/${locale}`;

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath += `/${segment}`;

    // Get label for this segment
    const label = labels[segment];
    if (label) {
      breadcrumbs.push({
        name: label[locale],
        url: `${baseUrl}${currentPath}`,
      });
    } else {
      // Fallback: capitalize the segment
      const fallbackName = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        name: fallbackName,
        url: `${baseUrl}${currentPath}`,
      });
    }
  }

  return breadcrumbs;
}

// Specific breadcrumb generators for common pages
export function getHomeBreadcrumbs(locale: "th" | "en"): BreadcrumbItem[] {
  return [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
  ];
}

export function getProductsBreadcrumbs(locale: "th" | "en"): BreadcrumbItem[] {
  return [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: locale === "th" ? "ผลิตภัณฑ์และบริการ" : "Products & Services",
      url: `${baseUrl}/${locale}/products-services`,
    },
  ];
}

export function getContactBreadcrumbs(locale: "th" | "en"): BreadcrumbItem[] {
  return [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: locale === "th" ? "ติดต่อเรา" : "Contact Us",
      url: `${baseUrl}/${locale}/contact-us`,
    },
  ];
}

export function getCompanyBreadcrumbs(
  locale: "th" | "en",
  subPage?: string
): BreadcrumbItem[] {
  const breadcrumbs = [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: locale === "th" ? "เกี่ยวกับเรา" : "About Us",
      url: `${baseUrl}/${locale}/pds-group`,
    },
  ];

  if (subPage) {
    const subPageLabels: { [key: string]: { th: string; en: string } } = {
      history: {
        th: "ประวัติบริษัท",
        en: "Company History",
      },
      "executive-team": {
        th: "ทีมผู้บริหาร",
        en: "Executive Team",
      },
      "mission-commitment": {
        th: "วิสัยทัศน์และพันธกิจ",
        en: "Mission & Commitment",
      },
    };

    const subPageLabel = subPageLabels[subPage];
    if (subPageLabel) {
      breadcrumbs.push({
        name: subPageLabel[locale],
        url: `${baseUrl}/${locale}/pds-group/${subPage}`,
      });
    }
  }

  return breadcrumbs;
}

export function getNewsBreadcrumbs(
  locale: "th" | "en",
  articleSlug?: string,
  articleTitle?: string
): BreadcrumbItem[] {
  const breadcrumbs = [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: locale === "th" ? "ข่าวสารและกิจกรรม" : "News & Events",
      url: `${baseUrl}/${locale}/news-events`,
    },
  ];

  if (articleSlug && articleTitle) {
    breadcrumbs.push({
      name: articleTitle,
      url: `${baseUrl}/${locale}/news-events/${articleSlug}`,
    });
  }

  return breadcrumbs;
}

export function getReferenceBreadcrumbs(
  locale: "th" | "en",
  referenceId?: string,
  referenceTitle?: string
): BreadcrumbItem[] {
  const breadcrumbs = [
    {
      name: locale === "th" ? "หน้าแรก" : "Home",
      url: `${baseUrl}/${locale}`,
    },
    {
      name: locale === "th" ? "ผลงาน" : "References",
      url: `${baseUrl}/${locale}/reference`,
    },
  ];

  if (referenceId && referenceTitle) {
    breadcrumbs.push({
      name: referenceTitle,
      url: `${baseUrl}/${locale}/reference/${referenceId}`,
    });
  }

  return breadcrumbs;
}

// Helper function to get the last breadcrumb (current page)
export function getCurrentPageFromBreadcrumbs(
  breadcrumbs: BreadcrumbItem[]
): BreadcrumbItem | null {
  return breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : null;
}

// Helper function to get parent breadcrumbs (all except current page)
export function getParentBreadcrumbs(
  breadcrumbs: BreadcrumbItem[]
): BreadcrumbItem[] {
  return breadcrumbs.slice(0, -1);
}

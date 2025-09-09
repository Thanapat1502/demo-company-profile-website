"use client";

import {
  Building,
  History,
  Users,
  Target,
  Settings,
  Award,
} from "lucide-react";
import SubNavigation from "@/components/ui/SubNavigation";

// Example usage of the SubNavigation component
export default function SubNavigationExample() {
  const locale = "en";

  // Example 1: Company Navigation
  const companyNavItems = [
    {
      id: "overview",
      title: "Company Overview",
      href: "/pds-group",
      icon: Building,
    },
    {
      id: "history",
      title: "Our History",
      href: "/pds-group/history",
      icon: History,
    },
    {
      id: "team",
      title: "Executive Team",
      href: "/pds-group/executive-team",
      icon: Users,
    },
    {
      id: "mission",
      title: "Mission & Vision",
      href: "/pds-group/mission-commitment",
      icon: Target,
    },
  ];

  // Example 2: Services Navigation
  const servicesNavItems = [
    {
      id: "construction",
      title: "Construction Services",
      href: "/products-services/construction",
      icon: Building,
    },
    {
      id: "consulting",
      title: "Consulting",
      href: "/products-services/consulting",
      icon: Settings,
    },
    {
      id: "quality",
      title: "Quality Assurance",
      href: "/products-services/quality",
      icon: Award,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Example 1: Company Navigation with Title and Description */}
      <SubNavigation
        items={companyNavItems}
        activeId="overview"
        locale={locale}
        backgroundImage="/images/hero-sections/hero-banner-1.jpg"
        title="About OIL DEVELOPMENT"
        description="Learn more about our company, history, team, and mission"
      />

      {/* Example 2: Services Navigation without Title */}
      <SubNavigation
        items={servicesNavItems}
        activeId="construction"
        locale={locale}
        backgroundImage="/images/hero-sections/hero-banner-2.jpg"
      />

      {/* Example 3: Minimal Navigation with Different Background */}
      <SubNavigation
        items={[
          {
            id: "news",
            title: "Latest News",
            href: "/news-events",
            icon: Award,
          },
          {
            id: "references",
            title: "Our Projects",
            href: "/reference",
            icon: Building,
          },
        ]}
        activeId="news"
        locale={locale}
        backgroundImage="/images/hero-sections/hero-banner-3.jpg"
        title="News & References"
      />
    </div>
  );
}

// Usage Instructions:
/*
1. Import the SubNavigation component:
   import SubNavigation from "@/components/ui/SubNavigation";

2. Define your navigation items with icons:
   const navItems = [
     {
       id: "unique-id",
       title: "Display Title",
       href: "/path/to/page",
       icon: LucideIcon,
     },
     // ... more items
   ];

3. Use the component:
   <SubNavigation
     items={navItems}
     activeId="current-page-id"
     locale={locale}
     backgroundImage="/images/hero-sections/hero-banner-1.jpg" // Optional
     title="Section Title" // Optional
     description="Section description" // Optional
   />

4. Available background images:
   - /images/hero-sections/hero-banner-1.jpg
   - /images/hero-sections/hero-banner-2.jpg
   - /images/hero-sections/hero-banner-3.jpg
   - /images/hero-sections/hero-banner-4.jpg

5. Features:
   - Liquid glass morphism design
   - Hero background image support
   - Responsive layout
   - Smooth animations
   - Active state indicators
   - Optional title and description
   - Consistent with StatsSection design
*/

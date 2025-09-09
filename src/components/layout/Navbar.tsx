"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { ButtonWrapper } from "../ui";
import PrimaryButton from "../ui/PrimaryButton";
import { brandName, contact, logo } from "@/lib/static-data/company-info";

interface NavItem {
  labelKey: string;
  href: string;
  submenu?: NavItem[];
}

const navigationItems: NavItem[] = [
  { labelKey: "navigation.home", href: "/" },
  {
    labelKey: "navigation.company",
    href: "/pds-group",
    submenu: [
      { labelKey: "navigation.company.about", href: "/pds-group" },
      { labelKey: "navigation.company.history", href: "/pds-group/history" },
      {
        labelKey: "navigation.company.executive",
        href: "/pds-group/executive-team",
      },
      {
        labelKey: "navigation.company.executiveMessage",
        href: "/pds-group/executive-team#executive-message",
      },
      {
        labelKey: "navigation.company.mission",
        href: "/pds-group/mission-commitment",
      },
    ],
  },
  {
    labelKey: "navigation.services.main",
    href: "/products-services",
    submenu: [
      {
        labelKey: "navigation.services.gas-station",
        href: "/products-services#gas-station",
      },
      {
        labelKey: "navigation.services.permatank",
        href: "/products-services#permatank",
      },
      {
        labelKey: "navigation.services.pipeInstallation",
        href: "/products-services#pipe-installation",
      },
      {
        labelKey: "navigation.services.atgSystem",
        href: "/products-services#atg-system",
      },
      {
        labelKey: "navigation.services.fuelServices",
        href: "/products-services#fuel-services",
      },
      {
        labelKey: "navigation.services.ourProducts",
        href: "/products-services#our-products",
      },
    ],
  },
  {
    labelKey: "navigation.references",
    href: "/reference",
    submenu: [
      { labelKey: "navigation.references", href: "/reference" },
      { labelKey: "navigation.news", href: "/news-events" },
    ],
  },
  // { labelKey: "navigation.contact", href: "/contact-us" },
];

type Props = {
  forceSolid?: boolean;
};

export default function MainNavbar({ forceSolid = false }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(!forceSolid);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(
    null
  );
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { navigateToSection } = useScrollToSection();

  // Safe translation function that handles both regular and nested keys
  const getTranslation = (key: string) => {
    // Fallback translations for submenu items
    const fallbackTranslations: Record<string, Record<string, string>> = {
      "navigation.company.about": {
        en: "About OIL DEVELOPMENT Company",
        th: "เกี่ยวกับบริษัทOIL DEVELOPMENT",
      },
      "navigation.company.history": {
        en: "Company History",
        th: "ประวัติความเป็นมา",
      },
      "navigation.company.executive": {
        en: "Executive Team",
        th: "ผู้บริหาร",
      },
      "navigation.company.mission": {
        en: "Mission & Vision",
        th: "วิสัยทัศน์และพันธกิจ",
      },
    };

    // Check if we have a fallback translation
    if (fallbackTranslations[key]?.[locale]) {
      return fallbackTranslations[key][locale];
    }

    try {
      // For keys that might have conflicts (like navigation.company),
      // try the _value approach first
      if (key === "navigation.company") {
        try {
          return t("navigation.company._value");
        } catch {
          // If _value doesn't exist, use fallback
          return locale === "th" ? "เกี่ยวกับเรา" : "Company Profile";
        }
      }

      // For regular keys, use the normal translation
      return t(key);
    } catch {
      // If translation fails, return the key itself
      return key;
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (forceSolid) return;
      setIsAtTop(scrollY < 50); // More sensitive for transparency
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "th" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`transition-all duration-500 ease-in-out ${
          isAtTop
            ? "bg-transparent backdrop-blur-sm border-transparent"
            : "bg-white-glass backdrop-blur-sm border-b border-white/20 shadow-glass-strong"
        }`}
        maxWidth="full"
        height="75px"
        isBlurred={false}
        style={{
          backgroundColor: isAtTop ? "transparent" : undefined,
        }}>
        {/* Mobile: Menu Button + Brand aligned to left */}
        <NavbarContent justify="start" className="lg:hidden gap-3">
          {/* Mobile Menu Button */}
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-all duration-700 ease-out hover:scale-110 ${
              isAtTop
                ? "text-white hover:bg-white/10 hover:backdrop-blur-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }>
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                } ${isAtTop ? "bg-white" : "bg-gray-700"}`}></span>
              <span
                className={`absolute top-2.5 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${
                  isMenuOpen ? "opacity-0" : ""
                } ${isAtTop ? "bg-white" : "bg-gray-700"}`}></span>
              <span
                className={`absolute top-4 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                } ${isAtTop ? "bg-white" : "bg-gray-700"}`}></span>
            </div>
          </Button>

          {/* Brand - Mobile Layout */}
          <NavbarBrand>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <Link
                href="/"
                className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
                <motion.div
                  className="w-12 h-12 rounded-lg overflow-hidden  border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}>
                  <Image
                    src={logo.main}
                    alt="Oil Development Logo"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span
                    className={`font-semibold text-md transition-all duration-500 ease-in-out ${
                      isAtTop ? "text-white" : "text-gray-900"
                    }`}>
                    {brandName.th}
                  </span>
                  <span
                    className={`font-medium text-xs transition-all duration-500 ease-in-out ${
                      isAtTop ? "text-white/80" : "text-gray-600"
                    }`}>
                    {brandName.en}
                  </span>
                </div>
              </Link>
            </motion.div>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop: Brand - Modern Design */}
        <NavbarContent justify="start" className="hidden lg:flex flex-grow-0">
          <NavbarBrand>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <Link
                href="/"
                className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
                <motion.div
                  className="w-12 h-12 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}>
                  <Image
                    src={logo.main}
                    alt="Oil Development Logo"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span
                    className={`font-semibold text-md transition-all duration-500 ease-in-out ${
                      isAtTop ? "text-white" : "text-gray-900"
                    }`}>
                    {brandName.th}
                  </span>
                  <span
                    className={`font-medium text-md transition-all duration-500 ease-in-out ${
                      isAtTop ? "text-white/80" : "text-gray-600"
                    }`}>
                    {brandName.en}
                  </span>
                </div>
              </Link>
            </motion.div>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation - Modern Design */}
        <NavbarContent
          className="hidden lg:flex gap-10 flex-grow justify-center"
          justify="center">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <NavbarItem className="relative">
                {item.submenu ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu(item.labelKey)}
                    onMouseLeave={() => setActiveSubmenu(null)}>
                    <motion.div
                      className={`relative font-medium text-md cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 group hover:scale-105 ${
                        isAtTop
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-primary-300 hover:bg-gray-50"
                      }`}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}>
                      <span className="relative z-10">
                        {getTranslation(item.labelKey)}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeSubmenu === item.labelKey ? "rotate-180" : ""
                        }`}
                      />

                      {/* Elegant underline animation */}
                      <span
                        className={`absolute bottom-1 left-1/2 h-0.5 transition-all duration-500 ease-out transform -translate-x-1/2 group-hover:w-3/4 w-0 ${
                          isAtTop ? "bg-white" : "bg-primary-300"
                        }`}></span>

                      {/* Subtle glow effect */}
                      <div
                        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                          isAtTop
                            ? "bg-gradient-to-r from-white/5 to-white/10 shadow-lg shadow-white/20"
                            : "bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg shadow-blue-200/50"
                        }`}></div>
                    </motion.div>

                    {/* Submenu Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 submenu-backdrop rounded-lg overflow-hidden transition-all duration-300 ease-out ${
                        activeSubmenu === item.labelKey
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      style={{ zIndex: 9999 }}>
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subItem.href}
                          onClick={() =>
                            navigateToSection(`/${locale}${subItem.href}`)
                          }
                          className="submenu-item-hover block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          style={{
                            animationDelay: `${subIndex * 50}ms`,
                            animation:
                              activeSubmenu === item.labelKey
                                ? `submenuItemSlideIn 0.3s ease-out ${
                                    subIndex * 50
                                  }ms both`
                                : "none",
                          }}>
                          <span className="text-md font-medium">
                            {getTranslation(subItem.labelKey)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => navigateToSection(`/${locale}${item.href}`)}
                    className={`relative font-medium text-md px-4 py-2 rounded-full transition-all duration-300 group hover:scale-105 ${
                      isAtTop
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-primary-300 hover:bg-gray-50"
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}>
                    <span className="relative z-10">
                      {getTranslation(item.labelKey)}
                    </span>

                    {/* Elegant underline animation */}
                    <span
                      className={`absolute bottom-1 left-1/2 h-0.5 transition-all duration-500 ease-out transform -translate-x-1/2 group-hover:w-3/4 w-0 ${
                        isAtTop ? "bg-white" : "bg-primary-300"
                      }`}></span>

                    {/* Subtle glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        isAtTop
                          ? "bg-gradient-to-r from-white/5 to-white/10 shadow-lg shadow-white/20"
                          : "bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg shadow-blue-200/50"
                      }`}></div>
                  </motion.button>
                )}
              </NavbarItem>
            </motion.div>
          ))}
        </NavbarContent>

        {/* Right Side Actions - Modern Design */}
        <NavbarContent justify="end" className="gap-2 lg:gap-4 flex-grow-0">
          {/* Hotline Number - Desktop Only */}
          <NavbarItem className="hidden sm:flex">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-end">
              <span
                className={`text-md font-medium transition-all duration-300 ${
                  isAtTop ? "text-white/70" : "text-gray-500"
                }`}>
                {locale === "th" ? "ติดต่อเรา" : "Contact Us"}
              </span>
              <a
                href={`tel:${contact.phone}`}
                className={`text-md font-semibold transition-all duration-300 hover:scale-105 ${
                  isAtTop
                    ? "text-white hover:text-white/90"
                    : "text-primary-300 hover:text-primary-400"
                }`}>
                {contact.phone}
              </a>
            </motion.div>
          </NavbarItem>

          {/* Language Switcher */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={toggleLanguage}
              className={`transition-all duration-300 hover:scale-110 relative group ${
                isAtTop
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-600 hover:text-primary-300 hover:bg-gray-100"
              }`}>
              <Globe
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Button>
          </NavbarItem>

          {/* Contact Button */}
          <NavbarItem className="hidden md:flex">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              <PrimaryButton
                as={Link}
                href={`/${locale}/contact-us`}
                size="md"
                className={`font-medium px-6 py-3 transition-all duration-300 relative group overflow-hidden ${
                  isAtTop
                    ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-primary-glow"
                    : "bg-primary-gradient text-white shadow-glass hover:shadow-primary-glow"
                }`}
                onPress={() => {}}>
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}>
                  {t("common.contactUs")}
                </motion.span>
              </PrimaryButton>
            </motion.div>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={handleCloseMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Menu Panel */}
              <motion.div
                className={`fixed top-0 left-0 right-0 bottom-0 z-50 w-full shadow-2xl ${
                  isAtTop
                    ? "bg-white-glass backdrop-blur-xl"
                    : "bg-white-glass backdrop-blur-xl"
                }`}
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                {/* Menu Header */}
                <div
                  className={`flex items-center justify-between p-6 border-b bg-white ${"border-gray-100 x-bg-white-glass"}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                      <Image
                        src={logo.main}
                        alt="Oil Development Logo"
                        width={48}
                        height={48}
                        className="object-contain h-full w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-md font-semibold ${
                          isAtTop ? "text-gray-900" : "text-gray-900"
                        }`}>
                        {brandName.th}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isAtTop ? "text-gray-600" : "text-gray-600"
                        }`}>
                        {brandName.en}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseMenu}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${"text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}>
                    <div className="relative w-5 h-5">
                      <span className="absolute top-2 left-0 w-5 h-0.5 bg-current rotate-45 transition-all duration-300"></span>
                      <span className="absolute top-2 left-0 w-5 h-0.5 bg-current -rotate-45 transition-all duration-300"></span>
                    </div>
                  </button>
                </div>

                {/* Scrollable Menu Content */}
                <div
                  className="bg-white flex-1 overflow-y-auto"
                  style={{ height: "calc(100vh - 75px)" }}>
                  {/* Navigation Items */}
                  <div className="py-4">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={`${item.href}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>
                        {item.submenu ? (
                          <div>
                            {/* Main menu item with submenu */}
                            <button
                              className={`group w-full flex items-center justify-between px-6 py-4 transition-all duration-300 relative ${"text-gray-700 hover:text-primary-300 hover:bg-gray-50"}`}
                              onClick={() =>
                                setActiveMobileSubmenu(
                                  activeMobileSubmenu === item.labelKey
                                    ? null
                                    : item.labelKey
                                )
                              }>
                              <span className="text-lg font-medium">
                                {getTranslation(item.labelKey)}
                              </span>

                              {/* Chevron indicator */}
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${
                                  activeMobileSubmenu === item.labelKey
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />

                              {/* Active indicator */}
                              <div
                                className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${"bg-primary-300"}`}></div>
                            </button>

                            {/* Submenu items */}
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-out ${
                                activeMobileSubmenu === item.labelKey
                                  ? "max-h-96 opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}>
                              {item.submenu.map((subItem, subIndex) => (
                                <button
                                  key={subItem.href}
                                  onClick={() => {
                                    navigateToSection(
                                      `/${locale}${subItem.href}`
                                    );
                                    handleCloseMenu();
                                  }}
                                  className="block w-full text-left pl-12 pr-6 py-3 text-gray-600 hover:text-[var(--primary-blue)] hover:bg-gray-50 transition-all duration-200 relative"
                                  style={{
                                    animationDelay: `${subIndex * 50}ms`,
                                  }}>
                                  <span className="text-base font-medium">
                                    {getTranslation(subItem.labelKey)}
                                  </span>

                                  {/* Submenu active indicator */}
                                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--primary-blue)] opacity-0 hover:opacity-100 transition-all duration-300"></div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              navigateToSection(`/${locale}${item.href}`);
                              handleCloseMenu();
                            }}
                            className={`group flex items-center justify-between w-full px-6 py-4 transition-all duration-300 relative ${
                              isAtTop
                                ? "text-gray-700 hover:text-primary-300 hover:bg-gray-50"
                                : "text-gray-700 hover:text-primary-300 hover:bg-gray-50"
                            }`}>
                            <span className="text-lg font-medium">
                              {getTranslation(item.labelKey)}
                            </span>

                            {/* Arrow indicator */}
                            <div className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                              <div
                                className={`w-1.5 h-1.5 border-r-2 border-b-2 rotate-[-45deg] ${
                                  isAtTop ? "border-current" : "border-current"
                                }`}></div>
                            </div>

                            {/* Active indicator */}
                            <div
                              className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                                isAtTop ? "bg-primary-300" : "bg-primary-300"
                              }`}></div>
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div
                    className={`mx-6 h-px ${
                      isAtTop ? "bg-gray-200" : "bg-gray-200"
                    }`}></div>

                  {/* Action Items */}
                  <div className="py-4 space-y-2">
                    {/* Contact Button */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: navigationItems.length * 0.1 + 0.2,
                      }}>
                      <PrimaryButton
                        as="a"
                        size="lg"
                        href={`/${locale}/contact-us`}
                        onClick={handleCloseMenu}
                        className={`group mx-6 flex items-center justify-center py-4 px-6 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden ${"bg-primary-gradient text-white shadow-glass hover:shadow-primary-glow"}`}>
                        <motion.span
                          className="relative z-10"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}>
                          {t("common.contactUs")}
                        </motion.span>
                      </PrimaryButton>
                    </motion.div>

                    {/* Hotline Number - Mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: navigationItems.length * 0.1 + 0.3,
                      }}
                      className="mx-6 py-3 text-center">
                      <div
                        className={`text-md font-medium mb-1 ${"text-gray-500"}`}>
                        Hotline
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className={`text-lg font-semibold transition-all duration-300 hover:scale-105 ${"text-primary-300 hover:text-primary-400"}`}>
                        {contact.phone}
                      </a>
                    </motion.div>

                    {/* Settings Section */}
                    <div
                      className="px-6 pt-4"
                      style={{
                        animationDelay: `${
                          (navigationItems.length + 2) * 80
                        }ms`,
                        animation: isMenuOpen
                          ? "slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                          : "none",
                        opacity: 0,
                        transform: "translateX(20px)",
                      }}>
                      <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Settings
                      </h3>

                      <div className="space-y-2">
                        {/* Language Switcher */}
                        <button
                          onClick={toggleLanguage}
                          className="group w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-[var(--primary-blue)] hover:bg-gray-50 rounded-lg transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <Globe
                              size={20}
                              className="text-gray-400 group-hover:text-[var(--primary-blue)] transition-colors duration-300"
                            />
                            <span className="font-medium">Language</span>
                          </div>
                          <span className="text-md text-gray-500 uppercase">
                            {locale}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="p-6 border-t border-gray-100 mt-8"
                    style={{
                      animationDelay: `${(navigationItems.length + 3) * 100}ms`,
                      animation: isMenuOpen
                        ? "slideInFromTop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                        : "none",
                      opacity: 0,
                      transform: "translateY(-20px)",
                    }}>
                    <div className="text-center">
                      <div className="text-md text-gray-500">
                        © 2025 OIL DEVELOPMENT
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Navbar>
    </motion.div>
  );
}

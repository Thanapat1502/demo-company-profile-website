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
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Sun, Moon } from "lucide-react";
import Image from "next/image";


interface NavItem {
  labelKey: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { labelKey: "navigation.home", href: "/" },
  { labelKey: "navigation.company", href: "/pds-group" },
  { labelKey: "navigation.services", href: "/products-services" },
  { labelKey: "navigation.references", href: "/reference" },
  { labelKey: "navigation.news", href: "/news-events" },
  { labelKey: "navigation.contact", href: "/contact-us" },
];

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleCloseMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 400); // Match animation duration
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`transition-all duration-500 ${isAtTop
          ? "bg-transparent"
          : "bg-white shadow-md border-b border-gray-200"
          }`}
        maxWidth="xl"
        height="80px"
        isBlurred={false}
        style={{
          backgroundColor: isAtTop ? 'transparent' : 'rgba(255, 255, 255, 1)',
          backdropFilter: isAtTop ? 'none' : 'blur(10px)'
        }}
      >
        {/* Brand - Modern Design */}
        <NavbarContent>
          <div className="sm:hidden">
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-all duration-700 ease-out hover:scale-110 ${isAtTop
                ? 'text-white hover:bg-white/10 hover:backdrop-blur-sm'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  } ${isAtTop ? 'bg-white' : 'bg-gray-700'}`}></span>
                <span className={`absolute top-2.5 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0' : ''
                  } ${isAtTop ? 'bg-white' : 'bg-gray-700'}`}></span>
                <span className={`absolute top-4 left-0 w-6 h-0.5 transition-all duration-500 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  } ${isAtTop ? 'bg-white' : 'bg-gray-700'}`}></span>
              </div>
            </Button>
          </div>
          <NavbarBrand>
            <Link href="/" className="flex items-center space-x-4 group">
              <div className={`w-12 h-12 rounded-md bg-white/60 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-110  relative overflow-hidden ${isAtTop ? 'shadow-xl shadow-white/20' : 'shadow-lg'
                }`}
              // style={{ backgroundColor: 'white' }}
              >
                <Image
                  src="/images/pds-logo.png"
                  alt="PDS Logo"
                  width={36}
                  height={36}
                  className="object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-black tracking-tight transition-all duration-700 ease-out group-hover:tracking-wide ${isAtTop ? 'text-white' : ''
                    }`}
                  style={{ color: isAtTop ? 'white' : 'var(--primary-blue)' }}
                >
                  PADUNGSILPA
                </span>
                <span className={`text-md font-bold  transition-all duration-700 ease-out group-hover:tracking-[0.3em] ${isAtTop ? 'text-white/80' : 'text-gray-500'
                  }`}>
                  GROUP
                </span>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation - Modern Design */}
        <NavbarContent className="hidden sm:flex gap-2" justify="center">
          {navigationItems.map((item, index) => (
            <NavbarItem key={item.href}>
              <Link
                href={`/${locale}${item.href}`}
                className={`relative font-medium transition-all duration-700 ease-out px-4 py-2 rounded-full group hover:scale-105 ${isAtTop
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="relative z-10">{t(item.labelKey)}</span>

                {/* Elegant underline animation */}
                <span className={`absolute bottom-1 left-1/2 h-0.5 transition-all duration-500 ease-out transform -translate-x-1/2 group-hover:w-3/4 w-0 ${isAtTop ? 'bg-white' : 'bg-blue-600'
                  }`}></span>

                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out ${isAtTop
                  ? 'bg-gradient-to-r from-white/5 to-white/10 shadow-lg shadow-white/20'
                  : 'bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg shadow-blue-200/50'
                  }`}></div>
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Side Actions - Modern Design */}
        <NavbarContent justify="end" className="gap-4">
          {/* Language Switcher */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={toggleLanguage}
              className={`transition-all duration-700 ease-out hover:scale-110 hover:rotate-12 relative group ${isAtTop
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
            >
              <Globe size={18} className="transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ${isAtTop
                ? 'bg-white/10 shadow-lg shadow-white/20'
                : 'bg-blue-50 shadow-lg shadow-blue-200/50'
                }`}></div>
            </Button>
          </NavbarItem>

          {/* Theme Switcher */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onPress={toggleTheme}
              className={`transition-all duration-700 ease-out hover:scale-110 hover:rotate-180 relative group ${isAtTop
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
            >
              {theme === 'dark' ?
                <Sun size={18} className="transition-transform duration-500 group-hover:scale-110" /> :
                <Moon size={18} className="transition-transform duration-500 group-hover:scale-110" />
              }
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ${isAtTop
                ? 'bg-white/10 shadow-lg shadow-white/20'
                : 'bg-blue-50 shadow-lg shadow-blue-200/50'
                }`}></div>
            </Button>
          </NavbarItem>

          {/* Contact Button */}
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              href={`/${locale}/contact-us`}
              className={`font-semibold px-8 py-3 transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl relative group overflow-hidden ${isAtTop
                ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm'
                : 'btn-minimal-primary hover:shadow-xl'
                }`}
            >
              <span className="relative z-10">{t("common.contactUs")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Minimal Professional Mobile Menu - Slide from Top */}
        {(isMenuOpen || isMenuClosing) && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={handleCloseMenu}
              style={{
                animation: isMenuClosing ? 'fadeOut 0.3s ease-out forwards' : 'fadeIn 0.3s ease-out forwards'
              }}
            />

            {/* Menu Panel */}
            <div
              className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-white shadow-2xl"
              style={{
                animation: isMenuClosing
                  ? 'slideUpToTop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                  : 'slideDownFromTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
              }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/pds-logo.png"
                      alt="PDS Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">PADUNGSILPA</span>
                </div>

                <button
                  onClick={handleCloseMenu}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <div className="relative w-5 h-5">
                    <span className="absolute top-2 left-0 w-5 h-0.5 bg-current rotate-45 transition-all duration-300"></span>
                    <span className="absolute top-2 left-0 w-5 h-0.5 bg-current -rotate-45 transition-all duration-300"></span>
                  </div>
                </button>
              </div>

              {/* Scrollable Menu Content */}
              <div className="bg-white flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>

                {/* Navigation Items */}
                <div className="py-4 bg-white">
                  {navigationItems.map((item, index) => (
                    <div
                      key={`${item.href}-${index}`}
                      style={{
                        animationDelay: `${(index + 1) * 80}ms`,
                        animation: isMenuOpen ? 'slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'none',
                        opacity: 0,
                        transform: 'translateX(20px)'
                      }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        className="group flex items-center justify-between px-6 py-4 text-gray-700 hover:text-[var(--primary-blue)] hover:bg-gray-50 transition-all duration-300 relative"
                        onClick={handleCloseMenu}
                      >
                        <span className="text-lg font-medium">{t(item.labelKey)}</span>

                        {/* Arrow indicator */}
                        <div className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-current rotate-[-45deg]"></div>
                        </div>

                        {/* Active indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-blue)] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-gray-200"></div>

                {/* Action Items */}
                <div className="py-4 space-y-2">

                  {/* Contact Button */}
                  <div
                    style={{
                      animationDelay: `${(navigationItems.length + 1) * 80}ms`,
                      animation: isMenuOpen ? 'slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'none',
                      opacity: 0,
                      transform: 'translateX(20px)'
                    }}
                  >
                    <Link
                      href={`/${locale}/contact-us`}
                      onClick={handleCloseMenu}
                      className="group mx-6 flex items-center justify-center py-4 px-6 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden"
                      style={{ backgroundColor: 'var(--primary-blue)' }}
                    >
                      <span className="relative z-10">{t("common.contactUs")}</span>

                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    </Link>
                  </div>

                  {/* Settings Section */}
                  <div
                    className="px-6 pt-4"
                    style={{
                      animationDelay: `${(navigationItems.length + 2) * 80}ms`,
                      animation: isMenuOpen ? 'slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'none',
                      opacity: 0,
                      transform: 'translateX(20px)'
                    }}
                  >
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Settings</h3>

                    <div className="space-y-2">
                      {/* Language Switcher */}
                      <button
                        onClick={toggleLanguage}
                        className="group w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-[var(--primary-blue)] hover:bg-gray-50 rounded-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Globe size={20} className="text-gray-400 group-hover:text-[var(--primary-blue)] transition-colors duration-300" />
                          <span className="font-medium">Language</span>
                        </div>
                        <span className="text-sm text-gray-500 uppercase">{locale}</span>
                      </button>

                      {/* Theme Switcher */}
                      <button
                        onClick={toggleTheme}
                        className="group w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-[var(--primary-blue)] hover:bg-gray-50 rounded-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          {theme === 'dark' ?
                            <Sun size={20} className="text-gray-400 group-hover:text-[var(--primary-blue)] transition-colors duration-300" /> :
                            <Moon size={20} className="text-gray-400 group-hover:text-[var(--primary-blue)] transition-colors duration-300" />
                          }
                          <span className="font-medium">Theme</span>
                        </div>
                        <span className="text-sm text-gray-500 capitalize">{theme}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="p-6 border-t border-gray-100 mt-8"
                  style={{
                    animationDelay: `${(navigationItems.length + 3) * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromTop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'none',
                    opacity: 0,
                    transform: 'translateY(-20px)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-500">
                      © 2024 Padungsilpa Group
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Navbar>
    </div>
  );
}

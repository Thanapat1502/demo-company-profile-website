"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Sun, Moon } from "lucide-react";

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
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "th" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      maxWidth="xl"
      height="80px">
      {/* Brand */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PDS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                PADUNGSILPA
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                GROUP
              </span>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={`/${locale}${item.href}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              {t(item.labelKey)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side Actions */}
      <NavbarContent justify="end">
        {/* Language Switcher */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={toggleLanguage}
            className="text-gray-600 dark:text-gray-400">
            <Globe size={20} />
          </Button>
        </NavbarItem>

        {/* Theme Toggle */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={toggleTheme}
            className="text-gray-600 dark:text-gray-400">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </NavbarItem>

        {/* Contact Button */}
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            href={`/${locale}/contact-us`}
            color="primary"
            variant="solid"
            className="bg-blue-600 hover:bg-blue-700">
            {t("common.contactUs")}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        {navigationItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              href={`/${locale}${item.href}`}
              className="w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 text-lg"
              onPress={() => setIsMenuOpen(false)}>
              {t(item.labelKey)}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Button
            as={Link}
            href={`/${locale}/contact-us`}
            color="primary"
            variant="solid"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            onPress={() => setIsMenuOpen(false)}>
            {t("common.contactUs")}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

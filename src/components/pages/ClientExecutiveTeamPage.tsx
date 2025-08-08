"use client";

import { History, Building, Users2, Target } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import ExecutiveGrid from "@/components/executive/ExecutiveGrid";
import MessageFromManagement, {
  defaultManagementMessage,
} from "@/components/sections/MessageFromManagement";

interface ClientExecutiveTeamPageProps {
  locale: string;
}

export default function ClientExecutiveTeamPage({
  locale,
}: ClientExecutiveTeamPageProps) {
  const t = useTranslations();

  const subPages = [
    {
      id: "overview",
      title: t("company.navigation.overview"),
      icon: Building,
      href: `/pds-group`,
    },
    {
      id: "history",
      title: t("company.navigation.history"),
      icon: History,
      href: `/pds-group/history`,
    },
    {
      id: "team",
      title: t("company.navigation.team"),
      icon: Users2,
      href: `/pds-group/executive-team`,
    },
    {
      id: "mission",
      title: t("company.navigation.mission"),
      icon: Target,
      href: `/pds-group/mission-commitment`,
    },
  ];

  return (
    <>
      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "team"
                    ? "bg-[var(--primary-blue)] text-white border-[var(--primary-blue)]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[var(--primary-blue)] hover:text-[var(--primary-blue)]"
                }`}>
                <page.icon className="w-5 h-5 mr-3" />
                <span className="text-lg font-medium tracking-wide">
                  {page.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team Grid */}
      <ExecutiveGrid locale={locale} />

      {/* Message from Management */}
      <MessageFromManagement
        messages={defaultManagementMessage}
        locale={locale}
      />
    </>
  );
}

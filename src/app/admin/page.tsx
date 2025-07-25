"use client";

import { useState, useEffect, useCallback } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
} from "@heroui/react";
import {
  FileText,
  Users,
  Package,
  FolderOpen,
  TrendingUp,
  Eye,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  newsEvents: { total: number; published: number; draft: number };
  teamMembers: { total: number; active: number };
  products: { total: number; featured: number };
  references: { total: number; featured: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    newsEvents: { total: 0, published: 0, draft: 0 },
    teamMembers: { total: 0, active: 0 },
    products: { total: 0, featured: 0 },
    references: { total: 0, featured: 0 },
  });
  const loadDashboardStats = useCallback(async () => {
    try {
      // TODO: Implement actual API calls to get stats
      // For now, using mock data
      setStats({
        newsEvents: { total: 12, published: 8, draft: 4 },
        teamMembers: { total: 6, active: 6 },
        products: { total: 8, featured: 3 },
        references: { total: 15, featured: 5 },
      });
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  }, []);

  useEffect(() => {
    loadDashboardStats();
  }, [loadDashboardStats]);

  const quickActions = [
    {
      icon: FileText,
      label: "Add News Article",
      href: "/admin/news-events/new",
      color: "primary" as const,
    },
    {
      icon: Users,
      label: "Add Team Member",
      href: "/admin/team-members/new",
      color: "secondary" as const,
    },
    {
      icon: Package,
      label: "Add Service",
      href: "/admin/products-services/new",
      color: "success" as const,
    },
    {
      icon: FolderOpen,
      label: "Add Reference",
      href: "/admin/references/new",
      color: "warning" as const,
    },
  ];

  const statCards = [
    {
      title: "News & Events",
      icon: FileText,
      total: stats.newsEvents.total,
      published: stats.newsEvents.published,
      draft: stats.newsEvents.draft,
      href: "/admin/news-events",
      color: "bg-blue-500",
    },
    {
      title: "Team Members",
      icon: Users,
      total: stats.teamMembers.total,
      published: stats.teamMembers.active,
      draft: stats.teamMembers.total - stats.teamMembers.active,
      href: "/admin/team-members",
      color: "bg-green-500",
    },
    {
      title: "Products & Services",
      icon: Package,
      total: stats.products.total,
      published: stats.products.total,
      draft: 0,
      href: "/admin/products-services",
      color: "bg-purple-500",
    },
    {
      title: "Project References",
      icon: FolderOpen,
      total: stats.references.total,
      published: stats.references.total,
      draft: 0,
      href: "/admin/references",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your website.
          </p>
        </div>
        <Button
          as={Link}
          href="/"
          target="_blank"
          variant="bordered"
          startContent={<Eye size={20} />}>
          View Website
        </Button>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                as={Link}
                href={action.href}
                color={action.color}
                variant="flat"
                size="lg"
                startContent={<action.icon size={20} />}
                className="h-16 justify-start">
                {action.label}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon size={24} className="text-white" />
                </div>
                <Button
                  as={Link}
                  href={card.href}
                  isIconOnly
                  variant="light"
                  size="sm">
                  <Eye size={16} />
                </Button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.total}
                  </span>
                  <div className="flex space-x-2">
                    <Chip size="sm" color="success" variant="flat">
                      {card.published} Published
                    </Chip>
                    {card.draft > 0 && (
                      <Chip size="sm" color="warning" variant="flat">
                        {card.draft} Draft
                      </Chip>
                    )}
                  </div>
                </div>

                <Progress
                  value={(card.published / card.total) * 100}
                  color="success"
                  size="sm"
                  className="w-full"
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent News & Events</h2>
            <Button
              as={Link}
              href="/admin/news-events"
              variant="light"
              size="sm"
              endContent={<TrendingUp size={16} />}>
              View All
            </Button>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {/* Mock recent news items */}
              {[
                {
                  title: "New Safety Standards Implementation",
                  status: "published",
                  date: "2 days ago",
                },
                {
                  title: "Green Technology Initiative",
                  status: "draft",
                  date: "1 week ago",
                },
                {
                  title: "Regional Expansion Announcement",
                  status: "published",
                  date: "2 weeks ago",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.date}
                    </p>
                  </div>
                  <Chip
                    size="sm"
                    color={item.status === "published" ? "success" : "warning"}
                    variant="flat">
                    {item.status}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Website Analytics</h2>
            <Button
              variant="light"
              size="sm"
              endContent={<BarChart3 size={16} />}>
              View Details
            </Button>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Page Views (This Month)
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  12,543
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Unique Visitors
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  8,921
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Contact Form Submissions
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  47
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Bounce Rate
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  23%
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

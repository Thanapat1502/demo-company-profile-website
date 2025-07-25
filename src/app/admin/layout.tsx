"use client";

import { useEffect, useState, useCallback } from "react";

// Force dynamic rendering for all admin pages
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import {
  Spinner,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  FolderOpen,
  Settings,
  LogOut,
  User,
} from "lucide-react";
// import { authService } from "@/service/apiRequest/auth";
// import type { User as SupabaseUser } from "@supabase/supabase-js";
import { AdminThemeProvider } from "@/components/providers/AdminThemeProvider";
import ThemeToggle from "@/components/admin/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "ข่าวสารและกิจกรรม", href: "/admin/news-events" },
  { icon: Users, label: "คณะกรรมการบริหาร", href: "/admin/board-members" },
  {
    icon: Package,
    label: "ผลิตภัณฑ์และบริการ",
    href: "/admin/products-services",
  },
  { icon: FolderOpen, label: "ผลงาน", href: "/admin/references" },
  { icon: Settings, label: "การตั้งค่า", href: "/admin/settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  // const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      // Temporary placeholder for build
      setLoading(false);
      // const { user: currentUser } = await authService.getUser();
      // if (!currentUser) {
      //   router.push("/admin/login");
      // } else {
      //   setUser(currentUser);
      // }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    // const {
    //   data: { subscription },
    // } = authService.onAuthStateChange((event, session) => {
    //   if (event === "SIGNED_OUT" || !session) {
    //     setUser(null);
    //     router.push("/admin/login");
    //   } else if (session?.user) {
    //     setUser(session.user);
    //   }
    // });

    // return () => subscription.unsubscribe();
  }, [router, checkAuth]);

  const handleSignOut = async () => {
    try {
      // await authService.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Temporarily disable auth check for development
  // if (!user) {
  //   return null; // Will redirect to login
  // }

  return (
    <AdminThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Navigation */}
        <Navbar className="border-b border-gray-200 dark:border-gray-700">
          <NavbarBrand>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PDS</span>
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          </NavbarBrand>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeToggle />
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    size="sm"
                    src={""}
                    name={"Admin"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu">
                  <DropdownItem key="profile" startContent={<User size={16} />}>
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    startContent={<Settings size={16} />}>
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut size={16} />}
                    onPress={handleSignOut}>
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </AdminThemeProvider>
  );
}

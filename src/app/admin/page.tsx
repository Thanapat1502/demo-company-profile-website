"use client";
import React, { useState } from "react";
import {
  Image,
  Settings,
  Users,
  Package,
  Newspaper,
  Phone,
  Type,
  Menu,
  X,
  Globe,
  LogOut,
} from "lucide-react";
import { NewsManager } from "./(component)/newsManager";
import { ProductManager } from "./(component)/productManager";
import { ServiceManager } from "./(component)/serviceManager";
import { ContentManager } from "./(component)/contentManager";
import { TextManager } from "./(component)/textManager";
import { LanguageToggle } from "./(component)/languageToggle";
import { PartnerManager } from "./(component)/partner";
import { ExecutiveManager } from "./(component)/executive";
import { ContactManager } from "./(component)/contact";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/ToastContainer";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("content");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { id: "content", label: "Content Manager", icon: Image },
    { id: "services", label: "Service Manager", icon: Settings },
    { id: "products", label: "Product Manager", icon: Package },
    { id: "reference", label: "Reference Manager", icon: Package },
    { id: "executives", label: "Executive Manager", icon: Users },
    { id: "partners", label: "Partner Manager", icon: Globe },
    { id: "news", label: "News/Event Manager", icon: Newspaper },
    { id: "contact", label: "Contact Manager", icon: Phone },
    { id: "text", label: "Text Manager", icon: Type },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "content":
        return <ContentManager />;
      case "services":
        return <ServiceManager />;
      case "products":
        return <ProductManager activeLanguage={currentLanguage} />;
      case "reference":
        return null; //<ReferenceManager />;
      case "news":
        return <NewsManager />;
      case "text":
        return <TextManager />;
      case "executives":
        return <ExecutiveManager />;
      case "contact":
        return <ContactManager />;
      case "partners":
        return <PartnerManager />;
      default:
        return <ContentManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}>
                    <Icon size={20} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@company.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className="text-blue-600" size={24} />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Corporate Website Admin
                </h2>
                <p className="text-sm text-gray-500">
                  Manage bilingual content and settings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Global Language:</span>
                <LanguageToggle
                  value={currentLanguage}
                  onChange={setCurrentLanguage}
                />
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                View Website
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 mt-6 overflow-auto">{renderSection()}</main>
      </div>
    </div>
  );
};

export default function ProtectedAdminDashboard() {
  return (
    <ProtectedRoute>
      <ToastProvider position="top-right" maxToasts={5}>
        <AdminDashboard />
      </ToastProvider>
    </ProtectedRoute>
  );
}

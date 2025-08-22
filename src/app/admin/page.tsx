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
  FileText,
  Search,
} from "lucide-react";
import { NewsManager } from "./(component)/newsManager";
import { ProductManager } from "./(component)/productManager";
import { ServiceManager } from "./(component)/serviceManager";
import { ContentManager } from "./(component)/heroContentManagerNew";
import { TextManager } from "./(component)/textManager";
import { LanguageToggle } from "./(component)/languageToggle";
import { PartnerManager } from "./(component)/partner";
import { ExecutiveManager } from "./(component)/executive";
import { ContactManager } from "./(component)/contact";
// Removed auth dependencies for demo mode
import { ToastProvider } from "@/components/ui/ToastContainer";
import { ReferenceManager } from "./(component)/referenceManager";
import { SettingsMenu } from "./(component)/SettingsMenu";
import SEOManager from "@/components/admin/SEOManager";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("content");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  // Removed user auth for demo mode

  const menuItems = [
    { id: "content", label: "Content Management", icon: Image },
    { id: "services", label: "Services Management", icon: Settings },
    { id: "products", label: "Products Management", icon: Package },
    { id: "reference", label: "References Management", icon: FileText },
    { id: "executives", label: "Executives Management", icon: Users },
    { id: "partners", label: "Partners Management", icon: Globe },
    { id: "news", label: "News Management", icon: Newspaper },
    { id: "contact", label: "Contact Management", icon: Phone },
    { id: "text", label: "Text Management", icon: Type },
    { id: "seo", label: "SEO Management", icon: Search },
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
        return <ReferenceManager />;
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
      case "seo":
        return <SEOManager />;
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
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">OIL</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  OIL DEVELOPMENT Admin Panel
                </h2>
                <p className="text-sm text-gray-500">
                  จัดการเนื้อหาเว็บไซต์และการตั้งค่า
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>ภาษาเว็บไซต์:</span>
                <LanguageToggle
                  value={currentLanguage}
                  onChange={setCurrentLanguage}
                />
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                onClick={() => window.open("/", "_blank")}>
                View Website
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  admin@oildevelopment.com
                </span>
                <button
                  onClick={() => setShowSettingsMenu(true)}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm transition-colors">
                  <Settings size={16} />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 mt-6 overflow-auto">{renderSection()}</main>
      </div>

      {/* Settings Menu */}
      <SettingsMenu
        isOpen={showSettingsMenu}
        onClose={() => setShowSettingsMenu(false)}
        userEmail="admin@oildevelopment.com"
      />
    </div>
  );
};

export default function AdminDashboardPage() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <AdminDashboard />
    </ToastProvider>
  );
}

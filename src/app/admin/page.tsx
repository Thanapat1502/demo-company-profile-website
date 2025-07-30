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

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("content");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");

  const menuItems = [
    { id: "content", label: "Content Manager", icon: Image },
    { id: "services", label: "Service Manager", icon: Settings },
    { id: "products", label: "Product Manager", icon: Package },
    { id: "executives", label: "Executive Manager", icon: Users },
    { id: "partners", label: "Partner Manager", icon: Globe },
    { id: "news", label: "News/Event Manager", icon: Newspaper },
    { id: "contact", label: "Contact Manager", icon: Phone },
    { id: "text", label: "Text Manager", icon: Type },
  ];

  // const LanguageToggle = ({ value, onChange, size = "default" }) => {
  //   const isLarge = size === "large";
  //   return (
  //     <div
  //       className={`inline-flex rounded-lg border bg-gray-50 p-1 ${
  //         isLarge ? "text-sm" : "text-xs"
  //       }`}>
  //       <button
  //         className={`px-3 py-1 rounded-md font-medium transition-colors ${
  //           value === "th"
  //             ? "bg-blue-600 text-white shadow-sm"
  //             : "text-gray-600 hover:text-gray-900"
  //         }`}
  //         onClick={() => onChange("th")}>
  //         ไทย
  //       </button>
  //       <button
  //         className={`px-3 py-1 rounded-md font-medium transition-colors ${
  //           value === "en"
  //             ? "bg-blue-600 text-white shadow-sm"
  //             : "text-gray-600 hover:text-gray-900"
  //         }`}
  //         onClick={() => onChange("en")}>
  //         EN
  //       </button>
  //     </div>
  //   );
  // };

  // const BilingualInput = ({
  //   label,
  //   value,
  //   onChange,
  //   type = "text",
  //   placeholder,
  // }) => {
  //   const [activeTab, setActiveTab] = useState("th");

  //   return (
  //     <div className="space-y-2">
  //       <div className="flex items-center justify-between">
  //         <label className="block text-sm font-medium text-gray-700">
  //           {label}
  //         </label>
  //         <LanguageToggle value={activeTab} onChange={setActiveTab} />
  //       </div>

  //       <div className="relative">
  //         {type === "textarea" ? (
  //           <textarea
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             rows="3"
  //             placeholder={placeholder?.[activeTab]}
  //             value={value?.[activeTab] || ""}
  //             onChange={(e) =>
  //               onChange({ ...value, [activeTab]: e.target.value })
  //             }
  //           />
  //         ) : (
  //           <input
  //             type={type}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             placeholder={placeholder?.[activeTab]}
  //             value={value?.[activeTab] || ""}
  //             onChange={(e) =>
  //               onChange({ ...value, [activeTab]: e.target.value })
  //             }
  //           />
  //         )}
  //         <div className="absolute -top-1 right-2 bg-white px-1 text-xs text-gray-500">
  //           {activeTab === "th" ? "ภาษาไทย" : "English"}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const ContentManager = () => {
  //   const [selectedPage, setSelectedPage] = useState("home");
  //   const pages = ["home", "about", "news", "contact"];

  //   return (
  //     <div className="space-y-6">
  //       <div className="flex items-center justify-between">
  //         <h2 className="text-2xl font-bold text-gray-900">Content Manager</h2>
  //         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
  //           <Save size={16} />
  //           Save Changes
  //         </button>
  //       </div>

  //       <div className="bg-white rounded-lg shadow-sm border">
  //         <div className="border-b border-gray-200">
  //           <nav className="flex space-x-8 px-6">
  //             {pages.map((page) => (
  //               <button
  //                 key={page}
  //                 className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
  //                   selectedPage === page
  //                     ? "border-blue-500 text-blue-600"
  //                     : "border-transparent text-gray-500 hover:text-gray-700"
  //                 }`}
  //                 onClick={() => setSelectedPage(page)}>
  //                 {page} Page
  //               </button>
  //             ))}
  //           </nav>
  //         </div>

  //         <div className="p-6 space-y-6">
  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //             <div className="space-y-4">
  //               <h3 className="text-lg font-semibold text-gray-900">
  //                 Hero Section
  //               </h3>
  //               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
  //                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
  //                 <div className="mt-2">
  //                   <button className="text-blue-600 hover:text-blue-500">
  //                     Upload hero image
  //                   </button>
  //                   <p className="text-gray-500 text-sm mt-1">
  //                     PNG, JPG up to 10MB
  //                   </p>
  //                 </div>
  //               </div>
  //               <BilingualInput
  //                 label="Hero Title"
  //                 placeholder={{ th: "หัวข้อหลัก", en: "Main heading" }}
  //               />
  //               <BilingualInput
  //                 label="Hero Description"
  //                 type="textarea"
  //                 placeholder={{ th: "คำอธิบาย", en: "Description" }}
  //               />
  //             </div>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-semibold text-gray-900">
  //                 Section Images
  //               </h3>
  //               {[1, 2, 3].map((section) => (
  //                 <div
  //                   key={section}
  //                   className="border border-gray-200 rounded-lg p-4">
  //                   <div className="flex items-center justify-between mb-3">
  //                     <span className="font-medium">Section {section}</span>
  //                     <button className="text-blue-600 hover:text-blue-700 text-sm">
  //                       Replace
  //                     </button>
  //                   </div>
  //                   <div className="bg-gray-100 rounded h-20 flex items-center justify-center">
  //                     <span className="text-gray-500 text-sm">
  //                       Image placeholder
  //                     </span>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const ServiceManager = () => {
  //   const [services, setServices] = useState([
  //     {
  //       id: 1,
  //       name: { th: "บริการ A", en: "Service A" },
  //       displayMode: "parallax",
  //     },
  //     {
  //       id: 2,
  //       name: { th: "บริการ B", en: "Service B" },
  //       displayMode: "gallery",
  //     },
  //   ]);

  //   return (
  //     <div className="space-y-6">
  //       <div className="flex items-center justify-between">
  //         <h2 className="text-2xl font-bold text-gray-900">Service Manager</h2>
  //         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
  //           <Plus size={16} />
  //           Add Service
  //         </button>
  //       </div>

  //       <div className="grid gap-6">
  //         {services.map((service) => (
  //           <div
  //             key={service.id}
  //             className="bg-white rounded-lg shadow-sm border p-6">
  //             <div className="flex items-center justify-between mb-4">
  //               <h3 className="text-lg font-semibold">Service #{service.id}</h3>
  //               <div className="flex gap-2">
  //                 <button className="text-blue-600 hover:text-blue-700">
  //                   <Edit size={16} />
  //                 </button>
  //                 <button className="text-red-600 hover:text-red-700">
  //                   <Trash2 size={16} />
  //                 </button>
  //               </div>
  //             </div>

  //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //               <div className="space-y-4">
  //                 <BilingualInput
  //                   label="Service Name"
  //                   value={service.name}
  //                   placeholder={{ th: "ชื่อบริการ", en: "Service name" }}
  //                 />
  //                 <BilingualInput
  //                   label="Description"
  //                   type="textarea"
  //                   placeholder={{
  //                     th: "รายละเอียดบริการ",
  //                     en: "Service description",
  //                   }}
  //                 />
  //               </div>

  //               <div className="space-y-4">
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700 mb-2">
  //                     Display Mode
  //                   </label>
  //                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
  //                     <option value="parallax">Parallax Image</option>
  //                     <option value="gallery">Image Gallery</option>
  //                     <option value="video">Video Embed</option>
  //                   </select>
  //                 </div>

  //                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
  //                   <Upload className="mx-auto h-8 w-8 text-gray-400" />
  //                   <p className="text-sm text-gray-500 mt-1">Upload media</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // const ProductManager = () => {
  //   const [products, setProducts] = useState([
  //     { id: 1, name: { th: "ผลิตภัณฑ์ A", en: "Product A" }, available: true },
  //     { id: 2, name: { th: "ผลิตภัณฑ์ B", en: "Product B" }, available: false },
  //   ]);

  //   return (
  //     <div className="space-y-6">
  //       <div className="flex items-center justify-between">
  //         <h2 className="text-2xl font-bold text-gray-900">Product Manager</h2>
  //         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
  //           <Plus size={16} />
  //           Add Product
  //         </button>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {products.map((product) => (
  //           <div
  //             key={product.id}
  //             className="bg-white rounded-lg shadow-sm border overflow-hidden">
  //             <div className="aspect-video bg-gray-100 flex items-center justify-center">
  //               <span className="text-gray-500">Product Image</span>
  //             </div>

  //             <div className="p-4 space-y-3">
  //               <div className="flex items-center justify-between">
  //                 <span className="font-medium">{product.name.en}</span>
  //                 <div className="flex items-center gap-2">
  //                   {product.available ? (
  //                     <Eye className="text-green-600" size={16} />
  //                   ) : (
  //                     <EyeOff className="text-gray-400" size={16} />
  //                   )}
  //                   <span
  //                     className={`text-xs px-2 py-1 rounded-full ${
  //                       product.available
  //                         ? "bg-green-100 text-green-800"
  //                         : "bg-gray-100 text-gray-800"
  //                     }`}>
  //                     {product.available ? "Available" : "Unavailable"}
  //                   </span>
  //                 </div>
  //               </div>

  //               <div className="flex gap-2">
  //                 <button className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
  //                   Edit
  //                 </button>
  //                 <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
  //                   Delete
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // const NewsManager = () => {
  //   const [selectedLanguage, setSelectedLanguage] = useState("th");

  //   return (
  //     <div className="space-y-6">
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center gap-4">
  //           <h2 className="text-2xl font-bold text-gray-900">
  //             News/Event Manager
  //           </h2>
  //           <LanguageToggle
  //             value={selectedLanguage}
  //             onChange={setSelectedLanguage}
  //             size="large"
  //           />
  //         </div>
  //         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
  //           <Plus size={16} />
  //           Add Article
  //         </button>
  //       </div>

  //       <div className="bg-white rounded-lg shadow-sm border">
  //         <div className="p-6 space-y-6">
  //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //             <div className="lg:col-span-1 space-y-4">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">
  //                   Title ({selectedLanguage === "th" ? "ไทย" : "English"})
  //                 </label>
  //                 <input
  //                   type="text"
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                   placeholder={
  //                     selectedLanguage === "th" ? "หัวข้อข่าว" : "News title"
  //                   }
  //                 />
  //               </div>

  //               <div className="flex items-center gap-2">
  //                 <input type="checkbox" id="highlight" className="rounded" />
  //                 <label htmlFor="highlight" className="text-sm text-gray-700">
  //                   Highlight this article
  //                 </label>
  //               </div>

  //               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
  //                 <Upload className="mx-auto h-8 w-8 text-gray-400" />
  //                 <p className="text-sm text-gray-500 mt-1">Featured image</p>
  //               </div>
  //             </div>

  //             <div className="lg:col-span-2">
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Content ({selectedLanguage === "th" ? "ไทย" : "English"})
  //               </label>
  //               <div className="border border-gray-300 rounded-md min-h-96 bg-gray-50 flex items-center justify-center">
  //                 <div className="text-center text-gray-500">
  //                   <Type size={32} className="mx-auto mb-2" />
  //                   <p>Rich text editor would be here</p>
  //                   <p className="text-sm">(React18QuillEditor)</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="flex justify-end gap-3">
  //             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
  //               Save as Draft
  //             </button>
  //             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  //               Publish
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const TextManager = () => {
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedLanguage, setSelectedLanguage] = useState("both");

  //   const mockI18nData = [
  //     { key: "home.title.th", value: "หน้าแรก", lang: "th" },
  //     { key: "home.title.en", value: "Home", lang: "en" },
  //     { key: "about.description.th", value: "เกี่ยวกับเรา", lang: "th" },
  //     { key: "about.description.en", value: "About Us", lang: "en" },
  //   ];

  //   return (
  //     <div className="space-y-6">
  //       <div className="flex items-center justify-between">
  //         <h2 className="text-2xl font-bold text-gray-900">Text Manager</h2>
  //         <div className="flex gap-3">
  //           <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
  //             <Download size={16} />
  //             Export
  //           </button>
  //           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
  //             <Upload size={16} />
  //             Import
  //           </button>
  //         </div>
  //       </div>

  //       <div className="bg-white rounded-lg shadow-sm border">
  //         <div className="p-4 border-b border-gray-200">
  //           <div className="flex gap-4">
  //             <div className="flex-1 relative">
  //               <Search
  //                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
  //                 size={16}
  //               />
  //               <input
  //                 type="text"
  //                 placeholder="Search by key or value..."
  //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //               />
  //             </div>
  //             <select
  //               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               value={selectedLanguage}
  //               onChange={(e) => setSelectedLanguage(e.target.value)}>
  //               <option value="both">Both Languages</option>
  //               <option value="th">Thai Only</option>
  //               <option value="en">English Only</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="divide-y divide-gray-200">
  //           {mockI18nData.map((item, index) => (
  //             <div key={index} className="p-4 hover:bg-gray-50">
  //               <div className="flex items-center justify-between">
  //                 <div className="flex-1 grid grid-cols-3 gap-4">
  //                   <div>
  //                     <span className="text-sm font-mono text-gray-600">
  //                       {item.key}
  //                     </span>
  //                   </div>
  //                   <div className="flex-1">
  //                     <input
  //                       type="text"
  //                       value={item.value}
  //                       className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
  //                     />
  //                   </div>
  //                   <div className="flex items-center justify-between">
  //                     <span
  //                       className={`px-2 py-1 rounded text-xs ${
  //                         item.lang === "th"
  //                           ? "bg-blue-100 text-blue-800"
  //                           : "bg-green-100 text-green-800"
  //                       }`}>
  //                       {item.lang === "th" ? "ไทย" : "EN"}
  //                     </span>
  //                     <button className="text-blue-600 hover:text-blue-700 text-sm">
  //                       Save
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSection = () => {
    switch (activeSection) {
      case "content":
        return <ContentManager />;
      case "services":
        return <ServiceManager />;
      case "products":
        return <ProductManager activeLanguage={currentLanguage} />;
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
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 mt-6 overflow-auto">{renderSection()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;

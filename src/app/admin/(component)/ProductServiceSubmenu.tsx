import React, { useState } from "react";
import { ChevronDown, ChevronRight, Settings, Image, Video } from "lucide-react";

interface ProductServiceSubmenuProps {
  onSectionSelect: (section: string) => void;
  activeSection: string;
}

export const ProductServiceSubmenu: React.FC<ProductServiceSubmenuProps> = ({
  onSectionSelect,
  activeSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const submenuItems = [
    {
      id: "hero",
      title: "Hero Section",
      icon: <Image className="w-4 h-4" />,
      description: "Main banner and introduction",
    },
    {
      id: "service-1",
      title: "Service 1",
      icon: <Settings className="w-4 h-4" />,
      description: "First service section",
    },
    {
      id: "service-2",
      title: "Service 2", 
      icon: <Settings className="w-4 h-4" />,
      description: "Second service section",
    },
    {
      id: "service-3",
      title: "Service 3",
      icon: <Settings className="w-4 h-4" />,
      description: "Third service section",
    },
    {
      id: "service-4",
      title: "Service 4",
      icon: <Video className="w-4 h-4" />,
      description: "Fourth service section",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Products & Services</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200">
          {submenuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center space-x-3 p-3 cursor-pointer transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 border-r-2 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSectionSelect(item.id)}
            >
              <div className="ml-4">{item.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { MapPin, Calendar, Edit, Trash2, Building, Fuel, Wrench } from "lucide-react";
import { Reference } from "@/store/zustand/referenceStore";
import { formatSupabaseDate } from "@/utils/dateFormatter";

interface ReferenceItemCardProps {
  item: Reference;
  onEdit: (item: Reference) => void;
  onDelete: (id: string) => void;
}

const ReferenceItemCard: React.FC<ReferenceItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  // Determine the type and styling based on type_en
  const isServiceStation = item.type_en?.toLowerCase().includes("service station");
  const isPermatank = item.type_en?.toLowerCase().includes("permatank");

  // Get type-specific styling and icon
  const getTypeConfig = () => {
    if (isServiceStation) {
      return {
        icon: Fuel,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-600",
        badgeColor: "bg-blue-100 text-blue-800",
        hoverShadow: "hover:shadow-blue-100",
      };
    } else if (isPermatank) {
      return {
        icon: Building,
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        iconColor: "text-green-600",
        badgeColor: "bg-green-100 text-green-800",
        hoverShadow: "hover:shadow-green-100",
      };
    } else {
      return {
        icon: Wrench,
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        iconColor: "text-gray-600",
        badgeColor: "bg-gray-100 text-gray-800",
        hoverShadow: "hover:shadow-gray-100",
      };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  return (
    <div
      className={`bg-white border ${typeConfig.borderColor} rounded-lg overflow-hidden hover:shadow-lg ${typeConfig.hoverShadow} transition-all duration-300`}>
      {/* Header with type indicator */}
      <div className={`${typeConfig.bgColor} px-4 py-2 border-b ${typeConfig.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TypeIcon size={16} className={typeConfig.iconColor} />
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeConfig.badgeColor}`}>
              {item.type_en}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {formatSupabaseDate(item.open_at)}
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 relative">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.name_en}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <TypeIcon size={32} className="text-gray-400" />
          </div>
        )}
        
        {/* Gallery indicator */}
        {item.galleries && item.galleries.length > 0 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            +{item.galleries.length} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Project Name */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {item.name_en}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {item.name_th}
        </p>

        {/* Location */}
        <div className="flex items-start text-gray-500 text-xs mb-3">
          <MapPin size={12} className="mr-1 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="line-clamp-1">{item.location_en}</div>
            {item.location_th && (
              <div className="line-clamp-1 text-gray-400">{item.location_th}</div>
            )}
          </div>
        </div>

        {/* Type-specific additional info */}
        {isServiceStation && (
          <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
            <div className="flex items-center gap-1 text-blue-700">
              <Fuel size={10} />
              <span className="font-medium">Fuel Station</span>
            </div>
            <div className="text-blue-600 mt-1">
              Underground storage tank system
            </div>
          </div>
        )}

        {isPermatank && (
          <div className="mb-3 p-2 bg-green-50 rounded text-xs">
            <div className="flex items-center gap-1 text-green-700">
              <Building size={10} />
              <span className="font-medium">PERMATANK System</span>
            </div>
            <div className="text-green-600 mt-1">
              Double-wall storage solution
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
            <Edit size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceItemCard;

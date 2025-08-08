import React, { useState } from "react";
import { Filter, Grid, List, Search } from "lucide-react";
import { Reference } from "@/store/zustand/referenceStore";
import ReferenceItemCard from "./ReferenceItemCard";

interface ReferenceListProps {
  references: Reference[];
  loading: boolean;
  onEdit: (item: Reference) => void;
  onDelete: (id: string) => void;
}

const ReferenceList: React.FC<ReferenceListProps> = ({
  references,
  loading,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "service-station" | "permatank">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter references based on search and type
  const filteredReferences = references?.filter((item) => {
    const matchesSearch = 
      item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location_th.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = 
      filterType === "all" ||
      (filterType === "service-station" && item.type_en?.toLowerCase().includes("service station")) ||
      (filterType === "permatank" && item.type_en?.toLowerCase().includes("permatank"));

    return matchesSearch && matchesType;
  }) || [];

  // Get statistics
  const stats = {
    total: references?.length || 0,
    serviceStations: references?.filter(item => 
      item.type_en?.toLowerCase().includes("service station")
    ).length || 0,
    permatanks: references?.filter(item => 
      item.type_en?.toLowerCase().includes("permatank")
    ).length || 0,
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading references...</p>
      </div>
    );
  }

  if (!references || references.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No references found
        </h3>
        <p className="text-gray-500">
          Start by adding your first reference project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Service Stations</p>
              <p className="text-2xl font-bold text-blue-900">{stats.serviceStations}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">PERMATANK</p>
              <p className="text-2xl font-bold text-green-900">{stats.permatanks}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search references..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="service-station">Service Stations</option>
              <option value="permatank">PERMATANK</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredReferences.length} of {stats.total} references
        {searchTerm && ` for "${searchTerm}"`}
        {filterType !== "all" && ` (${filterType.replace("-", " ")})`}
      </div>

      {/* Reference Grid/List */}
      {filteredReferences.length > 0 ? (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredReferences.map((item) => (
            <ReferenceItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No references match your criteria
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReferenceList;

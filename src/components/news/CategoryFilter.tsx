"use client";

import { Category } from "@/store/zustand/newsStore";
import { getBilingualCategory } from "@/utils/bilingual";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  locale: string;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  locale,
}: CategoryFilterProps) {
  // Add "All" category and ensure no duplicates
  const allCategory = {
    id: "all",
    cat_th: "ทั้งหมด",
    cat_en: "All",
  };

  // Filter out any existing "all" categories to prevent duplicates
  const filteredCategories = categories.filter((cat) => cat.id !== "all");
  const allCategories = [allCategory, ...filteredCategories];

  return (
    <div className="flex gap-2 flex-wrap justify-center lg:justify-end">
      {allCategories.map((category) => {
        const categoryName =
          category.id === "all"
            ? locale === "th"
              ? "ทั้งหมด"
              : "All"
            : getBilingualCategory(category, locale);

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
            }`}>
            {categoryName}
          </button>
        );
      })}
    </div>
  );
}

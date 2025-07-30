import React, { useState } from "react";
import { Plus, Eye, EyeOff } from "lucide-react";
export const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: { th: "ผลิตภัณฑ์ A", en: "Product A" }, available: true },
    { id: 2, name: { th: "ผลิตภัณฑ์ B", en: "Product B" }, available: false },
  ]);

  const openAddModal = () => {
    //ADD Logic to open modal for adding a new product
  };
  const openEditModal = () => {
    //ADD Logic to open modal for editing a product
  };
  const openDeleteModal = () => {
    //ADD Logic to open modal for deleting a product
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Manager</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={openAddModal}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.name.en}</span>
                <div className="flex items-center gap-2">
                  {product.available ? (
                    <Eye className="text-green-600" size={16} />
                  ) : (
                    <EyeOff className="text-gray-400" size={16} />
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.available
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {product.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  onClick={openEditModal}>
                  Edit
                </button>
                <button
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                  onClick={openDeleteModal}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

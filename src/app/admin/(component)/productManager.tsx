import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Eye, EyeOff, X, Upload, Edit, Trash2 } from "lucide-react";
import { BilingualInput } from "./languageToggle";

type Product = {
  id: number;
  name: { th: string; en: string };
  description: { th: string; en: string };
  image: string | null;
  available: boolean;
};

type FormValues = {
  name: { th: string; en: string };
  description: { th: string; en: string };
  image: string | null;
  available: boolean;
};

export const ProductManager = (props: { activeLanguage: string }) => {
  const { activeLanguage } = props;
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: { th: "ผลิตภัณฑ์ A", en: "Product A" },
      description: { th: "รายละเอียดผลิตภัณฑ์ A", en: "Product A description" },
      image: null,
      available: true,
    },
    {
      id: 2,
      name: { th: "ผลิตภัณฑ์ B", en: "Product B" },
      description: { th: "รายละเอียดผลิตภัณฑ์ B", en: "Product B description" },
      image: null,
      available: false,
    },
  ]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedProduct: Product | null;
  }>({
    isOpen: false,
    type: "",
    selectedProduct: null,
  });

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: { th: "", en: "" },
      description: { th: "", en: "" },
      image: null,
      available: true,
    },
  });

  // Watch image and available for UI
  const image = watch("image");
  const available = watch("available");

  const openAddModal = () => {
    reset({
      name: { th: "", en: "" },
      description: { th: "", en: "" },
      image: null,
      available: true,
    });
    setModalState({ isOpen: true, type: "add", selectedProduct: null });
  };

  const openEditModal = (product: Product) => {
    reset({
      name: product.name,
      description: product.description,
      image: product.image,
      available: product.available,
    });
    setModalState({ isOpen: true, type: "edit", selectedProduct: product });
  };

  const openDeleteModal = (product: Product) => {
    setModalState({ isOpen: true, type: "delete", selectedProduct: product });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", selectedProduct: null });
    reset();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setValue("image", ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (modalState.type === "add") {
      const newProduct: Product = {
        id: Date.now(),
        ...data,
      };
      setProducts((prev) => [...prev, newProduct]);
    } else if (modalState.type === "edit" && modalState.selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === modalState.selectedProduct!.id
            ? { ...modalState.selectedProduct!, ...data }
            : p
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modalState.selectedProduct) {
      setProducts((prev) =>
        prev.filter((p) => p.id !== modalState.selectedProduct!.id)
      );
    }
    closeModal();
  };

  const toggleAvailability = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  // Modal Component
  const Modal = () => {
    if (!modalState.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalState.type === "add" && "Add New Product"}
              {modalState.type === "edit" && "Edit Product"}
              {modalState.type === "delete" && "Delete Product"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {modalState.type === "delete" ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {`Are you sure you want to delete "${modalState.selectedProduct?.name.th}"? This action cannot be undone.`}
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="space-y-3">
                    {image ? (
                      <div className="relative">
                        <img
                          src={image}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => setValue("image", null)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <label className="cursor-pointer">
                              <span className="text-blue-600 hover:text-blue-500">
                                Upload an image
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                            <p className="text-gray-500 text-sm mt-1">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Product Name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "ชื่อผลิตภัณฑ์", en: "Product name" }}
                    />
                  )}
                />

                {/* Description */}
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Description"
                      type="textarea"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{
                        th: "รายละเอียดผลิตภัณฑ์",
                        en: "Product description",
                      }}
                    />
                  )}
                />

                {/* Availability Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Product Availability
                  </label>
                  <Controller
                    name="available"
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          field.value ? "bg-blue-600" : "bg-gray-200"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            field.value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalState.type === "add" ? "Add Product" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
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
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name.en}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Product Image</span>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">
                    {activeLanguage === "th"
                      ? product.name.th
                      : product.name.en}
                  </h3>
                  <button
                    onClick={() => toggleAvailability(product.id)}
                    className="flex items-center gap-1">
                    {product.available ? (
                      <Eye className="text-green-600" size={16} />
                    ) : (
                      <EyeOff className="text-gray-400" size={16} />
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {activeLanguage === "th"
                    ? product.description.th
                    : product.description.en}
                </p>

                <div className="flex items-center justify-between">
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
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
                  onClick={() => openEditModal(product)}>
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  className="px-3 py-2 border border-red-300 text-red-700 rounded text-sm hover:bg-red-50 flex items-center justify-center"
                  onClick={() => openDeleteModal(product)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal />
    </div>
  );
};

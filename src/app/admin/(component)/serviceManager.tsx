import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Home,
  Briefcase,
  Upload,
  Save,
  X,
  Edit,
  ImageIcon,
  PlayCircle,
} from "lucide-react";

// Types
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: File | string | null;
  learnMoreUrl?: string;
}

interface HomePageData {
  title: string;
  description: string;
  image: File | string | null;
  serviceItems: ServiceItem[];
}

interface ServiceSection {
  id: number;
  title: string;
  description: string;
  mode: "parallax" | "video";
  images: (File | string)[];
  videoUrl: string;
}

interface FormValues {
  title: string;
  description: string;
  image: File | string | null;
  serviceTitle?: string;
  serviceDescription?: string;
  learnMoreUrl?: string;
  videoUrl?: string;
}

export const ServiceManager = () => {
  // State management
  const [activeTab, setActiveTab] = useState<"home" | "services">("home");
  const [activeSection, setActiveSection] = useState<number>(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editingServiceItem, setEditingServiceItem] = useState<string | null>(
    null
  );
  const [showAddServiceItem, setShowAddServiceItem] = useState(false);

  // Mock data
  const [homePageData, setHomePageData] = useState<HomePageData>({
    title: "Our Professional Services",
    description:
      "We provide comprehensive construction and engineering services with over 20 years of experience in the industry.",
    image: null,
    serviceItems: [
      {
        id: "1",
        title: "Construction Services",
        description:
          "Complete construction solutions from planning to completion with expert project management",
        image: null,
        learnMoreUrl: "/services/construction",
      },
      {
        id: "2",
        title: "Engineering Consultation",
        description:
          "Professional engineering advice and technical consultation for complex projects",
        image: null,
        learnMoreUrl: "/services/engineering",
      },
      {
        id: "3",
        title: "Project Management",
        description:
          "End-to-end project coordination and management services for optimal results",
        image: null,
        learnMoreUrl: "/services/management",
      },
    ],
  });

  const [serviceSections, setServiceSections] = useState<ServiceSection[]>([
    {
      id: 1,
      title: "Construction Services",
      description:
        "Complete construction solutions from planning to completion",
      mode: "parallax",
      images: [],
      videoUrl: "",
    },
    {
      id: 2,
      title: "Engineering Consultation",
      description: "Expert engineering advice and project consultation",
      mode: "video",
      images: [],
      videoUrl: "https://www.youtube.com/watch?v=example",
    },
    {
      id: 3,
      title: "Project Management",
      description: "Professional project management and coordination",
      mode: "parallax",
      images: [],
      videoUrl: "",
    },
    {
      id: 4,
      title: "Quality Assurance",
      description: "Comprehensive quality control and assurance services",
      mode: "video",
      images: [],
      videoUrl: "",
    },
  ]);

  // Form handling
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>(
    {
      defaultValues: {
        title: "",
        description: "",
        image: null,
        videoUrl: "",
      },
    }
  );

  const watchedValues = watch();

  // Helper functions
  const startEditing = (sectionId?: number) => {
    if (activeTab === "home") {
      setIsEditing(true);
      setValue("title", homePageData.title);
      setValue("description", homePageData.description);
      setValue("image", homePageData.image);
    } else if (sectionId) {
      const section = serviceSections.find((s) => s.id === sectionId);
      if (section) {
        setEditingSection(sectionId);
        setValue("title", section.title);
        setValue("description", section.description);
        setValue("videoUrl", section.videoUrl);
      }
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingSection(null);
    reset();
  };

  const onSubmit = (data: FormValues) => {
    if (activeTab === "home") {
      if (editingServiceItem) {
        // Update existing service item
        setHomePageData((prev) => ({
          ...prev,
          serviceItems: prev.serviceItems.map((item) =>
            item.id === editingServiceItem
              ? {
                  ...item,
                  title: data.serviceTitle || data.title,
                  description: data.serviceDescription || data.description,
                  image: data.image,
                  learnMoreUrl: data.learnMoreUrl,
                }
              : item
          ),
        }));
        setEditingServiceItem(null);
      } else if (showAddServiceItem) {
        // Add new service item
        const newItem: ServiceItem = {
          id: Date.now().toString(),
          title: data.serviceTitle || data.title,
          description: data.serviceDescription || data.description,
          image: data.image,
          learnMoreUrl: data.learnMoreUrl,
        };
        setHomePageData((prev) => ({
          ...prev,
          serviceItems: [...prev.serviceItems, newItem],
        }));
        setShowAddServiceItem(false);
      } else {
        // Update section header
        setHomePageData((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          image: data.image,
        }));
        setIsEditing(false);
      }
    } else if (editingSection) {
      setServiceSections((prev) =>
        prev.map((section) =>
          section.id === editingSection
            ? {
                ...section,
                title: data.title,
                description: data.description,
                videoUrl: data.videoUrl || "",
              }
            : section
        )
      );
      setEditingSection(null);
    }
    reset();
  };

  // Service item management functions
  const startEditingServiceItem = (item: ServiceItem) => {
    setEditingServiceItem(item.id);
    setValue("serviceTitle", item.title);
    setValue("serviceDescription", item.description);
    setValue("image", item.image);
    setValue("learnMoreUrl", item.learnMoreUrl || "");
  };

  const startAddingServiceItem = () => {
    setShowAddServiceItem(true);
    setValue("serviceTitle", "");
    setValue("serviceDescription", "");
    setValue("image", null);
    setValue("learnMoreUrl", "");
  };

  const cancelServiceItemEditing = () => {
    setEditingServiceItem(null);
    setShowAddServiceItem(false);
    reset();
  };

  const deleteServiceItem = (itemId: string) => {
    setHomePageData((prev) => ({
      ...prev,
      serviceItems: prev.serviceItems.filter((item) => item.id !== itemId),
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMultiple = false
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (isMultiple) {
      // Handle multiple images for parallax gallery
      const newImages = Array.from(files);
      if (editingSection) {
        setServiceSections((prev) =>
          prev.map((section) =>
            section.id === editingSection
              ? { ...section, images: [...section.images, ...newImages] }
              : section
          )
        );
      }
    } else {
      // Handle single image
      const file = files[0];
      setValue("image", file);
    }
  };

  const toggleSectionMode = (sectionId: number) => {
    setServiceSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              mode: section.mode === "parallax" ? "video" : "parallax",
            }
          : section
      )
    );
  };

  const removeImage = (sectionId: number, imageIndex: number) => {
    setServiceSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              images: section.images.filter((_, index) => index !== imageIndex),
            }
          : section
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Manager</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage home page services section and product & service pages
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("home")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "home"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              <div className="flex items-center gap-2">
                <Home size={16} />
                Home Page Services
              </div>
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "services"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                Product & Service Pages
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "home" ? (
            /* Home Page Services Section */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Home Page Services Section
                  </h3>
                  <p className="text-sm text-gray-500">
                    Configure the services section displayed on the home page
                  </p>
                </div>
                <button
                  onClick={() => startEditing()}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    isEditing
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}>
                  <Edit size={16} />
                  {isEditing ? "Cancel Edit" : "Edit Section"}
                </button>
              </div>

              {isEditing ? (
                /* Edit Mode */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter section title"
                            />
                            {error && (
                              <p className="text-red-600 text-xs mt-1">
                                {error.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Image
                      </label>
                      <div className="space-y-3">
                        {watchedValues.image && (
                          <div className="relative inline-block">
                            <img
                              src={
                                watchedValues.image instanceof File
                                  ? URL.createObjectURL(watchedValues.image)
                                  : watchedValues.image
                              }
                              alt="Section preview"
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => setValue("image", null)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-fit">
                          <Upload size={16} />
                          {watchedValues.image
                            ? "Change Image"
                            : "Upload Image"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Description
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description is required" }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <textarea
                            {...field}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Enter section description"
                          />
                          {error && (
                            <p className="text-red-600 text-xs mt-1">
                              {error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                /* View Mode */
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Current Title
                      </h4>
                      <p className="text-gray-700">{homePageData.title}</p>

                      <h4 className="font-medium text-gray-900 mb-2 mt-4">
                        Current Description
                      </h4>
                      <p className="text-gray-700">
                        {homePageData.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Current Image
                      </h4>
                      {homePageData.image ? (
                        <img
                          src={
                            homePageData.image instanceof File
                              ? URL.createObjectURL(homePageData.image)
                              : homePageData.image
                          }
                          alt="Section"
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-lg border flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <ImageIcon size={24} className="mx-auto mb-2" />
                            <span className="text-sm">No image uploaded</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Service Items Management */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Service Items
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage individual service cards displayed on the home page
                    </p>
                  </div>
                  <button
                    onClick={startAddingServiceItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <Upload size={16} />
                    Add Service Item
                  </button>
                </div>

                {/* Add New Service Item Form */}
                {showAddServiceItem && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Add New Service Item
                    </h4>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Service Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Title
                          </label>
                          <Controller
                            name="serviceTitle"
                            control={control}
                            rules={{ required: "Service title is required" }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter service title"
                                />
                                {error && (
                                  <p className="text-red-600 text-xs mt-1">
                                    {error.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        {/* Learn More URL */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learn More URL
                          </label>
                          <Controller
                            name="learnMoreUrl"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="/services/construction or https://..."
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* Service Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Description
                        </label>
                        <Controller
                          name="serviceDescription"
                          control={control}
                          rules={{
                            required: "Service description is required",
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <textarea
                                {...field}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Enter service description"
                              />
                              {error && (
                                <p className="text-red-600 text-xs mt-1">
                                  {error.message}
                                </p>
                              )}
                            </>
                          )}
                        />
                      </div>

                      {/* Service Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Image
                        </label>
                        <div className="space-y-3">
                          {watchedValues.image && (
                            <div className="relative inline-block">
                              <img
                                src={
                                  watchedValues.image instanceof File
                                    ? URL.createObjectURL(watchedValues.image)
                                    : watchedValues.image
                                }
                                alt="Service preview"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => setValue("image", null)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                                <X size={14} />
                              </button>
                            </div>
                          )}
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-fit">
                            <Upload size={16} />
                            {watchedValues.image
                              ? "Change Image"
                              : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={cancelServiceItemEditing}
                          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
                          <X size={16} />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                          <Save size={16} />
                          Add Service Item
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Service Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homePageData.serviceItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 cursor-pointer group rounded-lg">
                      {/* Service Image */}
                      {item.image ? (
                        <img
                          src={
                            item.image instanceof File
                              ? URL.createObjectURL(item.image)
                              : item.image
                          }
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <ImageIcon size={48} className="text-gray-400" />
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                      {/* Service content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                        {/* Content container that moves up on hover */}
                        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-8">
                          <div className="space-y-2">
                            {/* Service Title */}
                            <h3 className="text-lg lg:text-xl font-black text-white line-clamp-2 leading-tight">
                              {item.title}
                            </h3>

                            {/* Service Description */}
                            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Learn More Link - Slides up from bottom */}
                        {item.learnMoreUrl && (
                          <div className="absolute bottom-4 left-4 right-4 overflow-hidden">
                            <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
                              <span className="inline-flex items-center gap-2 text-white/90 text-sm font-medium group-hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 hover:bg-black/30 hover:border-white/30">
                                Learn More
                                <PlayCircle className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Edit/Delete Buttons */}
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingServiceItem(item);
                            }}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteServiceItem(item.id);
                            }}
                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Edit Service Item Form */}
                {editingServiceItem && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Edit Service Item:{" "}
                      {
                        homePageData.serviceItems.find(
                          (item) => item.id === editingServiceItem
                        )?.title
                      }
                    </h4>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Service Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Title
                          </label>
                          <Controller
                            name="serviceTitle"
                            control={control}
                            rules={{ required: "Service title is required" }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter service title"
                                />
                                {error && (
                                  <p className="text-red-600 text-xs mt-1">
                                    {error.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        {/* Learn More URL */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learn More URL
                          </label>
                          <Controller
                            name="learnMoreUrl"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="/services/construction or https://..."
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* Service Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Description
                        </label>
                        <Controller
                          name="serviceDescription"
                          control={control}
                          rules={{
                            required: "Service description is required",
                          }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <textarea
                                {...field}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Enter service description"
                              />
                              {error && (
                                <p className="text-red-600 text-xs mt-1">
                                  {error.message}
                                </p>
                              )}
                            </>
                          )}
                        />
                      </div>

                      {/* Service Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Image
                        </label>
                        <div className="space-y-3">
                          {watchedValues.image && (
                            <div className="relative inline-block">
                              <img
                                src={
                                  watchedValues.image instanceof File
                                    ? URL.createObjectURL(watchedValues.image)
                                    : watchedValues.image
                                }
                                alt="Service preview"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => setValue("image", null)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                                <X size={14} />
                              </button>
                            </div>
                          )}
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-fit">
                            <Upload size={16} />
                            {watchedValues.image
                              ? "Change Image"
                              : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={cancelServiceItemEditing}
                          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
                          <X size={16} />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                          <Save size={16} />
                          Update Service Item
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Product & Service Pages */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Product & Service Pages
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage 4 service sections with parallax galleries and videos
                  </p>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {serviceSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      activeSection === section.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}>
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          section.mode === "parallax"
                            ? "bg-green-100 text-green-600"
                            : "bg-purple-100 text-purple-600"
                        }`}>
                        {section.mode === "parallax" ? (
                          <ImageIcon size={16} />
                        ) : (
                          <PlayCircle size={16} />
                        )}
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">
                        Section {section.id}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {section.title}
                      </p>
                      <div
                        className={`mt-2 px-2 py-1 rounded text-xs font-medium ${
                          section.mode === "parallax"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}>
                        {section.mode === "parallax" ? "Parallax" : "Video"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Section Content */}
              {(() => {
                const currentSection = serviceSections.find(
                  (s) => s.id === activeSection
                );
                if (!currentSection) return null;

                return (
                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Section {currentSection.id}: {currentSection.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {currentSection.description}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleSectionMode(currentSection.id)}
                          className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            currentSection.mode === "parallax"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          }`}>
                          {currentSection.mode === "parallax" ? (
                            <ImageIcon size={16} />
                          ) : (
                            <PlayCircle size={16} />
                          )}
                          Switch to{" "}
                          {currentSection.mode === "parallax"
                            ? "Video"
                            : "Parallax"}
                        </button>
                        <button
                          onClick={() => startEditing(currentSection.id)}
                          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                            editingSection === currentSection.id
                              ? "bg-orange-600 text-white hover:bg-orange-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}>
                          <Edit size={16} />
                          {editingSection === currentSection.id
                            ? "Cancel Edit"
                            : "Edit Section"}
                        </button>
                      </div>
                    </div>

                    {editingSection === currentSection.id ? (
                      /* Edit Mode */
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Section Title
                            </label>
                            <Controller
                              name="title"
                              control={control}
                              rules={{ required: "Title is required" }}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <input
                                    {...field}
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter section title"
                                  />
                                  {error && (
                                    <p className="text-red-600 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </>
                              )}
                            />
                          </div>

                          {/* Video URL (only for video mode) */}
                          {currentSection.mode === "video" && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL
                              </label>
                              <Controller
                                name="videoUrl"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                  />
                                )}
                              />
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Description
                          </label>
                          <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <textarea
                                  {...field}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                  placeholder="Enter section description"
                                />
                                {error && (
                                  <p className="text-red-600 text-xs mt-1">
                                    {error.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
                            <X size={16} />
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Save size={16} />
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* View Mode */
                      <div className="space-y-6">
                        {/* Current Content Display */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">
                            Current Content
                          </h5>
                          <p className="text-gray-700 text-sm">
                            {currentSection.description}
                          </p>
                          {currentSection.mode === "video" &&
                            currentSection.videoUrl && (
                              <div className="mt-3">
                                <span className="text-sm font-medium text-gray-700">
                                  Video URL:{" "}
                                </span>
                                <a
                                  href={currentSection.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm break-all">
                                  {currentSection.videoUrl}
                                </a>
                              </div>
                            )}
                        </div>

                        {/* Media Management */}
                        {currentSection.mode === "parallax" ? (
                          /* Parallax Gallery Management */
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="font-medium text-gray-900">
                                Parallax Gallery Images
                              </h5>
                              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Upload size={16} />
                                Add Images
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => handleImageUpload(e, true)}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            {currentSection.images.length > 0 ? (
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {currentSection.images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={
                                        image instanceof File
                                          ? URL.createObjectURL(image)
                                          : image
                                      }
                                      alt={`Gallery ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                      onClick={() =>
                                        removeImage(currentSection.id, index)
                                      }
                                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <X size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">
                                  No images uploaded yet
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Upload images for the parallax gallery
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Video Mode Display */
                          <div>
                            <h5 className="font-medium text-gray-900 mb-4">
                              Video Content
                            </h5>
                            {currentSection.videoUrl ? (
                              <div className="bg-gray-100 rounded-lg p-6 text-center">
                                <PlayCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-700 mb-2">
                                  Video URL configured
                                </p>
                                <a
                                  href={currentSection.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm break-all">
                                  {currentSection.videoUrl}
                                </a>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <PlayCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">
                                  No video URL configured
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Click "Edit Section" to add a video URL
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

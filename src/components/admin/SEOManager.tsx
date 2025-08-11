"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Chip,
  useDisclosure,
  Spinner,
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
  Progress,
} from '@heroui/react';
import { Plus, Edit, Trash2, Globe, Search, Upload, X, Image as ImageIcon, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SEOPage {
  id?: string;
  page_path: string;
  locale: string;

  // Basic SEO fields
  title?: string;
  description?: string;
  keywords?: string;

  // Open Graph fields
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;

  // Twitter Card fields
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;

  // Additional SEO fields
  canonical_url?: string;
  robots?: string;
  author?: string;

  // Schema.org structured data
  structured_data?: Record<string, unknown> | string;

  // Meta fields
  is_active?: boolean;
  priority?: number;
  change_frequency?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

interface ImageUploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  progress: number;
}

const COMMON_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/pds-group', name: 'About Us' },
  { path: '/products-services', name: 'Products & Services' },
  { path: '/reference', name: 'References' },
  { path: '/contact', name: 'Contact' },
  { path: '/pds-group/executive-team', name: 'Executive Team' },
];

const ROBOTS_OPTIONS = [
  'index,follow',
  'index,nofollow',
  'noindex,follow',
  'noindex,nofollow',
];

const CHANGE_FREQUENCY_OPTIONS = [
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
];

export default function SEOManager() {
  const [seoPages, setSeoPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<SEOPage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch SEO pages
  const fetchSEOPages = async () => {
    try {
      const response = await fetch('/api/admin/seo');
      const result = await response.json();

      if (response.ok) {
        setSeoPages(result.data || []);
      } else {
        toast.error('Failed to fetch SEO pages');
      }
    } catch (error) {
      console.error('Error fetching SEO pages:', error);
      toast.error('Error fetching SEO pages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOPages();
  }, []);

  // Handle create/edit
  const handleSave = async (formData: SEOPage) => {
    setIsSubmitting(true);
    try {
      const url = '/api/admin/seo';
      const method = editingPage?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`SEO page ${editingPage?.id ? 'updated' : 'created'} successfully`);
        fetchSEOPages();
        onClose();
        setEditingPage(null);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save SEO page');
      }
    } catch (error) {
      console.error('Error saving SEO page:', error);
      toast.error('Error saving SEO page');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO page?')) return;

    try {
      const response = await fetch(`/api/admin/seo?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('SEO page deleted successfully');
        fetchSEOPages();
      } else {
        toast.error('Failed to delete SEO page');
      }
    } catch (error) {
      console.error('Error deleting SEO page:', error);
      toast.error('Error deleting SEO page');
    }
  };

  // Open modal for create/edit
  const openModal = (page?: SEOPage) => {
    setEditingPage(page || {
      page_path: '',
      locale: 'th',
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      og_type: 'website',
      twitter_card: 'summary_large_image',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      canonical_url: '',
      robots: 'index,follow',
      author: '',
      structured_data: undefined,
      is_active: true,
      priority: 0.8,
      change_frequency: 'weekly',
    });
    onOpen();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-600">Manage SEO metadata for all pages and locales</p>
        </div>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => openModal()}>
          Add SEO Page
        </Button>
      </div>

      {/* SEO Pages Table */}
      <Table aria-label="SEO pages table">
        <TableHeader>
          <TableColumn>PAGE</TableColumn>
          <TableColumn>LOCALE</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PRIORITY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {seoPages.map((page) => (
            <TableRow key={`${page.page_path}-${page.locale}`}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-sm">{page.page_path}</span>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={page.locale === 'th' ? 'primary' : 'secondary'}
                  variant="flat">
                  {page.locale.toUpperCase()}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate" title={page.title}>
                  {page.title || 'No title'}
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  color={page.is_active ? 'success' : 'default'}
                  variant="flat">
                  {page.is_active ? 'Active' : 'Inactive'}
                </Chip>
              </TableCell>
              <TableCell>{page.priority || 0.8}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => openModal(page)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    isIconOnly
                    onPress={() => page.id && handleDelete(page.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create/Edit Modal */}
      <SEOPageModal
        isOpen={isOpen}
        onClose={onClose}
        editingPage={editingPage}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

// SEO Page Modal Component
interface SEOPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPage: SEOPage | null;
  onSave: (data: SEOPage) => void;
  isSubmitting: boolean;
}

function SEOPageModal({ isOpen, onClose, editingPage, onSave, isSubmitting }: SEOPageModalProps) {
  const [formData, setFormData] = useState<SEOPage>({
    page_path: '',
    locale: 'th',
    title: '',
    description: '',
    keywords: '',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    robots: 'index,follow',
    is_active: true,
    priority: 0.8,
    change_frequency: 'weekly',
  });

  // Image upload states
  const [ogImageUpload, setOgImageUpload] = useState<ImageUploadState>({
    file: null,
    preview: null,
    uploading: false,
    progress: 0,
  });

  const [twitterImageUpload, setTwitterImageUpload] = useState<ImageUploadState>({
    file: null,
    preview: null,
    uploading: false,
    progress: 0,
  });

  const ogImageInputRef = useRef<HTMLInputElement>(null);
  const twitterImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingPage) {
      setFormData(editingPage);
      // Set existing image previews
      if (editingPage.og_image) {
        setOgImageUpload(prev => ({ ...prev, preview: editingPage.og_image! }));
      }
      if (editingPage.twitter_image) {
        setTwitterImageUpload(prev => ({ ...prev, preview: editingPage.twitter_image! }));
      }
    } else {
      // Reset form for new entry
      setFormData({
        page_path: '',
        locale: 'th',
        title: '',
        description: '',
        keywords: '',
        og_type: 'website',
        twitter_card: 'summary_large_image',
        robots: 'index,follow',
        is_active: true,
        priority: 0.8,
        change_frequency: 'weekly',
      });
      setOgImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
      setTwitterImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
    }
  }, [editingPage, isOpen]);

  // Image upload handlers
  const handleImageUpload = async (file: File, type: 'og' | 'twitter') => {
    const setUploadState = type === 'og' ? setOgImageUpload : setTwitterImageUpload;

    setUploadState(prev => ({ ...prev, uploading: true, progress: 0 }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'seo-image');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      const imageUrl = result.url;

      // Update form data
      if (type === 'og') {
        setFormData(prev => ({ ...prev, og_image: imageUrl }));
      } else {
        setFormData(prev => ({ ...prev, twitter_image: imageUrl }));
      }

      // Update upload state
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        progress: 100,
        preview: imageUrl,
      }));

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setUploadState(prev => ({ ...prev, uploading: false, progress: 0 }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'og' | 'twitter') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      const setUploadState = type === 'og' ? setOgImageUpload : setTwitterImageUpload;
      setUploadState(prev => ({ ...prev, file, preview }));
    };
    reader.readAsDataURL(file);

    // Upload immediately
    handleImageUpload(file, type);
  };

  const removeImage = async (type: 'og' | 'twitter') => {
    const currentImage = type === 'og' ? formData.og_image : formData.twitter_image;

    // If there's an existing image, try to delete it from storage
    if (currentImage && currentImage.includes('supabase')) {
      try {
        // Extract the file path from the Supabase URL
        const url = new URL(currentImage);
        const pathParts = url.pathname.split('/');
        const bucketIndex = pathParts.findIndex(part => part === 'website-assets');
        if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/');

          await fetch(`/api/admin/upload?path=${encodeURIComponent(filePath)}`, {
            method: 'DELETE',
          });
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        // Continue with removal even if delete fails
      }
    }

    // Update form data and upload state
    if (type === 'og') {
      setFormData(prev => ({ ...prev, og_image: '' }));
      setOgImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
    } else {
      setFormData(prev => ({ ...prev, twitter_image: '' }));
      setTwitterImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.page_path || !formData.locale) {
      toast.error('Page path and locale are required');
      return;
    }

    // Wait for any ongoing uploads
    if (ogImageUpload.uploading || twitterImageUpload.uploading) {
      toast.error('Please wait for image uploads to complete');
      return;
    }

    // Ensure page path starts with /
    const cleanedData = {
      ...formData,
      page_path: formData.page_path.startsWith('/') ? formData.page_path : '/' + formData.page_path
    };

    onSave(cleanedData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      backdrop="opaque"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "border-none shadow-2xl",
        wrapper: "p-0",
        body: "p-0",
      }}>
      <ModalContent className="h-full">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <ModalHeader className="flex flex-col gap-1 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">
              {editingPage?.id ? 'Edit SEO Page' : 'Create SEO Page'}
            </h2>
            <p className="text-sm text-gray-500">
              Configure comprehensive SEO settings for your page
            </p>
          </ModalHeader>
          <ModalBody className="px-6 py-4 flex-1 overflow-y-auto">
            <Tabs aria-label="SEO Configuration" className="w-full h-full">
              {/* Basic SEO Tab */}
              <Tab key="basic" title={
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Basic SEO</span>
                </div>
              }>
                <div className="space-y-6 py-4">
                  {/* Page Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        label="Page Path"
                        placeholder="Enter page path (e.g., /about, /products/category)"
                        value={formData.page_path || ''}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value && !value.startsWith('/')) {
                            value = '/' + value;
                          }
                          setFormData({ ...formData, page_path: value });
                        }}
                        description="Enter any URL path. Will automatically add / if missing"
                        startContent={<Globe className="w-4 h-4 text-gray-400" />}
                      />
                      <div className="text-xs text-gray-500 space-y-2">
                        <div>
                          <span className="font-medium">Quick select common pages:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {COMMON_PAGES.map((page) => (
                              <button
                                key={page.path}
                                type="button"
                                className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition-colors border border-blue-200"
                                onClick={() => setFormData({ ...formData, page_path: page.path })}
                                title={`Click to use: ${page.path}`}>
                                {page.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Select
                      label="Locale"
                      selectedKeys={[formData.locale]}
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        setFormData({ ...formData, locale: value });
                      }}>
                      <SelectItem key="th">Thai (TH)</SelectItem>
                      <SelectItem key="en">English (EN)</SelectItem>
                    </Select>
                  </div>

                  {/* SEO Fields */}
                  <Input
                    label="Title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    description={`Page title (${formData.title?.length || 0}/60 characters recommended)`}
                    className={formData.title && formData.title.length > 60 ? 'text-orange-600' : ''}
                  />

                  <Textarea
                    label="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    description={`Meta description (${formData.description?.length || 0}/160 characters recommended)`}
                    className={formData.description && formData.description.length > 160 ? 'text-orange-600' : ''}
                    rows={3}
                  />

                  <Input
                    label="Keywords"
                    value={formData.keywords || ''}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    description="Comma-separated keywords (e.g., construction, gas station, engineering)"
                  />

                  <Input
                    label="Author"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    description="Content author name"
                  />

                  <Input
                    label="Canonical URL"
                    value={formData.canonical_url || ''}
                    onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                    description="Canonical URL (leave empty to use default)"
                    placeholder="https://www.padungsilpa.group/page-path"
                  />
                </div>
              </Tab>

              {/* Open Graph Tab */}
              <Tab key="opengraph" title={
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Open Graph</span>
                </div>
              }>
                <div className="space-y-6 py-4">
                  <Input
                    label="OG Title"
                    value={formData.og_title || ''}
                    onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                    description="Open Graph title (leave empty to use main title)"
                    placeholder={formData.title || 'Enter Open Graph title'}
                  />

                  <Textarea
                    label="OG Description"
                    value={formData.og_description || ''}
                    onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                    description="Open Graph description (leave empty to use main description)"
                    placeholder={formData.description || 'Enter Open Graph description'}
                    rows={3}
                  />

                  <Select
                    label="OG Type"
                    selectedKeys={[formData.og_type || 'website']}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      setFormData({ ...formData, og_type: value });
                    }}>
                    <SelectItem key="website">Website</SelectItem>
                    <SelectItem key="article">Article</SelectItem>
                    <SelectItem key="product">Product</SelectItem>
                    <SelectItem key="service">Service</SelectItem>
                  </Select>

                  {/* OG Image Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Open Graph Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {ogImageUpload.preview ? (
                        <div className="relative">
                          <Image
                            src={ogImageUpload.preview}
                            alt="OG Image Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            className="absolute top-2 right-2"
                            onPress={() => removeImage('og')}>
                            <X className="w-4 h-4" />
                          </Button>
                          {ogImageUpload.uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                              <div className="text-center text-white">
                                <Spinner color="white" size="sm" />
                                <p className="text-sm mt-2">Uploading...</p>
                                <Progress
                                  value={ogImageUpload.progress}
                                  className="w-32 mt-2"
                                  color="primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload Open Graph image (recommended: 1200x630px)
                          </p>
                          <Button
                            variant="flat"
                            color="primary"
                            startContent={<Upload className="w-4 h-4" />}
                            onPress={() => ogImageInputRef.current?.click()}>
                            Choose Image
                          </Button>
                          <input
                            ref={ogImageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageSelect(e, 'og')}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Recommended size: 1200x630px. Max file size: 5MB. Formats: JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </Tab>

              {/* Twitter Card Tab */}
              <Tab key="twitter" title={
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">𝕏</span>
                  <span>Twitter</span>
                </div>
              }>
                <div className="space-y-6 py-4">
                  <Select
                    label="Twitter Card Type"
                    selectedKeys={[formData.twitter_card || 'summary_large_image']}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      setFormData({ ...formData, twitter_card: value });
                    }}>
                    <SelectItem key="summary">Summary</SelectItem>
                    <SelectItem key="summary_large_image">Summary Large Image</SelectItem>
                    <SelectItem key="app">App</SelectItem>
                    <SelectItem key="player">Player</SelectItem>
                  </Select>

                  <Input
                    label="Twitter Title"
                    value={formData.twitter_title || ''}
                    onChange={(e) => setFormData({ ...formData, twitter_title: e.target.value })}
                    description="Twitter card title (leave empty to use main title)"
                    placeholder={formData.title || 'Enter Twitter title'}
                  />

                  <Textarea
                    label="Twitter Description"
                    value={formData.twitter_description || ''}
                    onChange={(e) => setFormData({ ...formData, twitter_description: e.target.value })}
                    description="Twitter card description (leave empty to use main description)"
                    placeholder={formData.description || 'Enter Twitter description'}
                    rows={3}
                  />

                  {/* Twitter Image Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Twitter Card Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {twitterImageUpload.preview ? (
                        <div className="relative">
                          <Image
                            src={twitterImageUpload.preview}
                            alt="Twitter Image Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            className="absolute top-2 right-2"
                            onPress={() => removeImage('twitter')}>
                            <X className="w-4 h-4" />
                          </Button>
                          {twitterImageUpload.uploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                              <div className="text-center text-white">
                                <Spinner color="white" size="sm" />
                                <p className="text-sm mt-2">Uploading...</p>
                                <Progress
                                  value={twitterImageUpload.progress}
                                  className="w-32 mt-2"
                                  color="primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload Twitter card image (recommended: 1200x675px)
                          </p>
                          <Button
                            variant="flat"
                            color="primary"
                            startContent={<Upload className="w-4 h-4" />}
                            onPress={() => twitterImageInputRef.current?.click()}>
                            Choose Image
                          </Button>
                          <input
                            ref={twitterImageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageSelect(e, 'twitter')}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Recommended size: 1200x675px. Max file size: 5MB. Formats: JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </Tab>

              {/* Technical SEO Tab */}
              <Tab key="technical" title={
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Technical</span>
                </div>
              }>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Select
                      label="Robots"
                      selectedKeys={[formData.robots || 'index,follow']}
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        setFormData({ ...formData, robots: value });
                      }}>
                      {ROBOTS_OPTIONS.map((option) => (
                        <SelectItem key={option}>{option}</SelectItem>
                      ))}
                    </Select>

                    <Input
                      type="number"
                      label="Priority"
                      value={formData.priority?.toString() || '0.8'}
                      onChange={(e) => setFormData({ ...formData, priority: parseFloat(e.target.value) })}
                      min="0"
                      max="1"
                      step="0.1"
                      description="Sitemap priority (0.0-1.0)"
                    />

                    <Select
                      label="Change Frequency"
                      selectedKeys={[formData.change_frequency || 'weekly']}
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        setFormData({ ...formData, change_frequency: value });
                      }}>
                      {CHANGE_FREQUENCY_OPTIONS.map((option) => (
                        <SelectItem key={option}>{option}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Textarea
                    label="Structured Data (JSON-LD)"
                    value={formData.structured_data ? JSON.stringify(formData.structured_data, null, 2) : ''}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setFormData({ ...formData, structured_data: parsed });
                      } catch {
                        // Invalid JSON, store as string for now
                        setFormData({ ...formData, structured_data: e.target.value });
                      }
                    }}
                    description="Schema.org structured data in JSON-LD format"
                    placeholder='{"@context": "https://schema.org", "@type": "WebPage", "name": "Page Name"}'
                    rows={8}
                    className="font-mono text-sm"
                  />

                  <Switch
                    isSelected={formData.is_active}
                    onValueChange={(value) => setFormData({ ...formData, is_active: value })}>
                    <div className="flex flex-col">
                      <span>Active</span>
                      <span className="text-xs text-gray-500">Include in sitemap and search results</span>
                    </div>
                  </Switch>
                </div>
              </Tab>

              {/* Preview Tab */}
              <Tab key="preview" title={
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </div>
              }>
                <div className="space-y-6 py-4">
                  {/* Google Search Preview */}
                  <Card>
                    <CardBody>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Google Search Preview</h4>
                      <div className="space-y-1">
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                          {formData.title || 'Page Title'}
                        </div>
                        <div className="text-green-700 text-sm">
                          https://www.padungsilpa.group{formData.page_path || '/page-path'}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {formData.description || 'Page description will appear here...'}
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Open Graph Preview */}
                  <Card>
                    <CardBody>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Facebook/Open Graph Preview</h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                        {(formData.og_image || ogImageUpload.preview) && (
                          <Image
                            src={formData.og_image || ogImageUpload.preview || ''}
                            alt="OG Preview"
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-3 bg-gray-50">
                          <div className="text-xs text-gray-500 uppercase">
                            padungsilpa.group
                          </div>
                          <div className="font-semibold text-sm text-gray-900 mt-1">
                            {formData.og_title || formData.title || 'Page Title'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formData.og_description || formData.description || 'Page description...'}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Twitter Card Preview */}
                  <Card>
                    <CardBody>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Twitter Card Preview</h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                        {(formData.twitter_image || twitterImageUpload.preview) && (
                          <Image
                            src={formData.twitter_image || twitterImageUpload.preview || ''}
                            alt="Twitter Preview"
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <div className="p-3">
                          <div className="font-semibold text-sm text-gray-900">
                            {formData.twitter_title || formData.title || 'Page Title'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formData.twitter_description || formData.description || 'Page description...'}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            padungsilpa.group
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Tab>

            </Tabs>
          </ModalBody>
          <ModalFooter className="px-6 py-4 border-t border-gray-200">
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={ogImageUpload.uploading || twitterImageUpload.uploading}>
              {editingPage?.id ? 'Update SEO Page' : 'Create SEO Page'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal >
  );
}

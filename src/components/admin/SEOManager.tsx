"use client";

import { useState, useEffect } from 'react';
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
} from '@heroui/react';
import { Plus, Edit, Trash2, Globe, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SEOPage {
  id?: string;
  page_path: string;
  locale: string;
  title?: string;
  description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  author?: string;
  is_active?: boolean;
  priority?: number;
  change_frequency?: string;
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
      robots: 'index,follow',
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
    robots: 'index,follow',
    is_active: true,
    priority: 0.8,
    change_frequency: 'weekly',
  });

  useEffect(() => {
    if (editingPage) {
      setFormData(editingPage);
    }
  }, [editingPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.page_path || !formData.locale) {
      toast.error('Page path and locale are required');
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
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            {editingPage?.id ? 'Edit SEO Page' : 'Create SEO Page'}
          </ModalHeader>
          <ModalBody className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  label="Page Path"
                  placeholder="Enter page path (e.g., /about, /products/category)"
                  value={formData.page_path || ''}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Ensure path starts with /
                    if (value && !value.startsWith('/')) {
                      value = '/' + value;
                    }
                    setFormData({ ...formData, page_path: value });
                  }}
                  description="Enter any URL path. Will automatically add / if missing"
                  startContent={<span className="text-gray-400 text-sm">🌐</span>}
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
                  <div>
                    <span className="font-medium">Examples:</span>
                    <span className="ml-2 text-gray-400">
                      /news/article-title, /products/category/item, /blog/2024/post-name
                    </span>
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
              description="Page title (recommended: 50-60 characters)"
            />

            <Textarea
              label="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              description="Meta description (recommended: 150-160 characters)"
              rows={3}
            />

            <Input
              label="Keywords"
              value={formData.keywords || ''}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              description="Comma-separated keywords"
            />

            {/* Settings */}
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

            <Switch
              isSelected={formData.is_active}
              onValueChange={(value) => setFormData({ ...formData, is_active: value })}>
              Active
            </Switch>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}>
              {editingPage?.id ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { contentManagerService, type CompletePageData, type Page, type SectionConfig } from '@/service/apiRequest/contentManager';

interface UseContentManagerReturn {
  // Data
  pages: Page[];
  currentPageData: CompletePageData | null;
  sectionConfigs: SectionConfig[];
  
  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  loadPages: () => Promise<void>;
  loadPageData: (pageId: string, status?: 'draft' | 'published') => Promise<void>;
  savePageContent: (pageId: string, contentData: any) => Promise<void>;
  uploadImage: (file: File, path: string) => Promise<{ url: string; path: string }>;
  clearError: () => void;
}

export const useContentManager = (): UseContentManagerReturn => {
  // State
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageData, setCurrentPageData] = useState<CompletePageData | null>(null);
  const [sectionConfigs, setSectionConfigs] = useState<SectionConfig[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Load all pages
  const loadPages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const pagesData = await contentManagerService.getAllPages();
      setPages(pagesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load specific page data
  const loadPageData = useCallback(async (pageId: string, status: 'draft' | 'published' = 'published') => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load page data and section configs in parallel
      const [pageData, configs] = await Promise.all([
        contentManagerService.getCompletePageData(pageId, status),
        contentManagerService.getSectionConfigs(pageId)
      ]);
      
      setCurrentPageData(pageData);
      setSectionConfigs(configs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load page data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save page content
  const savePageContent = useCallback(async (pageId: string, contentData: any) => {
    try {
      setIsSaving(true);
      setError(null);
      
      const savedData = await contentManagerService.savePageContent(pageId, contentData);
      setCurrentPageData(savedData);
      
      // Show success message (you can customize this)
      console.log('Content saved successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
      throw err; // Re-throw to allow component to handle
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Upload image
  const uploadImage = useCallback(async (file: File, path: string) => {
    try {
      setIsUploading(true);
      setError(null);
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size must be less than 10MB');
      }
      
      const result = await contentManagerService.uploadImage(file, path);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load pages on mount
  useEffect(() => {
    loadPages();
  }, [loadPages]);

  return {
    // Data
    pages,
    currentPageData,
    sectionConfigs,
    
    // Loading states
    isLoading,
    isSaving,
    isUploading,
    
    // Error state
    error,
    
    // Actions
    loadPages,
    loadPageData,
    savePageContent,
    uploadImage,
    clearError
  };
};

// Hook for managing form data with the content manager
export const useContentForm = (pageId: string) => {
  const [formData, setFormData] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);
  
  const updateFormData = useCallback((data: any) => {
    setFormData(data);
    setIsDirty(true);
  }, []);
  
  const resetForm = useCallback((data?: any) => {
    setFormData(data || null);
    setIsDirty(false);
  }, []);
  
  const markClean = useCallback(() => {
    setIsDirty(false);
  }, []);
  
  return {
    formData,
    isDirty,
    updateFormData,
    resetForm,
    markClean
  };
};

// Hook for managing image uploads
export const useImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  
  const uploadImage = useCallback(async (file: File, sectionId: string, imageIndex: number) => {
    const key = `${sectionId}-${imageIndex}`;
    
    try {
      setUploadProgress(prev => ({ ...prev, [key]: 0 }));
      
      // Simulate progress (in real implementation, you'd use actual upload progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[key] || 0;
          if (current >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [key]: current + 10 };
        });
      }, 100);
      
      const result = await contentManagerService.uploadImage(file, `sections/${sectionId}`);
      
      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [key]: 100 }));
      setUploadedImages(prev => ({ ...prev, [key]: result.url }));
      
      // Clean up progress after a delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[key];
          return newProgress;
        });
      }, 2000);
      
      return result;
    } catch (error) {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[key];
        return newProgress;
      });
      throw error;
    }
  }, []);
  
  const removeImage = useCallback((sectionId: string, imageIndex: number) => {
    const key = `${sectionId}-${imageIndex}`;
    setUploadedImages(prev => {
      const newImages = { ...prev };
      delete newImages[key];
      return newImages;
    });
  }, []);
  
  const getImageUrl = useCallback((sectionId: string, imageIndex: number) => {
    const key = `${sectionId}-${imageIndex}`;
    return uploadedImages[key];
  }, [uploadedImages]);
  
  const getUploadProgress = useCallback((sectionId: string, imageIndex: number) => {
    const key = `${sectionId}-${imageIndex}`;
    return uploadProgress[key];
  }, [uploadProgress]);
  
  return {
    uploadImage,
    removeImage,
    getImageUrl,
    getUploadProgress,
    uploadedImages,
    uploadProgress
  };
};

// Hook for managing section modes (gallery vs video)
export const useSectionMode = (initialMode: 'gallery' | 'video' = 'gallery') => {
  const [mode, setMode] = useState<'gallery' | 'video'>(initialMode);
  const [modeData, setModeData] = useState<Record<string, any>>({
    gallery: {},
    video: {}
  });
  
  const switchMode = useCallback((newMode: 'gallery' | 'video') => {
    setMode(newMode);
  }, []);
  
  const updateModeData = useCallback((mode: 'gallery' | 'video', data: any) => {
    setModeData(prev => ({
      ...prev,
      [mode]: { ...prev[mode], ...data }
    }));
  }, []);
  
  const getCurrentModeData = useCallback(() => {
    return modeData[mode];
  }, [mode, modeData]);
  
  return {
    mode,
    modeData,
    switchMode,
    updateModeData,
    getCurrentModeData
  };
};

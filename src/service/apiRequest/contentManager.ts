import { supabase } from "@/lib/supabase";

// Types matching the database schema
export interface Page {
  id: string;
  page_id: string;
  name_th: string;
  name_en: string;
  parent_page_id?: string;
  is_subpage: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectionConfig {
  id: string;
  page_id: string;
  section_id: string;
  section_type: 'hero' | 'parallax_gallery' | 'individual_images' | 'gallery_or_video';
  title_th: string;
  title_en: string;
  min_images: number;
  max_images: number;
  allow_video: boolean;
  is_required: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface SectionData {
  id: string;
  page_content_id: string;
  section_id: string;
  mode: 'gallery' | 'video';
  content_th?: string;
  content_en?: string;
  video_url?: string;
  video_title_th?: string;
  video_title_en?: string;
  video_description_th?: string;
  video_description_en?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ImageAsset {
  id: string;
  section_data_id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  alt_text_th?: string;
  alt_text_en?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Complete page data with all sections and images
export interface CompletePageData {
  page: Page;
  content: PageContent;
  sections: Array<{
    config: SectionConfig;
    data: SectionData;
    images: ImageAsset[];
  }>;
}

export const contentManagerService = {
  // Get all pages with their configurations
  async getAllPages(): Promise<Page[]> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('page_id');

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to fetch pages: ${error}`);
    }
  },

  // Get section configurations for a specific page
  async getSectionConfigs(pageId: string): Promise<SectionConfig[]> {
    try {
      const { data, error } = await supabase
        .from('section_configs')
        .select('*')
        .eq('page_id', pageId)
        .order('display_order');

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Failed to fetch section configs: ${error}`);
    }
  },

  // Get complete page data including content, sections, and images
  async getCompletePageData(pageId: string, status: 'draft' | 'published' = 'published'): Promise<CompletePageData | null> {
    try {
      // Get page info
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('page_id', pageId)
        .single();

      if (pageError) throw pageError;
      if (!page) return null;

      // Get page content
      const { data: content, error: contentError } = await supabase
        .from('page_contents')
        .select('*')
        .eq('page_id', pageId)
        .eq('status', status)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (contentError && contentError.code !== 'PGRST116') throw contentError;
      if (!content) return { page, content: null as any, sections: [] };

      // Get section configs
      const { data: sectionConfigs, error: configError } = await supabase
        .from('section_configs')
        .select('*')
        .eq('page_id', pageId)
        .order('display_order');

      if (configError) throw configError;

      // Get section data with images
      const sections = await Promise.all(
        (sectionConfigs || []).map(async (config) => {
          // Get section data
          const { data: sectionData, error: sectionError } = await supabase
            .from('section_data')
            .select('*')
            .eq('page_content_id', content.id)
            .eq('section_id', config.section_id)
            .single();

          if (sectionError && sectionError.code !== 'PGRST116') throw sectionError;

          // Get images for this section
          let images: ImageAsset[] = [];
          if (sectionData) {
            const { data: imageData, error: imageError } = await supabase
              .from('images')
              .select('*')
              .eq('section_data_id', sectionData.id)
              .order('display_order');

            if (imageError) throw imageError;
            images = imageData || [];
          }

          return {
            config,
            data: sectionData || null,
            images
          };
        })
      );

      return {
        page,
        content,
        sections: sections.filter(s => s.data !== null) // Only include sections with data
      };
    } catch (error) {
      throw new Error(`Failed to fetch complete page data: ${error}`);
    }
  },

  // Create or update page content
  async savePageContent(pageId: string, contentData: {
    status: 'draft' | 'published';
    sections: Array<{
      section_id: string;
      mode?: 'gallery' | 'video';
      content_th?: string;
      content_en?: string;
      video_url?: string;
      video_title_th?: string;
      video_title_en?: string;
      video_description_th?: string;
      video_description_en?: string;
      images?: Array<{
        file_name: string;
        file_path: string;
        file_url: string;
        file_size?: number;
        mime_type?: string;
        alt_text_th?: string;
        alt_text_en?: string;
        display_order: number;
      }>;
    }>;
  }): Promise<CompletePageData> {
    try {
      // Start a transaction-like operation
      const { data: user } = await supabase.auth.getUser();
      const userId = user?.user?.id;

      // Create or update page content
      const { data: pageContent, error: contentError } = await supabase
        .from('page_contents')
        .upsert({
          page_id: pageId,
          status: contentData.status,
          published_at: contentData.status === 'published' ? new Date().toISOString() : null,
          updated_by: userId
        }, {
          onConflict: 'page_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (contentError) throw contentError;

      // Save each section
      for (const sectionInput of contentData.sections) {
        // Create or update section data
        const { data: sectionData, error: sectionError } = await supabase
          .from('section_data')
          .upsert({
            page_content_id: pageContent.id,
            section_id: sectionInput.section_id,
            mode: sectionInput.mode || 'gallery',
            content_th: sectionInput.content_th,
            content_en: sectionInput.content_en,
            video_url: sectionInput.video_url,
            video_title_th: sectionInput.video_title_th,
            video_title_en: sectionInput.video_title_en,
            video_description_th: sectionInput.video_description_th,
            video_description_en: sectionInput.video_description_en
          }, {
            onConflict: 'page_content_id,section_id',
            ignoreDuplicates: false
          })
          .select()
          .single();

        if (sectionError) throw sectionError;

        // Handle images if provided
        if (sectionInput.images && sectionInput.images.length > 0) {
          // Delete existing images for this section
          await supabase
            .from('images')
            .delete()
            .eq('section_data_id', sectionData.id);

          // Insert new images
          const { error: imageError } = await supabase
            .from('images')
            .insert(
              sectionInput.images.map(img => ({
                section_data_id: sectionData.id,
                ...img
              }))
            );

          if (imageError) throw imageError;
        }
      }

      // Return the complete updated data
      return await this.getCompletePageData(pageId, contentData.status) as CompletePageData;
    } catch (error) {
      throw new Error(`Failed to save page content: ${error}`);
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file: File, path: string): Promise<{ url: string; path: string }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      return {
        url: publicUrl,
        path: filePath
      };
    } catch (error) {
      throw new Error(`Failed to upload image: ${error}`);
    }
  },

  // Delete image from Supabase Storage
  async deleteImage(path: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('content-images')
        .remove([path]);

      if (error) throw error;
    } catch (error) {
      throw new Error(`Failed to delete image: ${error}`);
    }
  }
};

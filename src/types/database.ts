export type ContentStatus = 'draft' | 'published' | 'archived';
export type LanguageCode = 'en' | 'th';

export interface NewsEvent {
  id: string;
  title_en: string;
  title_th: string;
  slug_en: string;
  slug_th: string;
  excerpt_en?: string;
  excerpt_th?: string;
  content_en: string;
  content_th: string;
  featured_image?: string;
  category?: string;
  status: ContentStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
  meta_title_en?: string;
  meta_title_th?: string;
  meta_description_en?: string;
  meta_description_th?: string;
  tags?: string[];
}

export interface TeamMember {
  id: string;
  name_en: string;
  name_th: string;
  position_en: string;
  position_th: string;
  bio_en?: string;
  bio_th?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductService {
  id: string;
  title_en: string;
  title_th: string;
  slug_en: string;
  slug_th: string;
  description_en: string;
  description_th: string;
  short_description_en?: string;
  short_description_th?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  features_en?: string[];
  features_th?: string[];
  is_featured: boolean;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  meta_title_en?: string;
  meta_title_th?: string;
  meta_description_en?: string;
  meta_description_th?: string;
}

export interface ProjectReference {
  id: string;
  title_en: string;
  title_th: string;
  description_en?: string;
  description_th?: string;
  client_name?: string;
  project_type?: string;
  location?: string;
  completion_date?: string;
  project_value?: number;
  featured_image?: string;
  gallery?: string[];
  is_featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  company_name_en: string;
  company_name_th: string;
  address_en: string;
  address_th: string;
  phone: string;
  fax?: string;
  email: string;
  website?: string;
  working_hours_en?: string;
  working_hours_th?: string;
  google_maps_url?: string;
  latitude?: number;
  longitude?: number;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_youtube?: string;
  updated_at: string;
}

export interface FileUpload {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  alt_text_en?: string;
  alt_text_th?: string;
  caption_en?: string;
  caption_th?: string;
  uploaded_by?: string;
  created_at: string;
}

// Utility types for localized content
export interface LocalizedContent<T> {
  en: T;
  th: T;
}

export interface LocalizedNewsEvent {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category?: string;
  status: ContentStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
}

export interface LocalizedTeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedProductService {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  features?: string[];
  is_featured: boolean;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  meta_title?: string;
  meta_description?: string;
}

export interface LocalizedProjectReference {
  id: string;
  title: string;
  description?: string;
  client_name?: string;
  project_type?: string;
  location?: string;
  completion_date?: string;
  project_value?: number;
  featured_image?: string;
  gallery?: string[];
  is_featured: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface LocalizedContactInfo {
  id: string;
  company_name: string;
  address: string;
  phone: string;
  fax?: string;
  email: string;
  website?: string;
  working_hours?: string;
  google_maps_url?: string;
  latitude?: number;
  longitude?: number;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_youtube?: string;
  updated_at: string;
}

// Database response types
export interface DatabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Form types for admin panel
export interface NewsEventForm {
  title_en: string;
  title_th: string;
  slug_en: string;
  slug_th: string;
  excerpt_en?: string;
  excerpt_th?: string;
  content_en: string;
  content_th: string;
  featured_image?: string;
  category?: string;
  status: ContentStatus;
  published_at?: string;
  meta_title_en?: string;
  meta_title_th?: string;
  meta_description_en?: string;
  meta_description_th?: string;
  tags?: string[];
}

export interface TeamMemberForm {
  name_en: string;
  name_th: string;
  position_en: string;
  position_th: string;
  bio_en?: string;
  bio_th?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface ProductServiceForm {
  title_en: string;
  title_th: string;
  slug_en: string;
  slug_th: string;
  description_en: string;
  description_th: string;
  short_description_en?: string;
  short_description_th?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  features_en?: string[];
  features_th?: string[];
  is_featured: boolean;
  sort_order: number;
  status: ContentStatus;
  meta_title_en?: string;
  meta_title_th?: string;
  meta_description_en?: string;
  meta_description_th?: string;
}

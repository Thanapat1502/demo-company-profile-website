-- Content Manager Database Schema for Supabase
-- This schema supports the flexible Content Manager UI system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE content_section_type AS ENUM (
  'hero',
  'parallax_gallery', 
  'individual_images',
  'gallery_or_video'
);

CREATE TYPE content_mode AS ENUM ('gallery', 'video');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Pages table - defines the structure of each page
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id VARCHAR(100) UNIQUE NOT NULL, -- 'home', 'about', 'about-main', etc.
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  parent_page_id VARCHAR(100), -- For subpages
  is_subpage BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Section configurations table - defines what sections each page should have
CREATE TABLE section_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id VARCHAR(100) NOT NULL REFERENCES pages(page_id) ON DELETE CASCADE,
  section_id VARCHAR(100) NOT NULL, -- 'hero', 'parallax_gallery', 'service-1', etc.
  section_type content_section_type NOT NULL,
  title_th VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  min_images INTEGER DEFAULT 0,
  max_images INTEGER DEFAULT 10,
  allow_video BOOLEAN DEFAULT FALSE,
  is_required BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_id, section_id)
);

-- Page content data table - stores the actual content for each page
CREATE TABLE page_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id VARCHAR(100) NOT NULL REFERENCES pages(page_id) ON DELETE CASCADE,
  status content_status DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Section data table - stores content for each section
CREATE TABLE section_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_content_id UUID NOT NULL REFERENCES page_contents(id) ON DELETE CASCADE,
  section_id VARCHAR(100) NOT NULL,
  mode content_mode DEFAULT 'gallery', -- For gallery_or_video sections
  content_th TEXT, -- JSON or text content in Thai
  content_en TEXT, -- JSON or text content in English
  video_url TEXT,
  video_title_th VARCHAR(255),
  video_title_en VARCHAR(255),
  video_description_th TEXT,
  video_description_en TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images table - stores all uploaded images
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_data_id UUID NOT NULL REFERENCES section_data(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL, -- Supabase storage path
  file_url TEXT NOT NULL, -- Public URL
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text_th VARCHAR(255),
  alt_text_en VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_pages_page_id ON pages(page_id);
CREATE INDEX idx_pages_parent_page_id ON pages(parent_page_id);
CREATE INDEX idx_section_configs_page_id ON section_configs(page_id);
CREATE INDEX idx_section_configs_section_type ON section_configs(section_type);
CREATE INDEX idx_page_contents_page_id ON page_contents(page_id);
CREATE INDEX idx_page_contents_status ON page_contents(status);
CREATE INDEX idx_section_data_page_content_id ON section_data(page_content_id);
CREATE INDEX idx_section_data_section_id ON section_data(section_id);
CREATE INDEX idx_images_section_data_id ON images(section_data_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_configs_updated_at BEFORE UPDATE ON section_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_contents_updated_at BEFORE UPDATE ON page_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_data_updated_at BEFORE UPDATE ON section_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial page configurations
INSERT INTO pages (page_id, name_th, name_en, is_subpage) VALUES
('home', 'หน้าแรก', 'Home', FALSE),
('about', 'เกี่ยวกับเรา', 'About', FALSE),
('about-main', 'เกี่ยวกับเรา - หลัก', 'About - Main', TRUE),
('about-history', 'ประวัติความเป็นมา', 'History', TRUE),
('about-vision', 'วิสัยทัศน์', 'Vision', TRUE),
('about-executive', 'ผู้บริหาร', 'Executive', TRUE),
('products-services', 'ผลิตภัณฑ์และบริการ', 'Products & Services', FALSE),
('news', 'ข่าวสาร', 'News', FALSE),
('contact', 'ติดต่อเรา', 'Contact', FALSE);

-- Update subpages with parent references
UPDATE pages SET parent_page_id = 'about' 
WHERE page_id IN ('about-main', 'about-history', 'about-vision', 'about-executive');

-- Insert section configurations for each page
-- Home page sections
INSERT INTO section_configs (page_id, section_id, section_type, title_th, title_en, min_images, max_images, is_required, display_order) VALUES
('home', 'hero', 'hero', 'ส่วนหัวหน้าแรก', 'Home Hero Section', 1, 5, TRUE, 1),
('home', 'parallax_gallery', 'parallax_gallery', 'แกลเลอรี่พาราแลกซ์', 'Parallax Gallery', 3, 10, TRUE, 2);

-- About page sections
INSERT INTO section_configs (page_id, section_id, section_type, title_th, title_en, min_images, max_images, is_required, display_order) VALUES
('about', 'hero', 'hero', 'ส่วนหัวเกี่ยวกับเรา', 'About Hero Section', 1, 3, TRUE, 1),
('about-main', 'parallax_gallery', 'parallax_gallery', 'แกลเลอรี่พาราแลกซ์', 'Parallax Gallery', 3, 8, FALSE, 1),
('about-history', 'history_images', 'individual_images', 'รูปภาพประวัติ', 'History Images', 6, 6, FALSE, 1),
('about-vision', 'vision_images', 'individual_images', 'รูปภาพวิสัยทัศน์', 'Vision Images', 2, 2, FALSE, 1),
('about-executive', 'hero', 'hero', 'ส่วนหัวผู้บริหาร', 'Executive Hero Section', 1, 2, FALSE, 1);

-- Products/Services page sections
INSERT INTO section_configs (page_id, section_id, section_type, title_th, title_en, min_images, max_images, allow_video, is_required, display_order) VALUES
('products-services', 'hero', 'hero', 'ส่วนหัวผลิตภัณฑ์', 'Products Hero Section', 1, 3, FALSE, TRUE, 1),
('products-services', 'service-1', 'gallery_or_video', 'บริการที่ 1', 'Service 1', 0, 8, TRUE, FALSE, 2),
('products-services', 'service-2', 'gallery_or_video', 'บริการที่ 2', 'Service 2', 0, 8, TRUE, FALSE, 3),
('products-services', 'service-3', 'gallery_or_video', 'บริการที่ 3', 'Service 3', 0, 8, TRUE, FALSE, 4),
('products-services', 'service-4', 'gallery_or_video', 'บริการที่ 4', 'Service 4', 0, 8, TRUE, FALSE, 5);

-- News and Contact page sections
INSERT INTO section_configs (page_id, section_id, section_type, title_th, title_en, min_images, max_images, is_required, display_order) VALUES
('news', 'hero', 'hero', 'ส่วนหัวข่าวสาร', 'News Hero Section', 1, 3, TRUE, 1),
('contact', 'hero', 'hero', 'ส่วนหัวติดต่อเรา', 'Contact Hero Section', 1, 2, TRUE, 1);

-- RLS (Row Level Security) Policies
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published content
CREATE POLICY "Public can view published pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Public can view section configs" ON section_configs FOR SELECT USING (true);
CREATE POLICY "Public can view published content" ON page_contents FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published section data" ON section_data FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM page_contents pc 
    WHERE pc.id = section_data.page_content_id 
    AND pc.status = 'published'
  )
);
CREATE POLICY "Public can view published images" ON images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM section_data sd
    JOIN page_contents pc ON pc.id = sd.page_content_id
    WHERE sd.id = images.section_data_id 
    AND pc.status = 'published'
  )
);

-- Admin policies (assuming you have an admin role or specific user permissions)
CREATE POLICY "Admins can manage pages" ON pages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%' -- Adjust this condition based on your admin identification
  )
);

CREATE POLICY "Admins can manage section configs" ON section_configs FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%'
  )
);

CREATE POLICY "Admins can manage page contents" ON page_contents FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%'
  )
);

CREATE POLICY "Admins can manage section data" ON section_data FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%'
  )
);

CREATE POLICY "Admins can manage images" ON images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email LIKE '%@admin.%'
  )
);

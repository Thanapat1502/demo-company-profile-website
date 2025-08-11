-- SEO Management Schema
-- This table stores SEO metadata for each page and locale

CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL, -- e.g., '/', '/pds-group', '/products-services'
  locale VARCHAR(10) NOT NULL DEFAULT 'th', -- 'th' or 'en'
  
  -- Basic SEO fields
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  
  -- Open Graph fields
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(500),
  og_type VARCHAR(50) DEFAULT 'website',
  
  -- Twitter Card fields
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image VARCHAR(500),
  
  -- Additional SEO fields
  canonical_url VARCHAR(500),
  robots VARCHAR(100) DEFAULT 'index,follow',
  author VARCHAR(255),
  
  -- Schema.org structured data (JSON)
  structured_data JSONB,
  
  -- Meta fields
  is_active BOOLEAN DEFAULT true,
  priority DECIMAL(2,1) DEFAULT 0.8, -- For sitemap priority
  change_frequency VARCHAR(20) DEFAULT 'weekly', -- For sitemap
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(page_path, locale)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_seo_pages_path_locale ON seo_pages(page_path, locale);
CREATE INDEX IF NOT EXISTS idx_seo_pages_active ON seo_pages(is_active);
CREATE INDEX IF NOT EXISTS idx_seo_pages_locale ON seo_pages(locale);

-- Enable RLS (Row Level Security)
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can read active SEO pages" ON seo_pages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage SEO pages" ON seo_pages
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default SEO data for main pages
INSERT INTO seo_pages (page_path, locale, title, description, keywords, og_title, og_description, twitter_title, twitter_description, structured_data) VALUES
-- Thai pages
('/', 'th', 'บริษัท ผดุงศิลป์ จำกัด - ผู้นำด้านการก่อสร้างและวิศวกรรม', 'บริษัท ผดุงศิลป์ จำกัด ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร มีประสบการณ์กว่า 30 ปี', 'ผดุงศิลป์, การก่อสร้าง, วิศวกรรม, ก่อสร้างอาคาร, รับเหมาก่อสร้าง, บริษัทก่อสร้าง', 'ผดุงศิลป์ - ผู้นำด้านการก่อสร้างและวิศวกรรม', 'บริษัท ผดุงศิลป์ จำกัด ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร', 'ผดุงศิลป์ - ผู้นำด้านการก่อสร้าง', 'บริษัท ผดุงศิลป์ จำกัด ผู้เชี่ยวชาญด้านการก่อสร้างและวิศวกรรม', '{"@context": "https://schema.org", "@type": "Organization", "name": "บริษัท ผดุงศิลป์ จำกัด", "description": "ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร"}'),

('/pds-group', 'th', 'เกี่ยวกับเรา - บริษัท ผดุงศิลป์ จำกัด', 'ทำความรู้จักกับบริษัท ผดุงศิลป์ จำกัด ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และทีมผู้บริหาร', 'เกี่ยวกับผดุงศิลป์, ประวัติบริษัท, วิสัยทัศน์, พันธกิจ, ทีมผู้บริหาร', 'เกี่ยวกับเรา - ผดุงศิลป์', 'ทำความรู้จักกับบริษัท ผดุงศิลป์ จำกัด ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจ', 'เกี่ยวกับเรา - ผดุงศิลป์', 'ทำความรู้จักกับบริษัท ผดุงศิลป์ จำกัด', '{"@context": "https://schema.org", "@type": "AboutPage", "name": "เกี่ยวกับเรา", "description": "ประวัติและข้อมูลบริษัท ผดุงศิลป์ จำกัด"}'),

('/products-services', 'th', 'ผลิตภัณฑ์และบริการ - บริษัท ผดุงศิลป์ จำกัด', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์ รวมถึงการก่อสร้าง วิศวกรรม และบริการเชี่ยวชาญ', 'ผลิตภัณฑ์ผดุงศิลป์, บริการก่อสร้าง, วิศวกรรม, บริการครบวงจร', 'ผลิตภัณฑ์และบริการ - ผดุงศิลป์', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์', 'ผลิตภัณฑ์และบริการ - ผดุงศิลป์', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์', '{"@context": "https://schema.org", "@type": "Service", "name": "ผลิตภัณฑ์และบริการ", "description": "ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์"}'),

-- English pages
('/', 'en', 'Padungsilpa Group - Leading Construction and Engineering Company', 'Padungsilpa Group is a leading construction and engineering company with over 30 years of experience in comprehensive services', 'Padungsilpa, construction, engineering, building construction, construction contractor, construction company', 'Padungsilpa - Leading Construction & Engineering', 'Padungsilpa Group is a leading construction and engineering company with comprehensive services', 'Padungsilpa - Construction Leader', 'Padungsilpa Group - Leading construction and engineering company', '{"@context": "https://schema.org", "@type": "Organization", "name": "Padungsilpa Group", "description": "Leading construction and engineering company with comprehensive services"}'),

('/pds-group', 'en', 'About Us - Padungsilpa Group', 'Learn about Padungsilpa Group, our history, vision, mission, and executive team', 'About Padungsilpa, company history, vision, mission, executive team', 'About Us - Padungsilpa', 'Learn about Padungsilpa Group, our history, vision, and mission', 'About Us - Padungsilpa', 'Learn about Padungsilpa Group', '{"@context": "https://schema.org", "@type": "AboutPage", "name": "About Us", "description": "History and information about Padungsilpa Group"}'),

('/products-services', 'en', 'Products & Services - Padungsilpa Group', 'Comprehensive products and services by Padungsilpa including construction, engineering, and specialized services', 'Padungsilpa products, construction services, engineering, comprehensive services', 'Products & Services - Padungsilpa', 'Comprehensive products and services by Padungsilpa', 'Products & Services - Padungsilpa', 'Comprehensive products and services by Padungsilpa', '{"@context": "https://schema.org", "@type": "Service", "name": "Products & Services", "description": "Comprehensive products and services by Padungsilpa"}')

ON CONFLICT (page_path, locale) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_seo_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_seo_pages_updated_at
  BEFORE UPDATE ON seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_seo_pages_updated_at();

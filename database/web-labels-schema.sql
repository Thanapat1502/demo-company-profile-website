-- Web Labels table for dynamic i18n translations
-- This table stores all website translations that will be loaded dynamically

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create web_labels table
CREATE TABLE IF NOT EXISTS web_labels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    locale TEXT NOT NULL CHECK (locale IN ('en', 'th')),
    description TEXT, -- Optional description for translators
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combination of key and locale
    UNIQUE(key, locale)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_web_labels_locale ON web_labels(locale);
CREATE INDEX IF NOT EXISTS idx_web_labels_key ON web_labels(key);
CREATE INDEX IF NOT EXISTS idx_web_labels_key_locale ON web_labels(key, locale);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_web_labels_updated_at 
    BEFORE UPDATE ON web_labels 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE web_labels ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (translations should be publicly readable)
CREATE POLICY "Allow public read access to web_labels" ON web_labels
    FOR SELECT USING (true);

-- Create policies for authenticated write access (only authenticated users can modify translations)
CREATE POLICY "Allow authenticated insert on web_labels" ON web_labels
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on web_labels" ON web_labels
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on web_labels" ON web_labels
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample translations to get started
INSERT INTO web_labels (key, value, locale, description) VALUES
-- Navigation
('navigation.home', 'Home', 'en', 'Main navigation - Home link'),
('navigation.home', 'หน้าแรก', 'th', 'Main navigation - Home link'),
('navigation.company', 'Company Profile', 'en', 'Main navigation - Company link'),
('navigation.company', 'เกี่ยวกับบริษัท', 'th', 'Main navigation - Company link'),
('navigation.services', 'Products & Services', 'en', 'Main navigation - Services link'),
('navigation.services', 'ผลิตภัณฑ์และบริการ', 'th', 'Main navigation - Services link'),
('navigation.references', 'References', 'en', 'Main navigation - References link'),
('navigation.references', 'ผลงาน', 'th', 'Main navigation - References link'),
('navigation.news', 'News & Events', 'en', 'Main navigation - News link'),
('navigation.news', 'ข่าวสารและกิจกรรม', 'th', 'Main navigation - News link'),
('navigation.contact', 'Contact Us', 'en', 'Main navigation - Contact link'),
('navigation.contact', 'ติดต่อเรา', 'th', 'Main navigation - Contact link'),

-- Common elements
('common.learnMore', 'Learn More', 'en', 'Common button text'),
('common.learnMore', 'เรียนรู้เพิ่มเติม', 'th', 'Common button text'),
('common.readMore', 'Read More', 'en', 'Common button text'),
('common.readMore', 'อ่านเพิ่มเติม', 'th', 'Common button text'),
('common.viewAll', 'View All', 'en', 'Common button text'),
('common.viewAll', 'ดูทั้งหมด', 'th', 'Common button text'),
('common.loading', 'Loading...', 'en', 'Loading state text'),
('common.loading', 'กำลังโหลด...', 'th', 'Loading state text'),

-- Home page
('home.hero.title', 'Leading Gas Station Construction & Engineering', 'en', 'Home page hero title'),
('home.hero.title', 'ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน', 'th', 'Home page hero title'),
('home.hero.subtitle', 'Excellence in Every Project', 'en', 'Home page hero subtitle'),
('home.hero.subtitle', 'ความเป็นเลิศในทุกโครงการ', 'th', 'Home page hero subtitle'),

-- Contact page
('contact.hero.title', 'Contact Us', 'en', 'Contact page hero title'),
('contact.hero.title', 'ติดต่อเรา', 'th', 'Contact page hero title'),
('contact.hero.subtitle', 'Let\'s Build Your Vision Together', 'en', 'Contact page hero subtitle'),
('contact.hero.subtitle', 'มาสร้างวิสัยทัศน์ของคุณไปด้วยกัน', 'th', 'Contact page hero subtitle')

ON CONFLICT (key, locale) DO NOTHING;

-- Add comment to table
COMMENT ON TABLE web_labels IS 'Stores all website translations for dynamic i18n system';
COMMENT ON COLUMN web_labels.key IS 'Translation key in dot notation (e.g., home.hero.title)';
COMMENT ON COLUMN web_labels.value IS 'Translated text value';
COMMENT ON COLUMN web_labels.locale IS 'Language code (en or th)';
COMMENT ON COLUMN web_labels.description IS 'Optional description for translators';

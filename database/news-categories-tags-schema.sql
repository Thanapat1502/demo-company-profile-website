-- News Categories and Tags Schema for Supabase
-- This extends the existing news system with proper categories and tags

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cat_th TEXT NOT NULL,
    cat_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create or update news table (if it doesn't exist, create it; if it exists, add missing columns)
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_th TEXT,
    title_en TEXT,
    slug_th TEXT UNIQUE,
    slug_en TEXT UNIQUE,
    subtitle_th TEXT,
    subtitle_en TEXT,
    excerpt_th TEXT,
    excerpt_en TEXT,
    body_th JSONB,
    body_en JSONB,
    thumbnail TEXT,
    category_id UUID REFERENCES categories(id),
    tag INTEGER[],
    is_highlighted BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing news table if they don't exist
DO $$ 
BEGIN
    -- Add category_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'category_id') THEN
        ALTER TABLE news ADD COLUMN category_id UUID REFERENCES categories(id);
    END IF;
    
    -- Add is_highlighted column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'is_highlighted') THEN
        ALTER TABLE news ADD COLUMN is_highlighted BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add title_en column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'title_en') THEN
        ALTER TABLE news ADD COLUMN title_en TEXT;
    END IF;
    
    -- Add title_th column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'title_th') THEN
        ALTER TABLE news ADD COLUMN title_th TEXT;
    END IF;
    
    -- Add subtitle_th column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'subtitle_th') THEN
        ALTER TABLE news ADD COLUMN subtitle_th TEXT;
    END IF;
    
    -- Add subtitle_en column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'subtitle_en') THEN
        ALTER TABLE news ADD COLUMN subtitle_en TEXT;
    END IF;
    
    -- Add excerpt_th column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'excerpt_th') THEN
        ALTER TABLE news ADD COLUMN excerpt_th TEXT;
    END IF;
    
    -- Add excerpt_en column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'excerpt_en') THEN
        ALTER TABLE news ADD COLUMN excerpt_en TEXT;
    END IF;

    -- Add slug_th column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'slug_th') THEN
        ALTER TABLE news ADD COLUMN slug_th TEXT UNIQUE;
    END IF;

    -- Add slug_en column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'slug_en') THEN
        ALTER TABLE news ADD COLUMN slug_en TEXT UNIQUE;
    END IF;
END $$;

-- Insert default categories
INSERT INTO categories (cat_th, cat_en, description_th, description_en) VALUES
('ข่าวสาร', 'News', 'ข่าวสารทั่วไปและการอัพเดท', 'General news and updates'),
('กิจกรรม', 'Events', 'กิจกรรมและการจัดงาน', 'Events and activities'),
('ประกาศ', 'Announcements', 'ประกาศอย่างเป็นทางการ', 'Official announcements'),
('โครงการ', 'Projects', 'โครงการของบริษัท', 'Company projects'),
('รางวัล', 'Awards', 'รางวัลและความสำเร็จ', 'Awards and achievements')
ON CONFLICT DO NOTHING;

-- Insert default tags
INSERT INTO tags (name) VALUES
('ข่าวสาร'),
('กิจกรรม'),
('โครงการ'),
('ประกาศ'),
('อัพเดท'),
('บริษัท'),
('ผลิตภัณฑ์'),
('บริการ'),
('เทคโนโลยี'),
('นวัตกรรม'),
('ความปลอดภัย'),
('สิ่งแวดล้อม'),
('CSR'),
('รางวัล'),
('ความสำเร็จ'),
('News'),
('Events'),
('Projects'),
('Announcements'),
('Updates'),
('Company'),
('Products'),
('Services'),
('Technology'),
('Innovation'),
('Safety'),
('Environment'),
('Awards'),
('Success')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_cat_th ON categories(cat_th);
CREATE INDEX IF NOT EXISTS idx_categories_cat_en ON categories(cat_en);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_news_category_id ON news(category_id);
CREATE INDEX IF NOT EXISTS idx_news_is_highlighted ON news(is_highlighted);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug_th ON news(slug_th);
CREATE INDEX IF NOT EXISTS idx_news_slug_en ON news(slug_en);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tags_updated_at ON tags;
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Public can read all categories and tags
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read tags" ON tags FOR SELECT USING (true);

-- Public can read published news
CREATE POLICY "Public can read published news" ON news FOR SELECT USING (status = 'published');

-- Authenticated users can manage all content
CREATE POLICY "Authenticated users can manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage tags" ON tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage news" ON news FOR ALL USING (auth.role() = 'authenticated');

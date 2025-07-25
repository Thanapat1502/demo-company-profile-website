-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for content status
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Create enum for supported languages
CREATE TYPE language_code AS ENUM ('en', 'th');

-- News and Events table
CREATE TABLE news_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_th TEXT NOT NULL,
    slug_en TEXT UNIQUE NOT NULL,
    slug_th TEXT UNIQUE NOT NULL,
    excerpt_en TEXT,
    excerpt_th TEXT,
    content_en TEXT NOT NULL,
    content_th TEXT NOT NULL,
    featured_image TEXT,
    category VARCHAR(100),
    status content_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id UUID REFERENCES auth.users(id),
    meta_title_en TEXT,
    meta_title_th TEXT,
    meta_description_en TEXT,
    meta_description_th TEXT,
    tags TEXT[]
);

-- Executive Team table
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_th TEXT NOT NULL,
    position_en TEXT NOT NULL,
    position_th TEXT NOT NULL,
    bio_en TEXT,
    bio_th TEXT,
    image TEXT,
    email TEXT,
    phone TEXT,
    linkedin_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products and Services table
CREATE TABLE products_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_th TEXT NOT NULL,
    slug_en TEXT UNIQUE NOT NULL,
    slug_th TEXT UNIQUE NOT NULL,
    description_en TEXT NOT NULL,
    description_th TEXT NOT NULL,
    short_description_en TEXT,
    short_description_th TEXT,
    image TEXT,
    gallery TEXT[],
    category VARCHAR(100),
    features_en TEXT[],
    features_th TEXT[],
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_title_en TEXT,
    meta_title_th TEXT,
    meta_description_en TEXT,
    meta_description_th TEXT
);

-- Project References table
CREATE TABLE project_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_th TEXT NOT NULL,
    description_en TEXT,
    description_th TEXT,
    client_name TEXT,
    project_type VARCHAR(100),
    location TEXT,
    completion_date DATE,
    project_value DECIMAL(15,2),
    featured_image TEXT,
    gallery TEXT[],
    is_featured BOOLEAN DEFAULT false,
    status content_status DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Contact Information table
CREATE TABLE contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name_en TEXT NOT NULL,
    company_name_th TEXT NOT NULL,
    address_en TEXT NOT NULL,
    address_th TEXT NOT NULL,
    phone TEXT NOT NULL,
    fax TEXT,
    email TEXT NOT NULL,
    website TEXT,
    working_hours_en TEXT,
    working_hours_th TEXT,
    google_maps_url TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    social_facebook TEXT,
    social_instagram TEXT,
    social_linkedin TEXT,
    social_youtube TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads table for managing images and documents
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    alt_text_en TEXT,
    alt_text_th TEXT,
    caption_en TEXT,
    caption_th TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_news_events_status ON news_events(status);
CREATE INDEX idx_news_events_published_at ON news_events(published_at DESC);
CREATE INDEX idx_news_events_category ON news_events(category);
CREATE INDEX idx_team_members_sort_order ON team_members(sort_order);
CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_products_services_status ON products_services(status);
CREATE INDEX idx_products_services_category ON products_services(category);
CREATE INDEX idx_products_services_featured ON products_services(is_featured);
CREATE INDEX idx_project_references_status ON project_references(status);
CREATE INDEX idx_project_references_featured ON project_references(is_featured);
CREATE INDEX idx_project_references_completion_date ON project_references(completion_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_news_events_updated_at BEFORE UPDATE ON news_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_services_updated_at BEFORE UPDATE ON products_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_references_updated_at BEFORE UPDATE ON project_references FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE products_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published news_events" ON news_events FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read active team_members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published products_services" ON products_services FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read published project_references" ON project_references FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public can read file_uploads" ON file_uploads FOR SELECT USING (true);

-- Admin access (authenticated users can manage all content)
CREATE POLICY "Authenticated users can manage news_events" ON news_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage products_services" ON products_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage project_references" ON project_references FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage file_uploads" ON file_uploads FOR ALL USING (auth.role() = 'authenticated');

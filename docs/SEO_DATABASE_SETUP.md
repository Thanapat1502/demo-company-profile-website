# SEO Database Setup Instructions

## 1. Run the SEO Schema Migration

Execute the following SQL in your Supabase SQL Editor:

```sql
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
('/', 'th', 'กลุ่มบริษัท ผดุงศิลป์ ฯ - ผู้นำด้านการก่อสร้างและวิศวกรรม', 'กลุ่มบริษัท ผดุงศิลป์ ฯ ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร มีประสบการณ์กว่า 30 ปี', 'ผดุงศิลป์, การก่อสร้าง, วิศวกรรม, ก่อสร้างอาคาร, รับเหมาก่อสร้าง, บริษัทก่อสร้าง', 'ผดุงศิลป์ - ผู้นำด้านการก่อสร้างและวิศวกรรม', 'กลุ่มบริษัท ผดุงศิลป์ ฯ ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร', 'ผดุงศิลป์ - ผู้นำด้านการก่อสร้าง', 'กลุ่มบริษัท ผดุงศิลป์ ฯ ผู้เชี่ยวชาญด้านการก่อสร้างและวิศวกรรม', '{"@context": "https://schema.org", "@type": "Organization", "name": "กลุ่มบริษัท ผดุงศิลป์ ฯ", "description": "ผู้เชี่ยวชาญด้านการก่อสร้าง วิศวกรรม และบริการครบวงจร"}'),

('/pds-group', 'th', 'เกี่ยวกับเรา - กลุ่มบริษัท ผดุงศิลป์ ฯ', 'ทำความรู้จักกับกลุ่มบริษัท ผดุงศิลป์ ฯ ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และทีมผู้บริหาร', 'เกี่ยวกับผดุงศิลป์, ประวัติบริษัท, วิสัยทัศน์, พันธกิจ, ทีมผู้บริหาร', 'เกี่ยวกับเรา - ผดุงศิลป์', 'ทำความรู้จักกับกลุ่มบริษัท ผดุงศิลป์ ฯ ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจ', 'เกี่ยวกับเรา - ผดุงศิลป์', 'ทำความรู้จักกับกลุ่มบริษัท ผดุงศิลป์ ฯ', '{"@context": "https://schema.org", "@type": "AboutPage", "name": "เกี่ยวกับเรา", "description": "ประวัติและข้อมูลกลุ่มบริษัท ผดุงศิลป์ ฯ"}'),

('/products-services', 'th', 'ผลิตภัณฑ์และบริการ - กลุ่มบริษัท ผดุงศิลป์ ฯ', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์ รวมถึงการก่อสร้าง วิศวกรรม และบริการเชี่ยวชาญ', 'ผลิตภัณฑ์ผดุงศิลป์, บริการก่อสร้าง, วิศวกรรม, บริการครบวงจร', 'ผลิตภัณฑ์และบริการ - ผดุงศิลป์', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์', 'ผลิตภัณฑ์และบริการ - ผดุงศิลป์', 'ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์', '{"@context": "https://schema.org", "@type": "Service", "name": "ผลิตภัณฑ์และบริการ", "description": "ผลิตภัณฑ์และบริการครบวงจรของผดุงศิลป์"}'),

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
```

## 2. Verify the Setup

After running the SQL, verify the setup by checking:

1. **Table exists**: `SELECT * FROM seo_pages LIMIT 5;`
2. **Indexes created**: Check in Supabase Dashboard > Database > Indexes
3. **RLS enabled**: Check in Supabase Dashboard > Authentication > Policies
4. **Default data inserted**: Should see 6 rows (3 Thai + 3 English pages)

## 3. Test the SEO API

Once the database is set up, test the API endpoints:

```bash
# Get all SEO pages
curl https://your-domain.com/api/admin/seo

# Get specific page
curl "https://your-domain.com/api/admin/seo?page_path=/&locale=th"
```

## 4. Access Admin Panel

1. Go to `/admin` and login
2. Click on **"จัดการ SEO"** (SEO Management)
3. You should see the default pages listed
4. Try creating a new SEO page or editing existing ones

## 5. Environment Variables

Make sure these are set in your Vercel project:

```env
NEXT_PUBLIC_SITE_URL=https://padungsilpa.group
GOOGLE_SITE_VERIFICATION=your-google-verification-code
BING_SITE_VERIFICATION=your-bing-verification-code
```

## Troubleshooting

### Issue: RLS Policy Error
**Solution**: Make sure you're authenticated when accessing the admin API

### Issue: Unique Constraint Error
**Solution**: The combination of `page_path` and `locale` must be unique

### Issue: JSONB Error
**Solution**: Ensure structured_data is valid JSON format

### Issue: API Not Working
**Solution**: Check that the auth middleware is properly configured

-- Supabase SQL script for Navbar Submenu translations
-- Schema: key (text), value (text), locale (text), description (text)

-- Company submenu translations
INSERT INTO web_labels (key, value, locale, description) VALUES
-- About Company
('navigation.company.about', 'About OIL DEVELOPMENT Company', 'en', 'Company submenu - About company link'),
('navigation.company.about', 'เกี่ยวกับบริษัทOIL DEVELOPMENT', 'th', 'Company submenu - About company link'),

-- Company History
('navigation.company.history', 'Company History', 'en', 'Company submenu - History link'),
('navigation.company.history', 'ประวัติความเป็นมา', 'th', 'Company submenu - History link'),

-- Executive Team
('navigation.company.executive', 'Executive Team', 'en', 'Company submenu - Executive team link'),
('navigation.company.executive', 'ผู้บริหาร', 'th', 'Company submenu - Executive team link'),

-- Mission & Vision
('navigation.company.mission', 'Mission & Vision', 'en', 'Company submenu - Mission and vision link'),
('navigation.company.mission', 'วิสัยทัศน์และพันธกิจ', 'th', 'Company submenu - Mission and vision link')

ON CONFLICT (key, locale) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();

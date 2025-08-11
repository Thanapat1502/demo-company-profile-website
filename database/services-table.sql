-- Services table for the services store functionality
-- This table stores services data for the homepage services section

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at 
  BEFORE UPDATE ON services
  FOR EACH ROW 
  EXECUTE FUNCTION update_services_updated_at();

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
-- Public can view all services (for frontend display)
CREATE POLICY "Public can view services" ON services 
  FOR SELECT USING (true);

-- Authenticated users can manage services (for admin panel)
CREATE POLICY "Authenticated users can manage services" ON services 
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

-- Insert sample services data with construction-themed images
INSERT INTO services (name_th, name_en, description_th, description_en, image_url, is_featured, sort_order) VALUES
('ก่อสร้างสถานีบริการน้ำมัน', 'Gas Station Construction', 
 'บริการก่อสร้างสถานีบริการน้ำมันครบวงจร ตั้งแต่การออกแบบ การก่อสร้าง จนถึงการส่งมอบงาน', 
 'Complete gas station construction services from design to completion',
 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 1),

('ติดตั้งถังน้ำมันใต้ดิน', 'Underground Tank Installation', 
 'บริการติดตั้งถังน้ำมันใต้ดิน PERMATANK® ผนัง 2 ชั้น ปลอดภัย ได้มาตรฐานสากล', 
 'Professional underground fuel tank installation with PERMATANK® double-wall technology',
 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 2),

('ระบบท่อน้ำมันใต้ดิน', 'Underground Piping System', 
 'ติดตั้งระบบท่อน้ำมันใต้ดินผนัง 2 ชั้น พร้อมระบบตรวจจับการรั่วไหล', 
 'Double-wall underground fuel piping system with leak detection technology',
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 3),

('ระบบวัดน้ำมันอัตโนมัติ', 'Automatic Tank Gauging System', 
 'ระบบ ATG สำหรับตรวจสอบระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ', 
 'Advanced ATG system for automatic fuel level monitoring and leak detection',
 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 4),

('บริการบำรุงรักษา', 'Maintenance Services', 
 'บริการบำรุงรักษาและซ่อมแซมระบบสถานีบริการน้ำมันครบวงจร', 
 'Comprehensive maintenance and repair services for gas station systems',
 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 5),

('ที่ปรึกษาวิศวกรรม', 'Engineering Consulting', 
 'บริการที่ปรึกษาด้านวิศวกรรมและการจัดการโครงการสถานีบริการน้ำมัน', 
 'Professional engineering consulting and project management services',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true, 6)

ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON services TO authenticated;
GRANT SELECT ON services TO anon;

-- Comments for documentation
COMMENT ON TABLE services IS 'Stores services data for homepage services section';
COMMENT ON COLUMN services.name_th IS 'Service name in Thai';
COMMENT ON COLUMN services.name_en IS 'Service name in English';
COMMENT ON COLUMN services.description_th IS 'Service description in Thai';
COMMENT ON COLUMN services.description_en IS 'Service description in English';
COMMENT ON COLUMN services.image_url IS 'Service image URL';
COMMENT ON COLUMN services.is_featured IS 'Whether service should be featured on homepage';
COMMENT ON COLUMN services.sort_order IS 'Display order for services';

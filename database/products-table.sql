-- Simple Products table for the product store functionality
-- This is separate from the main products_services table

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access for published/available products
CREATE POLICY "Public can read available products" ON products 
FOR SELECT USING (is_available = true);

-- Authenticated users can manage all products
CREATE POLICY "Authenticated users can manage products" ON products 
FOR ALL USING (auth.role() = 'authenticated');

-- Alternative admin policy (if you want to use email-based admin identification)
-- CREATE POLICY "Admins can manage products" ON products 
-- FOR ALL USING (
--   EXISTS (
--     SELECT 1 FROM auth.users 
--     WHERE auth.users.id = auth.uid() 
--     AND auth.users.email LIKE '%@admin.%'
--   )
-- );

-- Insert some sample data
INSERT INTO products (name_th, name_en, description_th, description_en, image_url, is_available) VALUES
('ถังน้ำมันใต้ดิน PERMATANK®', 'Underground Fuel Tank PERMATANK®', 
 'ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล', 
 'Double-wall underground fuel tank, durable and safe, meets international standards',
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true),
('ท่อน้ำมันใต้ดินผนัง 2 ชั้น', 'Double-Wall Underground Fuel Piping',
 'ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหล',
 'Underground fuel piping system that prevents leaks with real-time leak detection',
 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true),
('ปั๊มน้ำมัน TOKHEIM', 'TOKHEIM Fuel Dispenser',
 'ปั๊มน้ำมันคุณภาพสูง ทนทาน เหมาะสำหรับสถานีบริการ',
 'High-quality fuel dispenser, durable and suitable for service stations',
 'https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
 true);

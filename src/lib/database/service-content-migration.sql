-- Service Content Table Migration
-- This creates the service_content table used by the /api/service-content endpoint

-- Create service_content table for Products & Services content management
CREATE TABLE IF NOT EXISTS service_content (
  id VARCHAR(20) PRIMARY KEY, -- SERVICE_1, SERVICE_2, SERVICE_3, SERVICE_4
  page VARCHAR(20) NOT NULL DEFAULT 'SERVICE',
  type VARCHAR(20) NOT NULL CHECK (type IN ('gallery', 'video')),
  images_url TEXT[], -- Array of image URLs
  video_url TEXT, -- Video URL for video type
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  
  -- Constraints
  CONSTRAINT valid_service_id CHECK (id IN ('SERVICE_1', 'SERVICE_2', 'SERVICE_3', 'SERVICE_4')),
  CONSTRAINT valid_page CHECK (page = 'SERVICE'),
  CONSTRAINT valid_content_type CHECK (
    (type = 'gallery' AND images_url IS NOT NULL) OR
    (type = 'video' AND video_url IS NOT NULL)
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_content_page ON service_content(page);
CREATE INDEX IF NOT EXISTS idx_service_content_type ON service_content(type);
CREATE INDEX IF NOT EXISTS idx_service_content_created_by ON service_content(created_by);
CREATE INDEX IF NOT EXISTS idx_service_content_updated_by ON service_content(updated_by);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_service_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_content_updated_at 
  BEFORE UPDATE ON service_content
  FOR EACH ROW 
  EXECUTE FUNCTION update_service_content_updated_at();

-- Enable Row Level Security
ALTER TABLE service_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_content
-- Public can view all service content (for frontend display)
CREATE POLICY "Public can view service content" ON service_content 
  FOR SELECT USING (true);

-- Authenticated users can manage service content (for admin panel)
CREATE POLICY "Authenticated users can manage service content" ON service_content 
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

-- Optional: More restrictive admin-only policy (uncomment if needed)
-- CREATE POLICY "Admins can manage service content" ON service_content 
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM auth.users 
--       WHERE auth.users.id = auth.uid() 
--       AND auth.users.email LIKE '%@admin.%'
--     )
--   );

-- Insert initial empty records for all service slots (optional)
INSERT INTO service_content (id, page, type, images_url) VALUES
  ('SERVICE_1', 'SERVICE', 'gallery', '{}'),
  ('SERVICE_2', 'SERVICE', 'gallery', '{}'),
  ('SERVICE_3', 'SERVICE', 'gallery', '{}'),
  ('SERVICE_4', 'SERVICE', 'gallery', '{}')
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON service_content TO authenticated;
GRANT SELECT ON service_content TO anon;

-- Comments for documentation
COMMENT ON TABLE service_content IS 'Stores content for Products & Services page sections';
COMMENT ON COLUMN service_content.id IS 'Service identifier: SERVICE_1, SERVICE_2, SERVICE_3, SERVICE_4';
COMMENT ON COLUMN service_content.page IS 'Always SERVICE for this table';
COMMENT ON COLUMN service_content.type IS 'Content type: gallery for images, video for video URL';
COMMENT ON COLUMN service_content.images_url IS 'Array of image URLs for gallery type';
COMMENT ON COLUMN service_content.video_url IS 'Video URL for video type';
COMMENT ON COLUMN service_content.created_by IS 'User who created this content';
COMMENT ON COLUMN service_content.updated_by IS 'User who last updated this content';

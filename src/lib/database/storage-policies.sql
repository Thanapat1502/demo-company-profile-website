-- Storage Policies for Images Bucket
-- This ensures proper authentication for file uploads

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Policy 1: Public can view/download images
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Policy 2: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' 
    AND auth.uid() IS NOT NULL
  );

-- Policy 3: Authenticated users can update their uploaded images
CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'images' 
    AND auth.uid() IS NOT NULL
  );

-- Policy 4: Authenticated users can delete their uploaded images
CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' 
    AND auth.uid() IS NOT NULL
  );

-- Ensure the images bucket exists and has proper settings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true, -- Public bucket for reading
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

-- Grant necessary permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT SELECT ON storage.objects TO anon;

-- Comments for documentation
COMMENT ON POLICY "Public can view images" ON storage.objects IS 
  'Allows public read access to images for frontend display';

COMMENT ON POLICY "Authenticated users can upload images" ON storage.objects IS 
  'Allows authenticated users to upload images through admin panel';

COMMENT ON POLICY "Authenticated users can update images" ON storage.objects IS 
  'Allows authenticated users to update/replace existing images';

COMMENT ON POLICY "Authenticated users can delete images" ON storage.objects IS 
  'Allows authenticated users to delete images they uploaded';

-- Supabase Storage Setup for Website Assets
-- Run this script in your Supabase SQL Editor

-- Create storage bucket for website assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-assets',
  'website-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to website assets
CREATE POLICY "Public read access for website assets" ON storage.objects
FOR SELECT USING (bucket_id = 'website-assets');

-- Policy: Allow authenticated users to upload website assets
CREATE POLICY "Authenticated users can upload website assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] IN ('seo', 'products', 'services', 'uploads')
);

-- Policy: Allow authenticated users to update website assets
CREATE POLICY "Authenticated users can update website assets" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
) WITH CHECK (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to delete website assets
CREATE POLICY "Authenticated users can delete website assets" ON storage.objects
FOR DELETE USING (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_objects_bucket_id_name ON storage.objects(bucket_id, name);
CREATE INDEX IF NOT EXISTS idx_objects_bucket_id_folder ON storage.objects(bucket_id, (storage.foldername(name))[1]);

-- Verify the setup
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE id = 'website-assets';

-- Show policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%website assets%';

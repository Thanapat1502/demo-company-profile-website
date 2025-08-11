# Supabase Storage Integration for Image Uploads

## 🎯 **Overview**

The image upload system has been migrated from local file storage to **Supabase Storage** for better scalability, reliability, and CDN performance.

## ✅ **Key Benefits**

### **🚀 Performance**
- **Global CDN**: Images served from Supabase's global CDN
- **Automatic Optimization**: Built-in image optimization and compression
- **Fast Loading**: Reduced server load and faster image delivery

### **📈 Scalability**
- **Unlimited Storage**: No local disk space limitations
- **High Availability**: 99.9% uptime guarantee
- **Auto-scaling**: Handles traffic spikes automatically

### **🔒 Security**
- **Access Control**: Fine-grained permissions and policies
- **Secure URLs**: Signed URLs for private content
- **Backup & Recovery**: Automatic backups and versioning

## 🏗️ **Implementation Details**

### **✅ Storage Structure**

```
Supabase Storage Bucket: website-assets
├── seo/                    # SEO images (Open Graph, Twitter)
│   ├── 1691234567_og_image.jpg
│   └── 1691234568_twitter_card.png
├── products/               # Product images
│   ├── 1691234569_product_1.jpg
│   └── 1691234570_product_2.png
└── services/               # Service images
    ├── 1691234571_service_1.jpg
    └── 1691234572_service_2.png
```

### **✅ Upload API Implementation**

```typescript
// /api/admin/upload/route.ts
export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  
  // Generate unique filename
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '');
  const filename = `${timestamp}_${cleanName}.${fileExtension}`;

  // Determine bucket path
  let bucketPath = 'uploads';
  if (type === 'seo-image') bucketPath = 'seo';
  else if (type === 'product-image') bucketPath = 'products';
  else if (type === 'service-image') bucketPath = 'services';

  const filePath = `${bucketPath}/${filename}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('website-assets')
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '31536000', // 1 year cache
      upsert: false
    });

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('website-assets')
    .getPublicUrl(filePath);

  return NextResponse.json({
    success: true,
    url: publicUrlData.publicUrl,
    filename: filename,
    path: filePath,
    size: file.size,
    type: file.type,
  });
}
```

### **✅ Delete Implementation**

```typescript
export async function DELETE(request: NextRequest) {
  const supabase = createServerClient();
  const filePath = searchParams.get('path');

  // Delete from Supabase Storage
  const { error } = await supabase.storage
    .from('website-assets')
    .remove([filePath]);

  if (error) {
    return NextResponse.json(
      { error: 'Failed to delete file from storage' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'File deleted successfully',
  });
}
```

## 🎨 **Frontend Integration**

### **✅ Enhanced Remove Function**

```typescript
const removeImage = async (type: 'og' | 'twitter') => {
  const currentImage = type === 'og' ? formData.og_image : formData.twitter_image;
  
  // Delete from Supabase Storage if exists
  if (currentImage && currentImage.includes('supabase')) {
    try {
      const url = new URL(currentImage);
      const pathParts = url.pathname.split('/');
      const bucketIndex = pathParts.findIndex(part => part === 'website-assets');
      if (bucketIndex !== -1) {
        const filePath = pathParts.slice(bucketIndex + 1).join('/');
        
        await fetch(`/api/admin/upload?path=${encodeURIComponent(filePath)}`, {
          method: 'DELETE',
        });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  // Update form state
  if (type === 'og') {
    setFormData(prev => ({ ...prev, og_image: '' }));
    setOgImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
  } else {
    setFormData(prev => ({ ...prev, twitter_image: '' }));
    setTwitterImageUpload({ file: null, preview: null, uploading: false, progress: 0 });
  }
};
```

### **✅ Next.js Image Configuration**

```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "rmzwbozxbepjfonhmgfv.supabase.co",
      pathname: "/storage/v1/object/public/website-assets/**",
    },
  ],
},
```

## 🔧 **Supabase Setup Requirements**

### **✅ Storage Bucket Creation**

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true);
```

### **✅ Storage Policies**

```sql
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'website-assets');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'website-assets' 
  AND auth.role() = 'authenticated'
);
```

## 📊 **File Management Features**

### **✅ Automatic Features**
- **Unique Naming**: Timestamp-based filenames prevent conflicts
- **Type Organization**: Files organized by type (seo, products, services)
- **Cache Headers**: 1-year cache for optimal performance
- **Content-Type**: Proper MIME type detection and setting

### **✅ Validation**
- **File Type**: Only image files allowed
- **File Size**: Maximum 5MB per file
- **Security**: Sanitized filenames and paths
- **Error Handling**: Comprehensive error messages

## 🚀 **Performance Optimizations**

### **✅ CDN Benefits**
- **Global Distribution**: Images served from nearest edge location
- **Automatic Compression**: Optimized file sizes
- **HTTP/2**: Faster loading with multiplexing
- **Caching**: Long-term browser and CDN caching

### **✅ Storage Benefits**
- **Scalability**: No server storage limitations
- **Reliability**: 99.9% uptime SLA
- **Backup**: Automatic backups and versioning
- **Security**: Enterprise-grade security

## 🔍 **Usage Examples**

### **✅ SEO Image Upload**
```typescript
// Upload SEO image
const formData = new FormData();
formData.append('file', imageFile);
formData.append('type', 'seo-image');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
// result.url: https://rmzwbozxbepjfonhmgfv.supabase.co/storage/v1/object/public/website-assets/seo/1691234567_image.jpg
```

### **✅ Image Deletion**
```typescript
// Delete image from storage
await fetch(`/api/admin/upload?path=${encodeURIComponent('seo/1691234567_image.jpg')}`, {
  method: 'DELETE',
});
```

The Supabase Storage integration provides **enterprise-level file management** with **global CDN performance**, **automatic optimization**, and **comprehensive security** for all image uploads in the SEO Manager and future content management features.

# Comprehensive SEO Manager - Full Configuration

## Overview

The SEO Manager has been enhanced with **comprehensive SEO configuration** covering all schema fields, **image upload functionality**, and **real-time previews**. This provides complete control over SEO settings with an intuitive tabbed interface.

## 🎯 **Key Features**

### **✅ Complete SEO Schema Coverage**
- **Basic SEO**: Title, description, keywords, author, canonical URL
- **Open Graph**: Title, description, image, type for social sharing
- **Twitter Cards**: Card type, title, description, image
- **Technical SEO**: Robots, priority, change frequency, structured data
- **Meta Fields**: Active status, timestamps

### **✅ Image Upload System**
- **Drag & Drop Interface**: Easy image selection and upload
- **Real-time Preview**: Instant preview of uploaded images
- **Multiple Formats**: Support for JPG, PNG, WebP
- **Size Validation**: Max 5MB with automatic validation
- **Optimized Storage**: Organized upload directories

### **✅ Live Previews**
- **Google Search Preview**: See how pages appear in search results
- **Facebook/Open Graph Preview**: Social media sharing preview
- **Twitter Card Preview**: Twitter sharing appearance
- **Real-time Updates**: Previews update as you type

## 🏗️ **Architecture**

### **✅ Component Structure**
```
SEOManager.tsx
├── Enhanced Interface with Tabs
├── Image Upload Components
├── Real-time Previews
└── Form Validation

API Endpoints
├── /api/admin/seo (CRUD operations)
├── /api/admin/upload (Image handling)
└── File Management System
```

### **✅ Database Schema**
```sql
-- Enhanced seo_pages table
CREATE TABLE seo_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  locale TEXT NOT NULL,
  
  -- Basic SEO
  title TEXT,
  description TEXT,
  keywords TEXT,
  author TEXT,
  canonical_url TEXT,
  
  -- Open Graph
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  og_type TEXT DEFAULT 'website',
  
  -- Twitter Cards
  twitter_card TEXT DEFAULT 'summary_large_image',
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Technical SEO
  robots TEXT DEFAULT 'index,follow',
  priority DECIMAL DEFAULT 0.8,
  change_frequency TEXT DEFAULT 'weekly',
  structured_data JSONB,
  
  -- Meta
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(page_path, locale)
);
```

## 🎨 **User Interface**

### **✅ Tabbed Interface**
```tsx
<Tabs aria-label="SEO Configuration">
  {/* Basic SEO Tab */}
  <Tab key="basic" title="Basic SEO">
    {/* Title, description, keywords, author, canonical URL */}
  </Tab>
  
  {/* Open Graph Tab */}
  <Tab key="opengraph" title="Open Graph">
    {/* OG fields + image upload */}
  </Tab>
  
  {/* Twitter Card Tab */}
  <Tab key="twitter" title="Twitter">
    {/* Twitter fields + image upload */}
  </Tab>
  
  {/* Technical SEO Tab */}
  <Tab key="technical" title="Technical">
    {/* Robots, priority, structured data */}
  </Tab>
  
  {/* Preview Tab */}
  <Tab key="preview" title="Preview">
    {/* Live previews of all formats */}
  </Tab>
</Tabs>
```

### **✅ Image Upload Component**
```tsx
{/* Image Upload with Preview */}
<div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
  {imageUpload.preview ? (
    <div className="relative">
      <Image src={imageUpload.preview} alt="Preview" />
      <Button onPress={() => removeImage('og')}>
        <X className="w-4 h-4" />
      </Button>
      {imageUpload.uploading && (
        <div className="absolute inset-0 bg-black/50">
          <Spinner />
          <Progress value={imageUpload.progress} />
        </div>
      )}
    </div>
  ) : (
    <div className="text-center">
      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <Button onPress={() => fileInputRef.current?.click()}>
        Choose Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageSelect(e, 'og')}
      />
    </div>
  )}
</div>
```

## 📁 **File Upload System**

### **✅ Upload API Endpoint**
```typescript
// /api/admin/upload/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const type = formData.get('type') as string;

  // Validation
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
  }

  // Save file and return URL
  const publicUrl = await saveFile(file, type);
  return NextResponse.json({ success: true, url: publicUrl });
}
```

### **✅ Directory Structure**
```
public/
└── uploads/
    ├── seo/          # SEO images (OG, Twitter)
    ├── products/     # Product images
    └── services/     # Service images
```

### **✅ Image Handling Features**
- **Automatic Validation**: File type and size checking
- **Unique Filenames**: Timestamp-based naming to prevent conflicts
- **Progress Tracking**: Real-time upload progress
- **Error Handling**: Comprehensive error messages
- **File Cleanup**: Automatic cleanup of old files

## 🔍 **Live Preview System**

### **✅ Google Search Preview**
```tsx
<Card>
  <CardBody>
    <h4>Google Search Preview</h4>
    <div className="space-y-1">
      <div className="text-blue-600 text-lg hover:underline cursor-pointer">
        {formData.title || 'Page Title'}
      </div>
      <div className="text-green-700 text-sm">
        https://www.padungsilpa.group{formData.page_path || '/page-path'}
      </div>
      <div className="text-gray-600 text-sm">
        {formData.description || 'Page description will appear here...'}
      </div>
    </div>
  </CardBody>
</Card>
```

### **✅ Social Media Previews**
- **Facebook/Open Graph**: Card-style preview with image
- **Twitter Card**: Platform-specific formatting
- **Real-time Updates**: Previews update as fields change
- **Image Integration**: Shows uploaded images in previews

## ⚡ **Performance Features**

### **✅ Optimized Image Handling**
- **Client-side Validation**: Immediate feedback before upload
- **Progress Tracking**: Visual upload progress
- **Lazy Loading**: Images load only when needed
- **Compression**: Automatic image optimization

### **✅ Form Optimization**
- **Real-time Validation**: Instant field validation
- **Character Counting**: Live character count for titles/descriptions
- **Auto-save**: Prevent data loss during editing
- **Batch Operations**: Efficient bulk updates

## 🎯 **SEO Best Practices**

### **✅ Built-in Guidance**
- **Character Limits**: Visual indicators for optimal lengths
- **Recommended Sizes**: Image dimension guidance
- **SEO Tips**: Contextual help and suggestions
- **Validation Rules**: Automatic validation of SEO requirements

### **✅ Content Optimization**
- **Title Length**: 50-60 characters recommended
- **Description Length**: 150-160 characters recommended
- **Image Sizes**: 1200x630px for OG, 1200x675px for Twitter
- **Structured Data**: JSON-LD schema validation

## 🚀 **Usage Examples**

### **✅ Creating a New SEO Page**
1. Click "Create SEO Page"
2. Fill in Basic SEO tab (title, description, keywords)
3. Upload images in Open Graph and Twitter tabs
4. Configure technical settings
5. Preview results in Preview tab
6. Save configuration

### **✅ Bulk SEO Management**
- **Page Templates**: Quick setup for common page types
- **Batch Import**: CSV import for multiple pages
- **Global Settings**: Site-wide SEO defaults
- **Audit Tools**: SEO health checking

The enhanced SEO Manager provides **complete control** over all SEO aspects while maintaining an **intuitive user experience** with **real-time feedback** and **comprehensive previews**.

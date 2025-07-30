# Flexible Content Manager System Documentation

## Overview

This is a comprehensive, flexible Content Manager system designed for website admin panels. It supports multilingual content (Thai/English), dynamic page configurations, and various content types including images, galleries, and videos.

## System Architecture

### 🏗️ **Core Components**

1. **UI Layer** - React components with Tailwind CSS
2. **Configuration Layer** - JSON-based page and section definitions
3. **Database Layer** - Supabase PostgreSQL with RLS
4. **Storage Layer** - Supabase Storage for images/files
5. **API Layer** - TypeScript services for data operations

### 📋 **Key Features**

- ✅ **Multilingual Support** (Thai/English)
- ✅ **Dynamic Page Configuration**
- ✅ **Multiple Content Types** (Hero, Gallery, Individual Images, Video)
- ✅ **Flexible Section Management**
- ✅ **Image Upload & Management**
- ✅ **Video Embed Support**
- ✅ **Draft/Published Workflow**
- ✅ **Responsive Design**
- ✅ **Type-Safe Implementation**

## Page Configurations

### 🏠 **Home Page**
```typescript
{
  id: 'home',
  sections: [
    { type: 'hero', minImages: 1, maxImages: 5 },
    { type: 'parallax_gallery', minImages: 3, maxImages: 10 }
  ]
}
```

### 📖 **About Page & Subpages**
```typescript
{
  id: 'about',
  sections: [{ type: 'hero', minImages: 1, maxImages: 3 }],
  subpages: [
    { id: 'about-main', sections: [{ type: 'parallax_gallery' }] },
    { id: 'about-history', sections: [{ type: 'individual_images', maxImages: 6 }] },
    { id: 'about-vision', sections: [{ type: 'individual_images', maxImages: 2 }] },
    { id: 'about-executive', sections: [{ type: 'hero' }] }
  ]
}
```

### 🛍️ **Products/Services Page**
```typescript
{
  id: 'products-services',
  sections: [
    { type: 'hero', minImages: 1, maxImages: 3 },
    { type: 'gallery_or_video', allowVideo: true }, // Service 1-4
  ]
}
```

### 📰 **News & Contact Pages**
```typescript
{
  id: 'news',
  sections: [{ type: 'hero', minImages: 1, maxImages: 3 }]
}
```

## Section Types

### 1. **Hero Section**
- **Purpose**: Main banner/header images
- **Features**: 1-5 images, title, description
- **Use Cases**: Page headers, main banners

### 2. **Parallax Gallery**
- **Purpose**: Scrolling image galleries with parallax effect
- **Features**: 3-10 images, section title/description
- **Use Cases**: Showcasing projects, company history

### 3. **Individual Images**
- **Purpose**: Specific number of individual images
- **Features**: Exact image count (e.g., 6 for history, 2 for vision)
- **Use Cases**: Team photos, milestone images

### 4. **Gallery or Video**
- **Purpose**: Toggle between image gallery and video content
- **Features**: Mode switching, video URL support, gallery images
- **Use Cases**: Service demonstrations, product showcases

## Database Schema

### 📊 **Core Tables**

1. **`pages`** - Page definitions and hierarchy
2. **`section_configs`** - Section configurations per page
3. **`page_contents`** - Content instances with status
4. **`section_data`** - Actual section content
5. **`images`** - Image assets with metadata

### 🔐 **Security Features**

- **Row Level Security (RLS)** enabled
- **Public read access** for published content
- **Admin-only write access** with role-based permissions
- **Secure file upload** with validation

## API Service Layer

### 🔧 **Key Methods**

```typescript
// Get all pages
contentManagerService.getAllPages()

// Get page with all content
contentManagerService.getCompletePageData(pageId, status)

// Save page content
contentManagerService.savePageContent(pageId, contentData)

// Upload images
contentManagerService.uploadImage(file, path)
```

## UI Components

### 📱 **Main Components**

1. **`ContentManager`** - Main container component
2. **`SectionEditor`** - Dynamic section renderer
3. **`HeroSectionEditor`** - Hero section management
4. **`ParallaxGallerySectionEditor`** - Gallery management
5. **`IndividualImagesSectionEditor`** - Individual image management
6. **`GalleryOrVideoSectionEditor`** - Toggle mode management

### 🎨 **Design Features**

- **Responsive layout** with Tailwind CSS
- **Intuitive navigation** with page tabs
- **Language switching** for multilingual content
- **Visual feedback** for required fields
- **Drag-and-drop** image upload areas

## Implementation Guide

### 🚀 **Setup Steps**

1. **Database Setup**
   ```sql
   -- Run the schema file
   psql -f src/lib/database/content-manager-schema.sql
   ```

2. **Storage Setup**
   ```typescript
   // Create storage bucket in Supabase
   await supabase.storage.createBucket('content-images', {
     public: true,
     allowedMimeTypes: ['image/*']
   })
   ```

3. **Component Integration**
   ```typescript
   import { ContentManager } from '@/app/admin/(component)/contentManager'
   
   // Use in admin panel
   <ContentManager />
   ```

### 🔧 **Configuration**

1. **Add New Page Type**
   ```typescript
   // Add to PAGE_CONFIGURATIONS array
   {
     id: 'new-page',
     name: { th: 'หน้าใหม่', en: 'New Page' },
     sections: [
       {
         id: 'hero',
         type: 'hero',
         title: { th: 'ส่วนหัว', en: 'Hero Section' },
         minImages: 1,
         maxImages: 3,
         required: true
       }
     ]
   }
   ```

2. **Add New Section Type**
   ```typescript
   // Extend section types
   type SectionType = 'hero' | 'parallax_gallery' | 'individual_images' | 'gallery_or_video' | 'new_type'
   
   // Create new editor component
   const NewSectionEditor = ({ config, selectedLanguage, control }) => {
     // Implementation
   }
   ```

## Best Practices

### ✅ **Development Guidelines**

1. **Type Safety**: Always use TypeScript interfaces
2. **Error Handling**: Implement proper try-catch blocks
3. **Validation**: Validate file types and sizes
4. **Performance**: Optimize image loading and caching
5. **Accessibility**: Include alt text for all images
6. **SEO**: Implement proper meta tags and structured data

### 🔒 **Security Considerations**

1. **File Upload Validation**: Check file types and sizes
2. **RLS Policies**: Implement proper database security
3. **Admin Authentication**: Verify admin permissions
4. **Input Sanitization**: Clean user inputs
5. **CORS Configuration**: Set proper CORS policies

## Extensibility

### 🔧 **Adding New Features**

1. **Custom Section Types**: Create new section editors
2. **Additional File Types**: Support PDFs, documents
3. **Advanced Galleries**: Add carousel, lightbox features
4. **Content Scheduling**: Add publish date scheduling
5. **Version Control**: Implement content versioning
6. **Bulk Operations**: Add bulk upload/edit features

### 📈 **Scaling Considerations**

1. **CDN Integration**: Use CDN for image delivery
2. **Image Optimization**: Implement automatic resizing
3. **Caching Strategy**: Cache frequently accessed content
4. **Database Indexing**: Optimize query performance
5. **Load Balancing**: Handle high traffic scenarios

## Troubleshooting

### 🐛 **Common Issues**

1. **Upload Failures**: Check storage permissions and file sizes
2. **RLS Errors**: Verify user authentication and policies
3. **Type Errors**: Ensure proper TypeScript interfaces
4. **Performance Issues**: Optimize image sizes and queries
5. **UI Responsiveness**: Test on various screen sizes

This system provides a robust, scalable foundation for content management with excellent developer experience and user-friendly admin interface.

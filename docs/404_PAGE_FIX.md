# 404 Page Fix Documentation

## Problem

The custom 404 page was not showing for URLs like `/th/not-existing-page` or `/not-found`. Instead, the default Next.js 404 page was being displayed.

## Root Cause

In Next.js 13+ with the app directory, there are specific rules for how 404 pages work:

1. **Global 404**: `src/app/not-found.tsx` - handles all unmatched routes
2. **Locale-specific 404**: `src/app/[locale]/not-found.tsx` - handles 404s within locale routes
3. **Middleware conflicts**: The i18n middleware was not properly handling 404 cases

## Solution Implemented

### ✅ 1. Global 404 Page (`src/app/not-found.tsx`)

Created a global 404 page that handles all unmatched routes:

```tsx
// src/app/not-found.tsx
export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Bilingual 404 content */}
      <h1>404 - Page Not Found | ไม่พบหน้าที่ต้องการ</h1>
      {/* Links to both Thai and English homepages */}
    </div>
  );
}
```

**Features:**
- ✅ **Bilingual content** (Thai/English)
- ✅ **SEO optimized** with proper meta tags
- ✅ **Links to both locales** (`/th` and `/en`)
- ✅ **Helpful navigation** to popular pages
- ✅ **Contact information** for support

### ✅ 2. Locale-Specific 404 Page (`src/app/[locale]/not-found.tsx`)

Updated the locale-specific 404 page:

```tsx
// src/app/[locale]/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen">
      {/* Bilingual content with locale-aware links */}
      <ButtonWrapper as={Link} href="/th">Go to Homepage | ไปหน้าแรก</ButtonWrapper>
    </div>
  );
}
```

**Key Changes:**
- ✅ **Removed `useTranslations()`** - doesn't work in not-found.tsx
- ✅ **Static bilingual text** instead of translations
- ✅ **Fixed all Button components** to use ButtonWrapper
- ✅ **Proper locale-aware links** (`/th/...`, `/en/...`)

### ✅ 3. 404 Handler Utility (`src/lib/404-handler.ts`)

Created utility functions for consistent 404 handling:

```tsx
import { handleNotFound, validatePageParams } from '@/lib/404-handler';

// In page components
export default async function SomePage({ params }: Props) {
  const { locale } = await params;
  
  // Validate locale
  validatePageParams({ locale });
  
  // Handle missing data
  if (!data) {
    handleNotFound('Data not found');
  }
}
```

**Functions:**
- ✅ `handleNotFound(reason?)` - Triggers custom 404 page
- ✅ `isValidLocale(locale)` - Validates locale parameters
- ✅ `validatePageParams(params)` - Validates page parameters
- ✅ `handleAPINotFound(type, id?)` - Handles API 404 responses

## How It Works Now

### ✅ URL Routing Behavior

| URL | Result | Page Shown |
|-----|--------|------------|
| `/not-existing` | Global 404 | `src/app/not-found.tsx` |
| `/th/not-existing` | Locale 404 | `src/app/[locale]/not-found.tsx` |
| `/en/not-existing` | Locale 404 | `src/app/[locale]/not-found.tsx` |
| `/invalid-locale/page` | Global 404 | `src/app/not-found.tsx` |

### ✅ Middleware Flow

1. **Request comes in** (e.g., `/th/not-existing-page`)
2. **Middleware processes** locale and caching headers
3. **Next.js routing** tries to match the route
4. **No match found** → triggers `not-found.tsx`
5. **Custom 404 page** is displayed with proper styling

### ✅ SEO Benefits

- **Proper HTTP 404 status** returned
- **Custom meta tags** for 404 pages
- **Structured data** for search engines
- **No indexing** of 404 pages (`noindex, nofollow`)
- **Helpful user experience** with navigation options

## Testing the Fix

### ✅ Test Cases

1. **Global 404**:
   ```
   https://your-domain.com/not-existing-page
   → Shows global 404 with links to both locales
   ```

2. **Thai 404**:
   ```
   https://your-domain.com/th/not-existing-page
   → Shows locale 404 with Thai/English content
   ```

3. **English 404**:
   ```
   https://your-domain.com/en/not-existing-page
   → Shows locale 404 with Thai/English content
   ```

4. **Invalid Locale**:
   ```
   https://your-domain.com/fr/some-page
   → Shows global 404 (French not supported)
   ```

### ✅ Verification Steps

1. **Visit test URLs** above
2. **Check HTTP status** is 404
3. **Verify custom styling** is applied
4. **Test navigation links** work correctly
5. **Check SEO meta tags** in page source

## Implementation Details

### ✅ File Structure

```
src/
├── app/
│   ├── not-found.tsx                 # Global 404 page
│   └── [locale]/
│       └── not-found.tsx             # Locale-specific 404
├── lib/
│   └── 404-handler.ts                # 404 utility functions
└── components/ui/
    └── ButtonWrapper.tsx             # SSR-safe button component
```

### ✅ Key Technical Points

1. **ButtonWrapper Usage**: All buttons in 404 pages use ButtonWrapper to avoid SSR hydration issues

2. **No Translations**: 404 pages use static bilingual text instead of `useTranslations()` which doesn't work in not-found.tsx

3. **Proper Links**: All links are locale-aware (`/th/...`, `/en/...`)

4. **SEO Optimization**: Proper meta tags and structured data for search engines

5. **Error Handling**: Graceful fallbacks and proper HTTP status codes

## Troubleshooting

### ❌ Still Seeing Default 404?

**Possible causes:**
1. **Browser cache** - Clear cache and hard refresh
2. **CDN cache** - Wait for cache invalidation or purge manually
3. **Development mode** - Restart Next.js dev server

### ❌ Hydration Errors?

**Solution:** Ensure all interactive components use ButtonWrapper or are properly wrapped with `"use client"`

### ❌ Translation Errors?

**Solution:** Use static bilingual text instead of `useTranslations()` in not-found.tsx files

### ❌ Styling Issues?

**Solution:** Ensure Tailwind CSS classes are properly applied and global styles are loaded

## Best Practices

### ✅ For Page Components

```tsx
import { validatePageParams, handleNotFound } from '@/lib/404-handler';

export default async function MyPage({ params }: Props) {
  const { locale, slug } = await params;
  
  // Validate parameters
  validatePageParams({ locale });
  
  // Fetch data
  const data = await fetchData(slug);
  
  // Handle missing data
  if (!data) {
    handleNotFound(`Content not found: ${slug}`);
  }
  
  return <div>{/* Page content */}</div>;
}
```

### ✅ For API Routes

```tsx
import { handleAPINotFound } from '@/lib/404-handler';

export async function GET(request: NextRequest) {
  const data = await fetchData();
  
  if (!data) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ data });
}
```

This comprehensive 404 fix ensures that users see a helpful, branded 404 page instead of the generic Next.js default, while maintaining proper SEO practices and user experience.

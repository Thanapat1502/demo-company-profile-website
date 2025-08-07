# Supabase-Based i18n Translation System

This document describes the new dynamic translation system that loads translations from Supabase instead of static JSON files.

## Overview

The system has been refactored to:
- ✅ Load translations dynamically from Supabase `web_labels` table
- ✅ Maintain full SSR compatibility with Next.js 14 App Router
- ✅ Use `next-intl` for translation management
- ✅ Include in-memory caching for performance
- ✅ Support both English (`en`) and Thai (`th`) locales
- ✅ Provide API endpoints for translation management

## Architecture

### Core Components

1. **`src/lib/i18n/loadMessages.ts`** - Main translation loader
2. **`src/i18n/request.ts`** - Next-intl configuration
3. **`database/web-labels-schema.sql`** - Database schema
4. **`scripts/migrate-translations.js`** - Migration script
5. **`src/app/api/translations/route.ts`** - API for translation management

### Database Schema

```sql
CREATE TABLE web_labels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    locale TEXT NOT NULL CHECK (locale IN ('en', 'th')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(key, locale)
);
```

## Setup Instructions

### 1. Create the Database Table

Run the SQL schema in your Supabase dashboard:

```bash
# Execute the schema file in Supabase SQL Editor
database/web-labels-schema.sql
```

### 2. Migrate Existing Translations

Run the migration script to populate the table with existing JSON translations:

```bash
# Make sure you have the required environment variables
node scripts/migrate-translations.js
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### 3. Test the System

Visit the test page to verify translations are working:
- English: `/en/test-translations`
- Thai: `/th/test-translations`

## Usage

### In Components

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>
    </div>
  );
}
```

### In Server Components

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyServerComponent() {
  const t = await getTranslations();
  
  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>
    </div>
  );
}
```

## Translation Management

### API Endpoints

#### GET /api/translations
Fetch all translations or filter by locale:

```bash
# Get all translations
curl /api/translations

# Get translations for specific locale
curl /api/translations?locale=en
```

#### POST /api/translations
Create or update a translation:

```bash
curl -X POST /api/translations \
  -H "Content-Type: application/json" \
  -d '{
    "key": "home.hero.title",
    "value": "Welcome to Our Site",
    "locale": "en",
    "description": "Main hero title"
  }'
```

#### DELETE /api/translations
Delete a translation:

```bash
curl -X DELETE "/api/translations?key=home.hero.title&locale=en"
```

### Direct Database Management

You can also manage translations directly in Supabase:

```sql
-- Insert new translation
INSERT INTO web_labels (key, value, locale, description) 
VALUES ('new.key', 'New Value', 'en', 'Description');

-- Update existing translation
UPDATE web_labels 
SET value = 'Updated Value' 
WHERE key = 'home.hero.title' AND locale = 'en';

-- Delete translation
DELETE FROM web_labels 
WHERE key = 'old.key' AND locale = 'en';
```

## Performance Features

### Caching
- In-memory caching per locale for improved performance
- Cache is automatically cleared when translations are updated via API
- Manual cache clearing: `clearTranslationCache(locale)`

### SSR Optimization
- Translations are loaded during server-side rendering
- No client-side loading delays
- Full SEO compatibility

## Key Format

Use dot notation for translation keys:
- `navigation.home` → Navigation menu items
- `home.hero.title` → Page-specific content
- `common.loading` → Shared/common text
- `contact.form.submit` → Form elements

## Migration Notes

### From JSON Files
The migration script automatically converts nested JSON structure to flat keys:

```json
// Before (JSON)
{
  "home": {
    "hero": {
      "title": "Welcome"
    }
  }
}

// After (Database)
key: "home.hero.title"
value: "Welcome"
locale: "en"
```

### Fallback Behavior
- If a translation is not found, the key itself is returned
- Empty translations return empty objects
- Errors are logged but don't break the application

## Security

- Public read access for translations (required for SSR)
- Authenticated write access only
- Row Level Security (RLS) enabled
- Service role key required for migration script

## Troubleshooting

### Common Issues

1. **Translations not loading**
   - Check Supabase connection
   - Verify environment variables
   - Check browser console for errors

2. **Cache not updating**
   - Use API endpoints to update translations (auto-clears cache)
   - Manually clear cache: `clearTranslationCache()`

3. **SSR errors**
   - Ensure Supabase client is properly configured for server-side
   - Check that cookies are properly handled

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

This will log translation loading information to the console.

## Future Enhancements

- [ ] Admin UI for translation management
- [ ] Translation versioning
- [ ] Bulk import/export functionality
- [ ] Translation validation
- [ ] Pluralization support
- [ ] Context-aware translations

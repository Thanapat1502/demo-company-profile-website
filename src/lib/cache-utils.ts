import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Cache utility functions for locale-specific caching
 */

export const CACHE_TAGS = {
  SERVICES: 'services',
  PRODUCTS: 'products',
  PARTNERS: 'partners',
  CONTENTS: 'contents',
  HOMEPAGE: 'homepage',
  LOCALE_TH: 'locale-th',
  LOCALE_EN: 'locale-en',
  API_DATA: 'api-data',
} as const;

export const LOCALES = ['th', 'en'] as const;
export type Locale = typeof LOCALES[number];

/**
 * Generate cache tags for a specific locale
 */
export function getLocaleCacheTag(locale: Locale): string {
  return `locale-${locale}`;
}

/**
 * Generate cache tags for a specific page and locale
 */
export function getPageCacheTag(page: string, locale: Locale): string {
  return `page-${page}-${locale}`;
}

/**
 * Revalidate a path for all locales
 */
export function revalidatePathForAllLocales(path: string): void {
  LOCALES.forEach(locale => {
    const fullPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
    revalidatePath(fullPath);
    console.log(`Revalidated path: ${fullPath}`);
  });
}

/**
 * Revalidate a path for a specific locale
 */
export function revalidatePathForLocale(path: string, locale: Locale): void {
  const fullPath = path === '/' ? `/${locale}` : `/${locale}${path}`;
  revalidatePath(fullPath);
  console.log(`Revalidated path: ${fullPath}`);
}

/**
 * Revalidate cache tags for a specific locale
 */
export function revalidateLocaleCache(locale: Locale): void {
  const localeTag = getLocaleCacheTag(locale);
  revalidateTag(localeTag);
  console.log(`Revalidated locale cache: ${localeTag}`);
}

/**
 * Revalidate all locale caches
 */
export function revalidateAllLocaleCache(): void {
  LOCALES.forEach(locale => {
    revalidateLocaleCache(locale);
  });
}

/**
 * Get cache headers for a specific locale and page type
 */
export function getCacheHeaders(locale: Locale, pageType: 'homepage' | 'static' | 'dynamic' = 'static') {
  const baseHeaders = {
    'Vary': 'Accept-Language, Accept-Encoding',
    'X-Locale': locale,
    'Cache-Tag': getLocaleCacheTag(locale),
  };

  switch (pageType) {
    case 'homepage':
      return {
        ...baseHeaders,
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'Cache-Tag': `${getLocaleCacheTag(locale)},${CACHE_TAGS.HOMEPAGE}`,
      };
    case 'dynamic':
      return {
        ...baseHeaders,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      };
    case 'static':
    default:
      return {
        ...baseHeaders,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      };
  }
}

/**
 * Invalidate cache for content updates
 */
export async function invalidateContentCache(contentType: keyof typeof CACHE_TAGS, locale?: Locale) {
  const tag = CACHE_TAGS[contentType];
  revalidateTag(tag);
  console.log(`Invalidated cache for: ${tag}`);

  if (locale) {
    revalidateLocaleCache(locale);
  } else {
    revalidateAllLocaleCache();
  }

  // Also invalidate homepage cache as it likely contains this content
  revalidateTag(CACHE_TAGS.HOMEPAGE);
  console.log(`Invalidated homepage cache`);
}

/**
 * Batch revalidation for multiple paths and locales
 */
export function batchRevalidate(operations: Array<{
  type: 'path' | 'tag';
  value: string;
  locale?: Locale;
}>) {
  const results: string[] = [];

  operations.forEach(({ type, value, locale }) => {
    if (type === 'path') {
      if (locale) {
        revalidatePathForLocale(value, locale);
        results.push(`path:${value}:${locale}`);
      } else {
        revalidatePathForAllLocales(value);
        results.push(`path:${value}:all`);
      }
    } else if (type === 'tag') {
      revalidateTag(value);
      results.push(`tag:${value}`);
    }
  });

  return results;
}

/**
 * Get cache key for locale-specific data
 */
export function getLocaleCacheKey(key: string, locale: Locale): string {
  return `${key}:${locale}`;
}

/**
 * Check if a request is for a specific locale
 */
export function isLocaleRequest(pathname: string, locale: Locale): boolean {
  return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`;
}

/**
 * Extract locale from pathname
 */
export function extractLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (LOCALES.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale;
  }
  
  return null;
}

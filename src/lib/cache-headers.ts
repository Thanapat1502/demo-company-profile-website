import { headers } from 'next/headers';

export async function setCacheHeaders(locale: string, pageType: 'homepage' | 'page' | 'api' = 'page') {
  const headersList = await headers();
  
  // Determine cache settings based on page type
  let cacheControl: string;
  let cacheTag: string;
  
  switch (pageType) {
    case 'homepage':
      cacheControl = 'public, s-maxage=1800, stale-while-revalidate=3600';
      cacheTag = `locale-${locale},homepage`;
      break;
    case 'api':
      cacheControl = 'public, s-maxage=300, stale-while-revalidate=600';
      cacheTag = `locale-${locale},api-data`;
      break;
    default:
      cacheControl = 'public, s-maxage=3600, stale-while-revalidate=86400';
      cacheTag = `locale-${locale}`;
  }
  
  // Note: We can't directly set response headers in server components
  // This function is for documentation and middleware use
  return {
    'Cache-Control': cacheControl,
    'Cache-Tag': cacheTag,
    'Vary': 'Accept-Language',
    'X-Locale': locale,
  };
}

export const CACHE_HEADERS = {
  HOMEPAGE: 'public, s-maxage=1800, stale-while-revalidate=3600',
  PAGE: 'public, s-maxage=3600, stale-while-revalidate=86400',
  API: 'public, s-maxage=300, stale-while-revalidate=600',
  STATIC: 'public, max-age=31536000, immutable',
} as const;

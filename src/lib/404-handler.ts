import { notFound } from 'next/navigation';

/**
 * Custom 404 handler for locale-specific pages
 * 
 * This function should be called in page components when content is not found
 * to trigger the custom 404 page instead of the default Next.js 404.
 */
export function handleNotFound(reason?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`404 triggered: ${reason || 'Unknown reason'}`);
  }
  
  // This will trigger the not-found.tsx page
  notFound();
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): boolean {
  const validLocales = ['th', 'en'];
  return validLocales.includes(locale);
}

/**
 * Validate page parameters and trigger 404 if invalid
 */
export function validatePageParams(params: { locale?: string; [key: string]: any }) {
  if (params.locale && !isValidLocale(params.locale)) {
    handleNotFound(`Invalid locale: ${params.locale}`);
  }
}

/**
 * Handle API 404 responses
 */
export function handleAPINotFound(resourceType: string, id?: string) {
  const message = id 
    ? `${resourceType} with ID ${id} not found`
    : `${resourceType} not found`;
    
  handleNotFound(message);
}

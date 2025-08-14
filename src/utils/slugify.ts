/**
 * Utility functions for generating URL-friendly slugs that support both Thai and English characters
 */

/**
 * Generate a URL-friendly slug from a string
 * Supports both Thai and English characters
 * @param text - The text to convert to a slug
 * @param maxLength - Maximum length of the slug (default: 100)
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string, maxLength: number = 100): string {
  if (!text) return '';

  let slug = text
    // Convert to lowercase
    .toLowerCase()
    // Remove HTML tags if any
    .replace(/<[^>]*>/g, '')
    // Replace spaces and multiple whitespace with hyphens
    .replace(/\s+/g, '-')
    // Replace special characters but keep Thai characters, English letters, numbers, and hyphens
    .replace(/[^\u0E00-\u0E7Fa-z0-9\-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');

  // Truncate to max length while preserving word boundaries
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Find the last hyphen to avoid cutting words
    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen > maxLength * 0.8) {
      slug = slug.substring(0, lastHyphen);
    }
  }

  return slug;
}

/**
 * Generate a unique slug by checking against existing slugs
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Generate slugs for both Thai and English titles
 * @param titleTh - Thai title
 * @param titleEn - English title
 * @param existingSlugs - Object containing existing slugs for both languages
 * @returns Object with both Thai and English slugs
 */
export function generateBilingualSlugs(
  titleTh: string,
  titleEn: string,
  existingSlugs: { th: string[]; en: string[] } = { th: [], en: [] }
): { slugTh: string; slugEn: string } {
  const baseSlugTh = generateSlug(titleTh);
  const baseSlugEn = generateSlug(titleEn);

  const slugTh = generateUniqueSlug(baseSlugTh, existingSlugs.th);
  const slugEn = generateUniqueSlug(baseSlugEn, existingSlugs.en);

  return { slugTh, slugEn };
}

/**
 * Validate if a slug is properly formatted
 * @param slug - The slug to validate
 * @returns True if the slug is valid
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false;
  
  // Check if slug contains only allowed characters (Thai, English, numbers, hyphens)
  const validPattern = /^[\u0E00-\u0E7Fa-z0-9\-]+$/;
  
  return (
    validPattern.test(slug) &&
    !slug.startsWith('-') &&
    !slug.endsWith('-') &&
    !slug.includes('--')
  );
}

/**
 * Clean and normalize a slug
 * @param slug - The slug to clean
 * @returns A cleaned slug
 */
export function cleanSlug(slug: string): string {
  return generateSlug(slug);
}

/**
 * Extract slug from a URL path
 * @param path - The URL path (e.g., "/news-events/my-article-slug")
 * @returns The slug part
 */
export function extractSlugFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

/**
 * Generate a slug preview for display purposes
 * @param text - The text to preview as a slug
 * @returns A preview of what the slug would look like
 */
export function previewSlug(text: string): string {
  return generateSlug(text);
}

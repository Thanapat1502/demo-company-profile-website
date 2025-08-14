import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Cache revalidation utility for news-related pages
 * Handles both path-based and tag-based revalidation for Vercel deployment
 */

export interface NewsRevalidationData {
  slug_th?: string;
  slug_en?: string;
  id?: string;
  action: 'create' | 'update' | 'delete';
}

/**
 * Revalidate all news-related cache entries
 * This function handles comprehensive cache invalidation for news operations
 */
export async function revalidateNewsCache(data: NewsRevalidationData) {
  try {
    console.log('🔄 Starting cache revalidation for news:', data);

    // 1. Revalidate main news listing pages
    revalidatePath('/[locale]/news-events', 'page');
    revalidatePath('/th/news-events', 'page');
    revalidatePath('/en/news-events', 'page');

    // 2. Revalidate home page (might show latest news)
    revalidatePath('/[locale]', 'page');
    revalidatePath('/th', 'page');
    revalidatePath('/en', 'page');

    // 3. Revalidate specific news article pages if slugs are provided
    if (data.slug_th) {
      revalidatePath(`/[locale]/news-events/[slug]`, 'page');
      revalidatePath(`/th/news-events/${data.slug_th}`, 'page');
      console.log(`✅ Revalidated Thai news page: /th/news-events/${data.slug_th}`);
    }

    if (data.slug_en) {
      revalidatePath(`/en/news-events/${data.slug_en}`, 'page');
      console.log(`✅ Revalidated English news page: /en/news-events/${data.slug_en}`);
    }

    // 4. Revalidate API routes that might be cached
    revalidateTag('news-api');
    revalidateTag('news-list');
    revalidateTag('categories');

    // 5. Revalidate sitemap and RSS feeds if they exist
    revalidatePath('/sitemap.xml');
    revalidatePath('/robots.txt');

    // 6. For delete operations, also revalidate the layout to update navigation counts
    if (data.action === 'delete') {
      revalidatePath('/[locale]/layout', 'layout');
    }

    console.log('✅ Cache revalidation completed successfully');
    
    return {
      success: true,
      message: 'Cache revalidated successfully',
      revalidatedPaths: [
        '/th/news-events',
        '/en/news-events',
        '/th',
        '/en',
        ...(data.slug_th ? [`/th/news-events/${data.slug_th}`] : []),
        ...(data.slug_en ? [`/en/news-events/${data.slug_en}`] : []),
      ]
    };

  } catch (error) {
    console.error('❌ Cache revalidation failed:', error);
    
    return {
      success: false,
      message: 'Cache revalidation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Revalidate cache for news categories
 * Used when categories are updated
 */
export async function revalidateCategoriesCache() {
  try {
    console.log('🔄 Revalidating categories cache');
    
    revalidateTag('categories');
    revalidateTag('news-api');
    revalidatePath('/[locale]/news-events', 'page');
    revalidatePath('/th/news-events', 'page');
    revalidatePath('/en/news-events', 'page');
    
    console.log('✅ Categories cache revalidated');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Categories cache revalidation failed:', error);
    return { success: false, error };
  }
}

/**
 * Trigger manual cache revalidation via API call
 * Useful for external webhooks or manual cache clearing
 */
export async function triggerManualRevalidation(paths: string[] = []) {
  try {
    console.log('🔄 Manual cache revalidation triggered for paths:', paths);
    
    // Default paths if none provided
    const defaultPaths = [
      '/th/news-events',
      '/en/news-events',
      '/th',
      '/en'
    ];
    
    const pathsToRevalidate = paths.length > 0 ? paths : defaultPaths;
    
    pathsToRevalidate.forEach(path => {
      revalidatePath(path);
    });
    
    // Also revalidate common tags
    revalidateTag('news-api');
    revalidateTag('news-list');
    revalidateTag('categories');
    
    console.log('✅ Manual revalidation completed');
    return { success: true, revalidatedPaths: pathsToRevalidate };
    
  } catch (error) {
    console.error('❌ Manual revalidation failed:', error);
    return { success: false, error };
  }
}
